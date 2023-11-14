<template>
<div class="main-content">
  <breadcumb :page="'media_publications'" :folder="title_form" back="true" />
  <b-form @submit.prevent="submit" enctype="multipart/form-data" ref="form">
    <div class="row">
      <b-col md="8">
        <b-card class="wrapper">
          <b-tabs active-nav-i tem-class="nav nav-tabs" content-class="mt-3" v-model="tab">
            <b-tab title="RU" active>
              <b-form-group :label="$t('message.title_ru')" :invalid-feedback="$t('message.title_ru') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.name_ru" :state="$v.submitData.name_ru.$dirty ? !$v.submitData.name_ru.$error : null" :placeholder="$t('message.enter_publication_title')">
                </b-form-input>
              </b-form-group>
              <b-form-group :label="$t('message.text_ru')" :invalid-feedback="$t('message.text_ru') + ' - '+ $t('message.is_required')">
                <b-form-textarea class="mb-2" label="title" v-model="submitData.text_ru" :state="$v.submitData.text_ru.$dirty ? !$v.submitData.text_ru.$error : null">
                </b-form-textarea>
              </b-form-group>

              <b-form-group :label="$t('message.link_ru') " :invalid-feedback="$t('message.link_ru') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.link_ru" :state="$v.submitData.link_ru.$dirty ? !$v.submitData.link_ru.$error : null" :placeholder="$t('message.enter_link')">
                </b-form-input>
              </b-form-group>
            </b-tab>
            <b-tab title="UZ">

              <b-form-group :label="$t('message.title_uz')" :invalid-feedback="$t('message.title_uz') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.name_uz" :state="$v.submitData.name_uz.$dirty ? !$v.submitData.name_uz.$error : null" :placeholder="$t('message.enter_publication_title')">
                </b-form-input>
              </b-form-group>
              <b-form-group :label="$t('message.text_uz')" :invalid-feedback="$t('message.text_uz') + ' - '+ $t('message.is_required')">
                <b-form-textarea class="mb-2"  v-model="submitData.text_uz" :state="$v.submitData.text_uz.$dirty ? !$v.submitData.text_uz.$error : null">
                </b-form-textarea>
              </b-form-group>

              <b-form-group :label="$t('message.link_uz')" :invalid-feedback="$t('message.link_uz') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.link_uz" :state="$v.submitData.link_uz.$dirty ? !$v.submitData.link_uz.$error : null" :placeholder="$t('message.enter_link')">
                </b-form-input>
              </b-form-group>
            </b-tab>
            <b-tab title="EN">

              <b-form-group :label="$t('message.title_en')" :invalid-feedback="$t('message.title_en') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.name_en" :state="$v.submitData.name_en.$dirty ? !$v.submitData.name_en.$error : null" :placeholder="$t('message.enter_publication_title')">
                </b-form-input>
              </b-form-group>
              <b-form-group :label="$t('message.text_en')" :invalid-feedback="$t('message.text_en') + ' - '+ $t('message.is_required')">
                <b-form-textarea class="mb-2" label="title" v-model="submitData.text_en" :state="$v.submitData.text_en.$dirty ? !$v.submitData.text_en.$error : null">
                </b-form-textarea>
              </b-form-group>

              <b-form-group :label="$t('message.link_en')" :invalid-feedback="$t('message.link_en') + ' - '+ $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.link_en" :state="$v.submitData.link_en.$dirty ? !$v.submitData.link_en.$error : null" :placeholder="$t('message.enter_link')">
                </b-form-input>
              </b-form-group>
            </b-tab>

          </b-tabs>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card class="wrapper">
          <b-form-group :label="$t('message.source_media')" :invalid-feedback="$t('message.source_media') + ' - '+ $t('message.is_required')" label-for="input-1" :state="$v.submitData.media.$dirty ? !$v.submitData.media.$error : null">
            <v-select v-model="submitData.media" :options="media" :reduce="st => st.id" label="name" required :placeholder="$t('message.select_media')" />
          </b-form-group>
          <b-form-group :label="$t('message.journalist')" :invalid-feedback="$t('message.journalist') + ' - '+ $t('message.is_required')" :state="$v.submitData.journalist.$dirty ? !$v.submitData.journalist.$error : null" label-for="input-1">
            <v-select v-model="submitData.journalist" :options="journalists" :reduce="st => st.id" label="fio" required :placeholder="$t('message.select_journalist')" />
          </b-form-group>
          <div class="row">
            <b-col lg="6">
              <b-form-group :label="$t('message.date_publication_media')" :invalid-feedback="$t('message.date_publication_media') + ' - '+ $t('message.is_required')" :state="$v.submitData.date.$dirty ? !$v.submitData.date.$error : null">
                <date-picker v-model="submitData.date" :config="config"></date-picker>
              </b-form-group>
            </b-col>
            <b-col lg="6">
              <b-form-group :label="$t('message.time_publication_media')" :invalid-feedback="$t('message.time_publication_media') + ' - '+ $t('message.is_required')" :state="$v.submitData.publish_time.$dirty ? !$v.submitData.publish_time.$error : null">
                <date-picker v-model="submitData.publish_time" :config="configTime"></date-picker>
              </b-form-group>
            </b-col>
          </div>

          <b-form-group :label="$t('message.article_type')"  :invalid-feedback="$t('message.article_type') + ' - '+ $t('message.is_required')" :state="$v.submitData.type.$dirty ? !$v.submitData.type.$error : null">
            <b-form-select class="mb-2" v-model="submitData.type" :value="null" :options="{ '1': this.$t('message.author_s'), '2': this.$t('message.press_release') }" id="inline-form-custom-select-pref">
              <option slot="first" :value="null">{{$t('message.choose')}}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group id="input-group-1" :label="$t('message.media_publication_status')" :invalid-feedback="$t('message.media_publication_status') + ' - '+ $t('message.is_required')" label-for="input-1" :state="$v.submitData.status.$dirty ? !$v.submitData.status.$error : null">
            <b-form-select class="mb-2" v-model="submitData.status" :value="null" :options="{ '1': $t('message.positive'), '0': $t('message.neutral'), '-1': $t('message.negative') }" id="inline-form-custom-select-pref">
              <option slot="first" :value="null">{{$t('message.choose')}}</option>
            </b-form-select>
          </b-form-group>
        </b-card>
      </b-col>
    </div>
    <div class="row">
      <b-col md="8">
        <b-card class="wrapper mt-2">
          <b-form-group :label="$t('message.photo')" :invalid-feedback="$t('message.photo') + ' - '+ $t('message.is_required')">
            <vue-upload-multiple-image @upload-success="uploadImageSuccess" @before-remove="beforeRemove" @edit-image="editImage" :data-images="photos" :dragText="$t('message.select_photo')" :browseText="$t('message.for_loading')" :primaryText="$t('message.default')" :popupText="$t('message.display_image_default')" :markIsPrimaryText="$t('message.set_default')"></vue-upload-multiple-image>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card class="wrapper mt-2">
          <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
            <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
          </div>
          <b-button type="submit" variant="primary" class="d-inline " :disabled="submitStatus === 'PENDING'">{{$t('message.submit')}}</b-button>
        </b-card>
      </b-col>
    </div>
  </b-form>
</div>
</template>

<script>
import {
  postPublications,
  getPublicationsId,
  putPublications,
  postPublicationPhotos,
  deletePublicationPhotos,
  putPublicationPhotos
} from '../../api/publications'
import {
  getMedia
} from '../../api/media'
import {
  getJournalists
} from '../../api/journalists'
import {
  format
} from 'date-fns';
import {
  required,
  helpers
} from "vuelidate/lib/validators";
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import vSelect from 'vue-select'
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
    VueUploadMultipleImage,
    vSelect
  },
  data() {
    return {
      submitStatus: '',
      submitData: {
        name_uz: null,
        name_ru: null,
        name_en: null,
        text_uz: null,
        text_ru: null,
        text_en: null,
        link_uz: null,
        link_ru: null,
        link_en: null,
        publish_date: null,
        publish_time: null,
        type: null,
        status: null,
        journalist: null,
        media: null
      },
      media: [],
      journalists: [],
      tab: null,
      id: null,
      config: {
        format: 'DD.MM.yyyy',
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      configTime: {
        format: 'HH:mm:ss',
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      photos: [],
      photo: '',
      title_form: 'create',
    }
  },
  validations: {
    submitData: {
      name_ru: {
        required:  validateIf('name_ru')
      },
      text_ru: {
        required:  validateIf('text_ru')
      },
      link_ru: {
        required:  validateIf('link_ru')
      },
      name_uz: {
        required:  validateIf('name_uz')
      },
      text_uz: {
        required:  validateIf('text_uz')
      },
      link_uz: {
        required:  validateIf('link_uz')
      },
      name_en: {
        required:  validateIf('name_en')
      },
      text_en: {
        required:  validateIf('text_en')
      },
      link_en: {
        required:  validateIf('link_en')
      },
      media: {
        required
      },
      journalist: {
        required
      },
      date: {
        required
      },
      publish_time: {
        required
      },
      type: {
        required
      },
      status: {
        required
      }
    }
  },
  watch: {
    'submitData.media': function (val) {
      this.fetchJournalists(val)
    }
  },
  mounted() {
    this.fetchMedia()
    if (this.$route.params.id) {
      this.fetchDataId()
      this.id = this.$route.params.id
      this.title_form = 'edit'
    }
  },
  methods: {
    submit() {
      this.$v.submitData.$touch()
      let lang = ['ru', 'uz', 'en'];

      if (this.$v.submitData.$anyError) {
        lang.forEach(val => {
          if (val === 'ru' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 0
          if (val === 'uz' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 1
          if (val === 'en' && (this.$v.submitData['name_' + val].$error || this.$v.submitData['text_' + val].$error || this.$v.submitData['link_' + val].$error)) this.tab = 2
        })
        return
      }
      this.submitStatus = 'PENDING'
      var dateParts = this.submitData.date.split(".");
      // console.log(dt)
      this.submitData.publish_date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + this.submitData.publish_time

      // let publish_date = this.submitData.date + ' ' + this.submitData.publish_time

      if (this.$route.params.id) {
        this.submitData.updated_by = null
        putPublications(this.submitData, this.$route.params.id).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/media-publication/index");
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      } else {
        postPublications(this.submitData).then(res => {
          if (this.photos.length) {
            this.getUploadPhoto(res.data.id)
          } else {
            this.submitStatus = 'OK'
            this.$router.push("/media-publication/index");
          }
        }).catch(error => {
          this.submitStatus = 'ERROR'
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, 'error');
          }
        })
      }
    },
    fetchMedia() {
      getMedia({
        limit: 1000
      }).then(res => {
        this.media = res.data.results
      })
    },
    fetchJournalists(val) {
      getJournalists({
        media: val,
        limit: 1000
      }).then(res => {
        this.journalists = res.data.results
      })
    },
    fetchDataId() {
      getPublicationsId(this.$route.params.id).then(res => {
        let publish_date = new Date(res.data.publish_date)
        res.data.date = format(publish_date, 'dd.MM.yyyy')
        res.data.publish_time = format(publish_date, 'HH:mm:ss')
        this.submitData = res.data
        this.submitData.media = res.data.media.id
        this.submitData.journalist = res.data.journalist.id
        res.data.photos.forEach(val => {
          this.photos.push({
            path: val.photo,
            id: val.id
          })
        })
      })
    },
    getUploadPhoto(id) {
      this.photos.forEach(photo => {
        var url = photo.path
        if (!url) {
          return
        }
        let formData = new FormData();
        var arr = url.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split('/'),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], 'image_publication.' + types[1], {
          type: mime
        });
        formData.append('photo', blob)
        formData.append('publication', id)
        console.log(formData)
        postPublicationPhotos(formData).then(() => {
          this.submitStatus = 'OK'
          this.$router.push("/media-publication/index");
        })
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
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log('asdasddsa')
      this.photos = fileList
      if (this.$route.params.id) {
        var url = fileList[index].path
        if (!url) {
          return
        }
        let formData = new FormData();
        var arr = url.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split('/'),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], 'image_publication.' + types[1], {
          type: mime
        });

        formData.append('photo', blob)
        formData.append('publication', this.$route.params.id)
        postPublicationPhotos(formData).then(res => {
          this.photos.push({
            path: res.data.photo,
            id: res.data.id
          })
        })
      }
    },
    beforeRemove(index, done, fileList) {
      var photo = fileList[index]
      if (this.title_form === 'edit') {
        this.$swal({
          title: this.$t('message.delete_title'),
          text:  this.$t('message.confirm_delete'),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText:  this.$t('message.confirm_btn_delete')
        }).then(result => {
          if (result.value) {
            deletePublicationPhotos(photo.id).then(() => {
             this.$swal( this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
              this.photos.splice(index, 1);
            })
          }
        });
      } else this.photos.splice(index, 1);
    },
    async editImage(formData, index, fileList) {
      await delay(500);
      var url = fileList[index].path
      var idPhoto = fileList[index].id

      if (!url) {
        return
      }
      if (this.title_form === 'edit') {
        formData = new FormData();
        var arr = url.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split('/'),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], 'image_publication.' + types[1], {
          type: mime
        });

        formData.append('photo', blob)
        formData.append('publication', this.$route.params.id)
        putPublicationPhotos(formData, idPhoto)
      }
    }
  }
}
const delay = ms => new Promise(res => setTimeout(res, ms));
</script>
