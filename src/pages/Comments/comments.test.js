/**
 * @jest-environment jsdom
*/
import { Comments } from "./Controller";
import { post, user } from "../../../__mocks__/mockData"
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../../assets/index.html"), "utf8");

describe("page", () => {
  let comments;
  let container;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    comments = Comments();
    comments.onTodoListChanged(post, user)
    container = document.querySelector("#comments");
  });
  test("pageLoaded", () => {
    expect(container.childNodes.length).toBeGreaterThan(0);
  });
  test("isText", () => {
    const postContent = document.querySelector('.main')
    const text = postContent.querySelector('.textPost')
    expect(text.textContent).toBe(post.text)
  })
});