<template>
<div class="mb-30">
  <header class="main-header vertical-header bg-white d-flex justify-content-between">
    <div class="menu-toggle vertical-toggle" @click="mobileSidebar">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!--   <div class="header-toggle">
        <i
          class="i-Add-UserStar mr-3 text-20 cursor-pointer"
          v-b-tooltip.hover
          title="User"
        ></i>
        <i
          class="i-Speach-Bubble-3 mr-3 text-20 cursor-pointer"
          v-b-tooltip.hover
          title="Chat"
        ></i>
        <i
          class="i-Email mr-3 text-20 cursor-pointer"
          v-b-tooltip.hover
          title="Inbox"
        ></i>
        <i
          class="i-Calendar-4 mr-3 text-20 cursor-pointer"
          v-b-tooltip.hover
          title="Calendar"
        ></i>
        <i
          class="i-Checkout-Basket mr-3 text-20 cursor-pointer"
          v-b-tooltip.hover
          title="Cart"
        ></i>
      </div>-->
    <div style="margin: auto"></div>

    <div class="header-part-right">
      <!-- Full screen toggle -->
      <div class="dropdown">
        <b-dropdown id="dropdown-1" right text="Right align" class="m-md-2 user col align-self-end" toggle-class="text-decoration-none" no-caret variant="link">
          <template slot="button-content">
            <img :src="selectedLocale.icon" alt data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
          </template>

          <b-dropdown-item v-for="language in languages" :key="language.name" @click="changeLanguage(language)">{{
            language.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <i class="i-Full-Screen header-icon d-none d-sm-inline-block" @click="handleFullScreen"></i>
      <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
      <!-- Grid menu Dropdown -->

      <!--      <div class="dropdown">
        <b-dropdown
          id="dropdown"
          text="Dropdown Button"
          class="m-md-2"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <i
              class="i-Safe-Box text-muted header-icon"
              role="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></i>
          </template>
          <div class="menu-icon-grid">
            <a href="#"> <i class="i-Shop-4"></i> Home </a>
            <a href="#"> <i class="i-Library"></i> UI Kits </a>
            <a href="#"> <i class="i-Drop"></i> Apps </a>
            <a href="#"> <i class="i-File-Clipboard-File&#45;&#45;Text"></i> Forms </a>
            <a href="#"> <i class="i-Checked-User"></i> Sessions </a>
            <a href="#"> <i class="i-Ambulance"></i> Support </a>
          </div>
        </b-dropdown>
      </div>-->

      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown id="dropdown-1" right text="Right align" class="m-md-2 user col align-self-end" toggle-class="text-decoration-none" no-caret variant="link">
          <template slot="button-content">
            <img src="@/assets/images/faces/1.jpg" id="userDropdown" alt data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> {{users.first_name}} {{users.last_name}}
            </div>
            <!--<a class="dropdown-item">Account settings</a>-->
            <a class="dropdown-item" href="#" @click.prevent="getLogOut">{{$t('message.log_out')}}</a>
          </div>
        </b-dropdown>
      </div>
    </div>
  </header>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import Util from "@/utils";

export default {
  computed: {
    ...mapGetters(["getVerticalCompact", "getVerticalSidebar", "getSideBarToggleProperties",
      "selectedLocale", "languages"
    ])
  },
  data() {
    return {
      users: this.$store.getters.user,
    };
  },
  mounted() {
    if (this.languages.length > 3) {
      this.languages.splice(0, 3)
    }
    this.$i18n.locale = this.selectedLocale.suffix.toLowerCase();
  },
  methods: {
    ...mapActions(["switchSidebar", "sidebarCompact", "removeSidebarCompact", "mobileSidebar"]),

    handleFullScreen() {
      Util.toggleFullScreen();
    },
    getLogOut() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    changeLanguage(language) {
      this.$i18n.locale = language.suffix.toLowerCase();
      this.$store.dispatch("changeLanguage", language);
    }
  }
};
</script>>
