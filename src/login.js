// loader
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".loader-container").style.visibility = "visible";
  } else {
    document.querySelector(".loader-container").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

let toggleBtn = document.querySelector(".toggle .fa-bars");
let closeBtn = document.querySelector(".toggle .close");
let menu = document.querySelector(".menu");
let menuItems = document.querySelectorAll(".menu a");
//===============================================
//get from local storage
let signUpData = [];
signUpData = JSON.parse(localStorage.getItem("signUpDataArr")) || [];
//===============================
//=================================
// open and close toggle
function sideBarMenu() {
  document.addEventListener("click", (e) => {
    if (e.target !== menu && e.target !== toggleBtn && e.target !== closeBtn) {
      menu.classList.remove("active");
    }
  });
  toggleBtn.onclick = function () {
    menu.classList.toggle("active");
  };
  closeBtn.onclick = function () {
    menu.classList.remove("active");
  };
}
sideBarMenu();
// change theme
let list = document.querySelectorAll(".change-color ul li");
let changeEle = document.querySelector(".change-color");
let gear = document.querySelector(".change-color .fa-gear");
let head = changeEle.querySelector("h4");
function changeTheme() {
  gear.onclick = () => {
    changeEle.classList.toggle("active");
  };
  // window.addEventListener("click", (e) => {
  //   if (e.target !== changeEle && e.target !== gear && e.target !== head) {
  //     changeEle.classList.remove("active");
  //   }
  // });
  list.forEach((li) => {
    li.addEventListener("click", (e) => {
      let color = e.target.dataset.color;
      document.documentElement.style.setProperty("--main-color", color);
      //handle active
      list.forEach((li) => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");
      // send to local storage
      localStorage.setItem("color", e.target.dataset.color);
    });
  });
}
changeTheme();
if (localStorage.getItem("color")) {
  let color = localStorage.getItem("color");
  document.documentElement.style.setProperty("--main-color", color);
  list.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === color) {
      li.classList.add("active");
    }
  });
}

// forms elements
//1-log in elements
let logInForm = document.querySelector(".login .login-from");
let email = document.querySelector(".login .login-from #email");
let password = document.querySelector(".login .login-from #password");
let errorEmail = document.querySelector(".login .login-from .email-error");
let errorPass = document.querySelector(".login .login-from .password-error");
// let signUpLink = document.querySelector(".login .login-from .para .sign-up");
// 2- sign up elements
let signUpForm = document.querySelector(".login .signUp");
let upEmail = document.querySelector(".login .signUp .email");
let upEmailError = document.querySelector(".login .signUp .email-label");
let upUserName = document.querySelector(".login .signUp .username");
let upUserNameLabel = document.querySelector(".login .signUp .username-label");
let upPassword = document.querySelector(".login .signUp .password");
let upPasswordLabel = document.querySelector(".login .signUp .password-label");
let retypePass = document.querySelector(".login .signUp .repeat-password");
let retypePassLabel = document.querySelector(
  ".login .signUp .repeat-password-label"
);
// let SignUpBtn = document.querySelector(".login .signUp .sign-up");
// let logInInLink = document.querySelector(".login .signUp a");

// // change between sign up and login form
// signUpLink.onclick = () => {
//   removeLoginForm();
// };
// logInInLink.onclick = () => {
//   removeSignUpForm();
// };
// function removeLoginForm() {
//   logInForm.style.display = "none";
//   signUpForm.style.display = "flex";
// }
// function removeSignUpForm() {
//   logInForm.style.display = "flex";
//   signUpForm.style.display = "none";
// }

/**
 * !authenticate email and password of log in form
 **/
logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validate(e);
});
email.addEventListener("textInput", email_verify);
password.addEventListener("textInput", pass_verify);

function validate(e) {
  let EmailIndex = signUpData.findIndex(
    (object) => object.userEmail === email.value
  );
  let passIndex = signUpData.findIndex(
    (object) => object.userPassword === password.value
  );
  if (EmailIndex === -1) {
    errorEmail.textContent = "wrong email";
    errorEmail.style.display = "block";
    email.style.border = "1px solid red";
    email.focus();
    return;
  } else {
    errorEmail.style.display = "none";
    email.style.border = "1px solid white";
  }
  if (passIndex === -1) {
    errorPass.textContent = "error password";
    errorPass.style.display = "block";
    password.style.border = "1px solid red";
    password.focus();
    return;
  } else {
    errorPass.style.display = "none";
    password.style.border = "1px solid white";
  }
  if (EmailIndex !== -1 && passIndex !== -1) {
    window.location = "index.html";
  }
}

function email_verify() {
  if (email.value.length < 6) {
    errorEmail.style.display = "block";
    email.style.border = "1px solid red";
  } else {
    errorEmail.style.display = "none";
    email.style.border = "1px solid white";
  }
}
function pass_verify() {
  if (password.value.length < 6) {
    errorPass.style.display = "block";
    password.style.border = "1px solid red";
  } else {
    errorPass.style.display = "none";
    password.style.border = "1px solid white";
  }
}
