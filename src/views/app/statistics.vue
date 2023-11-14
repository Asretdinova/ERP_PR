<template>
<!-- ============ Body content start ============= -->

<div class="main-content">
    <breadcumb :page="'statistic_critic'" :folder="'dashboardItems.statistic'" />
    <div>
        <b-row>
            <b-col lg="3" md="6" sm="12">
                <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                    <i class="i-Add-User"></i>
                    <div class="content">
                        <p class="text-muted mt-2 mb-0">{{ $t("message.applications_new") }}</p>
                        <p class="text-primary text-24 line-height-1 mb-2">
                            {{ applications_new }}
                        </p>
                    </div>
                </b-card>
            </b-col>
            <b-col lg="3" md="6" sm="12">
                <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                    <i class="i-Financial"></i>
                    <div class="content">
                        <p class="text-muted mt-2 mb-0">{{ $t("message.applications_overdue") }}</p>
                        <p class="text-primary text-24 line-height-1 mb-2">
                            {{ applications_overdue }}
                        </p>
                    </div>
                </b-card>
            </b-col>
            <b-col lg="3" md="6" sm="12">
                <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                    <i class="i-Checkout-Basket"></i>
                    <div class="content">
                        <p class="text-muted mt-2 mb-0">{{ $t("message.applications_closed") }}</p>
                        <p class="text-primary text-24 line-height-1 mb-2">
                            {{ applications_closed }}
                        </p>
                    </div>
                </b-card>
            </b-col>
            <b-col lg="3" md="6" sm="12">
                <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
                    <i class="i-Checkout-Basket"></i>
                    <div class="content">
                        <p class="text-muted mt-2 mb-0">{{ $t("message.closed_overdue") }}</p>
                        <p class="text-primary text-24 line-height-1 mb-2">
                            {{ applications_closed_overdue }}
                        </p>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="mb-30">
            <b-col md="12" sm="12">
                <b-card class="dashboard_card mb-10" style="height: 100%">
                    <h4 class="card-title">
                        {{ $t("message.dashboardItems.number_applications_mno") }}
                    </h4>
                    <div class="chart-wrapper" style="width: 100%">
                        <vue-good-table :columns="columns" class="table" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="results_data.applications_mno">
                            <template slot="table-row" slot-scope="props">
                                <div v-if="props.column.field == 'name'">{{ props.row["name_" + selectedLocale.suffix] }}</div>

                                <div v-if="props.column.field == 'new'" class="font-weight-bold text-center text-warning">
                                    <span v-if="props.row.new > 0 && users.role === 3">
                                        <router-link :to="'/criticism/index/?administration_id=' + props.row.id + '&status=new' ">
                                            {{ props.row.new }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.new }}</span>
                                </div>
                                <div v-if="props.column.field == 'overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=overdue' ">
                                            {{ props.row.overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.overdue }}</span>
                                </div>

                                <div v-if="props.column.field == 'closed'" class="font-weight-bold text-center text-success">
                                    <span v-if="props.row.closed > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-success" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed' ">
                                            {{ props.row.closed }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed }}</span>
                                </div>
                                <div v-if="props.column.field == 'closed_overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.closed_overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed_overdue' ">
                                            {{ props.row.closed_overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed_overdue }}</span>
                                </div>
                            </template>
                        </vue-good-table>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="mb-30">
            <b-col col md="12" sm="12">
                <b-card class="dashboard_card mb-10" style="height: 100%">
                    <h4 class="card-title">
                        {{ $t("message.dashboardItems.number_applications_ter") }}
                    </h4>
                    <div class="chart-wrapper" style="width: 100%">
                       <vue-good-table :columns="columns" class="table" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="results_data.applications_ter">
                            <template slot="table-row" slot-scope="props">
                                <div v-if="props.column.field == 'name'">{{ props.row["name_" + selectedLocale.suffix] }}</div>

                                <div v-if="props.column.field == 'new'" class="font-weight-bold text-center text-warning">
                                    <span v-if="props.row.new > 0 && users.role === 3">
                                        <router-link :to="'/criticism/index/?administration_id=' + props.row.id + '&status=new' ">
                                            {{ props.row.new }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.new }}</span>
                                </div>
                                <div v-if="props.column.field == 'overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=overdue' ">
                                            {{ props.row.overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.overdue }}</span>
                                </div>

                                <div v-if="props.column.field == 'closed'" class="font-weight-bold text-center text-success">
                                    <span v-if="props.row.closed > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-success" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed' ">
                                            {{ props.row.closed }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed }}</span>
                                </div>
                                <div v-if="props.column.field == 'closed_overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.closed_overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed_overdue' ">
                                            {{ props.row.closed_overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed_overdue }}</span>
                                </div>
                            </template>
                        </vue-good-table>
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="mb-30">
            <b-col md="12" sm="12">
                <b-card class="dashboard_card mb-30" style="height: 100%">
                    <h4 class="card-title">
                        {{ $t("message.dashboardItems.number_applications_res") }}
                    </h4>
                    <div class="chart-wrapper" style="width: 100%">
                      <vue-good-table :columns="columns" class="table" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="results_data.applications_res">
                            <template slot="table-row" slot-scope="props">
                                <div v-if="props.column.field == 'name'">{{ props.row["name_" + selectedLocale.suffix] }}</div>

                                <div v-if="props.column.field == 'new'" class="font-weight-bold text-center text-warning">
                                    <span v-if="props.row.new > 0 && users.role === 3">
                                        <router-link :to="'/criticism/index/?administration_id=' + props.row.id + '&status=new' ">
                                            {{ props.row.new }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.new }}</span>
                                </div>
                                <div v-if="props.column.field == 'overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=overdue' ">
                                            {{ props.row.overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.overdue }}</span>
                                </div>

                                <div v-if="props.column.field == 'closed'" class="font-weight-bold text-center text-success">
                                    <span v-if="props.row.closed > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-success" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed' ">
                                            {{ props.row.closed }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed }}</span>
                                </div>
                                <div v-if="props.column.field == 'closed_overdue'" class="font-weight-bold text-center text-danger">
                                    <span v-if="props.row.closed_overdue > 0 && users.role === 3">
                                        <router-link class="font-weight-bold text-center text-danger" :to="'/criticism/index/?administration_id=' +  props.row.id + '&status=closed_overdue' ">
                                            {{ props.row.closed_overdue }}
                                        </router-link>
                                    </span>
                                    <span v-else> {{ props.row.closed_overdue }}</span>
                                </div>
                            </template>
                        </vue-good-table>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import {
    getStatisticCritics,
    getStatisticCriticsAll
} from "../../api/statistics";
import {
    mapGetters
} from "vuex";

export default {
    metaInfo: {
        title: "Statistic",
    },
    computed: {
        ...mapGetters(["selectedLocale"]),
        columns() {
            var lang = this.selectedLocale.suffix
            return [{
                    label: this.$t("message.title"),
                    field: 'name',
                    sortable: false
                },
                {
                    label: this.$t("message.applications_new"),
                    field: "new",
                    type: 'number'
                },
                {
                    label: this.$t("message.applications_overdue"),
                    field: "overdue",
                    html: true,
                    type: 'number'
                },
                {
                    label: this.$t("message.applications_closed"),
                    field: "closed",
                    type: 'number',
                    html: true,
                },
                {
                    label: this.$t("message.closed_overdue"),
                    field: "closed_overdue",
                    type: 'number',
                    html: true,
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
            results_data: {
                applications_mno: [],
                applications_ter: [],
                applications_res: [],
                applications_prs: [],
            },
            users: this.$store.getters.user,
            paginatedItems: {},
            perPage: 8,
            applications_mno_current_page: 1,
            applications_ter_current_page: 1,
            applications_res_current_page: 1,
            applications_prs_current_page: 1,
            applications_mno_lenth: 0,
            applications_ter_length: 0,
            applications_res_length: 0,
            applications_prs_length: 0,
            applications_new: 0,
            applications_overdue: 0,
            applications_closed: 0,
            applications_closed_overdue: 0,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            getStatisticCriticsAll().then((res) => {
                Object.values(res.data).forEach((element) => {
                    this.applications_new += element.new;
                    this.applications_overdue += element.overdue;
                    this.applications_closed += element.closed;
                    this.applications_closed_overdue += element.closed_overdue;
                });
            });
            getStatisticCritics({
                administration_type: "mno",
                limit: 10000,
            }).then((res) => {
                this.results_data["applications_mno"] = res.data.results;
                this.applications_mno_lenth = res.data.count;

                // this.paginate(this.perPage, 0, "applications_mno");
            });
            getStatisticCritics({
                administration_type: "res",
                limit: 10000,
            }).then((res) => {
                this.results_data["applications_res"] = res.data.results;
                this.applications_res_length = res.data.count;

                this.paginate(this.perPage, 0, "applications_res");
            });

            getStatisticCritics({
                administration_type: "ter",
                limit: 10000,
            }).then((res) => {
                this.results_data["applications_ter"] = res.data.results;
                this.applications_ter_length = res.data.count;

                this.paginate(this.perPage, 0, "applications_ter");
            });

            getStatisticCritics({
                administration_type: "prs",
                limit: 10000,
            }).then((res) => {
                this.results_data["applications_prs"] = res.data.results;
                this.applications_prs_length = res.data.count;

                this.paginate(this.perPage, 0, "applications_prs");
            });
        },
        paginate(page_size, page_number, text = "applications_mno") {
            let itemsToParse = Object.values(this.results_data[text]);

            this.paginatedItems[text] = itemsToParse.slice(
                page_number * page_size,
                (page_number + 1) * page_size
            );
        },
        onPageAppMnoChanged(page) {
            this.paginate(this.perPage, page - 1, "applications_mno");
        },
        onPageTerAppChanged(page) {
            this.paginate(this.perPage, page - 1, "applications_ter");
        },
        onPageResAppChanged(page) {
            this.paginate(this.perPage, page - 1, "applications_res");
        },
        onPagePrsAppChanged(page) {
            this.paginate(this.perPage, page - 1, "applications_prs");
        },
    },
};
</script>

<style>
.card-icon-bg .card-body .content {
    max-width: 200px;
}

.dashboard_card .card-footer {
    background-color: #ffffff;
}
</style>
