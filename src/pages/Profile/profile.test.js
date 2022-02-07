/**
 * @jest-environment jsdom
*/
import { Profile } from "./Controller";
import { posts, user, profile as name } from "../../../__mocks__/mockData"
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../../assets/index.html"), "utf8");

describe("page", () => {
  let profile;
  let container;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    profile = Profile();
    profile.onPostsChanged(posts, user, name)
    container = document.querySelector("#profile");
  });
  test("pageLoaded", () => {
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
  test("isPhoto", () => {
    const postBlock = document.querySelector('#m')
    const img = postBlock.querySelector('img')
    expect(img.src).toBe(posts[0].user.photoURL)
  })
});

