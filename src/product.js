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

//header fixed
let header = document.querySelector(".header");
header.style.backgroundColor=  "#ffc531de"
let fixedHeader = function () {
  // console.log(window.pageYOffset);
  if (window.pageYOffset > 200) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
};
window.addEventListener("scroll", fixedHeader);
// const myRequest = new XMLHttpRequest();
// myRequest.open("GET", "/items.json");
// myRequest.send();
// myRequest.onload = function(){
//   if (this.readyState === 4 && this.status === 200) {
//     let data = JSON.parse(this.responseText);
//     console.log(data);
//   }
// };

let container = document.querySelector(".new-products .container .products");

let getData = async function (url) {
  try {
    container.innerHTML = `<h3>loading .....</h3>`;
    let myData = await fetch(url);
    let data = await myData.json();
    addItems(data);
    addCompany(data);
    filterProducts(data);
  } catch (err) {
    container.innerHTML = `<h3> error during fetch data</h3>`;
  }
};
getData("src/items.json");

function addItems(data) {
  if (data.length < 1) {
    container.innerHTML = `<h3 style="color:red">Sorry, no products matched your search</h3>`;
    return;
  }
  container.innerHTML = data
    .map((element) => {
      let { id, imgSrc, price, name, company } = element;
      return `<div id=${id} class="product ${company}">
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

// full screen
function fullScreen() {
  let products = document.querySelectorAll(
    ".new-products .container .products .product"
  );
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
  //   if (e.target !== changeEle && e.target !== gear && e.target !== e.target) {
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

//search for products
function searchForItem(data) {
  let searchInput = document.querySelector(".search input");
  let form = document.querySelector(".search");
  let getData = async function (url) {
    try {
      container.innerHTML = `<h3>loading .....</h3>`;
      let myData = await fetch(url);
      let data = await myData.json();
      form.addEventListener("keyup", () => {
        let filteredData = data.filter((product) => {
          return product.name.toLowerCase().includes(searchInput.value.toLowerCase());
        });
        addItems(filteredData);
      });
      addItems(data);
    } catch (err) {
      container.innerHTML = `<h3> error during fetch data</h3>`;
    }
  };
  getData("src/items.json");
}
searchForItem();

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
      return `<li data-company = ${ele}>${ele}</li>`;
    })
    .join("");
  FilterBtns = document.querySelectorAll(".toggle .menu .filter ul li");
  // filterBtns(FilterBtns);
}

// start menu filter function
function filterProducts(data) {
  FilterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.dataset.company === "All") {
        addItems(data);
      } else {
        let filtered = data.filter(
          (product) => product.company === e.target.dataset.company
        );
        addItems(filtered);
      }
    });
  });
}

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
