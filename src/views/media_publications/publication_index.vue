<template>
<div class="main-content">
    <breadcumb :page="'media_publications'" :folder="'list'" />
    <b-card class="wrapper">
        <vue-good-table :columns="columns" :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }" :pagination-options="pagination_options" :sort-options="{
                        enabled: true,
                        initialSortBy: [
                          {field: 'id', type: 'desc'}]
                    }" styleClass="tableOne vgt-table" :rows="rows">
            <div slot="table-actions" class="mb-3">
                <router-link to="/media-publication/create">
                    <b-button variant="success btn-icon ripple m-1">
                        <span class="ul-btn__icon">+</span>
                    </b-button>
                </router-link>
            </div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <router-link :to="'/media-publication/edit/'+props.row.id">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}
                    </router-link>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}
                    </b-button>
                </span>
            </template>
        </vue-good-table>

    </b-card>
</div>
</template>

<script>
import {
    getPublications,
    deletePublications
} from '../../api/publications'
import {
    format
} from 'date-fns';
import {
    mapGetters
} from "vuex";
import {
    deleteJournalists
} from "../../api/journalists";
export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Structure Table"
    },
    computed: {
        ...mapGetters(["selectedLocale"]),
        columns: function () {
            var lang = this.selectedLocale.suffix
            var type = {
                '1': this.$t('message.positive'),
                '0': this.$t('message.neutral'),
                '-1': this.$t('message.negative')
            }

            return [{
                    label: "ID",
                    field: "id",
                    type: 'number'

                },
                {
                    label: this.$t('message.title'),
                    field: function (val) {
                        return val['name_' + lang]
                    }
                },
                {
                    label: this.$t('message.description'),
                    field: function (val) {
                        return val['text_' + lang]
                    }
                },
                {
                    label: this.$t('message.source_media'),
                    field: "media.name",
                },
                {
                    label: this.$t('message.status'),
                    field: function (val) {
                        return type[val.status]
                    },
                },
                {
                     label: "ФИО создателя",
                     field: "created_by.name",
                 },
                {
                    label: this.$t('message.date_added'),
                    field: function (val) {
                        return format(new Date(val.publish_date), 'dd.MM.yyyy HH:mm')
                    },
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
    data() {
        return {
            rows: []
        };
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getPublications({
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
            this.$swal({
                title: this.$t('message.delete_title'),
                text: this.$t('message.confirm_delete'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: this.$t('message.confirm_btn_delete'),
                cancelButtonText: this.$t('message.cancel')
            }).then(result => {
                if (result.value) {
                    deletePublications(id).then(() => {
                        this.fetchData()
                        this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                    }).catch(error => {
                        for (var k in error.response.data) {
                            this.makeToast("danger", error.response.data[k], 'Failed');
                        }
                    })
                }
            });
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
