<template>
  <vue-perfect-scrollbar
    class="sidebar-panel rtl-ps-none ps scroll"
    @mouseleave.native="
      sidebarCompact();
      returnSelectedParentMenu();
    "
    @mouseenter.native="removeSidebarCompact"
    :class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact,
    }"
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
  >
    <div>
      <div
        class="gull-brand text-center d-flex align-items-center pl-2 mb-2 justify-content-between"
      >
        <div><img class="" src="@/assets/images/logo.png" width="45" /></div>
        <div class="toggle-sidebar-compact">
          <label class="switch ul-switch switch-primary ml-auto">
            <input @click="switchSidebar" type="checkbox" />
            <span class="ul-slider o-hidden"></span>
          </label>
        </div>
      </div>

      <div class="close-mobile-menu" @click="mobileSidebar">
        <i class="text-16 text-primary i-Close-Window font-weight-bold"></i>
      </div>

      <div class="mt-4 main-menu">
        <ul class="ul-vertical-sidebar pl-4" id="menu">
          <!-- <p class="main-menu-title text-muted ml-3 font-weight-700 text-13 mt-4 mb-2">Apps</p> -->
          <li class="Ul_li--hover">
            <div>
              <router-link
                class="has-arrow"
                to="/"
                v-if="users.role != 4"
                :class="{ active: selectedParentMenu == 'dashboards' }"
              >
                <i class="i-Gears-2 text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.dashboard") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover">
            <div>
              <router-link
                class="has-arrow"
                to="/app/statistics"
                :class="{ active: selectedParentMenu == 'statistics' }"
              >
                <i class="i-Optimization text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.dashboardItems.statistic") }}</span
                >
              </router-link>
            </div>
          </li>

          <!-- <li class="Ul_li--hover" v-if="users.role === 3">
          <div>
            <router-link class="has-arrow " to="/press-secretaries/index" :class="{ active: selectedParentMenu == 'ui-kits' }">
              <i class="i-Network text-20 mr-2"></i>
              <span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">{{$t('message.press_secretaries')}}</span>
            </router-link>
          </div>
        </li> -->
          <li class="Ul_li--hover" v-if="users.role != 4">
            <div>
              <router-link
                class="has-arrow"
                to="/articles/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-ID-3 text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.articles") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role != 4">
            <div>
              <router-link
                class="has-arrow"
                to="/criticism/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Folder-Trash text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.criticism") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role != 4">
            <div>
              <router-link
                class="has-arrow"
                to="/media-publication/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Optimization text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.media_publications") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role != 4">
            <div>
              <router-link
                class="has-arrow"
                to="/interview/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Microphone-3 text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.media_interview") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role != 4">
            <div>
              <router-link
                class="has-arrow"
                to="/media-request/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Double-Tap text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.media_inquiries") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role === 3">
            <div>
              <router-link
                class="has-arrow"
                to="/events/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Check text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.event_plan") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role === 3">
            <div>
              <router-link
                class="has-arrow"
                to="/tasks/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Flag text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.tasks") }}</span
                >
              </router-link>
            </div>
          </li>
          <li class="Ul_li--hover" v-if="users.role === 3">
            <div>
              <router-link
                class="has-arrow"
                to="/users/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-Network text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.users") }}</span
                >
              </router-link>
            </div>
          </li>
          <!-- <li class="Ul_li--hover">
            <div>
              <router-link
                class="has-arrow"
                to="/call-center/index"
                :class="{ active: selectedParentMenu == 'ui-kits' }"
              >
                <i class="i-ID-3 text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.call_center") }}</span
                >
              </router-link>
            </div>
          </li> -->
          <li class="Ul_li--hover" >
            <div v-b-toggle.collapse-1>
              <a
                class="has-arrow"
                href="#"
                :class="{ active: selectedParentMenu == 'dashboards' }"
              >
                <i class="i-Gears-2 text-20 mr-2"></i>
                <span
                  class="text-15"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                  >{{ $t("message.directories") }}</span
                >
                <arrowIcon />
              </a>
            </div>
            <!-- Collapse  Start -->
            <b-collapse id="collapse-1">
              <ul
                class="Ul_collapse"
                :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
              >
                <li class="Ul_li--hover" v-if="users.role != 4">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/media/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Megaphone text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.media") }}</span
                      >
                    </router-link>
                  <!-- </div> -->
                </li>
                <li class="Ul_li--hover" v-if="users.role != 4">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/journalists/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Notepad text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.journalists") }}</span
                      >
                    </router-link>
                  <!-- </div> -->
                </li>
                <li class="Ul_li--hover" v-if="users.role != 4">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/press-secretaries/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Notepad text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.press_secretaries") }}</span
                      >
                    </router-link>
                  <!-- </div> -->
                </li>
                <li class="Ul_li--hover" v-if="users.role === 3">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/management-edu/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Receipt-4 text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.edu_management") }}</span
                      >
                    </router-link>
                  <!-- </div> -->
                </li>
                <li class="Ul_li--hover" v-if="users.role === 3">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/territorial-administration/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Target text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.territorial") }}<br/> {{ $t("message.administrationn") }} </span
                      >
               
                    </router-link>
                           <br>
                  <!-- </div> -->
                </li>
                <li class="Ul_li--hover" v-if="users.role === 3">
                  <!-- <div> -->
                    <router-link
                      class="has-arrow"
                      to="/republican-administration/index"
                      :class="{ active: selectedParentMenu == 'ui-kits' }"
                    >
                      <i class="i-Library text-20 mr-2"></i>
                      <span
                        class="text-15"
                        :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                        >{{ $t("message.republican") }}<br/> {{ $t("message.administrationn") }} </span
                      >
                  
                    </router-link>
                        <br>
                  <!-- </div> -->
                </li>
                <li v-if="users.role === 3">
                  <router-link class="has-arrow" to="/region/index">
                    <i class="i-Circular-Point mr-2"></i>
                    <span
                      class="text-15"
                      :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                      >{{ $t("message.region") }}</span
                    >
                  </router-link>
                </li>

                <li
                  class="Ul_collapse"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }" v-if="users.role === 3"
                >
                  <router-link class="has-arrow" to="/city/index">
                    <i class="i-Circular-Point mr-2"></i>
                    <span
                      class="text-15"
                      :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                      >{{ $t("message.city") }}</span
                    >
                  </router-link>
                </li>

                <li
                  class="Ul_collapse"
                  :class="{ 'vertical-item-name': getVerticalCompact.isItemName }" v-if="users.role === 3"
                >
                  <router-link class="has-arrow" to="/applicants-type/index">
                    <i class="i-Circular-Point mr-2"></i>
                    <span
                      class="text-15"
                      :class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
                      >{{ $t("message.types_of_applications") }}</span
                    >
                  </router-link>
                </li>
              </ul>
            </b-collapse>
          </li>
        </ul>
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import arrowIcon from "@/components/arrow/arrowIcon";
export default {
  components: {
    arrowIcon,
  },
  computed: {
    ...mapGetters(["getVerticalCompact", "getVerticalSidebar"]),
  },
  data() {
    return {
      selectedParentMenu: "",
      users: this.$store.getters.user,
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    document.addEventListener("click", this.returnSelectedParentMenu);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
  },
  methods: {
    ...mapActions([
      "switchSidebar",
      "sidebarCompact",
      "removeSidebarCompact",
      "mobileSidebar",
    ]),

    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path.split("/").filter((x) => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    returnSelectedParentMenu() {
      this.toggleSelectedParentMenu();
    },
  },
};
</script>

<style>
.layout-sidebar-vertical .sidebar-panel {
  /*background: rgb(17,19,34) !important;*/
  background: url(../../../assets/images/sidebar-back.png);
}

.layout-sidebar-vertical .Ul_li--hover > div > a::before {
  background-color: #fcfcfc !important;
}

.layout-sidebar-vertical .ul-vertical-sidebar a.has-arrow {
  color: #fff;
}
</style>
