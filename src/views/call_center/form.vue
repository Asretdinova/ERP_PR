<template>
  <div class="main-content">
    <breadcumb :page="'call_center'" :folder="title_form" back="true" />
    <b-card class="wrapper">
      <b-form @submit.prevent="submit">
        <div class="row">
          <b-col md="6">
            <b-form-group
              :label="$t('message.user_legal_individual_choose')"
              :invalid-feedback="
                $t('message.user_legal_individual_choose') +
                ' - ' +
                $t('message.is_required')
              "
            >
              <b-form-radio-group
                v-model="submitData.type"
                :disabled="users.role != 4"
                class="mb-3"
                :options="type_options"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
              :label="label_name"
              :invalid-feedback="
                $t('message.user_legal_individual_choose') +
                ' - ' +
                $t('message.is_required')
              "
            >
              <b-form-input
                class="mb-2"
                label="title"
                :disabled="users.role != 4"
                v-model="submitData.full_name"
                :state="
                  $v.submitData.full_name.$dirty ? !$v.submitData.full_name.$error : null
                "
                :placeholder="placeholder_name"
              >
              </b-form-input>
            </b-form-group>
            <div class="row">
              <b-col md="6">
                <b-form-group
                  :label="$t('message.region')"
                  label-for="input-1"
                  :invalid-feedback="
                    $t('message.region') + ' - ' + $t('message.is_required')
                  "
                  :state="
                    $v.submitData.region.$dirty ? !$v.submitData.region.$error : null
                  "
                >
                  <v-select
                    v-model="submitData.region"
                    :disabled="users.role != 4"
                    :options="regions"
                    :reduce="(st) => st.id"
                    label="name"
                    required
                    :placeholder="$t('message.select_region')"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  :label="$t('message.city')"
                  :invalid-feedback="
                    $t('message.city') + ' - ' + $t('message.is_required')
                  "
                  :state="$v.submitData.city.$dirty ? !$v.submitData.city.$error : null"
                >
                  <v-select
                    v-model="submitData.city"
                    :disabled="users.role != 4"
                    :options="cities"
                    :reduce="(st) => st.id"
                    label="name"
                    required
                    :placeholder="$t('message.select_city')"
                  />
                </b-form-group>
              </b-col>
            </div>
            <b-form-group
              :label="$t('message.district')"
              :invalid-feedback="
                $t('message.district') + ' - ' + $t('message.is_required')
              "
            >
              <b-form-input
                class="mb-2"
                :disabled="users.role != 4"
                v-model="submitData.district"
                :state="
                  $v.submitData.district.$dirty ? !$v.submitData.district.$error : null
                "
                :placeholder="$t('message.enter_district')"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              :label="$t('message.address_applicant')"
              :invalid-feedback="
                $t('message.address_applicant') + ' - ' + $t('message.is_required')
              "
            >
              <b-form-input
                class="mb-2"
                :disabled="users.role != 4"
                v-model="submitData.address"
                :state="
                  $v.submitData.address.$dirty ? !$v.submitData.address.$error : null
                "
                :placeholder="$t('message.enter_address_applicant')"
              >
              </b-form-input>
            </b-form-group>
            <div class="row">
              <b-col md="6">
                <b-form-group
                  :label="$t('message.phone')"
                  :invalid-feedback="
                    $t('message.phone') + ' - ' + $t('message.is_required')
                  "
                >
                  <b-form-input
                    class="mb-2"
                    :disabled="users.role != 4"
                    v-model="submitData.phone"
                    :state="
                      $v.submitData.phone.$dirty ? !$v.submitData.phone.$error : null
                    "
                    :placeholder="$t('message.enter_applicant_phone')"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  :label="$t('message.email')"
                  :invalid-feedback="
                    $t('message.email') + ' - ' + $t('message.is_required')
                  "
                >
                  <b-form-input
                    :disabled="users.role != 4"
                    class="mb-2"
                    v-model="submitData.email"
                    :placeholder="$t('message.enter_applicant_email')"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </div>
          </b-col>
          <b-col md="6">
            <b-form-group
              :label="$t('message.application_title')"
              :invalid-feedback="
                $t('message.application_title') + ' - ' + $t('message.is_required')
              "
            >
              <b-form-input
                :disabled="users.role != 4"
                class="mb-2"
                label="title"
                v-model="submitData.title"
                :state="$v.submitData.title.$dirty ? !$v.submitData.title.$error : null"
                :placeholder="$t('message.enter_application_title')"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              :label="$t('message.application_description')"
              :invalid-feedback="
                $t('message.application_description') + ' - ' + $t('message.is_required')
              "
            >
              <b-form-textarea
                :disabled="users.role != 4"
                class="mb-2"
                label="title"
                v-model="submitData.description"
                :state="
                  $v.submitData.description.$dirty
                    ? !$v.submitData.description.$error
                    : null
                "
                placeholder=""
              >
              </b-form-textarea>
            </b-form-group>
            <b-form-group
              v-if="title_form != 'create'"
              :label="$t('message.control_type')"
              invalid-feedback="Type is required"
              :state="
                $v.submitData.type_upr.$dirty ? !$v.submitData.type_upr.$error : null
              "
            >
              <b-form-select
                class="mb-2"
                :value="null"
                :disabled="users.role == 4 || submitData.status == 2"
                v-model="submitData.type_upr"
                :options="{
                  '1': $t('message.edu_management'),
                  '2': $t('message.republican_administration'),
                  '3': $t('message.territorial_administration'),
                  '4': $t('message.press_secretaries'),
                }"
              >
                <option slot="first" :value="null">{{ $t("message.choose") }}</option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              v-if="title_form != 'create'"
              :label="$t('message.category')"
              invalid-feedback="Category is required"
              :state="
                $v.submitData.administration.$dirty
                  ? !$v.submitData.administration.$error
                  : null
              "
            >
              <v-select
                :disabled="users.role == 4 || submitData.status == 2"
                v-model="submitData.administration"
                :options="selected_adm"
                :reduce="(st) => st.id"
                :placeholder="$t('message.select_category')"
                label="name_ru"
              />
            </b-form-group>
            <div class="row" v-if="title_form != 'create'">
              <b-col md="6">
                <b-form-group
                  :label="$t('message.deadline')"
                  invalid-feedback="Deadline is required"
                >
                  <date-picker
                    v-model="submitData.deadline_date"
                    :config="config"
                    disabled="true"
                  ></date-picker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  :label="$t('message.deadline_time')"
                  invalid-feedback="Deadline is required"
                >
                  <date-picker
                    v-model="submitData.deadline_time"
                    :config="configTime"
                    disabled="true"
                  ></date-picker>
                </b-form-group>
              </b-col>
            </div>
            <b-form-group :label="$t('message.answer')" v-if="title_form != 'create'">
              <b-form-textarea
                :disabled="users.role == 4"
                class="mb-2"
                label="title"
                v-model="submitData.answer"
                placeholder=""
              >
              </b-form-textarea>
            </b-form-group>
            <b-form-group
              :label="$t('message.status')"
              label-for="input-1"
              v-if="title_form != 'create'"
            >
              <b-form-select
                class="mb-2"
                :value="null"
                v-model="submitData.status"
                :options="options_status"
                id="inline-form-custom-select-pref"
              >
                <option slot="first" :value="null">{{ $t("message.choose") }}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
              <div class="spinner sm spinner-primary pt-3 mr-4"></div>
            </div>
            <b-button
              type="submit"
              variant="primary"
              class="d-inline"
              :disabled="submitStatus === 'PENDING'"
              >{{ $t("message.submit") }}</b-button
            >
          </b-col>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import { postCallCenter, putCallCenter, getCallCenterId } from "../../api/call_center";
import { getCities } from "../../api/cities";
import { getRegions } from "../../api/regions";
import { getAdministration } from "../../api/management_edu";
import { getAdministration as getAdministrationRep } from "../../api/republican_administration";
import { getAdministration as getAdministrationTer } from "../../api/territorial_administration";
import { getPressSecretaries } from "../../api/press_secretaries";

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
const validateIf = (prop) =>
  helpers.withParams(
    {
      type: "validatedIf",
      prop,
    },
    function (value, parentVm) {
      return this.users.role === 4 ? false : true;
    }
  );

export default {
  metaInfo: {
    title: "Call-center Form",
  },
  components: {
    "v-select": VueSelect,
  },
  data() {
    return {
      title_form: "create",
      cities: [],
      submitStatus: null,
      submitData: {
        title: null,
        type: "INDIVIDUAL",
        type_upr: null,
        city: null,
        administration: null,
      },
      users: this.$store.getters.user,
      administration: null,
      selected_adm: [],
      type_options: [
        {
          item: "INDIVIDUAL",
          name: this.$t("message.individual"),
        },
        {
          item: "LEGAL",
          name: this.$t("message.legal"),
        },
      ],
      label_name: this.$t("message.full_name"),
      placeholder_name: this.$t("message.enter_full_name"),
      config: {
        format: "DD.MM.yyyy",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      configTime: {
        format: "HH:mm:ss",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      options_status: [
        {
          value: 1,
          text: this.$t("message.new_application"),
          disabled: false,
        },
        {
          value: 2,
          text: this.$t("message.checking"),
          disabled: false,
        },
        {
          value: 3,
          text: this.$t("message.closed"),
          disabled: false,
        },
      ],
      regions: [],
    };
  },
  validations: {
    submitData: {
      title: {
        required,
      },
      full_name: {
        required,
      },
      description: {
        required,
      },
      region: {
        required,
      },
      city: {
        required,
      },
      address: {
        required,
      },
      phone: {
        required,
      },
      administration: {
        required,
      },
      type_upr: {
        required,
      },
      district: {
        required,
      },
      answer: {
        required: validateIf("answer"),
      },
    },
  },
  watch: {
    "submitData.type": function (val) {
      if (val === "INDIVIDUAL") {
        this.label_name = this.$t("message.full_name");
        this.placeholder_name = this.$t("message.enter_full_name");
      } else {
        this.label_name = this.$t("message.company_name");
        this.placeholder_name = this.$t("message.enter_company_name");
      }
    },
    "submitData.type_upr": function (val) {
      val = val * 1;
      // this.submitData.administration = null
      switch (val) {
        case 1:
          getAdministration({
            limit: 1000,
          }).then((res) => {
            this.selected_adm = res.data.results;
          });
          break;
        case 2:
          getAdministrationRep({
            limit: 1000,
          }).then((res) => {
            this.selected_adm = res.data.results;
          });
          break;
        case 3:
          getAdministrationTer({
            limit: 1000,
          }).then((res) => {
            this.selected_adm = res.data.results;
          });
          break;
        case 4:
          getPressSecretaries({
            limit: 1000,
          }).then((res) => {
            this.selected_adm = res.data.results;
          });
          break;
      }
    },
    "submitData.region": function (val) {
      if (this.users.role == 4) this.submitData.city = null;
      getCities({
        region: val,
        limit: 1000,
      }).then((res) => {
        this.cities = res.data.results;
      });
    },
  },

  mounted() {
    this.fetchRegions();
    if (this.$route.params.id) {
      this.title_form = "edit";
      this.fetchDataId();
    }
    if (this.$store.getters.user.role != 3) this.options_status.splice(2, 1);
    else this.options_status.splice(1, 1);
  },
  methods: {
    fetchRegions() {
      getRegions({
        limit: 1000,
      }).then((res) => {
        this.regions = res.data.results;
      });
    },
    fetchDataId() {
      getCallCenterId(this.$route.params.id).then((res) => {
        // this.submitData.deadline = format(new Date(this.submitData.deadline_date), 'yyyy-MM-dd') + ' ' + format(new Date(this.submitData.deadline_time), 'HH:mm:ss')
        this.submitData = res.data;
        this.submitData.deadline_date = format(
          new Date(this.submitData.deadline),
          "dd.MM.yyyy"
        );
        this.submitData.deadline_time = format(
          new Date(this.submitData.deadline),
          "HH:mm:ss"
        );
        this.submitData.administration = res.data.administration.id;
        this.submitData.city = res.data.city.id;
        this.submitData.region = res.data.region.id;
      });
    },
    submit() {
      this.$v.submitData.$touch();

      this.submitStatus = "PENDING";
      if (this.$v.submitData.$anyError) {
        this.submitStatus = "ERROR";
      }
      this.submitData.city = this.submitData.city.id
        ? this.submitData.city.id
        : this.submitData.city;
      this.submitData.region = this.submitData.region.id
        ? this.submitData.region.id
        : this.submitData.region;
      if (this.$route.params.id) {
        putCallCenter(this.submitData, this.$route.params.id)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/call-center/index");
          })
          .catch((error) => {
            this.submitStatus = "ERROR";
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], "Failed");
            }
          });
      } else {
        postCallCenter(this.submitData)
          .then(() => {
            this.submitStatus = "OK";
            this.$router.push("/call-center/index");
          })
          .catch((error) => {
            this.submitStatus = "ERROR";
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], "Failed");
            }
          });
      }
    },
    makeToast(variant = null, msg, title) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style></style>
