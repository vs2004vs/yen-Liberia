import "./assets/main.css"

import {
  createApp,
} from "vue"

import {
  createPinia,
} from "pinia"

import App from "./App.vue"

import router from "./router"


/*
|--------------------------------------------------------------------------
| APPLICATION
|--------------------------------------------------------------------------
*/

const app =
  createApp(App)


/*
|--------------------------------------------------------------------------
| PLUGINS
|--------------------------------------------------------------------------
*/

app.use(
  createPinia(),
)

app.use(
  router,
)


/*
|--------------------------------------------------------------------------
| INITIAL ROUTER NAVIGATION
|--------------------------------------------------------------------------
|
| Vue Router resolves the initial route asynchronously.
|
| Waiting for router.isReady() ensures the requested page and its
| lazy-loaded route component are resolved before the application
| is mounted.
|
*/

router
  .isReady()

  .then(() => {
    app.mount(
      "#app",
    )
  })

  .catch((error) => {
    console.error(
      "Failed to initialize YEN-Liberia:",
      error,
    )
  })