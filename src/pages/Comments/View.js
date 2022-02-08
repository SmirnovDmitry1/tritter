import moment from "moment";
import BackIcon from "../../assets/back.png";
import CommentsIcon from "../../assets/comments.png";
import ImageIcon from "../../assets/image.png";
import BoldIcon from "../../assets/bold.png";
import ActiveBoldIcon from "../../assets/activeBold.png";

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.comments = this.createElement("div", "comments");
    this.contentComments = this.createElement("div");
    this.comments.id = "comments";
    this.back = this.createElement("a", "backLink");
    this.back.href = "/#";
    this.backIc = this.createElement("img");
    this.backIc.src = BackIcon;
    this.back.append(this.backIc, "Трит");
    this.comments.append(this.back, this.contentComments);
    this.app.append(this.comments);

    this.initialData = {
      text: "",
      photo: null,
      bold: false,
    };

    this.data = {
      text: "",
      photo: null,
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

  displayComment(comment, block) {
    const commentBlock = this.createElement("div", "commentBlock");
    const contentComment = this.createElement("div", "contentComment");

    const linkToProfile = this.createElement("a", "linkToProfile");
    const avatarComment = this.createElement("img", "avatarComment");
    avatarComment.src = comment.user.photoURL;
    avatarComment.style.border = `2px solid ${comment.user.color}`;
    linkToProfile.href = `./?id=${comment.userUid}#profile`;
    linkToProfile.append(avatarComment);

    const infoComent = this.createElement("div", "infoComent");
    const nameComment = this.createElement("span", "nameComment");
    nameComment.textContent = comment.user.userName;
    const dateComment = this.createElement("span", "dateComment");
    dateComment.textContent = moment(comment.createDate).fromNow();
    infoComent.append(nameComment, dateComment);

    const textComment = this.createElement("span", "textComment");
    textComment.textContent = comment.text;
    textComment.style.fontWeight = comment.bold ? 'bold' : '400'

    const imageComment = this.createElement("img", "imageComment");
    imageComment.src = comment.imageURL;

    contentComment.append(infoComent, textComment, imageComment);
    commentBlock.append(linkToProfile, contentComment);
    block.append(commentBlock);
  }

  displayPost(post, user) {
    if (this.contentComments.firstChild) {
      const commentsList = this.getElement(".commentsList");
      const input = this.getElement("input");
      const image = this.getElement(".prevImage");
      const counterComment = this.getElement(".counterComment");
      counterComment.textContent = post?.comments?.length;
      input.value = "";
      image.src = "";
      input.style.fontWeight = '500'

      while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
      }

      if (post.comments.length) {
        post.comments.forEach((comment) => {
          this.displayComment(comment, commentsList);
        });
      }
    } else {
      if (post && Object.keys(post).length) {
        const creator = this.createElement("div", "creator");
        const avatarUser = this.createElement("img");
        avatarUser.src = post.user?.photoURL;
        avatarUser.style.border = `2px solid ${post.user?.color}`;
        const infoUser = this.createElement("div", "infoUser");
        const name = this.createElement("span");
        name.textContent = post.user?.userName;
        const login = this.createElement("span", "login");
        login.textContent = "@" + post.user?.login;
        infoUser.append(name, login);
        creator.append(avatarUser, infoUser);

        const main = this.createElement("div", "main");
        const textPost = this.createElement("span", "textPost");
        textPost.textContent = post.text;
        textPost.style.fontWeight = post.bold ? '700' : '500'
        const imagePost = this.createElement("img", "imagePost");
        imagePost.src = post.imageURL ? post.imageURL : "";
        const datePost = this.createElement("span", "datePost");
        datePost.textContent = moment(post.createDate).format(
          "h:mm A · MMM D, YYYY"
        );
        main.append(textPost, imagePost, datePost);

        const panel = this.createElement("div", "panel");
        const commentIc = this.createElement("img", "commentIc");
        commentIc.src = CommentsIcon;
        const counterComment = this.createElement("span", "counterComment");
        counterComment.textContent = post?.comments ? post?.comments?.length : "";
        panel.append(commentIc, counterComment);

        const form = this.createElement("div", "form");
        if (user.isLogin) {
          const block = this.createElement("div", "formBlock");
          const write = this.createElement("div", "write");
          const settings = this.createElement("div", "setting");

          const input = this.createElement("input");
          input.value = this.data.text;
          input.type = "text";
          input.placeholder = `Оцени трит`;
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
              input.style.fontWeight = '500'
            } else {
              boldIc.id = "active";
              boldIc.src = ActiveBoldIcon;
              this.data.bold = true;
              input.style.fontWeight = 'bold'
            }
          });

          settings.append(inputImage, label, boldIc);

          this.loadImage = this.createElement("img", "prevImage");

          inputImage.addEventListener("input", (e) => {
            this.data.photo = inputImage.files[0];
            this.loadImage.src = URL.createObjectURL(inputImage.files[0]);
          });

          block.append(write, settings, this.loadImage);
          form.append(block);
        }

        const commentsList = this.createElement("div", "commentsList");

        if (post?.comments?.length) {
          post.comments.forEach((comment) => {
            this.displayComment(comment, commentsList);
          });
        }

        this.contentComments.append(creator, main, panel, form, commentsList);
      }
    }
  }

  createComment(handler) {
    this.comments.addEventListener("click", (event) => {
      if (event.target.id === "create" && this.data.text) {
        console.log(this.data);
        handler(this.data);
        this.data = {...this.initialData};
        this.loadImage.src = "";
        this.getElement('.boldIc').id = ''
        this.getElement('.boldIc').src = BoldIcon
      }
    });
  }
}

export default View;
