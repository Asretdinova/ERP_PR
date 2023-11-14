<template>
<div class="main-content">
    <breadcumb :page="'region'" :folder="'list'" />
    <b-card class="wrapper">
        <vue-good-table :columns="columns" :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }" :sort-options="{
                        enabled: true,
                        initialSortBy: [
                          {field: 'id', type: 'desc'}]
                    }"  :pagination-options="pagination_options" styleClass="tableOne vgt-table" :rows="rows">
            <div slot="table-actions" class="mb-3">
                <b-button variant="success btn-icon ripple m-1" v-b-modal.modal-form>
                    <span class="ul-btn__icon">+</span>
                </b-button>
            </div>

            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                    <b-button variant="link" @click="editDialog(props.row)">
                        <i class="i-Eye-Visible text-25 text-success " style="vertical-align:middle;"></i>
                        {{ props.row.button }}</b-button>
                    <b-button  style="padding:.5rem 0.25rem;" variant="link" @click="confirmMessage(props.row.id)">
                        <i class="i-Close-Window text-25 text-danger"></i>
                        {{ props.row.button }}</b-button>
                </span>
            </template>
        </vue-good-table>

        <b-modal id="modal-form" centered :title="$t('message.'+title_form)" ref="modal_form" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleOk">
                <b-form-group :label="$t('message.title')" :invalid-feedback="$t('message.title') + ' - '+ $t('message.is_required')">
                    <b-form-input class="mb-2" label="title" v-model="submitData.name" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" :placeholder="$t('message.enter_title_region')">
                    </b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </b-card>
</div>
</template>

<script>
import {
    getRegions,
    postRegions,
    putRegions,
    deleteRegions
} from '../../api/regions'
import {
    getCities
} from '../../api/cities'
import {
    validationMixin
} from 'vuelidate'
import {
    required,
    minLength
} from 'vuelidate/lib/validators'

export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "City"
    },
    computed: {
        columns() {
            return [{
                    label: "ID",
                    field: "id",
                    type: "number"
                },
                {
                    label: this.$t('message.title'),
                    field: "name",
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
            cities: [],
            submitData: {
                name: null
            },
            edit: false,
            title_form: 'create',
        };
    },
    validations: {
        submitData: {
            name: {
                required,
                minLength: minLength(3)
            },
        }
    },
    beforeMount() {
        this.fetchData()
        this.fetchCity()
    },
    methods: {
        fetchData() {
            getRegions({
                limit: 10000
            }).then(res => {
                this.rows = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], 'Failed');
                }
            })
        },
        fetchCity() {
            getCities({
                limit: 10000
            }).then(res => {
                this.cities = res.data.results
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
                putRegions(this.submitData, this.submitData.id).then(() => {
                    this.$refs.modal_form.hide()
                    this.fetchData()
                }).catch(error => {
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], 'Failed');
                    }
                })
            } else {
                postRegions(this.submitData).then(() => {
                    this.$refs.modal_form.hide()
                    this.fetchData()
                }).catch(error => {
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], 'Failed');
                    }
                })
            }
        },
        resetModal() {
            this.title_form = 'create'
            this.submitData = {
                name: null
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
                    deleteRegions(id).then(() => {
                        this.fetchData()
                        this.$swal(this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                    }).catch(error => {
                        for (var k in error.response.data) {
                            this.makeToast("danger", error.response.data[k], 'Failed');
                        }
                    })
                }
            });
        },
        makeToast(variant = null, msg, title) {
            this.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true
            });
        }
    }
};
</script>

<style>
</style>
