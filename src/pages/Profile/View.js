import moment from "moment";
import BackIcon from "../../assets/back.png";
import CalendarIcon from "../../assets/calendar.png";
import CommentsIcon from "../../assets/comments.png";
import ImageIcon from "../../assets/image.png";
import BoldIcon from "../../assets/bold.png";
import ActiveBoldIcon from "../../assets/activeBold.png";

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.profile = this.createElement("div", "profileUser");
    this.profile.id = "profile";
    this.app.append(this.profile);

    this.initialData = {
      text: "",
      image: null,
      bold: false,
    };

    this.data = {
      text: "",
      image: null,
      bold: false,
    };
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayPosts(post, block) {
    const postBlock = this.createElement("div", "postBlock");
    postBlock.id = post.id;
    const contentPost = this.createElement("div", "contentPost");

    const avatarPost = this.createElement("img", "avatarPost");
    avatarPost.src = post.user.photoURL;
    avatarPost.style.border = `2px solid ${post.user.color}`;

    const infoComent = this.createElement("div", "infoComent");
    const namePost = this.createElement("span", "namePost");
    namePost.textContent = post.user.userName;
    const datePost = this.createElement("span", "datePost");
    datePost.textContent = moment(post.createDate).fromNow();
    infoComent.append(namePost, datePost);

    const textPost = this.createElement("span", "textPost");
    textPost.textContent = post.text;
    textPost.style.fontWeight = post.bold ? "bold" : "400";

    const imagePost = this.createElement("img", "imagePost");
    imagePost.src = post.imageURL;

    const linkToCommets = this.createElement("a", "iconLink");
    linkToCommets.href = `?id=${post.id}#comments`;

    const commentsIc = this.createElement("img", "icon");
    commentsIc.src = CommentsIcon;

    const counterComment = this.createElement("span", "counterComment");
    if (post.comments) {
      counterComment.textContent = Object.keys(post.comments).length;
    } else {
      counterComment.style.display = "none";
    }

    linkToCommets.append(commentsIc, counterComment);

    contentPost.append(infoComent, textPost, imagePost, linkToCommets);
    postBlock.append(avatarPost, contentPost);
    block.append(postBlock);
  }

  displayPost(posts, user, profile) {
    if (this.profile.firstChild) {
      const postsList = this.getElement(".postsList");
      const input = this.getElement("input");
      const image = this.getElement(".prevImage");
      input.value = "";
      image.src = "";
      input.style.fontWeight = "500";

      while (postsList.firstChild) {
        postsList.removeChild(postsList.firstChild);
      }

      if (posts.length) {
        posts.forEach((post) => {
          this.displayPosts(post, postsList);
        });
      }
    } else {
      if (Object.keys(profile).length) {
        const back = this.createElement("a", "backLink");
        back.href = "/#";
        const backIc = this.createElement("img");
        backIc.src = BackIcon;
        back.append(backIc, profile.userName);

        const contentProfile = this.createElement("div");

        const blockAvatar = this.createElement("div", "blockAvatar");
        blockAvatar.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/tritter-abb6f.appspot.com/o/images%2F84094350.jpeg?alt=media&token=8294bb5d-6439-47b3-979c-ebab4cc5f7e4)`;

        const avatarProfile = this.createElement("img");
        avatarProfile.src = profile.photoURL;
        avatarProfile.style.border = `4px solid ${profile.color}`;
        blockAvatar.append(avatarProfile);

        const infoProfile = this.createElement("div", "infoProfile");
        const nameProfile = this.createElement("span", "name");
        nameProfile.textContent = profile.userName;
        const loginProfile = this.createElement("span", "login");
        loginProfile.textContent = "@" + profile.login;
        const dateProfile = this.createElement("span", "date");
        const calendarIc = this.createElement("img");
        calendarIc.src = CalendarIcon;
        dateProfile.append(
          calendarIc,
          `Created ${moment(profile.createDate).format("MMM Do YY")}`
        );
        infoProfile.append(nameProfile, loginProfile, dateProfile);

        const form = this.createElement("div", "form");
        if (user.isLogin && user.uid === profile.uid) {
          const block = this.createElement("div", "formBlock");
          const write = this.createElement("div", "write");
          const settings = this.createElement("div", "setting");

          const input = this.createElement("input");
          input.value = this.data.text;
          input.type = "text";
          input.placeholder = `Что нового?`;
          input.name = "post";
          const submitButton = this.createElement("button");
          submitButton.id = "create";
          submitButton.textContent = "Тритнуть";
          write.append(input, submitButton);
          this.buttonCreate = submitButton;

          input.addEventListener("input", (e) => {
            this.data.text = e.target.value;
          });

          const inputImage = this.createElement("input", "inputImage");
          const label = this.createElement("label", "inputLabel");
          const imageIc = this.createElement("img");
          inputImage.type = "file";
          inputImage.id = "load-image";
          inputImage.accept = ".jpg, .jpeg, .png";
          label.htmlFor = "load-image";
          imageIc.src = ImageIcon;
          label.append(imageIc);

          const boldIc = this.createElement("img", "boldIc");
          boldIc.src = BoldIcon;

          boldIc.addEventListener("click", () => {
            if (this.data.bold) {
              boldIc.id = "";
              boldIc.src = BoldIcon;
              this.data.bold = false;
              input.style.fontWeight = "500";
            } else {
              boldIc.id = "active";
              boldIc.src = ActiveBoldIcon;
              this.data.bold = true;
              input.style.fontWeight = "bold";
            }
          });

          settings.append(inputImage, label, boldIc);

          this.loadImage = this.createElement("img", "prevImage");

          inputImage.addEventListener("input", (e) => {
            this.data.image = inputImage.files[0];
            this.loadImage.src = URL.createObjectURL(inputImage.files[0]);
          });

          block.append(write, settings, this.loadImage);
          form.append(block);
        }

        const postList = this.createElement("div", "postsList");

        if (posts.length) {
          posts.forEach((post) => {
            this.displayPosts(post, postList);
          });
        }

        contentProfile.append(blockAvatar, infoProfile, form, postList);
        this.profile.append(back, contentProfile);
      }
    }
  }

  createPost(handler) {
    this.profile.addEventListener("click", (event) => {
      if (event.target.id === "create" && this.data.text) {
        handler(this.data);
        this.data = { ...this.initialData };
        this.loadImage.src = "";
        this.getElement(".boldIc").id = "";
        this.getElement(".boldIc").src = BoldIcon;
      }
    });
  }
}

export default View;
