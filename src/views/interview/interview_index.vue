<template>
  <div class="main-content">
    <breadcumb :page="'media_interview'" :folder="'list'" />
    <b-card class="wrapper">
      <vue-good-table
        :columns="columns"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: [{ field: 'id', type: 'desc' }],
        }"
        :pagination-options="pagination_options"
        styleClass="tableOne vgt-table"
        :rows="rows"
      >
        <div slot="table-actions" class="mb-3">
          <b-button variant="success btn-icon ripple m-1" v-b-modal.modal-form>
            <span class="ul-btn__icon">+</span>
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <b-button style="padding: 0.5rem 0.25rem" variant="link" @click="editDialog(props.row)">
              <i class="i-Eye-Visible text-25 text-success" style="vertical-align: middle"></i>
              {{ props.row.button }}
            </b-button>
            <b-button style="padding: 0.5rem 0.25rem" variant="link" @click="confirmMessage(props.row.id)">
              <i class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.button }}
            </b-button>
          </span>
        </template>
      </vue-good-table>
    </b-card>
    <b-modal id="modal-form" ref="modal_form" centered :title="$t('message.' + title_form)" size="lg" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleOk">
        <div class="row">
          <b-col md="6">
            <b-form-group :label="$t('message.theme_interview')" :invalid-feedback="$t('message.theme_interview') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" :state="$v.submitData.theme.$dirty ? !$v.submitData.theme.$error : null" v-model="submitData.theme" :placeholder="$t('message.enter_theme_interview')"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.source_media')" :invalid-feedback="$t('message.source_media') + ' - ' + $t('message.is_required')" label-for="input-1" :state="$v.submitData.media.$dirty ? !$v.submitData.media.$error : null">
              <v-select v-model="submitData.media" :options="media" :reduce="(st) => st.id" label="name" required :placeholder="$t('message.select_media')" />
            </b-form-group>
            <b-form-group :label="$t('message.interview_date')" :state="$v.submitData.date.$dirty ? !$v.submitData.date.$error : null" :invalid-feedback="$t('message.interview_date') + ' - ' + $t('message.is_required')">
              <date-picker v-model="submitData.date" :config="config"></date-picker>
            </b-form-group>
            <b-form-group :label="$t('message.photo')" :invalid-feedback="$t('message.photo') + ' - ' + $t('message.is_required')">
              <vue-upload-multiple-image
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                @edit-image="editImage"
                :data-images="photos"
                :dragText="$t('message.select_photo')"
                :browseText="$t('message.for_loading')"
                :primaryText="$t('message.default')"
                :popupText="$t('message.display_image_default')"
                :markIsPrimaryText="$t('message.set_default')"
              ></vue-upload-multiple-image>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group :label="$t('message.who_gave_interview')" :invalid-feedback="$t('message.who_gave_interview') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.interviewee" :state="$v.submitData.interviewee.$dirty ? !$v.submitData.interviewee.$error : null" :placeholder="$t('message.enter_who_gave_interview')"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.position')" :invalid-feedback="$t('message.position') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.position" :state="$v.submitData.position.$dirty ? !$v.submitData.position.$error : null" :placeholder="$t('message.enter_position')"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('message.publication_date')" :invalid-feedback="$t('message.publication_date') + ' - ' + $t('message.is_required')">
              <date-picker v-model="submitData.show_time" :config="config"></date-picker>
            </b-form-group>
            <b-form-group :label="$t('message.publication_link')" :invalid-feedback="$t('message.publication_link') + ' - ' + $t('message.is_required')">
              <b-form-input class="mb-2" label="title" v-model="submitData.link" :state="$v.submitData.link.$dirty ? !$v.submitData.link.$error : null" :placeholder="$t('message.enter_link')"></b-form-input>
            </b-form-group>
          </b-col>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { getInterview, postInterview, putInterview, deleteInterview, getInterviewId, postInterviewPhotos, putInterviewPhotos, deleteInterviewPhotos } from "../../api/interview";
import { getMedia } from "../../api/media";
import { format, parseISO } from "date-fns";

import { required, minLength } from "vuelidate/lib/validators";

import VueUploadMultipleImage from "vue-upload-multiple-image";
import { mapGetters } from "vuex";
import { deletePublications } from "../../api/publications";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    VueUploadMultipleImage,
    vSelect,
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Structure Table",
  },
  computed: {
    ...mapGetters(["selectedLocale"]),
    columns: function () {
      return [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: this.$t("message.theme_interview"),
          field: "theme",
        },
        {
          label: this.$t("message.media"),
          field: "media.name",
        },
        {
          label: this.$t("message.who_gave_interview"),
          field: "interviewee",
        },
        {
          label: this.$t("message.position"),
          field: "position",
        },
        {
          label: this.$t("message.interview_date"),
          field: function (val) {
            return format(new Date(val.date), "dd.MM.yyyy HH:mm");
          },
        },
        {
          label: this.$t("message.who_added"),
          // field: "created_by",
          field: "created_by.first_name",
          // field: "created_by.first_name"+''+"created_by.last_name",
          // field: function (val) {
          //     return val.created_by.first_name + ' ' + val.created_by.last_name
          // },
        },
        {
          label: this.$t("message.action"),
          field: "action",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ];
    },
    pagination_options: function () {
      return {
        enabled: true,
        nextLabel: this.$t("message.next"),
        prevLabel: this.$t("message.prev"),
        rowsPerPageLabel: this.$t("message.rowsPerPageLabel"),
        allLabel: this.$t("message.all"),
        mode: "records",
      };
    },
  },
  data() {
    return {
      rows: [],
      submitData: {
        theme: null,
        media: null,
        date: null,
        interviewee: null,
        position: null,
        show_time: null,
        link: null,
        photo: null,
      },
      edit: false,
      media: [],
      title_form: "create",
      config: {
        // https://momentjs.com/docs/#/displaying/
        format: "DD.MM.yyyy HH:mm:ss",
        useCurrent: false,
        showClear: true,
        showClose: true,
      },
      photos: [],
    };
  },
  validations: {
    submitData: {
      theme: {
        required,
      },
      media: {
        required,
      },
      date: {
        required,
      },
      interviewee: {
        required,
      },
      position: {
        required,
      },
      show_time: {
        required,
      },
      link: {
        required,
      },
    },
  },
  mounted() {
    this.fetchData();
    this.fetchMedia();
  },
  methods: {
    fetchData() {
      getInterview({
        limit: 1000,
      }).then((res) => {
        this.rows = res.data.results;
      });
    },
    resetModal() {
      this.title_form = "create";
      this.submitData = {
        theme: null,
        media: null,
        date: null,
        interviewee: null,
        position: null,
        show_time: null,
        link: null,
        photo: null,
      };
      this.photos = [];
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.submitData.$touch();
      if (this.$v.submitData.$anyError) {
        return;
      }
      var dateParts = this.submitData.date.split(".");
      var year = dateParts[2].split(" ");
      var dateParts2 = this.submitData.show_time.split(".");
      var year2 = dateParts2[2].split(" ");
      // console.log(time )
      this.submitData.date = year[0] + "-" + dateParts[1] + "-" + dateParts[0] + " " + year[1];

      // let date = format(new Date(this.submitData.date), 'yyyy-MM-dd HH:mm:ss')
      // console.log(date)
      // let show_time = format(new Date(this.submitData.show_time), 'yyyy-MM-dd HH:mm:ss')
      // this.submitData.date = parseISO(date).toISOString()
      this.submitData.show_time = year2[0] + "-" + dateParts2[1] + "-" + dateParts2[0] + " " + year2[1];

      let formData = new FormData();
      formData.append("theme", this.submitData.theme);
      formData.append("media", this.submitData.media);
      formData.append("date", this.submitData.date);
      formData.append("interviewee", this.submitData.interviewee);
      formData.append("position", this.submitData.position);
      formData.append("show_time", this.submitData.show_time);
      formData.append("link", this.submitData.link);

      if (this.edit) {
        putInterview(formData, this.submitData.id)
          .then(() => {
            this.$refs.modal_form.hide();
            this.fetchData();
          })
          .catch((error) => {
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], k, "error");
            }
          });
      } else {
        postInterview(formData)
          .then((res) => {
            this.$refs.modal_form.hide();
            if (this.photos.length) {
              this.getUploadPhoto(res.data.id);
            }
            this.fetchData();
          })
          .catch((error) => {
            for (var k in error.response.data) {
              this.makeToast("danger", error.response.data[k], k, "error");
            }
          });
      }
    },
    // fetchMedia(data) {
    //     getMedia({
    //         limit: 1000
    //     }).then(res => {
    //         this.rows = res.data.results
    //         data.forEach(v => {
    //             var d = this.rows.filter(k => v.media === k.id)
    //             v.media_name = (d.length) ? d[0].name : null
    //         })
    //         this.rows = data
    //     }).catch(error => {
    //         for (var k in error.response.data) {
    //             this.makeToast("danger", error.response.data[k], 'Failed');
    //         }
    //     })
    // },
    fetchMedia() {
      getMedia({
        limit: 10000,
      })
        .then((res) => {
          this.media = res.data.results;
        })
        .catch((error) => {
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, "error");
          }
        });
    },
    getUploadPhoto(id) {
      this.photos.forEach((photo) => {
        var url = photo.path;
        if (!url) {
          return;
        }
        let formData = new FormData();
        var arr = url.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split("/"),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], "image_interview." + types[1], {
          type: mime,
        });

        formData.append("photo", blob);
        formData.append("interview", id);

        postInterviewPhotos(formData);
      });
    },
    editDialog(row) {
      this.title_form = "edit";
      this.$refs.modal_form.show();
      this.edit = true;
      getInterviewId(row.id)
        .then((res) => {
          this.submitData = Object.assign({}, this.submitData, res.data);
          this.submitData.date = new Date(res.data.date);
          this.submitData.show_time = new Date(res.data.show_time);
          res.data.interview_photos.forEach((val) => {
            console.log(val.photo);
            var d = val.photo.split("/img");
            console.log(d);
            this.photos.push({
              path: "/img" + d[1],
              id: val.id,
            });
          });
        })
        .catch((error) => {
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], k, "error");
          }
        });
    },
    confirmMessage(id) {
      this.$swal({
        title: this.$t("message.delete_title"),
        text: this.$t("message.confirm_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("message.confirm_btn_delete"),
        cancelButtonText: this.$t("message.cancel"),
      }).then((result) => {
        if (result.value) {
          deleteInterview(id)
            .then(() => {
              this.fetchData();
              this.$swal(this.$t("message.deleted"), this.$t("message.deleted_message"), "success");
            })
            .catch((error) => {
              for (var k in error.response.data) {
                this.makeToast("danger", error.response.data[k], k, "error");
              }
            });
        }
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
    uploadImageSuccess(formData, index, fileList) {
      this.photos = fileList;
      if (this.edit) {
        var url = fileList[index].path;
        if (!url) {
          return;
        }
        let formData = new FormData();
        var arr = url.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split("/"),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], "image_interview." + types[1], {
          type: mime,
        });

        formData.append("photo", blob);
        formData.append("interview", this.submitData.id);
        postInterviewPhotos(formData).then((res) => {
          this.photos[index] = {
            path: res.data.photo,
            id: res.data.id,
          };
        });
      }
    },
    beforeRemove(index, done, fileList) {
      var photo = fileList[index];
      if (this.title_form === "edit") {
        this.$swal({
          title: this.$t("message.delete_title"),
          text: this.$t("message.confirm_delete"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.$t("message.confirm_btn_delete"),
        }).then((result) => {
          if (result.value) {
            deleteInterviewPhotos(photo.id).then(() => {
              this.$swal(this.$t("message.deleted"), this.$t("message.deleted_message"), "success");
              this.photos.splice(index, 1);
            });
          }
        });
      } else this.photos.splice(index, 1);
    },
    async editImage(formData, index, fileList) {
      await delay(500);
      var url = fileList[index].path;
      var idPhoto = fileList[index].id;

      if (!url) {
        return;
      }
      if (this.title_form === "edit") {
        formData = new FormData();
        var arr = url.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          types = mime.split("/"),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new File([u8arr], "image_interview." + types[1], {
          type: mime,
        });

        formData.append("photo", blob);
        formData.append("interview", this.submitData.id);
        putInterviewPhotos(formData, idPhoto);
      }
    },
  },
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
</script>

<style></style>
