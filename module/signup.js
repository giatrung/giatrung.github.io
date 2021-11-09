//MODULE CHỨC NĂNG ĐĂNG KÍ
document.getElementById("name-signup").onblur = function () { fnameFunction() };
document.getElementById("email-signup").onblur = function () { mailFunction() };
document.getElementById("phone-signup").onblur = function () { phoneFunction() };
document.getElementById("address-signup").onblur = function () { diachiFunction() };
document.getElementById("password-signup").onblur = function () { passwordFunction() };
document.getElementById("password2-signup").onblur = function () { password2Function() };
document.getElementById("deal-signup").onchange = function () { verify() };


//Kiể tra tên khách hàng
function fnameFunction() {
    let fullname = document.getElementById('name-signup').value;
    if (fullname == '') {
        document.getElementById('name-signup-error').innerHTML = 'Vui lòng nhập đầy đủ họ tên quý khách';
        document.getElementById('name-signup-error').style.color = "red";
    }
    else {
        if (fullname.search(/[0-9]/) != -1) {
            console.log(fullname.search(/[0-9]/))
            document.getElementById('name-signup-error').innerHTML = 'Họ tên không được có số';
            document.getElementById('name-signup-error').style.color = "red";
        }
        else {
            document.getElementById('name-signup-error').innerHTML = 'OK!';
            document.getElementById('name-signup-error').style.color = "green";
            return fullname;
        }
    }
}

//Kiểm tra email khách hàng
function mailFunction() {
    let temp=0;
    let email = document.getElementById('email-signup').value;

    //Kiểm tra email này đã được đăng ký trước đó hay chưa
    let mail = localStorage.getItem("account")? JSON.parse(localStorage.getItem("account")):[];
    if(mail!=[]){
        for(let i=0;i<mail.length;i++)
        {
            if(email==mail[i].mail)
            {
                temp=1;
                break;
            }
        }
    }
    console.log(temp);
    //email
    let checkemail = mail => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail);
    if (email == '') {
        document.getElementById('mail-signup-error').innerHTML = 'Vui lòng nhập địa chỉ email';
        document.getElementById('mail-signup-error').style.color = "red";
    }
    else {
        if (!checkemail(email)) {
            document.getElementById('mail-signup-error').innerHTML = 'Địa chỉ email không hợp lệ';
            document.getElementById('mail-signup-error').style.color = "red";

        }
        else if(temp==1)
        {
            document.getElementById('mail-signup-error').innerHTML = 'Địa chỉ email đã được dùng để đăng ký trước đó';
            document.getElementById('mail-signup-error').style.color = "red";
        }
        else {
            document.getElementById('mail-signup-error').innerHTML = 'OK!';
            document.getElementById('mail-signup-error').style.color = "green";
            return email;
        }
    }
}

// Kiểm tra số điện thoại
function phoneFunction() {
    let temp=0;
    let SDT = document.getElementById('phone-signup').value;
    let phone = localStorage.getItem("account")? JSON.parse(localStorage.getItem("account")):[];
    if(phone!=[]){
        for(let i=0;i<phone.length;i++)
        {
            if(SDT==phone[i].phone)
            {
                temp=1;
                break;
            }
        }
    }
    //SDT
    if (SDT == '') {
        document.getElementById('phone-signup-error').innerHTML = 'Vui lòng nhập SDT';
        document.getElementById('phone-signup-error').style.color = "red";
    }
    else {
        if (SDT.length != 10) {
            document.getElementById('phone-signup-error').innerHTML = 'SDT không được nhiều hoặc ít hơn 10 số';
            document.getElementById('phone-signup-error').style.color = "red";

        }
        else if (isNaN(SDT)) {
            document.getElementById('phone-signup-error').innerHTML = 'SDT không được có chữ';
            document.getElementById('phone-signupne-error').style.color = "red";

        }
        else  if(temp==1)
        {
            document.getElementById('phone-signup-error').innerHTML = 'SDT đã được sử dụng, vui lòng nhập SDT khác';
            document.getElementById('phone-signup-error').style.color = "red";
        }
        else{
            document.getElementById('phone-signup-error').innerHTML = 'OK!';
            document.getElementById('phone-signup-error').style.color = "green";
            return SDT;
        }
    }
}
//Kiểm tra địa chỉ
function diachiFunction() {
    let diachi = document.getElementById('address-signup').value;
    //Dia chi
    if (diachi == '') {
        document.getElementById('Diachi-signup-error').innerHTML = 'Vui lòng nhập dia chi của quý khách ';
        document.getElementById('Diachi-signup-error').style.color = "red";
    }
    else {
        document.getElementById('Diachi-signup-error').innerHTML = 'OK!';
        document.getElementById('Diachi-signup-error').style.color = "green";
        return diachi;
    }
}
//Kiểm tra mật khẩu
function passwordFunction() {
    let StrongReg = pass => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pass);
    let password = document.getElementById('password-signup').value;
    //Dia chi
    if (password == '') {
        document.getElementById('password-signup-error').innerHTML = 'Vui lòng nhập mật khẩu quý khách ';
        document.getElementById('password-signup-error').style.color = "red";
        return 0;
    }
    else if (!StrongReg(password)) {
        document.getElementById('password-signup-error').innerHTML = 'Mật khẩu phải ít nhất 8 kí tự gồm chữ hoa, số, và kí tự đặc biệt';
        document.getElementById('password-signup-error').style.color = "red";
        return 0;
    }
    else {
        document.getElementById('password-signup-error').innerHTML = 'OK!';
        document.getElementById('password-signup-error').style.color = "green";
    }
    return password;
}

//Kiểm tra phần xác nhập mật khẩu
function password2Function() {
    let password = document.getElementById('password2-signup').value;
    //Dia chi
    if (password == '') {
        document.getElementById('password2-signup-error').innerHTML = 'Vui lòng nhập lại mật khẩu! ';
        document.getElementById('password2-signup-error').style.color = "red";
        return 0;
    }
    else if (password != passwordFunction()) {
        document.getElementById('password2-signup-error').innerHTML = 'Mật khẩu không giống nhau!';
        document.getElementById('password2-signup-error').style.color = "red";
        return 0;
    }
    else {
        document.getElementById('password2-signup-error').innerHTML = 'OK!';
        document.getElementById('password2-signup-error').style.color = "green";
        return password;
    }
}

//Tích vào nút đồng ý
function verify() {
    let check = document.getElementById('deal-signup');
    if (check.checked == false) {
        document.getElementById('deal-signup-error').textContent = "Phải là trai xinh gái đẹp mới được đăng kí";
    }
    else {
        document.getElementById('deal-signup-error').textContent = "";
        return true;
    }
}

/**
 * Hàm đăng kí
 */
function signup(){
    //Nếu tất cả thông tin được điền đầy đủ thì thêm thông tin khách hàng vào LocalStorage(account)
    if(fnameFunction() && mailFunction() && phoneFunction() && diachiFunction() && passwordFunction() && password2Function() && verify())
    {
        let accounts=localStorage.getItem("account")?JSON.parse(localStorage.getItem("account")):[];
        //Đẩy các thong tin khách hàng vừa nhập vào mảng account
        accounts.push({
            status: 0,
            fname: fnameFunction(),
            mail: mailFunction(),
            phone: phoneFunction(),
            password: password2Function(),
            address: diachiFunction(),
            cart:[]
        })
        //Rồi lưu vào localStorage
        localStorage.setItem("account",JSON.stringify(accounts));
        document.getElementById('btn-dangki').hidden=true;
        document.getElementById('continue2').hidden=false;

        //Xuất thông báo
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng kí thành công',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(()=>{
            window.open("./iPhone.html")
          },2000)
    }
}
