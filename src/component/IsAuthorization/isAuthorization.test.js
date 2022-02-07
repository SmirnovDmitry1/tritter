/**
 * @jest-environment jsdom
 */
import { IsAuthorization } from "./Controller";
import { logOutUser } from "../../../__mocks__/mockData";
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../../assets/index.html"),
  "utf8"
);

describe("commponent", () => {
  let auth  
  let container;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    auth = IsAuthorization()
    auth.onUser(logOutUser);
    container = document.querySelector("#auth");
  });
  test("commponentLoaded", () => {
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
});
