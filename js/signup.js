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
  <a class="d-flex p-2 flex-column flex-wrap align-items-center"> 
  <img src="assets/side-navbar/user.svg" alt="User profile picture" />
  ${existentUser.user}
  </a>
  <a class="d-flex p-2 flex-column flex-wrap align-items-center hidden" href="#" id="log-out">Log out</a>
  `;
  const logOut = document.getElementById("log-out");
  logOut.classList.add(
    "d-flex",
    "p-2",
    "flex-column",
    "flex-wrap",
    "align-items-center"
  );
  logOut.addEventListener("click", () => {
    localStorage.removeItem("User");

    Swal.fire({
      position: "center",
      icon: "info",
      title: `Closed session`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
  });
};

if (existentUser) {
  renderExistUser();

  Swal.fire({
    position: "center",
    icon: "success",
    title: `Welcome ${existentUser.user}!`,
    showConfirmButton: false,
    timer: 1500,
  });
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

  Swal.fire({
    position: "center",
    icon: "success",
    title: `Account created succesfully`,
    showConfirmButton: false,
    timer: 1000,
  });

  controlRegister.reset();

  setTimeout(() => {
    location.reload();
  }, 1000);

  setTimeout(() => {
    renderExistUser();
  }, 1500);
});

usernameValue.addEventListener("click", () => {
  Toastify({
    text: "You must use between 4 and 16 characters, they can't be symbols",

    duration: 5000,

    stopOnFocus: true,

    gravity: "top",

    position: "right",
  }).showToast();
});

emailValue.addEventListener("click", () => {
  Toastify({
    text: "Insert a valid Email",

    duration: 5000,

    stopOnFocus: true,

    gravity: "top",

    position: "right",
  }).showToast();
});

passwordValue.addEventListener("click", () => {
  Toastify({
    text: "Create a security password, you can use all special characters",

    duration: 5000,

    stopOnFocus: true,

    gravity: "top",

    position: "right",
  }).showToast();
});
