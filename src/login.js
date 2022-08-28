let toggleBtn = document.querySelector(".toggle .fa-bars");
let closeBtn = document.querySelector(".toggle .close");
let menu = document.querySelector(".menu");
let menuItems = document.querySelectorAll(".menu a");
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

// forms elements
//1-log in elements
let logInForm = document.querySelector(".login .login-from");
let email = document.querySelector(".login .login-from #email");
let password = document.querySelector(".login .login-from #password");
let errorEmail = document.querySelector(".login .login-from .email-error");
let errorPass = document.querySelector(".login .login-from .password-error");
let signUpLink = document.querySelector(".login .login-from .para .sign-up");
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
let SignUpBtn = document.querySelector(".login .signUp .sign-up");
let logInInLink = document.querySelector(".login .signUp a");

// change between sign up and login form
signUpLink.onclick = () => {
  removeLoginForm();
};
logInInLink.onclick = () => {
  removeSignUpForm();
};
function removeLoginForm() {
  logInForm.style.display = "none";
  signUpForm.style.display = "flex";
}
function removeSignUpForm() {
  logInForm.style.display = "flex";
  signUpForm.style.display = "none";
}

/**
 * !authenticate email and password of log in form
 **/
logInForm.addEventListener("submit", (e) => {
  validate(e);
});
email.addEventListener("textInput", email_verify);
password.addEventListener("textInput", pass_verify);

function validate(e) {
  if (email.value.length < 9) {
    errorEmail.style.display = "block";
    email.style.border = "1px solid red";
    email.focus();
    e.preventDefault();
  } else {
    errorEmail.style.display = "none";
    email.style.border = "1px solid white";
  }
  if (password.value.length < 9) {
    errorPass.style.display = "block";
    password.style.border = "1px solid red";
    password.focus();
    e.preventDefault();
  } else {
    errorPass.style.display = "none";
    password.style.border = "1px solid white";
  }
}

function email_verify() {
  if (email.value.length < 9) {
    errorEmail.style.display = "block";
    email.style.border = "1px solid red";
  } else {
    errorEmail.style.display = "none";
    email.style.border = "1px solid white";
  }
}
function pass_verify() {
  if (password.value.length < 9) {
    errorPass.style.display = "block";
    password.style.border = "1px solid red";
  } else {
    errorPass.style.display = "none";
    password.style.border = "1px solid white";
  }
}

/**
 * !authenticate email and password of sign up form
 **/
signUpForm.addEventListener("submit", (event) => {
  verifyData(event);
});
upEmail.addEventListener("textInput", verifyInput);
upPassword.addEventListener("textInput", verifyInput);
upUserName.addEventListener("textInput", verifyInput);
retypePass.addEventListener("textInput", verifyInput);

function verifyData(event) {
  //email
  if (upEmail.value.length < 9) {
    upEmailError.style.display = "block";
    upEmail.style.border = "1px solid red";
    upEmail.focus();
    event.preventDefault();
  } else {
    upEmailError.style.display = "none";
    upEmail.style.border = "1px solid white";
  }
  //username
  if (upUserName.value.length < 9) {
    upUserNameLabel.style.display = "block";
    upUserName.style.border = "1px solid red";
    upUserName.focus();
    event.preventDefault();
  } else {
    upUserNameLabel.style.display = "none";
    upUserName.style.border = "1px solid white";
  }
  // password
  if (upPassword.value.length < 9) {
    upPasswordLabel.style.display = "block";
    upPassword.style.border = "1px solid red";
    upPassword.focus();
    event.preventDefault();
  } else {
    upPasswordLabel.style.display = "none";
    upPassword.style.border = "1px solid white";
  }
  // repeat pass
  if (retypePass.value !== upPassword.value) {
    retypePassLabel.style.display = "block";
    retypePass.style.border = "1px solid red";
    retypePass.focus();
    event.preventDefault();
  } else {
    retypePassLabel.style.display = "none";
    retypePass.style.border = "1px solid white";
    alert("your sign up completed , you need to log in ");
  }
}

function verifyInput() {
  //email
  if (upEmail.value.length < 9) {
    upEmailError.style.display = "block";
    upEmail.style.border = "1px solid red";
  } else {
    upEmailError.style.display = "none";
    upEmail.style.border = "1px solid white";
  }
  //username
  if (upUserName.value.length < 9) {
    upUserNameLabel.style.display = "block";
    upUserName.style.border = "1px solid red";
  } else {
    upUserNameLabel.style.display = "none";
    upUserName.style.border = "1px solid white";
  }
  // password
  if (upPassword.value.length < 9) {
    upPasswordLabel.style.display = "block";
    upPassword.style.border = "1px solid red";
  } else {
    upPasswordLabel.style.display = "none";
    upPassword.style.border = "1px solid white";
  }
  // repeat pass
  if (retypePass.value !== upPassword.value) {
    retypePassLabel.style.display = "block";
    retypePass.style.border = "1px solid red";
  } else {
    retypePassLabel.style.display = "none";
    retypePass.style.border = "1px solid white";
  }
}
