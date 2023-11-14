import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";

Vue.use(Router);

/*****************List of Components**************************/
const Dashboard = () => import("./views/app/dashboard")
const Statistics = () => import("./views/app/statistics")

const MediaIndex = () => import("./views/media/media_index")
const MediaForm = () => import("./views/media/media_form")

const JournalistsIndex= () => import("./views/journalists/index")

const ManagementEDU = () => import("./views/management_edu/management_table")
const ManagementEDUForm = () => import("./views/management_edu/management_form")

const TerritorialAdministration = () => import("./views/territorial_administration/index")
const TerritorialAdministrationFrom = () => import("./views/territorial_administration/form")

const RepublicanAdministration = () => import("./views/republican_administration/index")
const RepublicanAdministrationFrom = () => import("./views/republican_administration/form")

const PressSecretaries = () => import("./views/press_secretaries/index")
const PressSecretariesFrom = () => import("./views/press_secretaries/form")

const ArticlesIndex = () => import("./views/articles/index")
const ArticlesFrom = () => import("./views/articles/form")

const CriticismIndex = () => import("./views/criticism/index2")
const CriticismFrom = () => import("./views/criticism/form")
const CriticismType = () => import("./views/criticism/types")

const PublicationIndex = () => import("./views/media_publications/publication_index")
const PublicationForm = () => import("./views/media_publications/publication_form")

const InterviewIndex = () => import("./views/interview/interview_index")

const MediaRequestIndex = () => import("./views/media_request/index")
const MediaRequestForm = () => import("./views/media_request/form")

const EventsIndex = () => import("./views/events/events_index")

const TasksIndex = () => import("./views/tasks/index_tasks")

const UsersListIndex = () => import("./views/users/index")

const CallCenterIndex = () => import("./views/call_center/index")
const CallCenterForm = () => import("./views/call_center/form")
const CityIndex = () => import("./views/city/index")
const RegionIndex = () => import("./views/region/index")
/******************End of List************************/

const routes = [
  {
    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    redirect: "/app/dashboards",

    children: [
      {
        path: "/app/dashboards",
        component: Dashboard,
      },
      {
        path: "/app/statistics",
        component: Statistics,
      },
      {
        path: "/media/index",
        component: MediaIndex,
      },
      {
        path: "/media/create",
        component: MediaForm,
      },
      {
        path: "/media/edit/:id",
        component: MediaForm,
      },
      {
        path: "/journalists/index",
        component: JournalistsIndex,
      },
      {
        path: "/management-edu/index",
        component: ManagementEDU,
      },
      {
        path: "/management-edu/create",
        component: ManagementEDUForm,
      },
      {
        path: "/management-edu/edit/:id",
        component: ManagementEDUForm,
      },
      {
        path: "/territorial-administration/index",
        component: TerritorialAdministration,
      },
      {
        path: "/territorial-administration/create",
        component: TerritorialAdministrationFrom,
      },
      {
        path: "/territorial-administration/edit/:id",
        component: TerritorialAdministrationFrom,
      },
      {
        path: "/republican-administration/index",
        component: RepublicanAdministration,
      },
      {
        path: "/republican-administration/create",
        component: RepublicanAdministrationFrom,
      },
      {
        path: "/republican-administration/edit/:id",
        component: RepublicanAdministrationFrom,
      },
      {
        path: "/press-secretaries/index",
        component: PressSecretaries,
      },
      {
        path: "/press-secretaries/create",
        component: PressSecretariesFrom,
      },
      {
        path: "/press-secretaries/edit/:id",
        component: PressSecretariesFrom,
      },
      {
        path: "/articles/index",
        component: ArticlesIndex,
      },
      {
        path: "/articles/create",
        component: ArticlesFrom,
      },
      {
        path: "/articles/edit/:id",
        component: ArticlesFrom,
      },
      {
        path: "/criticism/index",
        component: CriticismIndex,
      },
      {
        path: "/criticism/create",
        component: CriticismFrom,
      },
      {
        path: "/criticism/edit/:id",
        component: CriticismFrom,
      },
      {
        path: "/media-publication/index",
        component: PublicationIndex,
      },
      {
        path: "/media-publication/create",
        component: PublicationForm,
      },
      {
        path: "/media-publication/edit/:id",
        component: PublicationForm,
      },
      {
        path: "/interview/index",
        component: InterviewIndex,
      },
      {
        path: "/media-request/index",
        component: MediaRequestIndex,
      },
      {
        path: "/media-request/create",
        component: MediaRequestForm,
      },
      {
        path: "/media-request/edit/:id",
        component: MediaRequestForm,
      },
      {
        path: "/events/index",
        component: EventsIndex,
      },
      {
        path: "/tasks/index",
        component: TasksIndex,
      },
      {
        path: "/users/index",
        component: UsersListIndex,
      },
      {
        path: "/call-center/index",
        component: CallCenterIndex,
      },
      {
        path: "/call-center/create",
        component: CallCenterForm,
      },
      {
        path: "/call-center/edit/:id",
        component: CallCenterForm,
      },
      {
        path: "/city/index",
        component: CityIndex
      },
      {
        path: "/region/index",
        component: RegionIndex
      },
      {
        path: "/applicants-type/index",
        component: CriticismType
      }
    ]
  },
  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/sessions"),
    children: [
      {
        path: "/signIn",
        component: () => import("./views/sessions/signIn")
      },
      {
        path: "signUp",
        component: () => import("./views/sessions/signUp")
      },
      {
        path: "forgot",
        component: () => import("./views/sessions/forgot")
      }
    ]
  },

/*  {
    path: "/vertical-sidebar",
    component: () => import("./containers/layouts/verticalSidebar")
  },*/
  {
    path: "*",
    component: () => import("./views/app/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
