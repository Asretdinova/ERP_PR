<template>
<div class="main-content">
    <breadcumb :page="'edu_management'" :folder="'list'" />
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
                <router-link to="/management-edu/create">
                    <b-button variant="success btn-icon ripple m-1">
                        <span class="ul-btn__icon">+</span>
                    </b-button>
                </router-link>
            </div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <router-link :to="'/management-edu/edit/'+props.row.id">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}</router-link>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}</b-button>
                </span>
            </template>
        </vue-good-table>

        <b-modal centered :title="$t('message.delete_title')" size="lg" ref="modal_info" header-bg-variant="danger" ok-variant="success" :ok-title="$t('message.yes')" :cancel-title="$t('message.no')" @ok="deleteAdmin">
            <div class="text-center">
                <h2>{{$t('message.delete_message')}}</h2>
            </div>
            <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3" v-model="tabIndex">
                <b-tab :title="$t('message.articles')"  v-if="items_article.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in items_article">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
                <b-tab :title="$t('message.criticism')" v-if="items_critics.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in items_critics">
                                <b-th>{{val}}</b-th>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-tab>
                <b-tab :title="$t('message.media_inquiries')"  v-if="items_media_reqs.length">
                    <b-table-simple responsive>
                        <b-tbody>
                            <b-tr v-bind:v-for="val in items_media_reqs">
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
    getAdministration,
    deleteAdministration,
    getAdministrationId
} from '../../api/management_edu'
import {
    mapGetters
} from "vuex";
import Vue from "vue";

export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Structure Table"
    },
    data() {
        return {
            rows: [],
            delete_id: null,
            tabIndex: 0,
            items_article: [],
            items_critics: [],
            items_media_reqs: []
        };
    },
    computed: {
        ...mapGetters(["selectedLocale"]),
        columns: function () {
            var lang = this.selectedLocale.suffix
            return [
                {
                    label: "ID",
                    field: "id",
                    type: 'number'
                },
                {
                    label: this.$t('message.management_name'),
                    field: function (val) {
                        return val['name_' + lang]
                    }
                },
                {
                    label: this.$t('message.full_name'),
                    field: function (val) {
                        var dt = ' '
                        val.members.forEach(val => {
                            dt = dt + val.first_name + ' ' + val.last_name + '<br>'
                        })

                        return (val.members.length) ? dt : ' - '
                    },
                    html: true,
                },
                {
                    label: this.$t('message.phone_number'),
                    field: "phone",
                },
                {
                    label: this.$t('message.action'),
                    field: "action",
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
        this.fetchData()
    },
    methods: {
        fetchData() {
            getAdministration({
                limit: 10000
            }).then(res => {
                this.rows = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        confirmMessage(id) {
            getAdministrationId(id).then(res => {
                this.$refs.modal_info.show()
                this.items_article = res.data.administration_articles
                this.items_critics = res.data.administration_critics
                this.items_media_reqs = res.data.administration_media_reqs
                this.delete_id = id
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        deleteAdmin() {
            deleteAdministration(this.delete_id).then(() => {
                this.fetchData()
                this.$swal("Deleted!", "Your data has been deleted.", "success");
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
