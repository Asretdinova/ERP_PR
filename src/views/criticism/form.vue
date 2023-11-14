<template>
  <div class="main-content">
    <breadcumb :page="'criticism'" :folder="title_form" back="true" />
    <b-card class="wrapper">
      <b-form @submit.prevent="submit">
        <div class="row">
          <b-col md="6">
            <b-form-group :label="$t('message.title')" :disabled="users.role != 3" :invalid-feedback="$t('message.title') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" :placeholder="$t('message.enter_criticism_title')"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.description_criticism')" :disabled="users.role != 3" :invalid-feedback="$t('message.description_criticism') + ' - ' + $t('message.is_required')">
              <b-form-textarea class="mb-2" style="height: 150px" label="title" v-model="submitData.description" :state="$v.submitData.description.$dirty ? !$v.submitData.description.$error : null" :placeholder="$t('message.enter_criticism_description')"></b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('message.source')" :disabled="users.role != 3" :invalid-feedback="$t('message.source') + ' - ' + $t('message.is_required')">
              <b-input-group size="sm" class="mb-3">
                <b-form-input type="url" class="mb-2" v-model="submitData.src" placeholder="https://... or http://... " :disabled="src_change && title_form === 'edit'" :state="$v.submitData.src.$dirty ? !$v.submitData.src.$error : null"></b-form-input>
                <b-input-group-append>
                  <b-button size="sm" style="height: 82%; border: 1px solid" variant="outline-blue " :href="submitData.src" target="_blank">
                    <i class="i-Eye text-25 mr-2"></i>
                  </b-button>

                  <b-button size="sm" style="height: 82%; border: 1px solid" variant="outline-success" @click="src_change = !src_change">
                    <i class="i-Eraser-2 text-25 mr-2"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group :label="$t('message.file')" :invalid-feedback="$t('message.file') + ' - ' + $t('message.max_file_size')" :state="$v.submitData.file.$dirty ? !$v.submitData.file.$error : null">
              <b-input-group>
                <b-form-file v-if="!submitData.file || submitData.file.name" v-model="submitData.file" :state="$v.submitData.file.$dirty ? !$v.submitData.file.$error : null" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
                <b v-if="submitData.file && !submitData.file.name">{{ $t("message.click_to_download_button") }}</b>
                <b-input-group-append class="pl-2">
                  <b-button variant="info" :href="submitData.file" v-if="submitData.file && !submitData.file.name" target="_blank" download="filename">Download</b-button>
                  <b-button variant="danger" v-if="submitData.file" @click="submitData.file = null">Remove</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group :label="$t('message.region')" :invalid-feedback="$t('message.region') + ' - ' + $t('message.is_required')">
              <v-select v-model="submitData.region" :options="regions" :reduce="(st) => st.id" label="name" required :placeholder="$t('message.select_region')" />
            </b-form-group>
            <div class="row">
              <b-col md="6">
                <b-form-group :label="$t('message.deadline')" :invalid-feedback="$t('message.deadline') + ' - ' + $t('message.is_required')" :state="$v.submitData.deadline_date.$dirty ? !$v.submitData.deadline_date.$error : null">
                  <date-picker v-model="submitData.deadline_date" :config="config" :disabled="users.role != 3"></date-picker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group :label="$t('message.deadline_time')" :invalid-feedback="$t('message.deadline_time') + ' - ' + $t('message.is_required')" :state="$v.submitData.deadline_time.$dirty ? !$v.submitData.deadline_time.$error : null">
                  <date-picker v-model="submitData.deadline_time" :config="configTime" :disabled="users.role != 3"></date-picker>
                </b-form-group>
              </b-col>
            </div>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('message.control_type')" :invalid-feedback="$t('message.control_type') + ' - ' + $t('message.is_required')" :state="$v.administration.$dirty ? !$v.administration.$error : null" label-for="input-1">
              <b-form-select
                :disabled="users.role != 3"
                class="mb-2"
                :value="null"
                v-model="administration"
                :options="{
                  '1': $t('message.edu_management'),
                  '2': $t('message.republican_administration'),
                  '3': $t('message.territorial_administration'),
                  '4': $t('message.press_secretaries'),
                }"
                id="inline-form-custom-select-pref"
              >
                <option slot="first" :value="null">{{ $t("message.choose") }}</option>
              </b-form-select>
            </b-form-group>
            <b-form-group :label="$t('message.category')" label-for="input-1" :invalid-feedback="$t('message.category') + ' - ' + $t('message.is_required')" :state="$v.submitData.administration.$dirty ? !$v.submitData.administration.$error : null">
              <v-select v-model="submitData.administration" :options="selected_adm" :reduce="(st) => st.id" label="name_uz" required :disabled="users.role != 3" :placeholder="$t('message.select_category')" />
            </b-form-group>
            <b-form-group :label="$t('message.type')" :invalid-feedback="$t('message.type') + ' - ' + $t('message.is_required')" :state="$v.submitData.type.$dirty ? !$v.submitData.type.$error : null">
              <v-select v-model="submitData.type" :options="cr_type" :reduce="(st) => st.id" label="name" :placeholder="$t('message.select_type')" />
            </b-form-group>
            <div v-if="users.role != 3 || submitData.status != 1 || submitData.fix_status == 3">
              <b-form-group :label="$t('message.ans_file')" :invalid-feedback="$t('message.ans_file') + ' - ' + $t('message.max_file_size')" :state="$v.submitData.type.$dirty ? !$v.submitData.type.$error : null">
                <b-input-group>
                  <b-form-file
                    v-if="!submitData.ans_file || submitData.ans_file.name"
                    :disabled="users.role === 3 || submitData.status === 3"
                    :state="$v.submitData.ans_file.$dirty ? !$v.submitData.ans_file.$error : null"
                    v-model="submitData.ans_file"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                  <b v-if="submitData.ans_file && !submitData.ans_file.name">{{ $t("message.click_to_download_button") }}</b>
                  <b-input-group-append class="pl-2">
                    <b-button variant="info" :href="submitData.ans_file" v-if="submitData.ans_file && !submitData.ans_file.name" target="_blank" download="filename">Download</b-button>
                    <b-button variant="danger" v-if="submitData.ans_file" :disabled="users.role === 3 || submitData.status === 3" @click="submitData.ans_file = null">Remove</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group :label="$t('message.criticism_response')">
                <b-form-textarea class="mb-2" style="height: 150px" label="title" :disabled="users.role === 3 || submitData.status === 3" v-model="submitData.answer" placeholder=""></b-form-textarea>
              </b-form-group>
              <b-form-group v-if="users.role != 3 || submitData.status != 1 || submitData.fix_status == 3" :label="$t('message.criticism_link')">
                <b-form-input class="mb-2" :disabled="users.role === 3 || submitData.status === 3" label="title" v-model="submitData.answer_url" :placeholder="$t('message.enter_link')"></b-form-input>
              </b-form-group>
            </div>
          </b-col>
          <b-col class="text-right">
            <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
              <div class="spinner sm spinner-primary pt-3 mr-4"></div>
            </div>
            <!-- <b-button v-if=" users.role == 3" type="submit" variant="primary" class="d-inline " :disabled="submitStatus === 'PENDING'">{{$t('message.submit')}}</b-button> -->
            <b-button variant="primary" class="d-inline" @click="$router.go(-1)">{{ $t("message.back") }}</b-button>
            <div class="btn-group" role="group">
              <b-button v-for="(val, index) in options_status" type="submit" :variant="submitData.status == val.value ? 'primary m-1' : 'outline-primary m-1'" v-bind:key="index" @click="submitData.status = val.value" v-if="!val.disabled" :disabled="val.disabled">{{ val.text }}</b-button>
            </div>
          </b-col>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { postCritics, getCriticsId, putCritics } from "../../api/critics";
import { getAdministration } from "../../api/management_edu";
import { getAdministration as getAdministrationRep } from "../../api/republican_administration";
import { getAdministration as getAdministrationTer } from "../../api/territorial_administration";
import { getPressSecretaries } from "../../api/press_secretaries";
import { getRegions } from "../../api/regions";
import { getCriticsType } from "../../api/critics";
import { required, helpers } from "vuelidate/lib/validators";

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { format } from "date-fns";

const isValidFileSize = (value, vm) => {
  if (!value || !value.size) {
    return true;
  }
  console.log(value);
  let file = value;
  return file.size < 6291456;
};

export default {
  metaInfo: {
    title: "Media Form",
  },
  components: {
    "v-select": VueSelect,
  },

  data() {
    return {
      submitStatus: null,
      submitData: {
        type_upr: 1,
        status: 1,
        region: null,
        answer: "",
        answer_url: "",
      },
      administration: null,
      selected_adm: [],
      users: this.$store.getters.user,
      options_status: [
        {
          value: 1,
          text: this.$t("message.in_work"),
          disabled: false,
        },
        {
          value: 2,
          text: this.$t("message.on_check"),
          disabled: true,
        },
        {
          value: 3,
          text: this.$t("message.approved"),
          disabled: true,
        },
      ],
      title_form: "create",
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
      regions: [],
      cities: [],
      src_change: true,
      cr_type: [],
    };
  },
  validations: {
    submitData: {
      name: {
        required,
      },
      description: {
        required,
      },
      src: {
        required,
      },
      administration: {
        required,
      },
      deadline_date: {
        required,
      },
      deadline_time: {
        required,
      },
      type: {
        required,
      },
      file: {
        isValidFileSize,
      },
      ans_file: {
        isValidFileSize,
      },
    },
    administration: {
      required,
    },
  },
  watch: {
    administration(val) {
      val = val * 1;
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
  },
  mounted() {
    this.fetchRegions();
    this.fetchCriticsType();
    if (this.$route.params.id) {
      this.fetchDataId();
      this.title_form = "edit";
    }
  },
  methods: {
    fetchRegions() {
      getRegions({
        limit: 1000,
      }).then((res) => {
        this.regions = res.data.results;
      });
    },
    fetchCriticsType() {
      getCriticsType({
        limit: 1000,
      }).then((res) => {
        this.cr_type = res.data.results;
      });
    },
    submit(status = 1) {
      this.$v.submitData.$touch();
      this.$v.administration.$touch();
      this.submitStatus = "PENDING";
      if (!this.$v.submitData.$anyError && !this.$v.administration.$anyError) {
        this.submitData.region = this.submitData.region && this.submitData.region.id ? this.submitData.region.id : this.submitData.region;
        var dateParts = this.submitData.deadline_date.split(".");

        this.submitData.deadline = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0] + " " + this.submitData.deadline_time;

        let formData = new FormData();
        formData.append("name", this.submitData.name);
        formData.append("description", this.submitData.description);
        formData.append("src", this.submitData.src);
        formData.append("region", this.submitData.region);
        formData.append("administration", this.submitData.administration);
        formData.append("deadline", this.submitData.deadline);
        formData.append("type_upr", this.submitData.type_upr);
        formData.append("type", this.submitData.type);
        if (this.submitData.file && this.submitData.file["name"]) {
          formData.append("file", this.submitData.file);
        }
        if (this.submitData.ans_file && this.submitData.ans_file.name) {
          formData.append("ans_file", this.submitData.ans_file);
        }
        formData.append("answer", this.submitData.answer);
        formData.append("answer_url", this.submitData.answer_url);
        formData.append("status", this.submitData.status);

        if (this.$route.params.id) {
          putCritics(formData, this.$route.params.id)
            .then(() => {
              this.submitStatus = "OK";
              this.$router.push("/criticism/index");
            })
            .catch((error) => {
              this.submitStatus = "ERROR";
              for (var k in error.response.data) {
                this.makeToast("danger", error.response.data[k], k, "error");
              }
            });
        } else {
          postCritics(formData)
            .then(() => {
              this.submitStatus = "OK";
              this.$router.push("/criticism/index");
            })
            .catch((error) => {
              this.submitStatus = "ERROR";
              for (var k in error.response.data) {
                this.makeToast("danger", error.response.data[k], k, "error");
              }
            });
        }
      } else {
        this.submitStatus = "ERROR";
      }
    },
    fetchDataId() {
      getCriticsId(this.$route.params.id).then((res) => {
        this.submitData = res.data;
        this.options_status[0]["disabled"] = (this.$store.getters.user.role === 3 && this.submitData.status != 2) || this.$store.getters.user.role != 3;
        this.options_status[1]["disabled"] = this.$store.getters.user.role === 3 || (this.$store.getters.user.role != 3 && this.submitData.status != 1);
        this.options_status[2]["disabled"] = this.$store.getters.user.role != 3 || this.submitData.status != 2;
        this.submitData.deadline_date = format(new Date(this.submitData.deadline), "dd.MM.yyyy");
        this.submitData.deadline_time = format(new Date(this.submitData.deadline), "HH:mm:ss");
        this.submitData.administration = res.data.administration.id;
        this.administration = res.data.type_upr;
        this.submitData.fix_status = res.data.status;
        if (res.data.file) {
          let file = res.data.file.split("uploads/");
          this.submitData.file = "https://" + window.location.hostname + "/uploads/" + file[1];
          this.submitData.file_name = file[1];
        }
        if (res.data.ans_file) {
          let ans_file = res.data.ans_file.split("uploads/");
          this.submitData.ans_file = "https://" + window.location.hostname + "/uploads/" + ans_file[1];
          this.submitData.ans_file.name = ans_file[1];
        }
        // this.options_status[0]['disabled'] = (this.$store.getters.user.role === 3 && this.submitData.status === 2) || this.$store.getters.user.role != 3
        // this.options_status[1]['disabled'] = (this.$store.getters.user.role === 3) || (this.$store.getters.user.role != 3 && this.submitData.status == 1)
        // this.options_status[2]['disabled'] = (this.$store.getters.user.role === 3 && this.submitData.status != 2) || this.$store.getters.user.role != 3
      });
    },
    makeToast(variant = null, msg, variable, title) {
      var replaced = msg[0].split(" ").join("_");
      replaced = replaced.split(".").join("");
      this.$bvToast.toast(this.$t("message." + variable) + " - " + this.$t("message." + replaced), {
        title: this.$t("message." + title),
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style></style>
