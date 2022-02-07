/**
 * @jest-environment jsdom
 */
import { SideMenu } from "./Controller";
import { user } from "../../../__mocks__/mockData";
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../../assets/index.html"),
  "utf8"
);

describe("page", () => {
  let auth;
  let container;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    auth = SideMenu();
    auth.onUser(user);
    container = document.querySelector("#menu");
  });
  test("pageLoaded", () => {
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
  test("isLogin", () => {
    const profile = container.querySelector("#profile");
    if (user.isLogin) {
      expect(profile.childNodes.length).toBeGreaterThan(0);
    }
  });
});
