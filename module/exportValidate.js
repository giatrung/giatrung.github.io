import {sendEmail} from "./email.js";

(function SignIn(){
    let SignIn= localStorage.getItem("onSignIn")?JSON.parse(localStorage.getItem("onSignIn")):undefined;
    if(SignIn)
    {
        document.getElementById('name').value=SignIn.fname;
        document.getElementById('email').value=SignIn.mail;
        document.getElementById('phone').value=SignIn.phone;
        document.getElementById('address').value=SignIn.address;
    }
})();
// SignIn()
function validate() {
    let fullname = document.getElementById('name').value
    let email = document.getElementById('email').value
    let SDT = document.getElementById('phone').value
    let diachi = document.getElementById('address').value
    let hinhthuc = '';
    if (document.getElementById('home').checked) {
        hinhthuc = document.getElementById('home').value
        document.getElementById('hinhthuc-error').innerHTML = '';
    }
    else if (document.getElementById('module').checked) {
        hinhthuc = document.getElementById('module').value
        document.getElementById('hinhthuc-error').innerHTML = '';
    }
    else {
        document.getElementById('hinhthuc-error').innerHTML = 'Vui lòng chọn hình thức!';
    }



    //fullname
    if (fullname == '') {
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập đầy đủ họ tên quý khách';

    }
    else {
        if (fullname.search(/[0-9]/) != -1) {
            console.log(fullname.search(/[0-9]/))
            document.getElementById('name-error').innerHTML = 'Họ tên không được có số';
        }
        else {
            document.getElementById('name-error').innerHTML = '';
        }
    }
    //email
    /**
     * Phương thức kiểm tra email
     * @param {*} mail 
     * @returns 
     */
    let checkemail=mail=>/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail);

    if (email == '') {
        document.getElementById('mail-error').innerHTML = 'Vui lòng nhập địa chỉ email';
    }
    else {
        if (!checkemail(email)) {
            document.getElementById('mail-error').innerHTML = 'Địa chỉ email không hợp lệ';

        }
        else {
            document.getElementById('mail-error').innerHTML = '';
        }
    }

    //SDT
    if (SDT == '') {
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập SDT';
    }
    else {
        if (SDT.length != 10) {
            document.getElementById('phone-error').innerHTML = 'SDT không được nhiều hoặc ít hơn 10 số';

        }
        else if (isNaN(SDT)) {
            document.getElementById('phone-error').innerHTML = 'SDT không được có chữ'

        }
        else {
            document.getElementById('phone-error').innerHTML = '';
        }
    }


    //Dia chi
    if (diachi == '') {
        document.getElementById('Diachi-error').innerHTML = 'Vui lòng nhập dia chi của quý khách ';
    }
    else {
        document.getElementById('Diachi-error').innerHTML = '';
    }


    if (fullname && SDT && diachi && address && hinhthuc) {
        // document.getElementById('dathang').innerHTML = 'Quý khách đặt hàng thành công';
        // document.getElementById('btn-dathang').hidden = true;
        // document.getElementById('continue').hidden=false;
        // document.getElementById('name').disabled=true;
        // document.getElementById('email').disabled=true;
        // document.getElementById('phone').disabled=true;
        // document.getElementById('address').disabled=true;

        //Xuất thời gian xử lí
        sendEmail(fullname,email);
        localStorage.setItem("soluong",0);
        localStorage.setItem("items",[]);
        localStorage.setItem("tongtien",0);
    }
    
}

// document.querySelector('#btn-dathang').addEventListener('click', validate);
export{validate};