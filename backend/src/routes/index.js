const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const bandRoute = require('./band.route');
const rehearsalRoute = require('./rehearsal.route');
const docsRoute = require('./docs.route');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/bands',
    route: bandRoute,
  },
  {
    path: '/rehearsals',
    route: rehearsalRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;