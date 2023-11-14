<template>
<div class="main-content">
  <breadcumb :page="'tasks'" :folder="'board'" />
   <div class="mb-3 text-right">
                <b-button variant="success btn-icon ripple m-1" @click="addTask(1)" v-b-modal.modal-form>
                    <span class="ul-btn__icon">+ {{$t('message.new_task')}}</span>
                </b-button>
            </div>
  <b-row>
    <b-col md="4" class="mb-30">
      <b-card class="bg-dark text-white mb-30 o-hidden " no-body>
        <img src="@/assets/images/start_task.jpg" class="card-img-size" alt />
        <div class="card-img-overlay h-100">
          <div class="d-flex justify-content-between mb-3">
            <p class="card-title m-0 text-white">{{$t('message.new_tasks')}}</p>

            <p class="text-white pointer-event" @click="addTask(1)" v-b-modal.modal-form>
              <i class="nav-icon i-Pen-2"></i>
            </p>
          </div>
          <b-row class="h-100  scroll">
            <b-col md="12" @drop='onDrop($event, 1)'>
              <draggable v-bind="dragOptions">
                <transition-group type="transition" :name="!drag ? 'flip-list' : 'flip-list'" class="card-task">
                  <b-card class=" mb-30 manage_task_list" v-for="element in list1" :key="element.name" :clone="selectItem" no-body @dragstart='startDrag($event, element)'>
                    <b-card-body>
                      <div class="d-sm-flex align-item-sm-center flex-sm-nowrap justify-content-between ">
                        <div>
                          <h5><a @click="openDialog(element)">{{element.name}}</a></h5>
                          <p class="ul-task-manager__paragraph mb-3">
                            {{element.description}}</p>
                        </div>
                        <div class="list-inline mb-0 ">
                          <b-dropdown variant="link p-2" toggle-class="text-decoration-none" no-caret>
                            <template slot="button-content"><i class="i-Gear-2"></i>
                            </template>
                            <b-dropdown-item @click="editItem(element)">
                              {{$t('message.edit')}}
                            </b-dropdown-item>
                            <b-dropdown-item @click="deleteItem(element.id)">
                              {{$t('message.delete')}}
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </b-card-body>
                    <b-card-footer class="task_list_card">
                      <small class="text-muted d-sm-flex justify-content-sm-between align-items-sm-center">
                        <span>
                          <!--Due: <span class="font-weight-semibold">18 hours</span>--></span>

                        <span class="ul-task-manager__font-date text-muted">{{element.deadline}}</span>

                      </small>
                    </b-card-footer>
                  </b-card>
                </transition-group>
              </draggable>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-30">
      <b-card class="bg-dark text-white mb-30 o-hidden " no-body>
        <img src="@/assets/images/on_work.jpg" class="card-img-size" alt />
        <div class="card-img-overlay h-100">
          <div class="d-flex justify-content-between mb-3">
            <p class="card-title m-0 text-white">{{$t('message.on_work')}}</p>

            <p class="text-white pointer-event" @click="addTask(2)" v-b-modal.modal-form>
              <i class="nav-icon i-Pen-2"></i>
            </p>
          </div>
          <b-row class="h-100 scroll">
            <b-col md="12" @drop='onDrop($event, 2)'>
              <draggable v-bind="dragOptions" @start="drag = true" @end="drag = false">
                <transition-group type="transition" :name="!drag ? 'flip-list' : 'flip-list'" class="card-task">
                  <b-card class=" mb-30 manage_task_list" v-for="element in list2" :key="element.name" no-body @dragstart='startDrag($event, element)'>
                    <b-card-body>
                      <div class="d-sm-flex align-item-sm-center flex-sm-nowrap justify-content-between ">
                        <div>
                          <h5><a @click="openDialog(element)">{{element.name}}</a></h5>
                          <p class="ul-task-manager__paragraph mb-3">
                            {{element.description}}</p>
                        </div>
                        <div class="list-inline mb-0 ">
                          <b-dropdown variant="link p-2" toggle-class="text-decoration-none" no-caret>
                            <template slot="button-content"><i class="i-Gear-2"></i></template>
                            <b-dropdown-item @click="editItem(element)">
                              {{$t('message.edit')}}
                            </b-dropdown-item>
                            <b-dropdown-item @click="deleteItem(element.id)">
                              {{$t('message.delete')}}
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </b-card-body>
                    <b-card-footer class="task_list_card">
                      <small class="text-muted d-sm-flex justify-content-sm-between align-items-sm-center">
                        <span>
                          <!--Due: <span class="font-weight-semibold">18 hours</span>--></span>
                        <span class="ul-task-manager__font-date text-muted">{{element.deadline}}</span>
                      </small>
                    </b-card-footer>
                  </b-card>
                </transition-group>
              </draggable>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-col>
    <b-col md="4" class="mb-30">
      <b-card class="bg-dark text-white mb-30 o-hidden" no-body>
        <img src="@/assets/images/end_task.jpg" class="card-img-size" alt />
        <div class="card-img-overlay h-100">
          <div class="d-flex justify-content-between mb-3 ">
            <p class="card-title m-0 text-white">{{$t('message.closed')}}</p>
            <p class="text-white pointer-event" @click="addTask(3)" v-b-modal.modal-form>
              <i class="nav-icon i-Pen-2"></i>
            </p>
          </div>
          <b-row class="h-100 scroll" id="closed_card">
            <b-col md="12" @drop='onDrop($event, 3)'>
              <draggable v-bind="dragOptions" @start="drag = true">
                <transition-group type="transition" :name="!drag ? 'flip-list' : 'flip-list'" class="card-task">
                  <b-card class=" mb-30 manage_task_list" v-for="element in list3" :key="element.name" no-body @dragstart='startDrag($event, element)'>
                    <b-card-body>
                      <div class="d-sm-flex align-item-sm-center flex-sm-nowrap justify-content-between ">
                        <div>
                          <h5><a @click="openDialog(element)">{{element.name}}</a></h5>
                          <p class="ul-task-manager__paragraph mb-3">
                            {{element.description}}</p>
                        </div>
                        <div class="list-inline mb-0 ">
                          <b-dropdown variant="link p-2" toggle-class="text-decoration-none" no-caret>
                            <template slot="button-content"><i class="i-Gear-2"></i>
                            </template>
                            <b-dropdown-item @click="editItem(element)">
                              {{$t('message.edit')}}
                            </b-dropdown-item>
                            <b-dropdown-item @click="deleteItem(element.id)">
                              {{$t('message.delete')}}
                            </b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>
                    </b-card-body>
                    <b-card-footer class="task_list_card">
                      <small class="text-muted d-sm-flex justify-content-sm-between align-items-sm-center">
                        <span>
                          <!--Due: <span class="font-weight-semibold">18 hours</span>--></span>

                        <span class="ul-task-manager__font-date text-muted">{{element.deadline}}</span>

                      </small>
                    </b-card-footer>
                  </b-card>
                </transition-group>
              </draggable>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-modal id="modal-form" centered :title="$t('message.'+title_form)" ref="modal_form" @hidden="resetModal" @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleOk">
      <b-form-group :label="$t('message.task_title')" :invalid-feedback="$t('message.task_title') + ' - '+ $t('message.is_required')">
        <b-form-input class="mb-2" label="title" :state="$v.submitData.name.$dirty ? !$v.submitData.name.$error : null" v-model="submitData.name" :placeholder="$t('message.enter_task_title')">
        </b-form-input>
      </b-form-group>
      <div class="row">
        <b-col md="4">
          <b-form-group :label="$t('message.document_number')" :invalid-feedback="$t('message.document_number') + ' - '+ $t('message.is_required')">
            <b-form-input class="mb-2" label="title" :state="$v.submitData.doc_number.$dirty ? !$v.submitData.doc_number.$error : null" v-model="submitData.doc_number" :placeholder="$t('message.enter_document_number')">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group :label="$t('message.document_date')" :invalid-feedback="$t('message.document_date') + ' - '+ $t('message.is_required')" :state="$v.submitData.d_date.$dirty ? !$v.submitData.d_date.$error : null">
            <date-picker v-model="submitData.d_date" :config="config" ref="datepicker"></date-picker>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group :label="$t('message.document_time')" :invalid-feedback="$t('message.document_time') + ' - '+ $t('message.is_required')" :state="$v.submitData.doc_time.$dirty ? !$v.submitData.doc_time.$error : null">
            <date-picker v-model="submitData.doc_time" :config="configTime" ref="datepicker"></date-picker>
          </b-form-group>
        </b-col>
      </div>
      <div class="row">
        <b-col md="6">
          <b-form-group :label="$t('message.deadline')" :invalid-feedback="$t('message.deadline') + ' - '+ $t('message.is_required')" :state="$v.submitData.deadline_date.$dirty ? !$v.submitData.deadline_date.$error : null">
            <date-picker v-model="submitData.deadline_date" :config="config"></date-picker>
            <vue-datetimepicker></vue-datetimepicker>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group :label="$t('message.deadline_time')" :invalid-feedback="$t('message.deadline_time') + ' - '+ $t('message.is_required')" :state="$v.submitData.deadline_time.$dirty ? !$v.submitData.deadline_time.$error : null">
            <date-picker v-model="submitData.deadline_time" :config="configTime"></date-picker>
            <vue-datetimepicker></vue-datetimepicker>
          </b-form-group>
        </b-col>
      </div>
      <b-form-group :label="$t('message.task_description')" :invalid-feedback="$t('message.task_description') + ' - '+ $t('message.is_required')">
        <b-form-textarea class="mb-2" label="title" :state="$v.submitData.description.$dirty ? !$v.submitData.description.$error : null" v-model="submitData.description" placeholder="">
        </b-form-textarea>
      </b-form-group>
      <div class="row">
        <b-col md="6">
          <b-form-group :label="$t('message.task_responsible')" :invalid-feedback="$t('message.task_responsible') + ' - '+ $t('message.is_required')" :state="$v.submitData.responsible.$dirty ? !$v.submitData.responsible.$error : null">
            <v-select v-model="submitData.responsible" :options="users_list" label="username" :reduce="st => st.id">
              <!--<template slot="option" slot-scope="option">
                                    {{ option.first_name }} {{option.last_name}}
                                </template>-->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group id="input-group-1" :label="$t('message.status')" :invalid-feedback="$t('message.status') + ' - '+ $t('message.is_required')">
            <b-form-select class="mb-2" v-model="submitData.status" :state="$v.submitData.status.$dirty ? !$v.submitData.status.$error : null" :options="{ '1': $t('message.new_tasks'), '2': $t('message.on_work'), '3': $t('message.closed') }" id="inline-form-custom-select-pref">
            </b-form-select>
          </b-form-group>
        </b-col>
      </div>
    </form>
  </b-modal>
</div>
</template>

<script>
import draggable from "vuedraggable";
import {
  format,
  parseISO
} from 'date-fns';
import {
  getTasks,
  postTasks,
  putTasks,
  deleteTasks
} from '../../api/tasks'
import {
  getUser
} from '../../api/user'
import {
  minLength,
  required
} from "vuelidate/lib/validators";
import {
  deleteEvents
} from "../../api/events";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// transition
export default {
  display: "Transitions",
  order: 7,
  components: {
    draggable,
    'v-select': VueSelect
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      drag: false,
      submitData: {
        name: null,
        description: null,
        doc_number: null,
        doc_date: null,
        responsible: null,
        report: null,
        deadline: null,
        status: 1
      },
      edit: false,
      viewData: {},
      selected_item: null,
      users_list: [],
      config: {
        format: 'yyyy-MM-DD',
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
      title_form: 'create'
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  validations: {
    submitData: {
      name: {
        required,
      },
      doc_number: {
        required
      },
      d_date: {
        required
      },
      doc_time: {
        required
      },
      responsible: {
        required
      },
      deadline_date: {
        required
      },
      deadline_time: {
        required
      },
      description: {
        required,
      },
      status: {
        required
      }
    }
  },
  mounted() {
    this.fetchData()
    this.fetchUsersList()
  },
  methods: {
    fetchData() {
      getTasks({
        limit: 1000
      }).then(res => {
        let results = res.data.results
        results.forEach(val => {
          var index = val.status * 1
          val.deadline = format(new Date(val.deadline), 'yyyy-MM-dd HH:mm:ss')
          switch (index) {
            case 1:
              this.list1.push(val)
              break
            case 2:
              this.list2.push(val)
              break
            case 3:
              this.list3.push(val)
              break
          }
        })
      }).catch(error => {
        for (var k in error.response.data) {
          this.makeToast("danger", error.response.data[k], k, 'Failed');
        }
      })
    },
    fetchUsersList() {
      getUser({
        limit: 10000
      }, 'admins').then(res => {
        this.users_list = res.data.results
      }).catch(error => {
        for (var k in error.response.data) {
          this.makeToast("danger", error.response.data[k], k, 'Failed');
        }
      })
    },
    addTask(type = 1) {
      this.submitData.status = type
    },
    resetModal() {
      this.submitData = {
        name: null,
        description: null,
        doc_number: null,
        doc_date: null,
        responsible: null,
        report: null,
        deadline: null,
        status: 1
      }
      this.edit = false
      this.title_form = 'create'
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.$v.submitData.$touch()
      if (this.$v.submitData.$anyError) {
        return
      }
      let doc_date = format(new Date(this.submitData.d_date), 'yyyy-MM-dd') + ' ' + this.submitData.doc_time
      doc_date = new Date(doc_date)
      let deadline = this.submitData.deadline_date + ' ' + this.submitData.deadline_time
      deadline = new Date(deadline)

      this.submitData.doc_date = doc_date.toISOString()
      this.submitData.deadline = deadline.toISOString()

      if (this.edit) {
        this.putData()
      } else {
        postTasks(this.submitData).then(() => {
          this.$refs.modal_form.hide()
          this.list1 = []
          this.list2 = []
          this.list3 = []
          this.fetchData()
        }).catch(error => {
          for (var k in error.response.data) {
             this.makeToast("danger", error.response.data[k], k, 'error')
          }
        })
      }
    },
    openDialog(val) {
      this.viewData = val
    },
    putData() {
      if (this.submitData.responsible.id) this.submitData.responsible = this.submitData.responsible.id
      putTasks(this.submitData, this.submitData.id).then(() => {
        this.$refs.modal_form.hide()
        this.list1 = []
        this.list2 = []
        this.list3 = []
        this.fetchData()
      }).catch(error => {
        for (var k in error.response.data) {
           this.makeToast("danger", error.response.data[k], k, 'error');
        }
      })
    },
    editItem(val) {
      this.$refs.modal_form.show()

      let deadline = new Date(val.deadline)
      val.deadline_date = format(deadline, 'yyyy-MM-dd')
      val.deadline_time = format(deadline, 'HH:mm:ss')
      let doc_date = new Date(val.doc_date)
      val.d_date = format(doc_date, 'yyyy-MM-dd')
      val.doc_time = format(doc_date, 'HH:mm:ss')
      val.d_date = doc_date

      this.submitData = val
      this.edit = true
      this.title_form = 'edit'
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
    deleteItem(id) {
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
          deleteTasks(id).then(() => {
            this.list1 = []
            this.list2 = []
            this.list3 = []
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
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      // console.log(item.id)
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('item', JSON.stringify(item))
      // console.log(evt.dataTransfer.getData('itemID'))
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = evt.dataTransfer.getData('item')
      console.log(item)
      this.submitData = JSON.parse(item)
      this.submitData.id = itemID
      this.submitData.status = list
      this.putData()
    }
  }
};
</script>

<style>
.card-task {
  width: 100%;
  display: inline-table;
  min-height: 100px;
  padding-bottom: 50px;
}

.scroll {
  max-height: 1000px;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  width: 6px;
  /* width of the entire scrollbar */
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #EAC567;
  /* color of the scroll thumb */
  border-radius: 10px;
  /* roundness of the scroll thumb */
  border: none;
  /* creates padding around scroll thumb */
}

.task_list_card {
  position: unset !important;
}

.manage_task_list {
  color: #0a0d1e;
}

.pointer-event {
  cursor: pointer;
}

.card-img-size {
  max-width: 140%;
}
</style>
