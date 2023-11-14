<template>
<div class="main-content">
    <breadcumb :page="'event_plan'" :folder="'calendar'" />
    <b-row>
        <b-card class="box">
            <div class="mb-3 text-right">
                <b-button variant="success btn-icon ripple m-1" @click="addEvent">
                    <span class="ul-btn__icon">+ {{$t('message.add_event')}}</span>
                </b-button>
            </div>
            <FullCalendar ref="fullCalendar" defaultView="dayGridMonth" :header="{
                                left: '',
                                center: 'title',
                                right: 'prev,next today',
                              }" :plugins="calendarPlugins" locale="ru" :events="events" :buttonText="buttonText" :selectable="true" :selectHelper="true" @eventClick="eventClick" @select="select" />
        </b-card>
        <b-modal ref="modal_view" centered :title="$t('message.'+title_modal)" @hidden="resetModal" @ok="handleOk">
            <b-form @submit.prevent="handleOk">
                <b-form-group :label="$t('message.event_title')" :invalid-feedback="$t('message.event_title') + ' - '+ $t('message.is_required')">
                    <b-form-input class="mb-2" label="title" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" v-model="submitData.name" :placeholder="$t('message.enter_title_event')">
                    </b-form-input>
                </b-form-group>
                <div class="row">
                    <b-col md="6">
                        <b-form-group :label="$t('message.date_event')" :state="$v.submitData.start.$dirty ? !$v.submitData.start.$error : null" :invalid-feedback="$t('message.date_event') + ' - '+ $t('message.is_required')">
                            <date-picker v-model="submitData.start" :config="config"></date-picker>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group :label="$t('message.time_event')" :state="$v.submitData.end.$dirty ? !$v.submitData.end.$error : null" :invalid-feedback="$t('message.time_event') + ' - '+ $t('message.is_required')">
                            <date-picker v-model="submitData.end" :config="configTime"></date-picker>
                        </b-form-group>
                    </b-col>
                </div>
                <b-form-group :label="$t('message.description')" :invalid-feedback="$t('message.description') + ' - '+ $t('message.is_required')">
                    <b-form-textarea class="mb-2" v-model="submitData.description" :state="$v.submitData.description.$dirty ? !$v.submitData.description.$error : null" label="title">
                    </b-form-textarea>
                </b-form-group>
                <label>{{$t('message.priority')}}</label>
                <br />
                <div class="btn-group" role="group" aria-label="Basic example">
                    <b-button :variant="(submitData.privilege === 1) ? 'warning' : 'outline-warning'" @click="ChangePriority(1)" class="btn-icon rounded-circle m-2" v-b-popover.hover.bottom="$t('message.lower')"></b-button>
                    <b-button :variant="(submitData.privilege === 2) ? 'info' : 'outline-info'" @click="ChangePriority(2)" class="btn round btn-icon rounded-circle m-2" v-b-popover.hover.bottom="$t('message.middle')"></b-button>
                    <b-button :variant="(submitData.privilege === 3) ? 'danger' : 'outline-danger'" @click="ChangePriority(3)" class="btn round btn-icon rounded-circle m-2" v-b-popover.hover.bottom="$t('message.higher')"></b-button>
                </div>
            </b-form>

            <template v-slot:modal-footer>
                <div class="w-100">
                    <b-button v-if="is_edit" variant="danger" size="sm" class="float-left" @click="deleteEvent(submitData.id)">
                        {{$t('message.delete')}}
                    </b-button>
                    <div v-once class="typo__p d-inline" v-if="submitStatus === 'PENDING'">
                        <div class="spinner sm spinner-primary pt-3 mr-4 "></div>
                    </div>
                    <b-button variant="success" size="sm" class="float-right m-1" @click="handleOk" :disabled="submitStatus === 'PENDING'">
                        OK
                    </b-button>
                    <b-button variant="primary" size="sm" class="float-right m-1" @click=" $refs.modal_view.hide()">
                        {{$t('message.close')}}
                    </b-button>
                </div>
            </template>
        </b-modal>
    </b-row>
</div>
</template>

<script>
// import FullCalendar  from 'vue-fullcalendar';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from "@fullcalendar/core/locales-all";
import {
    getEvents,
    putEvents,
    postEvents,
    deleteEvents
} from '../../api/events'
import {
    format,
    addDays
} from 'date-fns';
import {
    validationMixin
} from 'vuelidate'
import {
    required,
    minLength
} from "vuelidate/lib/validators";
import Vue from "vue";

export default {
    components: {
        FullCalendar
    },
    computed: {
        buttonText: function () {
            return {
                prev: this.$t('message.prev'),
                next: this.$t('message.next'),
                today: this.$t('message.today'),
                month: this.$t('message.month'),
                week: this.$t('message.week'),
                day: this.$t('message.day'),
                list: this.$t('message.list')
            }
        }
    },
    data() {
        return {
            calendarPlugins: [dayGridPlugin, interactionPlugin],
            submitData: {
                name: null,
                start_date: null,
                end_date: null,
                description: null,
                type: null
            },
            calendarWeekends: true,
            showPopover: false,
            offset: null,
            left: null,
            top: null,
            events: [{
                title: 'event2',
                start: '2020-06-10',
                end: '2020-06-13',
                id: 12,
                className: ['orange']
            }],
            is_edit: false,
            title_modal: 'create',
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
            submitStatus: null,
        }
    },
    validations: {
        submitData: {
            name: {
                required
            },
            start: {
                required
            },
            end: {
                required
            },
            description: {
                required
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            getEvents({
                limit: 10000
            }).then(res => {

                res.data.results.forEach(val => {
                    val.start = format(new Date(val.start_date), 'yyyy-MM-dd HH:mm:ss')
                    val.start_date = val.start
                    val.end = format(new Date(val.end_date), 'yyyy-MM-dd HH:mm:ss')
                    val.end_date = val.end
                    val.title = val.name
                    // console.log(val)
                    switch (val.privilege) {
                        case 1:
                            val.className = 'orange'
                            break;
                        case 2:
                            val.className = 'blue'
                            break
                        case 3:
                            val.className = 'red'
                            break
                    }
                })
                this.events = res.data.results
            }).catch(error => {
                for (var k in error.response.data) {
                    this.makeToast("danger", error.response.data[k], k, 'error');
                }
            })
        },
        addEvent() {
            this.$refs.modal_view.show()
            this.resetModal()
            this.is_edit = false
            this.title_modal = 'create'
        },
        eventClick(event, $el, pos) {
            this.is_edit = true
            this.title_modal = 'edit'
            var dt = this.events.filter(val => {
                return event.event.id * 1 === val.id * 1
            })
            dt[0].end_date = dt[0].end
            dt[0].start_date = dt[0].start
            this.submitData = dt[0]

            this.$refs.modal_view.show()
        },
        ChangePriority(id) {
            this.submitData.privilege = id
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault()
            this.$v.submitData.$touch()
            if (this.$v.submitData.$anyError) {
                return
            }

            this.submitStatus = 'PENDING'
            // if (this.is_edit) {
            //   this.submitData.start_date = format(new Date(this.submitData.start), 'dd.MM.yyyy') + ' ' + format(new Date(this.submitData.end), 'HH:mm:ss')
            // } else {
            //   this.submitData.start_date = new Date(this.submitData.start + ' ' + this.submitData.end)
            // }
            var dateParts = this.submitData.start.split(".");
            // console.log(dt)
            this.submitData.start_date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' ' + this.submitData.end

            this.submitData.end_date = this.submitData.start_date
            // console.log( this.submitData.start_date)
            this.submit()
        },
        submit() {
            if (this.is_edit) {
                putEvents(this.submitData, this.submitData.id).then(res => {
                    this.submitStatus = 'OK'
                    this.$refs.modal_view.hide()
                    this.fetchData()
                }).catch(error => {
                    this.submitStatus = 'ERROR'
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], k, 'error');
                    }
                })
            } else {
                postEvents(this.submitData).then(res => {
                    this.submitStatus = 'OK'
                    this.$refs.modal_view.hide()
                    this.fetchData()
                }).catch(error => {
                    this.submitStatus = 'ERROR'
                    for (var k in error.response.data) {
                        this.makeToast("danger", error.response.data[k], k, 'error');
                    }
                })
            }
        },
        resetModal() {
            this.submitData = {
                name: null,
                start_date: null,
                end_date: null,
                description: null,
                privilege: null
            }
        },
        deleteEvent(id) {
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
                    this.$refs.modal_view.hide()
                    deleteEvents(id).then(() => {
                        this.fetchData()
                        this.$swal( this.$t('message.deleted'), this.$t('message.deleted_message'), "success");
                    }).catch(error => {
                        for (var k in error.response.data) {
                            this.makeToast("danger", error.response.data[k], k, 'error');
                        }
                    })
                }
            });
        },
        select: function (info) {
            this.resetModal()
            // console.log(info)
            this.submitData.start_date = info.startStr
            this.$refs.modal_view.show()
            this.is_edit = false
            this.title_modal = this.$t('message.create')
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

<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style><style>
.red {
    background: rgb(235, 77, 77) !important;
    color: whitesmoke !important;
}

.blue {
    background: rgb(59, 59, 163) !important;
    color: whitesmoke !important;
}

.orange {
    background: orange !important;
    color: white !important;
}

.green {
    background: rgb(49, 155, 49) !important;
    color: white !important;
}

.blue,
.orange,
.red,
.green {
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
}

.event-item {
    padding: 2px 0 2px 4px !important;
}

.fc-toolbar h2 {
    text-transform: capitalize;
}
</style>
