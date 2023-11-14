<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'press_service_data'" :folder="'dashboardItems.statistic'" />
    <div v-if="users.role != 4">
      <b-row>
        <b-col lg="4" md="6" sm="12">
          <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
            <i class="i-Add-User"></i>
            <div class="content">
              <p class="text-muted mt-2 mb-0">{{ $t("message.critics_number") }}</p>
              <p class="text-primary text-24 line-height-1 mb-2">
                {{ results_data.critics }}
              </p>
            </div>
          </b-card>
        </b-col>
        <b-col lg="4" md="6" sm="12">
          <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
            <i class="i-Financial"></i>
            <div class="content">
              <p class="text-muted mt-2 mb-0">{{ $t("message.articles_number") }}</p>
              <p class="text-primary text-24 line-height-1 mb-2">
                {{ results_data.articles }}
              </p>
            </div>
          </b-card>
        </b-col>
        <b-col lg="4" md="6" sm="12">
          <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center">
            <i class="i-Checkout-Basket"></i>
            <div class="content">
              <p class="text-muted mt-2 mb-0">
                {{ $t("message.media_requests_number") }}
              </p>
              <p class="text-primary text-24 line-height-1 mb-2">
                {{ results_data.media_requests }}
              </p>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" md="12" sm="12">
          <b-card class="mb-30">
            <h4 class="card-title m-0">{{ $t("message.media") }}</h4>
            <div class="chart-wrapper" style="width: 100%">
              <apexchart type="pie" width="100%" style="min-width: 180px" :options="smi.chartOptions"
                :series="smi.series" />
            </div>
          </b-card>
        </b-col>
        <b-col col lg="4" md="12" sm="12">
          <b-card class="mb-30">
            <h4 class="card-title m-0">{{ $t("message.media_publications") }}</h4>
            <div class="chart-wrapper" style="width: 100%; min-height: 180px">
              <apexchart type="pie" width="100%" style="min-width: 180px; margin-top: auto"
                :options="publications.chartOptions" :series="publications.series" />
            </div>
          </b-card>
        </b-col>
        <b-col col lg="4" md="12" sm="12">
          <b-card class="mb-30">
            <h4 class="card-title m-0">{{ $t("message.journalists") }}</h4>
            <div class="chart-wrapper" style="width: 100%; min-height: 180px">
              <apexchart type="pie" width="100%" style="min-width: 180px; margin-top: auto"
                :options="journalists.chartOptions" :series="journalists.series" />
            </div>
          </b-card>
        </b-col>
      </b-row>

      <div>

        <b-modal v-model="modalShow" ref="modal-center" centered ok-only ok-title="Close">
          <div id="chart">
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
        </b-modal>
      </div>
      <div>
        <h1 class="text-center w-600">{{ $t("message.articles") }}</h1>
        <hr class="mt-1 mb-4" />
      </div>
      <b-row>
        <b-col lg="6" md="12" sm="12">
          <b-card class="dashboard_card mb-30" footer-tag="footer">
            <!-- CHart  -->
            <apexchart type="bar" width="100%" height="339px" :options="articles_chart.chartOptions"
              :series="articles_chart.series" />
          </b-card>
        </b-col>
        <b-col lg="6" md="12" sm="12">
          <b-card class="dashboard_card mb-30" footer-tag="footer">
            <div style="display: flex">
              <h4 v-if="selected == 'ter'" class="card-title">
                {{ $t("message.territorial_admin") }}
              </h4>
              <h4 v-else-if="selected == 'res'" class="card-title">
                {{ $t("message.republican_admin") }}
              </h4>
              <h4 v-else class="card-title">
                {{ $t("message.edu_management") }}
              </h4>
              <b-form-select class="mb-2" :value="null" v-model="selected" :options="options"
                id="inline-form-custom-select-pref"
                style="width: 50%; margin-left: auto; display: flex; margin-top: -7px">
                <option slot="first" :value="null">{{ $t("message.choose") }}</option>
              </b-form-select>
            </div>
            <div class="chart-wrapper" style="height: 240px; width: 100%">
              <div class="ul-widget-app__browser-list notification_widget">
                <template v-if="selected == 'ter'">
                  <div class="ul-widget-app__browser-list-1 pl-4 pr-4 pb-2 pt-2 mb-2"
                    v-for="(val, index) in paginatedItems.ter_articles" v-bind:key="index">
                    <span class="">{{ val["name_" + selectedLocale.suffix] }}</span>
                    <span class="text-muted"> {{ val.count }}</span>
                  </div>
                </template>
                <template v-else-if="selected == 'res'">
                  <div class="ul-widget-app__browser-list-1 pl-4 pr-4 pb-2 pt-2 mb-2"
                    v-for="(val, index) in paginatedItems.res_articles" v-bind:key="index">
                    <span class="">{{ val["name_" + selectedLocale.suffix] }}</span>
                    <span class="text-muted"> {{ val.count }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="ul-widget-app__browser-list-1 pl-4 pr-4 pb-2 pt-2 mb-2"
                    v-for="(val, index) in paginatedItems.mno_articles" v-bind:key="index">
                    <span class="">{{ val["name_" + selectedLocale.suffix] }}</span>
                    <span class="text-muted"> {{ val.count }}</span>
                  </div>
                </template>
              </div>
            </div>
            <template v-slot:footer>
              <b-row>
                <b-col md="12" class="">
                  <template v-if="selected == 'ter'">
                    <b-pagination @change="onPageTerArtChanged" :total-rows="ter_articles_length" :per-page="perPage"
                      v-model="ter_articles_current_page" class="my-0 gull-pagination align-items-center" align="center"
                      first-text="" last-text="">
                      <p class="list-arrow m-0" slot="prev-text">
                        <i class="i-Arrow-Left text-20"></i>
                      </p>
                      <p class="list-arrow m-0" slot="next-text">
                        <i class="i-Arrow-Right text-20"></i>
                      </p>
                    </b-pagination>
                  </template>
                  <template v-else-if="selected == 'res'">
                    <b-pagination @change="onPageResArtChanged" :total-rows="res_articles_length" :per-page="perPage"
                      v-model="res_articles_current_page" class="my-0 gull-pagination align-items-center" align="center"
                      first-text="" last-text="">
                      <p class="list-arrow m-0" slot="prev-text">
                        <i class="i-Arrow-Left text-20"></i>
                      </p>
                      <p class="list-arrow m-0" slot="next-text">
                        <i class="i-Arrow-Right text-20"></i>
                      </p>
                    </b-pagination>
                  </template>
                  <template v-else>
                    <b-pagination @change="onPageChanged" :total-rows="mno_articles_lenth" :per-page="perPage"
                      v-model="mno_articles_current_page" class="my-0 gull-pagination align-items-center" align="center"
                      first-text="" last-text="">
                      <p class="list-arrow m-0" slot="prev-text">
                        <i class="i-Arrow-Left text-20"></i>
                      </p>
                      <p class="list-arrow m-0" slot="next-text">
                        <i class="i-Arrow-Right text-20"></i>
                      </p>
                    </b-pagination>
                  </template>
                </b-col>
              </b-row>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { getAdmin } from "../../api/statistics";

import {
  distributedColumnChart,
  simplePie,
  customDataLabelBar,
  customHorizontalBar,
  HorizontalBar,
} from "@/data/chart";
import { mapGetters } from "vuex";
export default {
  metaInfo: {
    title: "Dashboard",
  },
  computed: {
    ...mapGetters(["selectedLocale"]),
    s_lb() {
      return [
        this.$t('message["Блоггер"]'),
        this.$t('message["Интернет - СМИ"]'),
        this.$t('message["Печатное СМИ"]'),
        this.$t('message["Радио"]'),
        this.$t('message["ТВ"]'),
      ];
    },
    p_lb() {
      return [
        this.$t('message["Негативные"]'),
        this.$t('message["Нейтральные"]'),
        this.$t('message["Позитивные"]'),
      ];
    },
    j_lb() {
      return [this.$t('message["pull"]'), this.$t('message["no_pull"]')];
    },
    a_lb() {
      return [
        this.$t('message["Управление МНО"]'),
        this.$t('message["Тер. упр"]'),
        this.$t('message["Рес. упр"]'),
      ];
    },
    c_lb() {
      return [
        this.$t('message["New_appeals"]'),
        this.$t('message["overdue_appeals"]'),
        this.$t('message["closed_appeals"]'),
        this.$t('message["closed_late"]'),
      ];
    },
    r_lb() {
      return [
        this.$t('message["trade_union"]'),
        this.$t('message["Cabinet_portal"]'),
        this.$t('message["Presidents_portal"]'),
        this.$t('message["prosecutors_office"]'),
        this.$t('message["mailbox"]'),
      ];
    },
  },
  watch: {
    "$i18n.locale"() {
      this.s_dt = [];
      for (let [key, value] of Object.entries(this.results_data.smi)) {
        if (key != "count") {
          this.s_dt.push(value);
        }
      }
      this.$set(this.smi, "series", this.s_dt);
      this.smi = {
        ...this.smi,
        ...{
          chartOptions: {
            labels: this.s_lb,
          },
        },
      };
      this.p_dt = [
        this.results_data.publications.negative,
        this.results_data.publications.neutral,
        this.results_data.publications.positive,
      ];
      this.c_dt = [44, 55, 13, 43];
      this.r_dt = [44, 55, 13, 43, 22];
      this.t_dt = [44, 55, 13, 43];
      this.publications = {
        ...this.publications,
        ...{
          series: this.p_dt,
          chartOptions: {
            labels: this.p_lb,
            // colors: ["#fc4c3f", "#babfba", "#00E396"],
          },
        },
      };
      this.received = {
        ...this.received,
        ...{
          series: this.r_dt,
          chartOptions: {
            labels: this.r_lb,
            // colors: ["#fc4c3f", "#babfba", "#00E396", "#fc4c3f", "#babfba"],
          },
        },
      };
      this.territorial = {
        ...this.territorial,
        ...{
          series: this.t_dt,
          chartOptions: {
            labels: this.c_lb,
            // chart: {
            //   events: {
            //      dataPointSelection: function (event, chartContext, config) {
            //         //  return {modalShow:true};
            //         //  this.render();
            //         //  return {method:this.toggleModal()};
            //         // alert("sdasd");
            //         // this.toggleModal()
            //         // this.$refs["my-modal"].show();
            //       },
            //   },
            // },
            // colors: ["#fc4c3f", "#babfba", "#00E396", "#fc4c3f"],
          },
        },
      };
      this.central = {
        ...this.central,
        ...{
          series: this.c_dt,
          chartOptions: {
            labels: this.c_lb,
            // chart: {
            //   events: {
            //       dataPointSelection: function (event, chartContext, config) {
            //         //  return {modalShow:true};
            //         //  this.render();
            //         //  return {method:this.toggleModal()};
            //         alert("sdasd");
            //         // this.toggleModal()
            //         // this.$refs["my-modal"].show();
            //       },
            //   },
            // },
            // colors: ["#fc4c3f", "#babfba", "#00E396", "#fc4c3f"],
          },
        },
      };
      this.articles_chart = {
        ...this.articles_chart,
        ...{
          series: [
            {
              data: [
                this.mno_articles_lenth,
                this.ter_articles_length,
                this.res_articles_length,
              ],
            },
          ],
          chartOptions: {
            xaxis: {
              categories: this.a_lb,
            },
          },
        },
      };
      this.horizontal_chart = {
        ...this.horizontal_chart,
        ...{
          series: [
            {
              data: [
                this.mno_articles_lenth,
                this.ter_articles_length,
                this.res_articles_length,
              ],
            },
          ],
          chartOptions: {
            xaxis: {
              categories: this.a_lb,
            },
          },
        },
      };
      this.j_dt = [];
      for (let [key, value] of Object.entries(this.results_data.journalists)) {
        if (key != "count") {
          this.j_dt.push(value);
        }
      }
      this.journalists = {
        ...this.journalists,
        ...{
          series: this.j_dt,
          chartOptions: {
            labels: this.j_lb,
          },
        },
      };
    },
  },
  data() {
    return {
      modalShow: false,

      series: [
        {
          data: [12, 9, 7, 7, 2, 1],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [
            this.$t('message["Департамент финансов"]'),
            this.$t('message["Управление по работе с персоналом"]'),
            this.$t('message["Управление перспективных моделей школ и государственно-частного партнерства"]'),
            this.$t('message["Управление координации деятельности учреждений общего среднего образования"]'),
            this.$t('message["Департамент по работе с одаренными учащимися по предметным олимпиадам"]'),
            this.$t('message["Управление координации строительства, ремонта и оснащения учреждений народного образования"]'),
          ],
        },
      },
      selected: "mno",
      options: [
        {
          value: "mno",
          text: this.$t("message.edu_management"),
        },
        {
          value: "ter",
          text: this.$t("message.territorial_administration"),
        },
        {
          value: "res",
          text: this.$t("message.republican_administration"),
        },
      ],
      results_data: {
        mno_articles: [],
        ter_articles: [],
        res_articles: [],
        prs_articles: [],
      },
      // mno_articles_data: distributedColumnChart,
      users: this.$store.getters.user,
      paginatedItems: {},
      publications: simplePie,
      territorial: simplePie,
      central: simplePie,
      received: simplePie,
      smi: simplePie,
      journalists: simplePie,
      articles_chart: customHorizontalBar,
      horizontal_chart: HorizontalBar,
      perPage: 5,
      mno_articles_current_page: 1,
      ter_articles_current_page: 1,
      prs_articles_current_page: 1,
      res_articles_current_page: 1,
      mno_articles_lenth: 0,
      ter_articles_length: 0,
      prs_articles_length: 0,
      res_articles_length: 0,
      s_dt: [],
      p_dt: [],
      j_dt: [],
      c_dt: [],
      t_dt: [],
      r_dt: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAdmin().then((res) => {
        this.results_data = res.data;
        res.data.mno_articles = res.data.mno_articles.sort(function (a, b) {
          return b.count - a.count;
        });
        res.data.ter_articles = res.data.ter_articles.sort(function (a, b) {
          return b.count - a.count;
        });
        res.data.res_articles = res.data.res_articles.sort(function (a, b) {
          return b.count - a.count;
        });
        this.mno_articles_lenth = res.data.mno_articles.length;
        this.ter_articles_length = res.data.ter_articles.length;
        this.res_articles_length = res.data.res_articles.length;
        // this.prs_articles_length = res.data.prs_articles.length;

        this.p_dt = [
          this.results_data.publications.negative,
          this.results_data.publications.neutral,
          this.results_data.publications.positive,
        ];
        this.c_dt = [44, 55, 13, 43];
        this.r_dt = [44, 55, 13, 43, 22];
        this.t_dt = [44, 55, 13, 43];
        this.articles_chart = {
          ...this.articles_chart,
          ...{
            series: [
              {
                data: [
                  this.mno_articles_lenth,
                  this.ter_articles_length,
                  this.res_articles_length,
                ],
              },
            ],
            chartOptions: {
              xaxis: {
                categories: this.a_lb,
              },
            },
          },
        };
        this.horizontal_chart = {
          ...this.horizontal_chart,
          ...{
            series: [
              {
                data: [
                  this.mno_articles_lenth,
                  this.ter_articles_length,
                  this.res_articles_length,
                ],
              },
            ],
            chartOptions: {
              xaxis: {
                categories: this.a_lb,
              },
            },
          },
        };

        this.publications = {
          ...this.publications,
          ...{
            series: this.p_dt,
            chartOptions: {
              labels: this.p_lb,
              colors: ["#fc4c3f", "#babfba", "#00E396"],
            },
          },
        };
        this.received = {
          ...this.received,
          ...{
            series: this.r_dt,
            chartOptions: {
              labels: this.r_lb,
              chart: {
                events: {
                  dataPointSelection: this.showModal
                },
              },
            },
          },
        };
        this.territorial = {
          ...this.territorial,
          ...{
            series: this.t_dt,
            chartOptions: {
              labels: this.c_lb,
              chart: {
                events: {
                  dataPointSelection: this.showModal
                },
              },
            },
          },
        };
        this.central = {
          ...this.central,
          ...{
            series: this.c_dt,
            chartOptions: {
              labels: this.c_lb,
              chart: {
                events: {
                  dataPointSelection: this.showModal
                },
              },
            },
          },
        };

        for (let [key, value] of Object.entries(this.results_data.smi)) {
          if (key != "count") {
            this.s_dt.push(value);
          }
        }
        this.$set(this.smi, "series", this.s_dt);
        this.smi = {
          ...this.smi,
          ...{
            chartOptions: {
              labels: this.s_lb,
            },
          },
        };

        for (let [key, value] of Object.entries(this.results_data.journalists)) {
          if (key != "count") {
            this.j_dt.push(value);
          }
        }
        this.journalists = {
          ...this.journalists,
          ...{
            series: this.j_dt,
            chartOptions: {
              labels: this.j_lb,
            },
          },
        };

        this.paginate(this.perPage, 0, "mno_articles");
        this.paginate(this.perPage, 0, "ter_articles");
        this.paginate(this.perPage, 0, "res_articles");
        // this.paginate(this.perPage, 0, "prs_articles");
      });
    },
    paginate(page_size, page_number, text) {
      let itemsToParse = Object.values(this.results_data[text]);
      this.paginatedItems[text] = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1, "mno_articles");
    },
    onPageTerArtChanged(page) {
      this.paginate(this.perPage, page - 1, "ter_articles");
    },
    onPageResArtChanged(page) {
      this.paginate(this.perPage, page - 1, "res_articles");
    },
    // onPagePrsArtChanged(page) {
    //   this.paginate(this.perPage, page - 1, "prs_articles");
    // },
    showModal() {
      this.$refs["modal-center"].show();
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
