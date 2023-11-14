<template>
<div class="main-content">
    <breadcumb :page="'call_center'" :folder="'list'" />
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
                <router-link to="/call-center/create">
                    <b-button variant="success btn-icon ripple m-1">
                        <span class="ul-btn__icon">+</span>
                    </b-button>
                </router-link>
            </div>
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <router-link :to="'/call-center/edit/'+props.row.id">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}
                    </router-link>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)" v-if="users.role === 3">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}
                    </b-button>
                </span>
                <span v-else-if="props.column.field == 'deadline_timer'">
                    <span class="badge badge-pill">
                        <Countdown :deadline="props.row.deadline" :is_overdue="props.row.is_overdue" :status="props.row.status"></Countdown>
                    </span>
                </span>

            </template>
        </vue-good-table>

    </b-card>
</div>
</template>

<script>
import {
    getCallCenter,
    deleteCallCenter
} from '../../api/call_center'
import {
    format
} from 'date-fns';
import {
    mapGetters
} from "vuex";
import Countdown from '@/components/countdown'

export default {
    metaInfo: {
        title: "Call-center"
    },
    components: {
        Countdown
    },
    computed: {
        ...mapGetters(["selectedLocale"]),
        columns: function () {
            var lang = this.selectedLocale.suffix
            var type = {
                1: this.$t('message.edu_management'),
                2: this.$t('message.republican_administration'),
                3: this.$t('message.territorial_administration'),
                4: this.$t('message.press_secretaries')
            }
            var type_status = {
                '1': this.$t('message.new_application'),
                '2': this.$t('message.checking'),
                '3': this.$t('message.closed')
            }
            return [{
                    label: "ID",
                    field: "id",
                    type: 'number'
                },
                {
                    label: this.$t('message.full_name'),
                    field: 'full_name'
                },
                {
                    label: this.$t('message.phone'),
                    field: 'phone'
                },
                {
                    label: this.$t('message.type'),
                    field: function (val) {
                        return type[val.type_upr]
                    }
                },
                {
                    label: this.$t('message.management_category'),
                    field: function (val) {
                        return (val['administration']) ? val['administration']['name_' + lang] : ''
                    }
                },
                {
                    label: this.$t('message.region'),
                    field: 'region.name'
                },
                {
                    label: this.$t('message.city'),
                    field: 'city.name'
                },
                {
                    label: this.$t('message.creation_date'),
                    field: function (val) {
                        return format(new Date(val.created_at), 'yyyy-MM-dd HH:mm')
                    },
                },
                {
                    label: this.$t('message.deadline'),
                    field: 'deadline_timer',
                },
                {
                    label: this.$t('message.status'),
                    field: function (val) {
                        return type_status[val.status]
                    },
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
    data() {
        return {
            rows: [],
            users: this.$store.getters.user,
        };
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getCallCenter({
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
                    deleteCallCenter(id).then(() => {
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
