/**
 * @jest-environment jsdom
*/
import { Home } from "./Controller";
import { posts, user } from "../../../__mocks__/mockData"
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../../assets/index.html"), "utf8");

describe("page", () => {
  let home;
  let container;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    home = Home();
    home.onPostsChanged(posts, user)
    container = document.querySelector("#home");
  });
  test("pageLoaded", () => {
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
  test("isBorder", () => {
    const postBlock = document.querySelector('#m')
    const img = postBlock.querySelector('.avatar')
    expect(img.style.border).toBe(`2px solid ${posts[0].user.color}`)
  })
});