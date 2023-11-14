<template>
<div class="main-content">
    <breadcumb :page="'media_inquiries'" :folder="title_form" back="true" />
    <b-card class="wrapper">
        <b-form @submit.prevent="submit">
            <div class="row">
                <b-col md="6">
                    <b-form-group :label="$t('message.title') " :invalid-feedback="$t('message.title') + ' - '+ $t('message.is_required')">
                        <b-form-input class="mb-2" label="title" :disabled="users.role != 3" v-model="submitData.name" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" :placeholder="$t('message.enter_title_media_request')">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group :label="$t('message.request_description')" :invalid-feedback="$t('message.request_description') + ' - '+ $t('message.is_required')">
                        <b-form-textarea class="mb-2" :disabled="users.role != 3" v-model="submitData.description" :state="$v.submitData.description.$dirty ? !$v.submitData.description.$error : null" label="title">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group :label="$t('message.media')" :invalid-feedback="$t('message.media') + ' - '+ $t('message.is_required')" :state="$v.submitData.media.$dirty ? !$v.submitData.media.$error : null">
                        <v-select v-model="submitData.media" :options="media" :reduce="st => st.id" label="name" required :disabled="users.role != 3" :placeholder="$t('message.select_category')" />
                    </b-form-group>
                    <b-form-group id="input-group-1" :label="$t('message.journalist')" :invalid-feedback="$t('message.journalist') + ' - '+ $t('message.is_required')" :state="$v.submitData.journalist.$dirty ? !$v.submitData.journalist.$error : null">
                        <v-select v-model="submitData.journalist" :options="journalists" :reduce="st => st.id" label="fio" :disabled="users.role != 3" required :placeholder="$t('message.select_journalist')" />
                    </b-form-group>
                    <b-form-group :label="$t('message.status')" :invalid-feedback="$t('message.status') + ' - '+ $t('message.is_required')" :state="$v.submitData.status.$dirty ? !$v.submitData.status.$error : null">
                        <b-form-select class="mb-2" :value="null" v-model="submitData.status" :options="options_status" id="inline-form-custom-select-pref">
                            <option slot="first" :value="null">{{$t('message.choose')}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group :label="$t('message.control_type')" :invalid-feedback="$t('message.control_type') + ' - '+ $t('message.is_required')" :state="$v.submitData.type_upr.$dirty ? !$v.submitData.type_upr.$error : null">
                        <b-form-select class="mb-2" :value="null" v-model="submitData.type_upr" :disabled="users.role != 3" :options="{ '1': $t('message.edu_management'), '2': $t('message.republican_administration'), '3': $t('message.territorial_administration'), '4': $t('message.press_secretaries') }" id="inline-form-custom-select-pref">
                            <option slot="first" :value="null">{{$t('message.choose')}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group :label="$t('message.category')" :invalid-feedback="$t('message.category') + ' - '+ $t('message.is_required')" :state="$v.submitData.administration.$dirty ? !$v.submitData.administration.$error : null">
                        <v-select v-model="submitData.administration" :options="selected_adm" :reduce="st => st.id" label="name_ru" :disabled="users.role != 3" required :placeholder="$t('message.select_category')" />
                    </b-form-group>
                    <div class="row">
                        <b-col md="6">
                            <b-form-group :label="$t('message.deadline')" :invalid-feedback="$t('message.deadline') + ' - '+ $t('message.is_required')" :state="$v.submitData.deadline_date.$dirty ? !$v.submitData.deadline_date.$error : null">
                                <date-picker v-model="submitData.deadline_date" :config="config" :disabled="users.role != 3"></date-picker>

                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group :label="$t('message.deadline_time')" :invalid-feedback="$t('message.deadline_time') + ' - '+ $t('message.is_required')" :state="$v.submitData.deadline_time.$dirty ? !$v.submitData.deadline_time.$error : null">
                                <date-picker v-model="submitData.deadline_time" :config="configTime" :disabled="users.role != 3"></date-picker>
                            </b-form-group>
                        </b-col>
                    </div>
                    <div v-if="users.role != 3  || submitData.status != 1">
                        <b-form-group :label="$t('message.reply_to_request')" :invalid-feedback="$t('message.reply_to_request') + ' - '+ $t('message.is_required')">
                            <b-form-textarea class="mb-2" v-model="submitData.answer" :disabled="users.role === 3 || submitData.status === 3" label="title" :placeholder="$t('message.reply_to_request')">
                            </b-form-textarea>

                        </b-form-group>
                        <b-form-group :label="$t('message.reviewers_note')" :invalid-feedback="$t('message.reviewers_note') + ' - '+ $t('message.is_required')">
                            <b-form-textarea class="mb-2" label="title" :disabled="users.role === 3 || submitData.status === 3" v-model="submitData.note" placeholder="">
                            </b-form-textarea>
                        </b-form-group>
                    </div>

                </b-col>
                <b-col class="text-right">
                    <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
                        <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
                    </div>
                    <b-button variant="primary" class="d-inline" @click="$router.go(-1)">{{  $t("message.back") }}</b-button>
                    <div class="btn-group" role="group">
                        <b-button v-for="(val, index) in options_status" type="submit" :variant="submitData.status == val.value ? 'primary m-1' : 'outline-primary m-1'" 
                            v-bind:key="index" @click="submitData.status = val.value" v-if="!val.disabled" :disabled="val.disabled">{{ val.text }}</b-button>
                    </div>
                </b-col>
            </div>
        </b-form>
    </b-card>
</div>
</template>

<script>
import {
    required,
    minLength
} from "vuelidate/lib/validators";
import {
    postMediaRequest,
    getMediaRequestId,
    putMediaRequest
} from "../../api/media_request";
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
    getMedia
} from '../../api/media'
import {
    getJournalists
} from '../../api/journalists'

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {
    format
} from 'date-fns';
export default {
    metaInfo: {
        title: "Media Form"
    },
    components: {
        'v-select': VueSelect
    },
    data() {
        return {
            submitStatus: null,
            submitData: {
                name: null,
                description: null,
                media: null,
                journalist: null,
                type_upr: null,
                administration: null,
                status: 1,
                answer: null,
                note: null
            },
            selected_adm: [],
            media: [],
            journalists: [],
            users: this.$store.getters.user,
            options_status: [{
                    value: 1,
                    text: this.$t('message.in_work'),
                    disabled: false
                },
                {
                    value: 2,
                    text: this.$t('message.on_check'),
                    disabled: false
                },
                {
                    value: 3,
                    text: this.$t('message.approved'),
                    disabled: false
                }
            ],
            title_form: 'create',
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
        };
    },
    validations: {
        submitData: {
            name: {
                required
            },
            description: {
                required
            },
            media: {
                required
            },
            journalist: {
                required
            },
            type_upr: {
                required
            },
            administration: {
                required
            },
            status: {
                required
            },
            deadline_date: {
                required
            },
            deadline_time: {
                required
            }
        }
    },
    watch: {
        'submitData.type_upr': function (val) {
            val = val * 1
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

        this.fetchMedia()
        this.fetchJournalist()
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
            var dateParts = this.submitData.deadline_date.split(".");
            // console.log(dt)
            this.submitData.deadline = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + this.submitData.deadline_time

            if (this.$route.params.id) {
                if (this.submitData.journalist.id) this.submitData.journalist = this.submitData.journalist.id
                if (this.submitData.media.id) this.submitData.media = this.submitData.media.id
                putMediaRequest(this.submitData, this.$route.params.id).then(() => {
                    this.submitStatus = 'OK'
                    this.$router.push("/media-request/index");
                }).catch(error => {
                    this.submitStatus = 'ERROR'
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], k, 'error');
                    }
                })
            } else {
                postMediaRequest(this.submitData).then(() => {
                    this.submitStatus = 'OK'
                    this.$router.push("/media-request/index");
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
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], k, 'error');
                }
            })
        },
        fetchJournalist() {
            getJournalists({
                limit: 1000
            }).then(res => {
                this.journalists = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], k, 'error');
                }
            })
        },
        fetchDataId() {
            getMediaRequestId(this.$route.params.id).then(res => {
                this.submitData = res.data
                this.options_status[0]["disabled"] =
                    (this.$store.getters.user.role === 3 && this.submitData.status != 2) ||
                    this.$store.getters.user.role != 3;
                this.options_status[1]["disabled"] =
                    this.$store.getters.user.role === 3 ||
                    (this.$store.getters.user.role != 3 && this.submitData.status != 1);
                this.options_status[2]["disabled"] =
                    this.$store.getters.user.role != 3 || this.submitData.status != 2;
                this.submitData.deadline_date = format(
                    new Date(this.submitData.deadline),
                    "dd.MM.yyyy"
                );
                this.submitData.administration = res.data.administration.id
                this.submitData.deadline_date = format(new Date(this.submitData.deadline), 'dd.MM.yyyy')
                this.submitData.deadline_time = format(new Date(this.submitData.deadline), 'HH:mm:ss')
                this.options_status[0]['disabled'] = (this.$store.getters.user.role === 3 && this.submitData.status === 2) || this.$store.getters.user.role != 3
                this.options_status[1]['disabled'] = (this.$store.getters.user.role === 3) || (this.$store.getters.user.role != 3 && this.submitData.status === 3)
                this.options_status[2]['disabled'] = (this.$store.getters.user.role === 3 && this.submitData.status != 2) || this.$store.getters.user.role != 3
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], k, 'error');
                }
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
