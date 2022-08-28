let toggleBtn = document.querySelector(".toggle .fa-bars");
let closeBtn = document.querySelector(".toggle .close");
let menu = document.querySelector(".menu");
let slidContainer = document.querySelector(".landing .slide-container");
let arrowLeft = document.querySelector(".fa-arrow-left");
let arrowRight = document.querySelector(".fa-arrow-right");
let menuItems = document.querySelectorAll(".menu a");
let basketContainer = document.querySelector(".basket .basket-container");
let basket = document.querySelector(".basket");

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
//header fixed
let header = document.querySelector(".landing-page .header");
let fixedHeader = function () {
  // console.log(window.pageYOffset);
  if (window.pageYOffset > 200) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
};
window.addEventListener("scroll", fixedHeader);

// start slider
let imgArr = [
  "images/hero.png",
  "images/2.png",
  "images/3.png",
  "images/4.png",
];

function addSlider() {
  slidContainer.innerHTML = imgArr
    .map((url) => {
      return `<div class="slide">

          <div class="info">
                        <h1>50% off on first order</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo vitae ratione doloribus quibusdam illum ex
                            voluptas,
                            minus assumenda voluptatibus rem nesciunt libero nostrum id illo quis esse? Voluptas, quaerat reiciendis!
                        </p>
                        <a href="#new-products" class="order-btn">order now</a>
                    </div>
                    <div class="img">
                        <img src=${url} alt="">
                    </div>
  
          </div>`;
    })
    .join("");
}
addSlider();
let sliders = document.querySelectorAll(".slide");
function transformSlider() {
  sliders.forEach((slide, index) => {
    let distance = `calc(-100% * ${index})`;
    slide.style.left = distance;
  });
}
transformSlider();
let count = 0;
arrowRight.addEventListener("click", () => moveRight());

arrowLeft.addEventListener("click", () => moveLeft());

setInterval(() => {
  moveRight();
}, 3000);

function moveRight() {
  count++;
  sliders.forEach((slide) => {
    if (count === sliders.length) {
      count = 0;
    }
    let transDistance = `translateX(calc(100% * ${count}))`;
    slide.style.transform = transDistance;
  });
}
function moveLeft() {
  count--;
  sliders.forEach((slide) => {
    if (count < 0) {
      count = sliders.length - 1;
    }
    let transDistance = `translateX(calc(100% * ${count}))`;
    slide.style.transform = transDistance;
  });
}
// end sliders

// add products to page
let productsContainer = document.querySelector(".new-products .products");

let getData = async function () {
  try {
    productsContainer.innerHTML = `<h3>loading .....</h3>`;
    let myData = await fetch("src/items.json");
    let Alldata = await myData.json();
    addItems(Alldata);
    addCompany(Alldata);
  } catch (err) {
    console.log("error");
  }
};
getData();

function addItems(data) {
  productsContainer.innerHTML = data
    .map((element) => {
      let { id, imgSrc, price, name, company } = element;
      return `<div id=${id} class="product ${company}" data-name=${name}>
                  <div class="image">
                    <div class="overlay">+</div>
                    <div class="full-screen">
                        <div class="screen-container">
                          <img src=${imgSrc} alt="">
                          <div class="info"> ${name}</div>
                        </div>
                        <span class="close">x</span>
                    </div>
                    <img src=${imgSrc} alt="">
                  </div>
                  <div class="plus-minus">
                    <i class="fa fa-minus"></i>
                    <span id=${id} class="Quantity">0</span>
                    <i class="fa fa-plus"></i>
                  </div>
                  <span class="add">add to cart</span>
                  <div class="info">
                      <span class="price">${price} $</span>
                      <div class="info"> ${name}</div>
                  </div>
              </div>
                    `;
    })
    .join("");
  fullScreen();
}

function fullScreen() {
  // full screen
  let products = document.querySelectorAll(".product");
  products.forEach((product) => {
    product.addEventListener("click", (event) => {
      let overlay = product.querySelector(".new-products .image .overlay");
      let fullScreen = product.querySelector(".new-products .full-screen");
      let close = product.querySelector(".close");
      if (event.target == overlay) {
        fullScreen.classList.add("active");
      }
      close.onclick = function () {
        fullScreen.classList.remove("active");
      };
    });
  });
}

// add products to cart
let productsInCart = [];

// start testimonials

let testimonials = [
  {
    imageSrc:
      "https://netstorage-sportsbrief.akamaized.net/images/b44579474e9959bc.jpg?imwidth=900",
    name: "M.Abu trika",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
  {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Arafat_by_Yaakov_Saar.jpg",
    name: "yasser arafat",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
  {
    imageSrc:
      "https://www.almowaten.net/wp-content/uploads/2018/07/thumb_67015_default_news_size_5.jpg",
    name: "mohammed salah",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
  {
    imageSrc:
      "https://www.arabnews.com/sites/default/files/2022/02/09/3062461-1044905262.jpg",
    name: "saddam hussein",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
  {
    imageSrc:
      "https://www.annahar.com/ContentFilesArchive/308675Image1-1180x677_d.jpg?version=1962752",
    name: "M .eldourah",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
  {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/1200px-Flag_of_Palestine.svg.png",
    name: "palestine",
    opinion:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical",
  },
];
let nextBtn = document.querySelector(".testmonials .arrows .fa-arrow-right");
let prevBtn = document.querySelector(".testmonials .arrows .fa-arrow-left");
let testContainer = document.querySelector(".testmonial-boxs");
let testCounter = 0;

for (let i = 0; i < testimonials.length; i++) {
  let box = document.createElement("div");
  box.className = "box";
  // box.classList.add("move")
  box.innerHTML = `<div class="user">
                        <img src=${testimonials[i].imageSrc} alt="">
                        <div class="name">${testimonials[i].name}</div>
                    </div>
                    <div class="openion">
                        <p>${testimonials[i].opinion}</p>
                    </div>`;
  testContainer.appendChild(box);
}
//moving box
let movingBox = function () {
  testBoxes.forEach((box) => {
    let boxTop = box.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    let boxVisible = 5;
    if (boxTop < windowHeight - boxVisible) {
      box.classList.add("move");
    } else {
      box.classList.remove("move");
    }
  });
};
// add style position to each box
let testBoxes = document.querySelectorAll(".testmonial-boxs .box");
testBoxes.forEach((box, index) => {
  box.style.left = `calc(${index * 50}%)`;
  window.addEventListener("scroll", movingBox);
});

// add event to btns
nextBtn.addEventListener("click", () => {
  testCounter++;
  if (testCounter > testimonials.length - 2) {
    testCounter = 0;
  }
  testBoxes.forEach((box) => {
    box.style.transform = `translateX(calc(${testCounter * -100}%))`;
  });
});

prevBtn.addEventListener("click", () => {
  testCounter--;
  if (testCounter < 0) {
    testCounter = testimonials.length - 2;
  }
  testBoxes.forEach((box) => {
    box.style.transform = `translateX(calc(${testCounter * -100}%))`;
  });
});

//timer function

let timer = setInterval(() => {
  let expireDate = new Date(2023, 9, 28).getTime();
  let date = new Date().getTime();
  let time = expireDate - date;
  let days = Math.floor(time / (1000 * 60 * 60 * 24));
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  //=========
  let dayEle = document.querySelector(".days .timer");
  let hoursEle = document.querySelector(".hours .timer");
  let minutesEle = document.querySelector(".minutes .timer");
  let secondsEle = document.querySelector(".seconds .timer");
  dayEle.innerHTML = days;
  hoursEle.innerHTML = hours;
  minutesEle.innerHTML = minutes;
  secondsEle.innerHTML = seconds;
}, 1000);

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
//get from local storage
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

// arrow up

function arrowUp() {
  let arrow = document.querySelector(".arrow-up .fa-arrow-up");
  window.onscroll = () => {
    if (window.pageYOffset > 500) {
      arrow.classList.add("active");
    } else {
      arrow.classList.remove("active");
    }
  };
  arrow.onclick = () => {
    window.scrollTo({ top: 0 });
  };
}
arrowUp();

//get companies filter btns
let menuOfCompanies = document.querySelector(".toggle .menu .filter ul");
let FilterBtns;
let arr = [];
function addCompany(data) {
  data.forEach((ele) => {
    arr.push(ele.company);
  });
  let newCompanies = ["All"].concat(...new Set(arr));
  menuOfCompanies.innerHTML = newCompanies
    .map((ele) => {
      return `<a href="products.html"><li data-company = ${ele}>${ele}</li></a>`;
    })
    .join("");
  FilterBtns = document.querySelectorAll(".toggle .menu .filter ul li");
}

// // function of Basket
// let ArrayOfBasket = [];
// function Basket(Alldata) {
//   let allProducts = document.querySelectorAll(".product");
//   allProducts.forEach((product) => {
//     let id = product.id;
//     let name = product.dataset.name;
//     let plusBtn = product.querySelector(".product .plus-minus .fa-plus");
//     let minusBtn = product.querySelector(".product .plus-minus .fa-minus");
//     plusBtn.addEventListener("click", (e) => {

//       if (ArrayOfBasket.length < 1) {
//         ArrayOfBasket.push({
//           productId: id,
//           productName: name,
//           item: 0,
//         });
//       } else {
//         ArrayOfBasket.forEach((ele) => {
//           console.log(ele.productId,e.target.id)
//           if (ele.productId === e.target.id) {
//             ele.item += 1;
//           }
//         });
//       }
//       console.log(ArrayOfBasket);
//     });

//     minusBtn.addEventListener("click", (e) => {
//       console.log("minus");
//     });
//   });
// }

let dateEle = document.querySelector("footer .date");
let date = new Date().getFullYear();
dateEle.textContent = date;

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

// on scroll
let boxes = document.querySelectorAll(".grouped .sale-box");
let pageHeight = window.innerHeight;
let moving = function () {
  boxes.forEach((box) => {
    let boxTop = box.getBoundingClientRect().top;
    let elementHeight = 5;
    if (boxTop < pageHeight - elementHeight) {
      box.classList.add("move");
    } else {
      box.classList.remove("move");
    }
  });
};
window.addEventListener("scroll", moving);
