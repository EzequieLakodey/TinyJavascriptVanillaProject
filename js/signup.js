const mainContainer = document.querySelector("#main-desplazation");

const signInButton = document.querySelector("#sign-in");

signInButton.addEventListener("click", () => {
  mainContainer.classList.toggle("hidden");
});
