import { SideMenu } from "./component/SideMenu/Controller.js";
import { IsAuthorization } from "./component/IsAuthorization/Controller.js";
import { Home } from "./pages/Home/Controller.js";
import { Registration } from "./component/Registration/Controller.js";
import { Login } from "./component/Login/Controller.js";
import { Comments } from "./pages/Comments/Controller";
import { Profile } from "./pages/Profile/Controller";

import "./index.scss";

let path;
let modal;
let page;

IsAuthorization();
SideMenu();

window.onload = (e) => {
  path = e.path[0].location.hash;
  updatePath(path);
};

window.addEventListener("hashchange", (e) => {
  path = e.path[0].location.hash;
  updatePath(path);
});

const removeModal = () => {
  if (modal) {
    modal?.unMount();
    modal = undefined;
  }
};

const removePage = () => {
  if (page) {
    page?.unMount();
    page = undefined;
  }
};

const updatePath = (path) => {
  removeModal();

  switch (path) {
    case "#registration":
      modal = Registration();
      break;
    case "#login":
      modal = Login();
      break;
    case "#":
      removePage();
      page = Home();
      break;
    case "#comments":
      removePage();
      page = Comments();
      break;
    case "#profile":
      removePage();
      page = Profile();
      break;
    default:
      removePage();
      page = Home();
      break;
  }
};
