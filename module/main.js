"use strict"; // strict mode
// ========================IMPORT=======================
import{validate} from './exportValidate.js';
import { mySearch } from'./exportMySearch.js';
import {Reply, gotoBottom,openAndCloseForm,submit} from './chatbox.js';
import { fnameFunction, mailFunction, phoneFunction, diachiFunction } from './exportOnBlur.js';
import {rating} from './rating.js';
import {choose} from './filter.js';
import {dangnhap,signout} from './signin.js';
import {addToCart,onload} from './Cart.js';
import {list} from '/module/displayProduct.js';
import { products } from "./product.js";


//***********************EVENT*******************
document.querySelector('#btn-dathang').addEventListener('click', validate); //validate
document.querySelector('#search').addEventListener('click',mySearch); // Timkiem
//Validate onblur
document.getElementById("name").onblur = fnameFunction; 
document.getElementById("email").onblur = mailFunction;
document.getElementById("phone").onblur = phoneFunction;
document.getElementById("address").onblur = diachiFunction;

//Đăng nhập, đăng xuất
if(window.location.pathname!="/signup.html"){
document.querySelector("#signin-button").addEventListener("click",dangnhap);
document.querySelector("#exit").addEventListener("click",signout);
}
//Chỉ thực hiện khi ở pathname này
if(window.location.pathname=="/signup.html"){
    document.getElementById('btn-dangki').addEventListener('click',signup);
}

if(window.location.pathname=="/iPhone.html")
{
    //hiển thị tất cả sản phẩm 
    document.getElementById("iphone-product").innerHTML=list(products);
    
    gotoBottom();
    openAndCloseForm();
    submit();
    rating();
    
    //Cart
    addToCart();

    //Bộ lọc theo sản phẩm
    choose();
    
    //Chức năng gửi tin nhắn
    document.querySelector('#gui').addEventListener('click',Reply)
}

onload();
//Filter