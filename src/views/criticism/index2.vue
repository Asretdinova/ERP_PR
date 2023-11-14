<template>
    <div class="main-content">
        <breadcumb :page="'criticism'" :folder="'list'" />
        <b-card class="wrapper">
            <b-card-text>
                <div class="row">
                    <b-col md="3">
                        <b-form-input v-model="search" placeholder="Search this table">
                        </b-form-input>
                    </b-col>
                    <b-col md="3">
                        <b-form-select class="mb-2" :value="null" v-model="search_data.status" :options="options_status"
                            id="inline-form-custom-select-pref">
                            <option slot="first" :value="null">{{ $t('message.statuses') }}</option>
                        </b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-form-select class="mb-2" :value="null" v-model="search_data.status" :options="options_status2"
                            id="inline-form-custom-select-pref">
                            <option slot="first" :value="null">{{ $t('message.choose') }}</option>
                        </b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-form-select class="mb-2" :value="null" v-model="administration" :options="mno_options"
                            id="inline-form-custom-select-pref">
                            <option slot="first" :value="null">{{ $t("message.type") }}</option>
                        </b-form-select>
                    </b-col>
                    <b-col md="2">
                        <b-form-select class="mb-2" :value="null" v-model="administration" :options="selected_adm"
                            id="inline-form-custom-select-pref" value-field="name_uz" text-field="name_uz">
                            <option slot="first" :value="null">{{ $t("message.category") }}</option>
                        </b-form-select>
                    </b-col>

                    <b-col md="1" class="vh-100 text-right" align-v="center">
                        <router-link to="/criticism/create" v-if="users.role === 3">
                            <b-button variant="success btn-icon ripple m-1">
                                <span class="ul-btn__icon">+</span>
                            </b-button>
                        </router-link>
                    </b-col>
                </div>
            </b-card-text>
            <vue-good-table :columns="columns" :search-options="{
                enabled: false,
                externalQuery: search
            }" :pagination-options="pagination_options" :sort-options="{
    enabled: true,
    initialSortBy: [
        { field: 'id', type: 'desc' }]
}" styleClass="tableOne vgt-table" :rows="rows" @on-cell-click="selectRow">
                <!--  <div slot="table-actions" class="mb-3" v-if="users.role === 3">
                    <router-link to="/criticism/create">
                        <b-button variant="success btn-icon ripple m-1">
                            <span class="ul-btn__icon">+</span>
                        </b-button>
                    </router-link>
                </div> -->

                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'action'">
                        <router-link :to="'/criticism/edit/' + props.row.id">
                            <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                            {{ props.row.button }}
                        </router-link>
                        <b-button style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)"
                            v-if="users.role === 3">
                            <i class="i-Close-Window text-25 text-danger"></i>
                            {{ props.row.button }}
                        </b-button>
                    </span>
                    <span v-else-if="props.column.field == 'deadline_timer'">
                        <span class="badge badge-pill">
                            <Countdown :deadline="props.row.deadline" :is_overdue="props.row.is_overdue"
                                :status="props.row.status"></Countdown>
                        </span>
                    </span>
                </template>
            </vue-good-table>
        </b-card>
    </div>
</template>
    
<script>
import {
    getCritics,
    deleteCritics,
    getCriticsStatus
} from '../../api/critics'

import {
    format
} from 'date-fns';
import {
    mapGetters
} from "vuex";
import {
    deleteArticles
} from "../../api/articles";

import { getAdministration } from "../../api/management_edu";
import { getAdministration as getAdministrationRep } from "../../api/republican_administration";
import { getAdministration as getAdministrationTer } from "../../api/territorial_administration";
import { getPressSecretaries } from "../../api/press_secretaries";
import { getCriticsType } from "../../api/critics";
import Countdown from '@/components/countdown'
export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Structure Table"
    },
    components: {
        Countdown
    },
    watch: {
        'search_data.status'(val) {
            if (!val) { this.fetchData() }
            else {
                if (val == 1 || val == 2 || val == 3) this.fetchData()
                else this.fetchFilterData()
            }

        },
        'administration'(val) {
            console.log(val)
            val = val * 1;
            switch (val) {
                case 1:
                    getAdministration({
                        limit: 1000,
                    }).then((res) => {
                        this.selected_adm = res.data.results
                        this.rows = data.content.res.data.results.filter((type) => type.type_upr === 1)
                        console.log("filtered rows")
                        console.log(this.rows)
                        this.fetchData()
                    });

                    break;
                case 2:
                    getAdministrationRep({
                        limit: 1000,
                    }).then((res) => {
                        this.selected_adm = res.data.results;
                    });
                    // this.fetchData()
                    break;

                case 3:
                    getAdministrationTer({
                        limit: 1000,
                    }).then((res) => {
                        this.selected_adm = res.data.results;
                    });
                    // this.fetchData()
                    break;
                case 4:
                    getPressSecretaries({
                        limit: 1000,
                    }).then((res) => {
                        this.selected_adm = res.data.results;
                    });
                    // this.fetchData()
                    break;
                default: this.selected_adm = null; break;
            }
            console.log(this.selected_adm)
            if (!val) { this.fetchData() }
            else {
                if (val == 1 || val == 2 || val == 3 || val == 4) this.fetchData()
                else this.fetchCriticsType()
            }

        },
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
                '1': this.$t('message.in_work_1'),
                '2': this.$t('message.on_check_1'),
                '3': this.$t('message.approved')
            }

            return [{
                label: "ID",
                field: "id",
                type: 'number'
            },
            {
                label: this.$t('message.title'),
                field: "name",
            },
            {
                label: this.$t('message.description'),
                field: function (val) {
                    return val.description.substring(0, 90) + "..."
                },

            },
            {
                label: this.$t('message.type'),
                field: function (val) {
                    return type[val.type_upr]
                }
            },
            {
                label: this.$t('message.category'),
                field: function (val) {
                    return val['administration']['name_' + lang]
                },
            },
            {
                label: this.$t('message.owner'),
                field: "created_by.username",
            },
            {
                label: this.$t('message.creation_date'),
                field: function (val) {
                    return format(new Date(val.created_at), 'dd.MM.yyyy HH:mm')
                },
            },
            {
                label: this.$t('message.deadline'),
                html: true,
                field: 'deadline_timer'
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
            search: null,
            cr_type: [],
            administration: null,
            selected_admin: null,
            selected_adm: [],
            search_data: {
                status: null,
                limit: 10000
            },
            mno_options: [
                {
                    value: 1,
                    text: this.$t("message.edu_management"),
                },
                {
                    value: 2,
                    text: this.$t("message.territorial_administration"),
                },
                {
                    value: 3,
                    text: this.$t("message.republican_administration"),
                },
                {
                    value: 4,
                    text: this.$t('message.press_secretaries'),
                },
            ],
            options_status: [{
                value: 'new',
                text: this.$t('message.new')
            },
            {
                value: 'overdue',
                text: this.$t('message.overdue')
            },
            {
                value: 'closed_overdue',
                text: this.$t('message.closed_overdue')
            },
            {
                value: 'closed',
                text: this.$t('message.closed')
            }

            ],
            options_status2: [{
                value: 1,
                text: this.$t('message.in_work_1')
            },
            {
                value: 2,
                text: this.$t('message.on_check_1')
            },
            {
                value: 3,
                text: this.$t('message.approved')
            }

            ],
        };
    },
    mounted() {
        if (this.$route.query.status) {
            this.search_data = this.$route.query
            this.search_data.limit = 10000
            this.fetchFilterData()
        }
        else {
            this.fetchData()
        }
        console.log(this.$route.query.type_upr)
        if (this.$route.query.type_upr) {
            this.search_data = this.$route.query
            this.search_data.limit = 10000
            this.fetchCriticsType()

        } else {
            this.fetchData()
        }
        // this.fetchCriticsType();
    },
    methods: {
        fetchFilterData() {
            getCriticsStatus(this.search_data).then(res => {
                this.rows = res.data.results
            }).catch(error => {
                // for (var k in error.response.data) {
                //     this.makeToast("danger", error.response.data[k], 'Failed');
                // }
            })
        },
        fetchCriticsType() {
            getCriticsType({
                limit: 1000,
            }).then((res) => {
                this.rows = res.data.results;
            });
        },
        fetchData() {
            getCritics(this.search_data).then(res => {
                this.rows = res.data.results
                console.log(this.rows)
            }).catch(error => {
                // for (var k in error.response.data) {
                //     this.makeToast("danger", error.response.data[k], 'Failed');
                // }
            })

        },

        selectRow(props) {
            if (props.column.field != 'action') { this.$router.push('/criticism/edit/' + props.row.id) }
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
                cancelButtonText: this.$t('message.cancel'),
            }).then(result => {
                if (result.value) {
                    deleteCritics(id).then(() => {
                        this.fetchData()
                        this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                    }).catch(error => {
                        // for (var k in error.response.data) {
                        //     this.makeToast("danger", error.response.data[k], 'Failed');
                        // }
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
    
<style></style>
    