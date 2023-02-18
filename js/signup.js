const signInButton = document.getElementById("sign-in");

const controlRegister = document.querySelector("#register-form");

const inputsDivsContainers = document.querySelectorAll(".input-container");

const registerInputs = document.querySelectorAll("#register-form div input");

const usernameValue = document.querySelector("#register-username");

const emailValue = document.querySelector("#register-email");

const passwordValue = document.querySelector("#register-password");

const confirmPassword = document.querySelector("#confirm-password");

const submitForm = document.querySelector("#sumbit-register");

const userLiSection = document.getElementById("user-section");

const existentUser = JSON.parse(localStorage.getItem("User"));

console.log(existentUser);

const userData = {
  username: false,

  email: false,

  password: false,
};

const expresions = {
  registerUsername: /^[a-zA-Z0-9\_\-]{4,16}$/,

  registerPassword: /^.{4,12}$/,

  registerEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const renderExistUser = () => {
  userLiSection.innerHTML = `
  <img class="img-fluid py-3" src="assets/side-navbar/user.svg" alt="User profile picture" />
  <h6 class="d-flex p-2 flex-column flex-wrap align-items-center"> ${existentUser.user} </h6>
  <a class="d-flex p-2 flex-column flex-wrap align-items-center hidden" href="#" id="log-out">Log out</a>
  `;

  const logOut = document.getElementById("log-out");

  logOut.addEventListener("click", () => {
    localStorage.removeItem("User");
  });
};

if (existentUser !== "") {
  renderExistUser();
}

signInButton.addEventListener("click", () => {
  mainContainer.classList.toggle("hidden");

  inputsDivsContainers.forEach((i) => {
    i.classList.toggle("hidden");
  });
});

const validateRegisterData = (expresion, input, element) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#register-${element}`)
      .classList.add("correct-input");
    document
      .querySelector(`#register-${element}`)
      .classList.remove("wrong-input");
  } else {
    document
      .querySelector(`#register-${element}`)
      .classList.remove("correct-input");

    document.querySelector(`#register-${element}`).classList.add("wrong-input");

    userData[element] = false;
  }
};

const registerValidator = (e) => {
  switch (e.target.name) {
    case "registerUsername":
      validateRegisterData(expresions.registerUsername, e.target, "username");

      break;

    case "registerEmail":
      validateRegisterData(expresions.registerEmail, e.target, "email");

      break;

    case "registerPassword":
      validateRegisterData(expresions.registerPassword, e.target, "password");

      passwordValidation();

      break;

    case "confirmPassword":
      passwordValidation();

      break;
  }
};

const passwordValidation = () => {
  const passwordValue = document.querySelector("#register-password");

  const confirmPassword = document.querySelector("#confirm-password");

  if (passwordValue.value !== confirmPassword.value) {
    confirmPassword.classList.remove("correct-input");
    confirmPassword.classList.add("wrong-input");
    userData["password"] = false;
  } else {
    confirmPassword.classList.remove("wrong-input");
    confirmPassword.classList.add("correct-input");
  }
};

registerInputs.forEach((input) => {
  input.addEventListener("keyup", registerValidator);

  input.addEventListener("blur", registerValidator);
});

let createdUser = "";

controlRegister.addEventListener("submit", (e) => {
  e.preventDefault;

  createdUser = {
    user: usernameValue.value,

    userEmail: emailValue.value,

    userPassword: passwordValue.value,
  };

  localStorage.setItem("User", JSON.stringify(createdUser));

  mainContainer.classList.toggle("hidden");

  controlRegister.classList.toggle("show");

  inputsDivsContainers.forEach((i) => {
    i.classList.toggle("hidden");
  });

  controlRegister.reset();

  renderExistUser();
});
