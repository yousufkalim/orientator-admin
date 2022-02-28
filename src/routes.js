/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Articles from "views/articles/Articles";
import Construction from "views/Construction";
import Profile from "views/Profile.js";
import Maps from "views/Maps.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Tables from "views/Tables.js";
import Icons from "views/Icons.js";
import Users from "views/users/Users.js";
import Results from "views/Results.js";

var routes = [
  {
    path: "/index",
    name: "Tableau de bord",
    icon: "ni ni-tv-2 text-primary",
    component: Articles,
    layout: "/admin",
  },
  {
    path: "/articles",
    name: "Blog",
    icon: "ni ni-single-copy-04 text-red",
    component: Articles,
    layout: "/admin",
  },
  // {
  //   path: "/admins",
  //   name: "Admins",
  //   icon: "ni ni-planet text-blue",
  //   component: Construction,
  //   layout: "/admin",
  // },
  // {
  //   path: "/creators",
  //   name: "Creators",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Construction,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Construction,
  //   layout: "/admin",
  // },
  {
    path: "/users",
    name: "Utilisateurs",
    icon: "ni ni-single-02 text-yellow",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/results",
    name: "Résultat",
    icon: "ni ni-bullet-list-67 text-red",
    component: Results,
    layout: "/admin",
  },

  {
    path: "/register",
    name: "Register",
    icon: "ni ni-key-25 text-info",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-circle-08 text-pink",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
