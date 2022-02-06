import Logo from "../../assets/tritter.png";

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.shroud = this.createElement("div", "shroud");
    this.shroud.id = "login";

    this.app.append(this.shroud);

    this.data = {
      email: "",
      password: "",
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

  displayRegistration() {
    this.shroud.addEventListener("click", (event) => {
      if (event.target.className === "shroud") {
        window.location.hash = "";
      }
    });

    const block = this.createElement("div", "login");

    const head = this.createElement("div", "head");

    const iconClose = this.createElement("a", "close");
    iconClose.href = "/";
    iconClose.textContent = "+";

    const iconLogo = this.createElement("img", "logo");
    iconLogo.src = Logo;

    const content = this.createElement("div", "content");

    const title = this.createElement("span", "title");
    title.textContent = "Вход в Триттер";

    const email = this.createElement("input", "input");
    email.type = "email";
    email.placeholder = "Электронная почта";
    email.value = this.data.email;
    email.id = "email";

    email.addEventListener("input", (e) => {
      this.data.email = e.target.value;
      email.className = "input";
    });

    const password = this.createElement("input", "input");
    password.type = "password";
    password.placeholder = "Пароль";
    password.value = this.data.password;
    password.id = "password";

    password.addEventListener("input", (e) => {
      this.data.password = e.target.value;
      password.className = "input";
    });

    const button = this.createElement("button");
    button.id = "singIn";
    button.textContent = "Войти";

    const span = this.createElement("span", "reg");
    span.textContent = "Не учетной записи? ";

    const link = this.createElement("a");
    link.textContent = "Зарегистрируйтесь";
    link.href = "#registration";

    const isError = this.createElement("span", "err");
    isError.textContent = 'Неверный логин или пароль'

    span.append(link);

    head.append(iconClose, iconLogo);
    content.append(title, email, password, isError, button, span);
    block.append(head, content);

    this.shroud.append(block);
  }

  validateEmail(email) {
    var pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }

  bindLogin(handler) {
    this.shroud.addEventListener("click", async (event) => {
      if (event.target.id === "singIn") {
        const email = this.getElement("#email");
        const password = this.getElement("#password");
        const error = this.getElement('.err')

        email.className = this.validateEmail(this.data.email)
          ? "input"
          : "input error";

        password.className =
          this.data.password.length >= 6 ? "input" : "input error";

        const res = await handler(this.data);

        if (!res) {
          error.className = 'err active'
        } else {
          error.className = 'err'
        }
      }
    });
  }
}

export default View;
