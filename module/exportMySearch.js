
function mySearch() {
    //import lodash
    let trimLodash = window._.trim;
    let lowerCaseLodash= window._.lowerCase;
    let search = document.getElementById("nav-search").value;
    let str = trimLodash(lowerCaseLodash(search));
    if (search == "") {
        document.getElementById("title-modal").innerHTML = "Bạn chưa nhập sản phẩm cần tìm!";
        document.getElementById("body-modal").innerHTML = "Mời bạn thử lại!";
    }
    else if (str.search(/iphone/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = `<div class='card m-auto pick'><a href='./iPhone.html'><div class='card-body text-center'><img src='./image/shopdunkiphone.jpg' alt=''><h4>iPhone </h4></div> </a></div>;`
    }
    else if (str.search(/ipad/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = "<div class='card m-auto' pick><a href='./iPhone.html'><div class='card-body text-center'><img src='./image/ipad3.jpg' alt=''><h4>iPad </h4></div> </a></div>";
    }
    else if (str.search(/mac/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = "<div class='card m-auto pick'><a href='./iPhone.html'><div class='card-body text-center'><img src='./image/shopdunkmac.jpg' alt=''><h4>MacBook </h4></div> </a></div>";
    }
    else {
        document.getElementById("title-modal").innerHTML = "Không tìm thấy sản phẩm cần tìm!";
        document.getElementById("body-modal").innerHTML = "Mời bạn thử lại sau!";
    }
}
// document.querySelector('#search').addEventListener("click", mySearch)

export{mySearch}