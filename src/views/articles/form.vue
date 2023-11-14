<template>
  <div class="main-content">
    <breadcumb :page="'articles'" :folder="title_form" back="true" />
    <b-card class="card   mb-30" header-bg-variant="transparent ">
      <b-form @submit.prevent="submit">
        <b-tabs active-nav-item-class="nav nav-tabs" content-class="mt-3" v-model="tab">
          <b-tab title="RU" active>
            <b-form-group :label="$t('message.article_title_ru')" :invalid-feedback="$t('message.article_title_ru') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_ru" :state="$v.submitData.name_ru.$dirty ? !$v.submitData.name_ru.$error : null" :placeholder="$t('message.enter_name') ">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.article_description_ru')" :invalid-feedback="$t('message.article_description_ru') + ' - '+ $t('message.is_required')">
              <b-form-textarea class="mb-2" label="title" v-model="submitData.text_ru" :state="$v.submitData.text_ru.$dirty ? !$v.submitData.text_ru.$error : null" :placeholder="$t('message.enter_description')">
              </b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('message.site_link')" :invalid-feedback="$t('message.site_link') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.link_ru" :state="$v.submitData.link_ru.$dirty ? !$v.submitData.link_ru.$error : null" :placeholder="$t('message.enter_link') ">
              </b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="UZ" >
            <b-form-group :label="$t('message.article_title_uz')" :invalid-feedback="$t('message.article_title_uz') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_uz" :state="$v.submitData.name_uz.$dirty ? !$v.submitData.name_uz.$error : null" :placeholder="$t('message.enter_name')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.article_description_uz')" :invalid-feedback="$t('message.article_description_uz') + ' - '+ $t('message.is_required')">
              <b-form-textarea class="mb-2" label="title" v-model="submitData.text_uz" :state="$v.submitData.text_uz.$dirty ? !$v.submitData.text_uz.$error : null" :placeholder="$t('message.enter_description')">
              </b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('message.site_link')" :invalid-feedback="$t('message.site_link') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.link_uz" :state="$v.submitData.link_uz.$dirty ? !$v.submitData.link_uz.$error : null" :placeholder="$t('message.enter_link') ">
              </b-form-input>
            </b-form-group>
          </b-tab>
          <b-tab title="EN">
            <b-form-group :label="$t('message.article_title_en')" :invalid-feedback="$t('message.article_title_en') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.name_en" :state="$v.submitData.name_en.$dirty ? !$v.submitData.name_en.$error : null" :placeholder="$t('message.enter_name')">
              </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.article_description_en')" :invalid-feedback="$t('message.article_description_en') + ' - '+ $t('message.is_required')">
              <b-form-textarea class="mb-2" label="title" v-model="submitData.text_en" :state="$v.submitData.text_en.$dirty ? !$v.submitData.text_en.$error : null" :placeholder="$t('message.enter_description')">
              </b-form-textarea>
            </b-form-group>
            <b-form-group :label="$t('message.site_link')" :invalid-feedback="$t('message.site_link') + ' - '+ $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.link_en" :state="$v.submitData.link_en.$dirty ? !$v.submitData.link_en.$error : null" :placeholder="$t('message.enter_link') ">
              </b-form-input>
            </b-form-group>
          </b-tab>
        </b-tabs>
        <div class="separator-breadcrumb border-top"></div>
        <div class="row px-4">
          <b-col md="6">
            <b-form-group :label="$t('message.control_type')" label-for="input-1"  :invalid-feedback="$t('message.control_type') + ' - '+ $t('message.is_required')" :state="$v.submitData.type_upr.$dirty ? !$v.submitData.type_upr.$error : null">
              <b-form-select class="mb-2" :value="null" v-model="submitData.type_upr" :disabled="users.role != 3 && users.type" :options="{ '1': 'Управление МНО', '2': 'Республиканское управление', '3': 'Территориальное управление' , '4': 'Пресс-секретари' }" id="inline-form-custom-select-pref">
                <option slot="first" :value="null">{{$t('message.choose')}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('message.management_category')" :invalid-feedback="$t('message.management_category') + ' - '+ $t('message.is_required')"  :state="$v.submitData.administration.$dirty ? !$v.submitData.administration.$error : null">
              <v-select v-model="submitData.administration" :options="selected_adm" :reduce="st => st.id" label="name_ru" :disabled="users.role != 3 && users.administration" required :placeholder="$t('message.select_category')" />
            </b-form-group>
          </b-col>
        </div>
  
        <b-col class="text-right">
          <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
            <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
          </div>
          <b-button type="submit" variant="primary" class="d-inline " :disabled="submitStatus === 'PENDING'">{{$t('message.submit')}}</b-button>
        </b-col>
      </b-form>
    </b-card>
  </div>
  </template>
  
  <script>
  import {
    postArticles,
    getArticlesId,
    putArticles
  } from '../../api/articles'
  
  import {
    getAdministration
  } from '../../api/management_edu'
  import {
    getAdministration as getAdministrationRep
  } from '../../api/republican_administration'
  import {
    getAdministration as getAdministrationTer
  } from '../../api/territorial_administration'
  import {
    getPressSecretaries
  } from '../../api/press_secretaries'
  
  import {
    required,
    minLength,
    helpers
  } from "vuelidate/lib/validators";
  import VueSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  const validateIf = (prop) =>
      helpers.withParams({
          type: 'validatedIf',
          prop
      }, function (value, parentVm) {
        let arr = prop.split('_')
        let lang = arr[1]
          if (!helpers.ref('name_uz', this, parentVm) && !helpers.ref('name_ru', this, parentVm) && !helpers.ref('name_en', this, parentVm))  {
            return false
          }
          return helpers.ref('name_'+lang, this, parentVm) && !helpers.ref(prop, this, parentVm) ? false : true
      })
  export default {
    components: {
      'v-select': VueSelect
    },
    data() {
      return {
        submitData: {
          name_uz: null,
          text_uz: null,
          name_ru: null,
          text_ru: null,
          name_en: null,
          text_en: null,
          link_uz: null,
          link_ru: null,
          link_en: null,
          administration: null,
          type_upr: null
        },
        submitStatus: null,
        selected_adm: [],
        tab: null,
        users: this.$store.getters.user,
        title_form: 'create'
      }
    },
    validations: {
      submitData: {
        name_uz: {
          required: validateIf('name_uz')
        },
        text_uz: {
          required: validateIf('text_uz')
        },
        link_uz: {
          required: validateIf('link_uz')
        },
        name_ru: {
          required: validateIf('name_ru')
        },
        text_ru: {
          required: validateIf('text_ru')
        },
        link_ru: {
          required: validateIf('link_ru')
        },
        name_en: {
          required: validateIf('name_en')
        },
        text_en: {
          required: validateIf('text_en')
        },
        link_en: {
          required: validateIf('link_en')
        },
        type_upr: {
          required
        },
        administration: {
          required
        }
      }
    },
    watch: {
      "submitData.type_upr": function (val) {
        val = val * 1
        // this.submitData.administration = null
        switch (val) {
          case 1:
            getAdministration({
              limit: 1000
            }).then(res => {
              this.selected_adm = res.data.results
            })
            break
          case 2:
            getAdministrationRep({
              limit: 1000
            }).then(res => {
              this.selected_adm = res.data.results
            })
            break
          case 3:
            getAdministrationTer({
              limit: 1000
            }).then(res => {
              this.selected_adm = res.data.results
            })
            break
          case 4:
            getPressSecretaries({
              limit: 1000
            }).then(res => {
              this.selected_adm = res.data.results
            })
            break
        }
      }
    },
    mounted() {
      this.submitData.type_upr = this.users.type
      this.submitData.administration = this.users.administration
      if (this.$route.params.id) {
        this.title_form = 'edit'
        this.fetchDataId()
      }
    },
    methods: {
      submit() {
        this.$v.submitData.$touch()
  
        let lang = ['ru', 'uz', 'en'];
        this.submitStatus = 'PENDING'
  
        if (this.$v.submitData.$anyError) {
          this.submitStatus = 'ERROR'
          lang.forEach(val => {
            if (val === 'ru' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 0
            if (val === 'uz' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 1
            if (val === 'en' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 2
          })
          
          return
        }
  
        if (this.$route.params.id) {
          putArticles(this.submitData, this.$route.params.id).then(() => {
            this.submitStatus = 'OK'
            this.$router.push("/articles/index");
          }).catch(error => {
            this.submitStatus = 'ERROR'
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], k, 'error');
  
            }
          })
        } else {
          postArticles(this.submitData).then(() => {
            this.submitStatus = 'OK'
            this.$router.push("/articles/index");
          }).catch(error => {
            this.submitStatus = 'ERROR'
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], k, 'error');
            }
          })
        }
      },
      fetchDataId() {
        getArticlesId(this.$route.params.id).then(res => {
          this.submitData = res.data
          this.submitData.type_upr = res.data.type_upr
          this.submitData.administration = res.data.administration.id
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
  }
  </script>
  