import FAQ from "../views/faq/FAQ.vue";

const routes = [
  {
    path: "/guest",
    alias: "/",
    name: "faq",
    component: FAQ
  },
  {
    path: "/admin",
    alias: "",
    name: "faqAdmin",
    meta: {
      onlyAdmin: true
    },
    // route level code-splitting
    // this generates a separate chunk (FAQAdmin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "FAQAdmin" */ "../views/faq/FAQAdmin.vue"),
    children: [
      {
        path: "/admin/list",
        alias: "/",
        name: "listFAQ",
        meta: {
          onlyAdmin: true
        },
        // route level code-splitting
        // this generates a separate chunk (ListFAQ.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "ListFAQ" */ "../components/faq/ListFAQ.vue"
          )
      },
      {
        path: "/admin/:id",
        alias: "",
        name: "detailFAQ",
        meta: {
          onlyAdmin: true
        },
        // route level code-splitting
        // this generates a separate chunk (AdminEditFAQ.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "AdminEditFAQ" */ "../components/faq/AdminEditFAQ.vue"
          )
      }
    ]
  },
  {
    // not found handler
    path: "*",
    name: "notFound",
    // route level code-splitting
    // this generates a separate chunk (NotFound.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
  }
];

export default routes;
