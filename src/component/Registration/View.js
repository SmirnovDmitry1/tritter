import Logo from "../../assets/tritter.png";
import Close from "../../assets/close.png";

class View {
  constructor() {
    this.app = this.getElement("#root");
    this.shroud = this.createElement("div", "shroud");
    this.shroud.id = "registration";

    this.app.append(this.shroud);

    this.data = {
      firstName: "",
      lastName: "",
      email: "",
      login: "",
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

    const block = this.createElement("div", "registration");

    const head = this.createElement("div", "head");

    const iconClose = this.createElement("a", "close");
    iconClose.href = "/";
    iconClose.textContent = "+";

    const iconLogo = this.createElement("img", "logo");
    iconLogo.src = Logo;

    const content = this.createElement("div", "content");

    const title = this.createElement("span", "title");
    title.textContent = "Создайте учетную запись";

    const firstName = this.createElement("input", "input");
    firstName.type = "input";
    firstName.id = "firstName";
    firstName.placeholder = "Имя";
    firstName.value = this.data.firstName;

    firstName.addEventListener("input", (e) => {
      this.data.firstName = e.target.value;
      firstName.className = "input";
    });

    const lastName = this.createElement("input", "input");
    lastName.type = "input";
    lastName.id = "lastName";
    lastName.placeholder = "Фамилия";
    lastName.value = this.data.lastName;

    lastName.addEventListener("input", (e) => {
      this.data.lastName = e.target.value;
      lastName.className = "input";
    });

    const email = this.createElement("input", "input");
    email.id = "email";
    email.type = "input";
    email.placeholder = "Электронная почта";
    email.value = this.data.email;

    email.addEventListener("input", (e) => {
      this.data.email = e.target.value;
      email.className = "input";
    });

    const login = this.createElement("input", "input");
    login.id = "login";
    login.type = "input";
    login.placeholder = "Логин";
    login.value = this.data.login;

    login.addEventListener("input", (e) => {
      this.data.login = e.target.value;
      login.className = "input";
    });

    const password = this.createElement("input", "input");
    password.type = "password";
    password.placeholder = "Пароль";
    password.id = "password";
    password.value = this.data.password;

    password.addEventListener("input", (e) => {
      this.data.password = e.target.value;
      password.className = "input";
    });

    const textError = this.createElement("span", "textError");

    const button = this.createElement("button");
    button.id = "reg";
    button.textContent = "Регистрация";

    head.append(iconClose, iconLogo);
    content.append(
      title,
      firstName,
      lastName,
      email,
      login,
      password,
      textError,
      button
    );
    block.append(head, content);

    this.shroud.append(block);
  }

  validateEmail(email) {
    var pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  }

  validator(name) {
    const input = this.getElement(name);
    const textError = this.getElement(".textError");

    if (input.value.length < 3) {
      input.className = "input error";
      textError.textContent =
        "Какой же глупый Орк, ты накосячил, все введенные персональные данные должны иметь больше трех буков, пора бы уже запомнить сколько букв в слове Орк. ТРИ.";
      this.err = false;
    } else {
      input.className = "input";
      textError.textContent = "";
      this.err = true;
    }
  }

  bindRegistration(handler) {
    this.shroud.addEventListener("click", async (event) => {
      if (event.target.id === "reg") {
        const email = this.getElement("#email");
        const password = this.getElement("#password");
        const validInput = ['#firstName', '#lastName', '#login']
        const textError = this.getElement(".textError");
        this.err = true

        validInput.forEach(item => 
          this.validator(item)
        )
        email.className = this.validateEmail(this.data.email)
          ? "input"
          : "input error";

        password.className =
          this.data.password.length >= 6 ? "input" : "input error";


        if (this.err) {
          const res = await handler(this.data);
 
          textError.textContent = res ? '' : 'Глупый Орк, ты накосячил с паролем или мылом, я понимаю что твоему мозгу это сложно запомнить, но в пароле должно быть больше 6 символов, а в мыле должна присутсвовать собака и не та которую ты сожрал на завтрак, а символ (@), или другой Орк забрал твое мыло АХАХАХА'
        }
        
      }
    });
  }
}

export default View;
