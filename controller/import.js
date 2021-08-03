// ========================IMPORT=======================
import{validate} from './exportValidate.js';
import { mySearch } from'./exportMySearch.js';
import { fnameFunction, mailFunction, phoneFunction, diachiFunction } from './exportOnBlur.js';
//***********************EVENT*******************
document.querySelector('#btn-dathang').addEventListener('click', validate);
document.querySelector('#search').addEventListener('click',mySearch);
document.getElementById("name").onblur = function () { fnameFunction() };
document.getElementById("email").onblur = function () { mailFunction() };
document.getElementById("phone").onblur = function () { phoneFunction() };
document.getElementById("address").onblur = function () { diachiFunction() };
