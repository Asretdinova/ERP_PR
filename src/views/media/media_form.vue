<template>
<div class="main-content">
  <breadcumb :page="'media'" :folder="title_form" back="true" />
  <b-card class="wrapper">
    <b-form @submit.stop.prevent="submit">
      <div class="row">
        <b-col md="6">
          <b-form-group :label="$t('message.title')" :invalid-feedback="$t('message.title') + ' - '+ $t('message.is_required')">
            <b-form-input class="mb-2" label="title" v-model="submitData.name" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" :placeholder="$t('message.enter_name_media')">
            </b-form-input>
          </b-form-group>
          <b-form-group :label="$t('message.description')" :invalid-feedback="$t('message.description') + ' - '+ $t('message.is_required')">
            <b-form-textarea class="mb-2" label="title" v-model="submitData.description" :state="$v.submitData.description.$dirty ? !$v.submitData.description.$error : null" :placeholder="$t('message.enter_description_media')">
            </b-form-textarea>
          </b-form-group>
          <b-form-group :label="$t('message.address')" invalid-feedback="Address is required">
            <b-form-input class="mb-2" label="title" v-model="submitData.address" :state="$v.submitData.address.$dirty ? !$v.submitData.address.$error : null" :placeholder="$t('message.enter_address_media')">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="input-group-1" :label="$t('message.select_media_type')" :state="$v.submitData.type.$dirty ? !$v.submitData.type.$error : null" invalid-feedback="Type is required">
            <v-select v-model="submitData.type" :options="mediaType" :reduce="st => st.id" label="name" required placeholder="Please select the Type" />
          </b-form-group>
          <b-form-group :label="$t('message.email')" invalid-feedback="Address is required">
            <b-form-input class="mb-2" label="title" v-model="submitData.email" :state="$v.submitData.email.$dirty ? !$v.submitData.email.$error : null" :placeholder="$t('message.enter_email_media')">
            </b-form-input>
          </b-form-group>
          <b-form-group :label="$t('message.name_editor_in_chief')">
            <b-form-input class="mb-2" label="title" v-model="submitData.director" :state="$v.submitData.director.$dirty ? !$v.submitData.director.$error : null" :placeholder="$t('message.enter_full_name')">
            </b-form-input>
          </b-form-group>
          <b-form-group :label="$t('message.phone_number')">
            <b-form-input class="mb-2" label="title" v-model="submitData.contact"   v-mask="['(+998) ##-###-##-##']" :state="$v.submitData.contact.$dirty ? !$v.submitData.contact.$error : null" :placeholder="$t('message.enter_contact_media')">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="text-right">
          <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
            <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
          </div>
          <b-button type="submit" variant="primary" class="d-inline " :disabled="submitStatus === 'PENDING'">{{$t('message.submit')}}</b-button>
        </b-col>
      </div>
    </b-form>
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
  postMedia,
  getMediaId,
  putMedia,
  getMediaType
} from "../../api/media";
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";
export default {
  metaInfo: {
    title: "Media Form"
  },
  components: {
    vSelect
  },
  data() {
    return {
      submitStatus: null,
      submitData: {
        name: null,
        description: null,
        address: null,
        contact: null,
        email: null,
        director: null,
        type: 1
      },
      mediaType: [],
      title_form: 'create'
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
      address: {
        required,
      },
      email: {
        required,
        email
      },
      director: {
        required
      },
      contact: {
        required
      },
      type: {
        required
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchDataId()
      this.title_form = 'edit'
    }
    this.fetchMediaType()
  },
  methods: {
    submit() {
      this.$v.submitData.$touch()
      if (this.$v.submitData.$anyError) {
        return
      }
      this.submitStatus = 'PENDING'

      if (this.$route.params.id) {
        putMedia(this.submitData, this.$route.params.id).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/media/index");
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      } else {
        postMedia(this.submitData).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/media/index");
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      }
    },
    fetchDataId() {
      getMediaId(this.$route.params.id).then(res => {
        this.submitData = res.data
      })
    },
    fetchMediaType() {
      getMediaType({
        limit: 1000
      }).then(res => {
        this.mediaType = res.data.results
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
