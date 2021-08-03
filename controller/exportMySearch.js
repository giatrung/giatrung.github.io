function mySearch() {
    console.log("search");
    let search = document.getElementById("nav-search").value;
    let str = search.toLowerCase().trim();
    if (search == "") {
        document.getElementById("title-modal").innerHTML = "Bạn chưa nhập sản phẩm cần tìm!";
        document.getElementById("body-modal").innerHTML = "Mời bạn thử lại!";
    }
    else if (str.search(/iphone/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = `<div class='card m-auto'><a href='./iPhone/iPhone.html' onclick='pick(1)'><div class='card-body text-center'><img src='./image/shopdunkiphone.jpg' alt=''><h4>iPhone </h4></div> </a></div>;`
        
    }
    else if (str.search(/ipad/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = "<div class='card m-auto'><a href='./iPhone/iPhone.html' onclick='pick(2)'><div class='card-body text-center'><img src='./image/ipad3.jpg' alt=''><h4>iPad </h4></div> </a></div>";
        
    }
    else if (str.search(/mac/i) != -1) {
        document.getElementById("title-modal").innerHTML = search;
        document.getElementById("body-modal").innerHTML = "<div class='card m-auto'><a href='./iPhone/iPhone.html' onclick='pick(3)'><div class='card-body text-center'><img src='./image/shopdunkmac.jpg' alt=''><h4>MacBook </h4></div> </a></div>";
        
    }
    else {
        document.getElementById("title-modal").innerHTML = "Không tìm thấy sản phẩm cần tìm!";
        document.getElementById("body-modal").innerHTML = "Mời bạn thử lại sau!";
    }
}
document.querySelector('#search').addEventListener("click", mySearch)

export{mySearch}