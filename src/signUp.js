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
//================================
let signUpData = [];
console.log(signUpData, "1");
signUpData = JSON.parse(localStorage.getItem("signUpDataArr")) || [];
console.log(signUpData, "2");
//=============================================
let toggleBtn = document.querySelector(".toggle .fa-bars");
let closeBtn = document.querySelector(".toggle .close");
let menu = document.querySelector(".menu");
let menuItems = document.querySelectorAll(".menu a");

// get information from local storage
// if (localStorage.getItem("signUpDataArr")){
//   signUpData = JSON.parse(localStorage.getItem("signUpDataArr"));
// }else{
//   signUpData = [];
// }
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

// sign up elements
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

/**
 * !authenticate email and password of sign up form
 **/

signUpForm.addEventListener("submit", (event) => {
  validate();
});

//=================================================
function validate() {
  //email
  if (upEmail.value === "") {
    upEmail.focus();
    upEmailError.textContent = "email cant be empty";
    upEmailError.style.display = "block";
    return;
  } else if (upEmail.value.length < 7) {
    upEmail.focus();
    upEmailError.textContent = "must be more than 20 charachter";
    upEmailError.style.display = "block";
    upEmail.style.border = "1px solid red";
    return;
  } else {
    upEmailError.style.display = "none";
    upEmail.style.border = "1px solid white";
  }
  //username
  if (upUserName.value === "") {
    upUserName.focus();
    upUserNameLabel.textContent = "username cant be empty";
    upUserNameLabel.style.display = "block";
    return;
  } else if (upUserName.value.length < 9) {
    upUserName.focus();
    upUserNameLabel.textContent = "must be more than 10 character";
    upUserNameLabel.style.display = "block";
    upUserName.style.border = "1px solid red";
    return;
  } else {
    upUserNameLabel.style.display = "none";
    upUserName.style.border = "1px solid white";
  }
  //password
  if (upPassword.value === "") {
    upPassword.focus();
    upPasswordLabel.textContent = "password cant be empty";
    upPasswordLabel.style.display = "block";
    return;
  } else if (upPassword.value.length < 6) {
    upPassword.focus();
    upPasswordLabel.textContent = "must be more than 9 character";
    upPasswordLabel.style.display = "block";
    upPassword.style.border = "1px solid red";
    return;
  } else {
    upPasswordLabel.style.display = "none";
    upPassword.style.border = "1px solid white";
  }
  //repeat password
  if (retypePass.value === "") {
    retypePass.focus();
    retypePassLabel.textContent = "repeat password cant be empty";
    retypePassLabel.style.display = "block";
    return;
  } else if (retypePass.value !== upPassword.value) {
    retypePass.focus();
    retypePassLabel.textContent = "repeat password not matched";
    retypePassLabel.style.display = "block";
    retypePass.style.border = "1px solid red";
    return;
  } else {
    retypePassLabel.style.display = "none";
    retypePass.style.border = "1px solid white";
  }
  //send all data to array
  sendToArray();
}

function sendToArray() {
  let data = {
    userEmail: upEmail.value,
    userUserName: upUserName.value,
    userPassword: upPassword.value,
  };
  if (signUpData.length < 1) {
    signUpData.push(data);
    sendToLocalStorage(signUpData);
  } else {
    let EmailIndex = signUpData.findIndex(object=> object.userEmail === data.userEmail);
    if (EmailIndex === -1) {
      signUpData.push(data);
      sendToLocalStorage(signUpData);
    } else {
      upEmailError.textContent = "email registered before ,sign in";
      upEmailError.style.display = "block";
    }
  }
}
// send data to local storage
function sendToLocalStorage(signUpData) {
  localStorage.setItem("signUpDataArr", JSON.stringify(signUpData));
}
