<template>
<div class="main-content">
    <breadcumb :page="'media'" :folder="'list'" />
    <b-card class="wrapper">
        <vue-good-table :columns="columns" :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }" :sort-options="{
                        enabled: true,
                        initialSortBy: [
                          {field: 'id', type: 'desc'}]
                    }" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="rows">
            <div slot="table-actions" class="mb-3">
                <router-link to="/media/create">
                    <b-button variant="success btn-icon ripple m-1">
                        <span class="ul-btn__icon">+</span>
                    </b-button>
                </router-link>
            </div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <router-link :to="'/media/edit/'+props.row.id">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}
                    </router-link>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)" v-if="users.role === 3">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}
                    </b-button>
                </span>
            </template>
        </vue-good-table>

        <b-modal centered :title="$t('message.delete_title')" size="lg" ref="modal_info" header-bg-variant="danger" ok-variant="success" :ok-title="$t('message.yes')" :cancel-title="$t('message.no')" @ok="deleteAdmin">
            <div class="text-center">
                <h2>{{$t('message.delete_message')}}</h2>
            </div>
            <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3" v-model="tabIndex">
                <b-tab :title="$t('message.media_interview')"  v-if="media_interviews.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in media_interviews">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
                <b-tab :title="$t('message.journalists')" v-if="media_journalists.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in media_journalists">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
                <b-tab :title="$t('message.media_inquiries')"  v-if="media_media_reqs.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in media_media_reqs">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
                <b-tab :title="$t('message.media_publications')" v-if="media_publications.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in media_publications">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
            </b-tabs>
        </b-modal>

    </b-card>
</div>
</template>

<script>
import {
    getMedia,
    deleteMedia,
    getMediaType,
    getMediaId
} from '../../api/media'
import {
    deletePressSecretaries
} from "../../api/press_secretaries";

export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Structure Table"
    },
    data() {
        return {
            rows: [],
            mediaType: [],
            delete_id: null,
            tabIndex: 0,
            media_media_reqs: [],
            media_interviews: [],
            media_journalists: [],
            media_publications: [],
            users: this.$store.getters.user,
        };
    },
    computed: {
        columns() {
            return [
                {
                    label: "ID",
                    field: "id",
                    type: 'number',
                },
                {
                    label: this.$t('message.title'),
                    field: "name"
                },
                {
                    label: this.$t('message.address'),
                    field: "address",
                },
                {
                    label: this.$t('message.media_type'),
                    field: "type_name",
                },
                {
                    label: this.$t('message.description'),
                    field: "description",
                },
                {
                    label: this.$t('message.phone_number'),
                    field: "contact",
                },
                {
                    label: this.$t('message.action'),
                    field: "action",
                    html: true,
                    tdClass: "text-right",
                    thClass: "text-right"
                }
            ]
        },
        pagination_options: function () {
            return {
                enabled: true,
                nextLabel: this.$t('message.next'),
                prevLabel: this.$t('message.prev'),
                rowsPerPageLabel: this.$t('message.rowsPerPageLabel'),
                allLabel: this.$t('message.all'),
                mode: 'records'
            }
        }
    },
    mounted() {
        this.fetchMediaType()
    },
    methods: {
        fetchData() {
            getMedia({
                limit: 10000
            }).then(res => {
                res.data.results.forEach(v => {
                    var d = this.mediaType.filter(k => k.id === v.type)
                    v.type_name = (d.length) ? d[0].name : null
                })
                this.rows = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        fetchMediaType() {
            getMediaType({
                limit: 10000
            }).then(res => {
                this.fetchData()
                this.mediaType = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        confirmMessage(id) {
            getMediaId(id).then(res => {
                this.$refs.modal_info.show()
                this.media_media_reqs = res.data.media_media_reqs
                this.media_interviews = res.data.media_interviews
                this.media_journalists = res.data.media_journalists
                this.media_publications = res.data.media_publications
                this.delete_id = id
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        deleteAdmin() {
            deleteMedia(this.delete_id).then(() => {
                this.fetchData()
                this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                this.delete_id = null
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        makeToast(variant = null, msg, title) {
            this.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true
            });
        }
    }
};
</script>

<style>
</style>
