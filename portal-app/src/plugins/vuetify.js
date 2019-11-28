// src/plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify, {
  VApp,
  VNavigationDrawer,
  VContent,
  VContainer,
  VRow,
  VCol,
  VForm,
  VTextField,
  VSelect,
  VCheckbox,
  VBtn,
  VIcon,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VCardActions,
  VPagination,
  VList,
  VListItemGroup,
  VListItem,
  VListItemTitle,
  VListItemContent,
  VListItemAvatar,
  VListItemIcon,
  VImg,
  VTabs,
  VTabsSlider,
  VTab,
  VTabItem,
  VMenu,
  VTooltip,
  VSpacer
} from "vuetify/lib";
import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VContent,
    VContainer,
    VRow,
    VCol,
    VForm,
    VTextField,
    VSelect,
    VCheckbox,
    VBtn,
    VIcon,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
    VPagination,
    VList,
    VListItemGroup,
    VListItem,
    VListItemTitle,
    VListItemContent,
    VListItemAvatar,
    VListItemIcon,
    VImg,
    VTabs,
    VTabsSlider,
    VTab,
    VTabItem,
    VMenu,
    VTooltip,
    VSpacer
  },
  icons: {
    iconfont: "mdi" // default - only for display purposes
  },
  directives: {
    Ripple
  }
});

const opts = {};

export default new Vuetify(opts);
