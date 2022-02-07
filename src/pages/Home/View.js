import moment from "moment";
import ImageIcon from "../../assets/image.png";
import CommentsIcon from "../../assets/comments.png";
import BoldIcon from "../../assets/bold.png";
import ActiveBoldIcon from "../../assets/activeBold.png";

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.home = this.createElement("div", "Home");
    this.home.id = "home";
    this.form = this.createElement("form");

    this.inputImage = this.createElement("input", "inputImage");
    this.inputImage.type = "file";
    this.inputImage.id = "load-image";
    this.inputImage.accept = ".jpg, .jpeg, .png";
    this.label = this.createElement("label", "inputLabel");
    this.label.htmlFor = "load-image";
    this.imageIc = this.createElement("img");
    this.imageIc.src = ImageIcon;
    this.label.append(this.imageIc);

    this.boldIc = this.createElement("img", "boldIc");
    this.boldIc.src = BoldIcon;

    this.loadImage = this.createElement("img", "prevImage");

    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = `Что нового?`;
    this.input.name = "post";
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Тритнуть";

    this.block = this.createElement("div", "formBlock");
    this.write = this.createElement("div", "write");
    this.settings = this.createElement("div", "setting");
    this.write.append(this.input, this.submitButton);
    this.settings.append(this.inputImage, this.label, this.boldIc);
    this.block.append(this.write, this.settings, this.loadImage);
    this.form.append(this.block);
    this.title = this.createElement("h1");
    this.title.textContent = "Главная";
    this.todoList = this.createElement("ul", "post-list");
    this.home.append(this.title, this.form, this.todoList);
    this.app.append(this.home);

    this.inputImage.addEventListener("input", (e) => {
      this.loadImage.src = URL.createObjectURL(this.inputImage.files[0]);
    });

    this.boldIc.addEventListener("click", () => {
      if (this.data.bold) {
        this.boldIc.id = "";
        this.boldIc.src = BoldIcon;
        this.data.bold = false;
      } else {
        this.boldIc.id = "active";
        this.boldIc.src = ActiveBoldIcon;
        this.data.bold = true;
      }
    });

    this.data = {
      text: "",
      image: null,
      bold: false,
    };
  }

  _resetInput() {
    this.input.value = "";
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

  displayPosts(posts, user) {
    !user.isLogin
      ? (this.form.className = "disabled")
      : (this.form.className = "");
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (posts.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Not data!";
      this.todoList.append(p);
    } else {
      posts.length &&
        posts.forEach((post) => {
          const li = this.createElement("li");
          const content = this.createElement("div", "content");
          const naming = this.createElement("div", "naming");
          li.id = post.id;

          const linkToProfile = this.createElement("a", "linkToProfile");
          const avatar = this.createElement("img", "avatar");
          avatar.src = post.user.photoURL;
          avatar.style.border = `2px solid ${post.user.color}`;
          avatar.alt = "error";
          linkToProfile.href = `./?id=${post.userUid}#profile`;
          linkToProfile.append(avatar);

          const name = this.createElement("span", "name");
          name.textContent = post.user.userName;

          const time = this.createElement("span", "time");
          time.textContent = moment(post.createDate).fromNow();

          const span = this.createElement("span");
          span.textContent = post.text;
          span.style.fontWeight = post.bold ? 'bold' : '400'

          const image = this.createElement("img", "image");
          image.src = post.imageURL ? post.imageURL : "";

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
          naming.append(name, time);
          content.append(naming, span, image, linkToCommets);
          li.append(linkToProfile, content);

          // Append nodes
          this.todoList.append(li);
        });
    }
  }

  bindAddPost(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.input.value) {
        handler({
          ...this.data,
          text: this.input.value,
          image: this.inputImage.files[0],
        });
  
        this.input.value = "";
        this.loadImage.src = "";
        this.boldIc.id = "";
        this.inputImage.files = []
        this.boldIc.src = BoldIcon;
        this.data.bold = false;
      }
      
    });
  }
}

export default View;
