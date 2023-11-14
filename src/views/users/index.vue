<template>
  <div class="main-content">
    <breadcumb :page="'users'" :folder="'list'" />
    <b-card class="wrapper">
      <vue-good-table :columns="columns" :search-options="{
        enabled: true,
        placeholder: 'Search this table'
      }" :sort-options="{
  enabled: true,
  initialSortBy: [{ field: 'id', type: 'asc' }],
}" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="rows">
        <div slot="table-actions" class="mb-3">
          <b-button variant="success btn-icon ripple m-1" v-b-modal.modal-form-create>
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
      <b-modal id="modal-form" centered :title="$t('message.title_form')" ref="modal_form" @hidden="resetModal"
        @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleOk">
          <b-form-group :label="$t('message.login')"
            :invalid-feedback="$t('message.login') + ' - ' + $t('message.is_required')">
            <b-form-input class="mb-2" label="title" v-model="submitData.username" :state="
              $v.submitData.username.$dirty ? !$v.submitData.username.$error : null
            " :placeholder="$t('message.enter_login')">
            </b-form-input>
          </b-form-group>
          <div class="row">
            <b-col md="6">
              <b-form-group :label="$t('message.name')"
                :invalid-feedback="$t('message.name') + ' - ' + $t('message.is_required')">
                <b-form-input class="mb-2" label="title" v-model="submitData.first_name" :state="
                  $v.submitData.first_name.$dirty
                    ? !$v.submitData.first_name.$error
                    : null
                " :placeholder="$t('message.enter_username')">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6 pl-0">
              <b-form-group :label="$t('message.lastname')" :invalid-feedback="
                $t('message.lastname') + ' - ' + $t('message.is_required')
              ">
                <b-form-input class="mb-2" label="title" v-model="submitData.last_name" :state="
                  $v.submitData.last_name.$dirty
                    ? !$v.submitData.last_name.$error
                    : null
                " :placeholder="$t('message.enter_lastname')">
                </b-form-input>
              </b-form-group>
            </b-col>
          </div>
          <div class="row">
            <b-col md="6">
              <b-form-group :label="$t('message.email')" :invalid-feedback="
                $t('message.email') + ' - ' + $t('message.is_required')
              ">
                <b-form-input class="mb-2" label="title" v-model="submitData.email"
                  :state="$v.submitData.email.$dirty ? !$v.submitData.email.$error : null"
                  :placeholder="$t('message.enter_user_email')">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6 pl-0">
              <b-form-group :label="$t('message.phone')" :invalid-feedback="
                $t('message.phone') + ' - ' + $t('message.is_required')
              ">
                <b-form-input class="mb-2" label="title" v-model="submitData.phone" v-mask="['(+998) ##-###-##-##']"
                  :state="$v.submitData.phone.$dirty ? !$v.submitData.phone.$error : null"
                  :placeholder="$t('message.enter_phone')">
                </b-form-input>
              </b-form-group>
            </b-col>
          </div>
          <b-form-group :label="$t('message.control_type')" v-if="submitData.role != 3 && submitData.role != 4"
            :invalid-feedback="
              $t('message.control_type') + ' - ' + $t('message.is_required')
            " :state="$v.submitData.type.$dirty ? !$v.submitData.type.$error : null" label-for="input-1">
            <b-form-select class="mb-2" :value="null" v-model="submitData.type" :options="{
              '1': $t('message.edu_management'),
              '2': $t('message.republican_administration'),
              '3': $t('message.territorial_administration'),
              '4': $t('message.press_secretaries'),
            }" id="inline-form-custom-select-pref">
              <option slot="first" :value="null">{{ $t("message.choose") }}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('message.category')" v-if="submitData.role != 3 && submitData.role != 4"
            label-for="input-1" :invalid-feedback="$t('message.category') + ' - ' + $t('message.is_required')" :state="
              $v.submitData.administration.$dirty
                ? !$v.submitData.administration.$error
                : null
            ">
            <v-select v-model="submitData.administration" :options="selected_adm" :reduce="(st) => st.id"
              label="name_uz" required :placeholder="$t('message.select_category')" />
          </b-form-group>
          <b-form-group :label="$t('message.role')"
            :state="$v.submitData.role.$dirty ? !$v.submitData.role.$error : null"
            :invalid-feedback="$t('message.role') + ' - ' + $t('message.is_required')">
            <v-select v-model="submitData.role" :options="users_role" :reduce="(st) => st.id" label="name" required
              :placeholder="$t('message.select_role')" />
          </b-form-group>
          <b-form-group :label="$t('message.password')"
            :invalid-feedback="$t('message.password') + ' - ' + $t('message.is_required')">
            <b-form-input class="mb-2" label="title" type="password" v-model="submitData.password"
              :placeholder="$t('message.enter_password')">
            </b-form-input>
          </b-form-group>
        </form>
      </b-modal>

      <b-modal id="modal-form-create" centered :title="title_form" ref="modal_form_create" @hidden="resetModalCreate"
        @ok="handleOkCreate">
        <form ref="form" @submit.stop.prevent="handleOkCreate">
          <b-form-group :label="$t('message.login')"
            :invalid-feedback="$t('message.login') + ' - ' + $t('message.is_required')">
            <b-form-input class="mb-2" label="title" v-model="submitDataCreate.username" :state="
              $v.submitDataCreate.username.$dirty
                ? !$v.submitDataCreate.username.$error
                : null
            " :placeholder="$t('message.enter_login')">
            </b-form-input>
          </b-form-group>
          <b-form-group :label="$t('message.role')" :state="
            $v.submitDataCreate.role.$dirty ? !$v.submitDataCreate.role.$error : null
          " :invalid-feedback="$t('message.role') + ' - ' + $t('message.is_required')">
            <v-select v-model="submitDataCreate.role" :options="users_role" :reduce="(st) => st.id" label="name"
              required :placeholder="$t('message.select_role')" />
          </b-form-group>
          <b-form-group :label="$t('message.control_type')"
            v-if="submitDataCreate.role != 3 && submitDataCreate.role != 4" :invalid-feedback="
              $t('message.control_type') + ' - ' + $t('message.is_required')
            " :state="
  $v.submitDataCreate.type.$dirty ? !$v.submitDataCreate.type.$error : null
" label-for="input-1">
            <b-form-select class="mb-2" :value="null" v-model="submitDataCreate.type" :options="{
              '1': $t('message.edu_management'),
              '2': $t('message.republican_administration'),
              '3': $t('message.territorial_administration'),
              '4': $t('message.press_secretaries'),
            }" id="inline-form-custom-select-pref">
              <option slot="first" :value="null">Choose...</option>
            </b-form-select>
          </b-form-group>
          <b-form-group :label="$t('message.category')" v-if="submitDataCreate.role != 3 && submitDataCreate.role != 4"
            label-for="input-1" :invalid-feedback="$t('message.category') + ' - ' + $t('message.is_required')" :state="
              $v.submitDataCreate.administration.$dirty
                ? !$v.submitDataCreate.administration.$error
                : null
            ">
            <v-select v-model="submitDataCreate.administration" :options="selected_adm" :reduce="(st) => st.id"
              label="name_uz" required :placeholder="$t('message.select_category')" />
          </b-form-group>
          <b-form-group :label="$t('message.password')"
            :invalid-feedback="$t('message.password') + ' - ' + $t('message.is_required')">
            <b-form-input class="mb-2" label="title" type="password" v-model="submitDataCreate.password" :state="
              $v.submitDataCreate.password.$dirty
                ? !$v.submitDataCreate.password.$error
                : null
            " :placeholder="$t('message.enter_password')">
            </b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import { getUsersList, putUsersEdit, deleteUser, postUser } from "../../api/user";
import { getAdministration } from "../../api/management_edu";
import { getAdministration as getAdministrationRep } from "../../api/republican_administration";
import { getAdministration as getAdministrationTer } from "../../api/territorial_administration";
import { getPressSecretaries } from "../../api/press_secretaries";
import { validationMixin } from "vuelidate";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const validateIf = (prop) =>
  helpers.withParams(
    {
      type: "validatedIf",
      prop,
    },
    function (value, parentVm) {
      return helpers.ref(prop, this, parentVm) != 3 &&
        helpers.ref(prop, this, parentVm) != 4 &&
        !value
        ? false
        : true;
    }
  );

export default {
  mixins: [validationMixin],
  components: {
    "v-select": VueSelect,
  },
  computed: {
    ...mapGetters(["selectedLocale"]),
    columns: function () {
      var lang = this.selectedLocale.suffix;
      var type = {
        1: this.$t("message.edu_management"),
        2: this.$t("message.republican_administration"),
        3: this.$t("message.territorial_administration"),
        4: this.$t("message.press_secretaries"),
      };
      return [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: this.$t("message.login"),
          field: "username",
        },
        {
          label: this.$t("message.full_name"),
          field: function (val) {
            return val.first_name + " " + val.last_name;
          },
        },
        {
          label: this.$t("message.email"),
          field: "email",
        },
        {
          label: this.$t("message.phone"),
          field: "phone",
        },
        {
          label: "Статус",
          field: "status",
        },
        {
          label: "ДАта создания",
          field: "created_at",
        },
        {
          label: this.$t("message.type"),
          field: function (val) {
            return type[val.type];
          },
        },
        {
          label: this.$t("message.category"),
          field: "administration.name_"+this.selectedLocale.suffix,
        },
        {
          label: this.$t("message.role"),
          field: function (val) {
            var users_role = [
              {
                id: 1,
                name: "Пользователь",
              },
              {
                id: 2,
                name: "Модератор",
              },
              {
                id: 3,
                name: "Админ",
              },
              {
                id: 4,
                name: "Оператор",
              },
            ];
            var d = users_role.filter((k) => k.id === val.role);
            return d.length ? d[0].name : "";
          },
        },
        {
          label: this.$t("message.action"),
          field: "action",
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
      title_form: this.$t("message.create"),
      submitData: {
        first_name: null,
        username: null,
        last_name: null,
        email: null,
        phone: null,
        role: null,
        type: null,
      },
      submitDataCreate: {
        username: null,
        password: null,
        type: null,
        administration: null,
      },
      edit: false,
      users_role: [
        {
          id: 1,
          name: "Пользователь",
          prefix: "users",
        },
        {
          id: 2,
          name: "Модератор",
          prefix: "moderators",
        },
        {
          id: 3,
          name: "Админ",
          prefix: "admins",
        },
        {
          id: 4,
          name: "Оператор",
          prefix: "operators",
        },
      ],
      selected_adm: [],
    };
  },
  validations: {
    submitData: {
      first_name: {
        required,
      },
      username: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      role: {
        required,
      },
      type: {
        required: validateIf("role"),
      },
      administration: {
        required: validateIf("role"),
      },
    },
    submitDataCreate: {
      username: {
        required,
      },
      password: {
        required,
      },
      role: {
        required,
      },
      administration: {
        required: validateIf("role"),
      },
      type: {
        required: validateIf("role"),
      },
    },
  },
  watch: {
    "submitDataCreate.type"(val) {
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
    "submitData.type"(val) {
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
    this.fetchData();
  },
  methods: {
    fetchData() {
      getUsersList({
        limit: 10000,
      }).then((res) => {
        this.rows = res.data.results;
      });
    },
    editDialog(row) {
      this.$refs.modal_form.show();
      this.title_form = "edit";
      this.edit = true;
      this.submitData = Object.assign(this.submitData, row);
      this.submitData.administration = row.administration.id;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.submitData.$touch();
      if (this.$v.submitData.$anyError) {
        return;
      }

      this.editUser();
    },
    handleOkCreate(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.submitDataCreate.$touch();
      if (this.$v.submitDataCreate.$anyError) {
        return;
      }

      var dt = this.users_role.filter((val) => {
        return val.id === this.submitDataCreate.role;
      });
      var val = dt.length ? dt[0].prefix : "user";
      postUser(this.submitDataCreate, val)
        .then((res) => {
          this.fetchData();
          var dt = Object.assign({}, this.submitDataCreate, res.data);
          this.$refs.modal_form_create.hide();
          this.editDialog(dt);
        })
        .catch((error) => {
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], "Failed");
          }
        });
    },
    editUser() {
      putUsersEdit(this.submitData, this.submitData.id)
        .then(() => {
          this.$refs.modal_form.hide();
          this.fetchData();
        })
        .catch((error) => {
          for (var k in error.response.data) {
            this.makeToast("danger", error.response.data[k], "Failed");
          }
        });
    },
    resetModal() {
      this.title_form = this.$t('message.create');
      this.submitData = {
        first_name: null,
        username: null,
        last_name: null,
        email: null,
        phone: null,
        role: null,
        password: null,
        type: null,
        administration: null,
      };
    },
    resetModalCreate() {
      this.title_form = this.$t('message.create');
      this.submitDataCreate = {
        username: null,
        password: null,
        type: null,
        administration: null,
      };
    },
    confirmMessage(id) {
      this.$swal({
        title: this.$t('message.delete_title'),
        text: this.$t('message.confirm_delete'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t('message.confirm_btn_delete')
      }).then((result) => {
        if (result.value) {
          deleteUser(id)
            .then(() => {
              this.fetchData();
              this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
            })
            .catch((error) => {
              for (var k in error.response.data) {
                this.makeToast("danger", error.response.data[k], "Failed");
              }
            });
        }
      });
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
