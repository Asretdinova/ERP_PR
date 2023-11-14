<template>
  <div class="main-content">
    <breadcumb :page="'edu_management'" :folder="title_form" back="true" />
    <b-card class="wrapper">
      <b-form @submit.prevent="submit">
        <div class="row">
          <b-col md="6">
            <b-form-group :label="$t('message.management_name_ru')"
              :invalid-feedback="$t('message.management_name_ru') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_ru"
                :state="$v.submitData.name_ru.$dirty ? !$v.submitData.name_ru.$error : null"
                :placeholder="$t('message.enter_management_name')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.management_name_uz')"
              :invalid-feedback="$t('message.management_name_uz') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_uz"
                :state="$v.submitData.name_uz.$dirty ? !$v.submitData.name_uz.$error : null"
                :placeholder="$t('message.enter_management_name')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.management_name_en')"
              :invalid-feedback="$t('message.management_name_en') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_en"
                :state="$v.submitData.name_en.$dirty ? !$v.submitData.name_en.$error : null"
                :placeholder="$t('message.enter_management_name')">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('message.email')"
              :invalid-feedback="$t('message.email') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.email"
                :state="$v.submitData.email.$dirty ? !$v.submitData.email.$error : null"
                :placeholder="$t('message.enter_management_email')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.phone_number')"
              :invalid-feedback="$t('message.phone_number') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.phone" v-mask="['(+998) ##-###-##-##']"
                :state="$v.submitData.phone.$dirty ? !$v.submitData.phone.$error : null"
                :placeholder="$t('message.enter_management_phone')">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col class="text-right">
            <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
              <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
            </div>
            <b-button type="submit" variant="primary" class="d-inline " :disabled="submitStatus === 'PENDING'">
              {{ $t('message.submit') }}</b-button>
          </b-col>
        </div>
      </b-form>
    </b-card>
    <b-card class="wrapper mt-4" v-if="this.$route.params.id">
      <h3 class="pb-3">Ответственный</h3>
      <vue-good-table :columns="columns" styleClass="tableOne vgt-table" :rows="submitData.members">
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email
} from "vuelidate/lib/validators";
import {
  postAdministration,
  putAdministration,
  getAdministrationId
} from '../../api/management_edu'
import {
  getUsersList
} from '../../api/user'
import {
  mapGetters
} from "vuex";

export default {
  metaInfo: {
    title: "Management Form"
  },
  data() {
    return {
      submitStatus: null,
      submitData: {
        name_uz: null,
        name_ru: null,
        name_en: null,
        phone: null,
        email: null,
        type: 1
      },
      columns: [{
        label: "ID",
        field: "id"
      },
      {
        label: "Логин",
        field: "username",
      },
      {
        label: "ФИО",
        field: function (val) {
          return val.first_name + ' ' + val.last_name
        },
      },
      {
        label: "Эмаил",
        field: "email",
      },
      {
        label: "Телефон номер",
        field: "phone",
      },
      {
        label: "Роль",
        field: function (val) {
          var users_role = [{
            id: 1,
            name: 'Пользователь'
          },
          {
            id: 2,
            name: 'Модератор'
          },
          {
            id: 3,
            name: 'Админ'
          }
          ]
          var d = users_role.filter(k => k.id === val.role)
          return (d.length) ? d[0].name : ''
        },
      }
      ],
      rows: [],
      users: [],
      title_form: 'create'
    };
  },
  validations: {
    submitData: {
      name_uz: {
        required
      },
      name_ru: {
        required
      },
      name_en: {
        required
      },
      phone: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchDataId()
      this.title_form = 'edit'
    }
  },
  methods: {
    submit() {
      this.$v.submitData.$touch()

      if (this.$v.submitData.$anyError) {
        return
      }
      this.submitStatus = 'PENDING'
      this.$delete(this.submitData, 'members')
      if (this.$route.params.id) {
        putAdministration(this.submitData, this.$route.params.id).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/management-edu/index");
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      } else {
        postAdministration(this.submitData).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/management-edu/index");
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      }
    },
    fetchDataId() {
      getAdministrationId(this.$route.params.id).then(res => {
        this.submitData = res.data
      })
    },
    makeToast(variant = null, msg, variable, title) {
      var replaced = msg[0].split(' ').join('_');
      replaced = replaced.split('.').join('');
      this.$bvToast.toast(this.$t('message.' + variable) + ' - ' + this.$t('message.' + replaced), {
        title: this.$t('message.' + title),
        variant: variant,
        solid: true
      });
    }
  }
};
</script>

<style>
</style>
