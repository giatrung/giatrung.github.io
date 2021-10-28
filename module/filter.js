import { products } from "./product.js";
import {list} from '/module/displayProduct.js';
import {addToCart} from './Cart.js';

/**
 * Chọn sản phẩm ở thanh filter
 * @param {} 
 */
 export let choose=()=>{
    let pick = document.getElementsByClassName('pick');
    let gia = document.getElementsByClassName('gia');
    for(let i=0; i<pick.length; i++){
        pick[i].addEventListener('click', ()=>{
                // localStorage.setItem("pick",i+1);
                localStorage.setItem("pick",pick[i].value);
                document.getElementById("iphone-product").innerHTML=list(filterLoai());
                addToCart(filterLoai());
                gia[gia.length-1].checked="true";
        });
    }
    for(let i=0; i<pick.length; i++){
        gia[i].addEventListener('click', ()=>{
                // localStorage.setItem("pick",i+1);
                localStorage.setItem("gia",gia[i].value);
                document.getElementById("iphone-product").innerHTML=list(filterGia());
                addToCart(filterGia());
                pick[pick.length-1].checked="true";
        });
    }
}

export let filterLoai=()=> {
    let x=products;
    let key = localStorage.getItem('pick');
    if(key=='other'){
        return x;
    }
    return x=x.filter(a=>{return a.tag==key});
    
}
export let filterGia = () => {
    let x=products;
    let key = localStorage.getItem('gia');
    switch(key){
        case "13":return x=x.filter(a=>{return a.gia<15000000});break;
        case "19":return x=x.filter(a=>{return a.gia<19000000});break;
        case "20":return x=x.filter(a=>{return a.gia>20000000});break;
        default: return x;
    }
}