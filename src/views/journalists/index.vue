<template>
<div class="main-content">
    <breadcumb :page="'journalists'" :folder="'list'" />
    <b-card class="wrapper">
        <vue-good-table :columns="columns" :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }" :sort-options="{
                        enabled: true,
                        initialSortBy: [
                          {field: 'id', type: 'desc'}]
                    }" :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="rows">
            <div slot="table-actions" class="mb-3">
                <b-button variant="success btn-icon ripple m-1" v-b-modal.modal-form>
                    <span class="ul-btn__icon">+</span>
                </b-button>
            </div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <b-button variant="link" @click="editDialog(props.row)">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}
                    </b-button>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)" v-if="users.role === 3">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}
                    </b-button>
                </span>
            </template>
        </vue-good-table>

        <b-modal id="modal-form" centered :title="$t('message.'+title_form)" ref="modal_form" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleOk">
                <b-form-group :label="$t('message.full_name')" :invalid-feedback="$t('message.full_name') + ' - '+ $t('message.is_required')">
                    <b-form-input class="mb-2" label="title" v-model="submitData.fio" :state="$v.submitData.fio.$dirty ? !$v.submitData.fio.$error : null" placeholder="Введите ФИО журналиста">
                    </b-form-input>
                </b-form-group>
                <b-form-group :label="$t('message.media_refers')" :state="$v.submitData.media.$dirty ? !$v.submitData.media.$error : null" :invalid-feedback="$t('message.media_refers') + ' - '+ $t('message.is_required')">
                    <v-select v-model="submitData.media" :options="mediaRows" :reduce="st => st.id" label="name" required placeholder="Please select the Category" />
                </b-form-group>
                <b-form-group :label="$t('message.email')" :invalid-feedback="$t('message.email') + ' - '+ $t('message.is_required')">
                    <b-form-input class="mb-2" label="title" v-model="submitData.email" :state="$v.submitData.email.$dirty ? !$v.submitData.email.$error : null" placeholder="Введите электронную почту">
                    </b-form-input>
                </b-form-group>
                <b-form-group :label="$t('message.phone_number')" :invalid-feedback="$t('message.phone_number') + ' - '+ $t('message.is_required')">
                    <b-form-input class="mb-2" label="title" v-model="submitData.phone"   v-mask="['(+998) ##-###-##-##']" :state="$v.submitData.phone.$dirty ? !$v.submitData.phone.$error : null" placeholder="Введите контактный номер">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-1" :label="$t('message.pull_journalist')" :state="$v.submitData.is_pull.$dirty ? !$v.submitData.is_pull.$error : null" :invalid-feedback="$t('message.pull_journalist') + ' - '+ $t('message.is_required')" label-for="input-1">
                    <b-form-select class="mb-2" v-model="submitData.is_pull" :options="{ 'true': $t('message.yes'), 'false': $t('message.no') }" id="inline-form-custom-select-pref">
                    </b-form-select>
                </b-form-group>
            </form>
        </b-modal>
    </b-card>
</div>
</template>

<script>
import {
    getJournalists,
    postJournalists,
    putJournalists,
    deleteJournalists
} from '../../api/journalists'
import {
    getMedia
} from '../../api/media'

import {
    validationMixin
} from 'vuelidate'
import {
    required,
    minLength,
    email
} from 'vuelidate/lib/validators'
import {
    format
} from "date-fns";
import vSelect from 'vue-select'
import "vue-select/dist/vue-select.css";

export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Structure Table"
    },
    components: {
        vSelect
    },
    computed: {
        columns() {
            return [{
                    label: "ID",
                    field: "id",
                    type: 'number'
                },
                {
                    label: this.$t('message.full_name'),
                    field: "fio",
                },
                {
                    label: this.$t('message.name_organization'),
                    field: "media_name"
                },
                {
                    label: this.$t('message.pull_journalist'),
                    field: function (val) {
                        return (val.is_pull) ? 'Да' : 'Нет'
                    }
                },
                {
                    label: this.$t('message.action'),
                    field: "action",
                    html: true,
                    tdClass: "text-right",
                    thClass: "text-right"
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
            rows: [],
            mediaRows: [],
            submitData: {
                fio: null,
                email: null,
                phone: null,
                is_pull: null,
                media: null,
            },
            edit: false,
            title_form: 'create',
            users: this.$store.getters.user,
        };
    },
    validations: {
        submitData: {
            fio: {
                required
            },
            media: {
                required
            },
            email: {
                required,
                email
            },
            phone: {
                required
            },
            is_pull: {
                required
            }
        }
    },
    beforeMount() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getJournalists({
                limit: 10000
            }).then(res => {
                this.fetchMedia(res.data.results)
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        fetchMedia(data) {
            getMedia({
                limit: 1000
            }).then(res => {
                this.mediaRows = res.data.results
                data.forEach(v => {
                    var d = this.mediaRows.filter(k => v.media === k.id)
                    v.media_name = (d.length) ? d[0].name : null
                })
                this.rows = data
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.$v.submitData.$touch()
            if (this.$v.submitData.$anyError) {
                return
            }

            if (this.edit) {
                putJournalists(this.submitData, this.submitData.id).then(() => {
                    this.$refs.modal_form.hide()
                    this.fetchData()
                }).catch(error => {
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], k, 'Failed');
                    }
                })
            } else {
                postJournalists(this.submitData).then(() => {
                    this.$refs.modal_form.hide()
                    this.fetchData()
                }).catch(error => {
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], k, 'Failed');
                    }
                })
            }
        },
        resetModal() {
            this.title_form = 'create'
            this.submitData = {
                fio: null,
                email: null,
                phone: null,
                is_pull: null,
                media: null,
            }
            this.edit = false
        },
        editDialog(row) {
            this.$refs.modal_form.show()
            this.title_form = 'edit'
            this.edit = true
            this.submitData = Object.assign({}, this.submitData, row)
        },
        confirmMessage(id) {
            this.$swal({
                title: this.$t('message.delete_title'),
                text: this.$t('message.confirm_delete'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: this.$t('message.confirm_btn_delete'),
                cancelButtonText: this.$t('message.cancel')
            }).then(result => {
                if (result.value) {
                    deleteJournalists(id).then(() => {
                        this.fetchData()
                        this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                    }).catch(error => {
                        for (var k in error.response.data) {
                            this.makeToast("danger", error.response.data[k], k, 'Failed');
                        }
                    })
                }
            });
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
