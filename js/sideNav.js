let sideNavbarOpener = document.getElementById("navbar-opener");

let sideNavbarCloser = document.getElementById("navbar-closer");

sideNavbarOpener.onclick = function openNavbar() {
  document.getElementById("sideNavbar").style.width = "15rem";

  document.getElementById("sideNavbar").style.transition = "0.1s";

  document.getElementById("main-desplazation").style.marginLeft = "20rem";

  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
};

sideNavbarCloser.onclick = function closeNavbar() {
  document.getElementById("sideNavbar").style.width = "0";

  document.getElementById("sideNavbar").style.transition = "0.1s";

  document.getElementById("main-desplazation").style.marginLeft = "auto";

  document.body.style.backgroundColor = "white";
};
