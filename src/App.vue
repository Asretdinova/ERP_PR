<template>
  <div>
    <router-view></router-view>
    <!--<customizer></customizer>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    },
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "MNO",
      // all titles will be injected into this template
      titleTemplate: "%s | MNO ERP",
      bodyAttrs: {
        class: [this.themeName, "text-left"],
      },
      htmlAttrs: {
        dir: this.rtl,
      },
    };
  },
};
</script>

<style>
.layout-sidebar-large .main-content-wrap {
  margin-top: 60px !important;
}
.modal-header.bg-danger .modal-title,
.modal-header.bg-danger .close {
  color: #fff !important;
}
</style>
