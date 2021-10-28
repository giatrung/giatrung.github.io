// ===============ONBLUR VALIDATATION==================
function fnameFunction() {
    console.log("hello");
    let fullname = document.getElementById('name').value;
    if (fullname == '') {
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập đầy đủ họ tên quý khách';
        document.getElementById('name-error').style.color="red";
    }
    else {
        if (fullname.search(/[0-9]/) != -1) {
            console.log(fullname.search(/[0-9]/))
            document.getElementById('name-error').innerHTML = 'Họ tên không được có số';
            document.getElementById('name-error').style.color="red";
        }
        else {
            document.getElementById('name-error').innerHTML = 'OK!';
            document.getElementById('name-error').style.color="green";
            return fullname;
        }
    }
}
function mailFunction() {
    let email = document.getElementById('email').value;
    //email
    let checkemail=mail=>/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail);
    if (email == '') {
        document.getElementById('mail-error').innerHTML = 'Vui lòng nhập địa chỉ email';
        document.getElementById('mail-error').style.color="red";
    }
    else {
        if (!checkemail(email)) {
            document.getElementById('mail-error').innerHTML = 'Địa chỉ email không hợp lệ';
            document.getElementById('mail-error').style.color="red";
        }
        else {
            document.getElementById('mail-error').innerHTML = 'OK!';
            document.getElementById('mail-error').style.color="green";
        }
    }
}

function phoneFunction(){
 let SDT = document.getElementById('phone').value;
//SDT
    if (SDT == '') {
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập SDT';
        document.getElementById('phone-error').style.color="red";
    }
    else {
        if (SDT.length != 10) {
            document.getElementById('phone-error').innerHTML = 'SDT không được nhiều hoặc ít hơn 10 số';
            document.getElementById('phone-error').style.color="red";

        }
        else if (isNaN(SDT)) {
            document.getElementById('phone-error').innerHTML = 'SDT không được có chữ';
            document.getElementById('phone-error').style.color="red";

        }
        else {
            document.getElementById('phone-error').innerHTML = 'OK!';
            document.getElementById('phone-error').style.color="green";
        }
    }
}

function diachiFunction(){
     let diachi = document.getElementById('address').value;
 //Dia chi
    if (diachi == '') {
        document.getElementById('Diachi-error').innerHTML = 'Vui lòng nhập dia chi của quý khách ';
        document.getElementById('Diachi-error').style.color="red";
    }
    else {
        document.getElementById('Diachi-error').innerHTML = 'OK!';
            document.getElementById('Diachi-error').style.color="green";
            return diachi;
    }
}
export{fnameFunction,mailFunction,phoneFunction,diachiFunction}