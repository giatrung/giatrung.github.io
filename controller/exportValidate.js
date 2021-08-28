// function SignIn(){
//     let SignIn= localStorage.getItem("onSignIn")
//     SignIn=JSON.parse(SignIn);
//     if(SignIn)
//     {
//         document.getElementById('name').value=SignIn.fname;
//         document.getElementById('email').value=SignIn.mail;
//         document.getElementById('phone').value=SignIn.phone;
//         document.getElementById('address').value=SignIn.address;
//     }
// }
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
    else if (document.getElementById('store').checked) {
        hinhthuc = document.getElementById('store').value
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
        document.getElementById('dathang').innerHTML = 'Quý khách đặt hàng thành công';
        document.getElementById('btn-dathang').hidden = true;
        document.getElementById('continue').hidden=false;
        document.getElementById('name').disabled=true;
        document.getElementById('email').disabled=true;
        document.getElementById('phone').disabled=true;
        document.getElementById('address').disabled=true;
        sendEmail(fullname,email);
        localStorage.setItem("soluong",0);
        localStorage.setItem("items",[]);
        localStorage.setItem("tongtien",0);
    }
    
}
function sendEmail(name,email){
    Email.send({
        // Host: "smtp.mailtrap.io",
        // Username:"ee2f258cf8bdc2",
        // Password:"cqqkvejagsnjfpnv",
        //SecureToken:"0f169ac9-f4b0-45f2-9276-4520efa7c007",
        SecureToken:"fc650f52-ff65-40df-b668-d2868f49f23a",
        To:`${email}`,
        From: "duonggiatrung113@gmail.com",
        Subject: "Trunk Apple - Đơn hàng của bạn:",
        Body: `
        Xin chân thành cám ơn ${name} đã ủng hộ chúng tôi! 
        ${emailContent()}
        `
    }).then((email) => alert("Mail has been send"));
}
function emailContent(){
    let product = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];
    let tongtien = localStorage.getItem("tongtien");
    tongtien=parseInt(tongtien);
    console.log(tongtien);
    let tableContent = `<tr class="bg-dark text-light">
    <td class="col-lg-2" style="boder:2px solid silver">STT</td>
    <td class="col-lg-5" style="width:300px;boder:2px solid silver">Tất cả sản phẩm</td>
    <td class='col-lg-2' style="boder:2px solid silver" >Số lượng</td>
    <td class='col-lg-2' style="boder:2px solid silver" >Thành tiền</td>
    </tr>`;
    product.forEach((items, index) => {
        index++;
        tableContent += `<tr>
        <td class="col-lg-2"  style="boder:2px solid silver">${index}</td>
        <td class="col-lg-5" style="width:300px;boder:2px solid silver">${items.sanpham}</td>
        <td class="col-lg-2" >${items.soluong}</td>
        <td class='col-lg-2'  style="boder:2px solid silver">${(items.dongia*items.soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}đ</td>
        </tr>`;
    })
    let html=`  <table id="modal-list" class="text-center">
    ${tableContent}
    <tr style="boder:2px solid silver">
        Tổng tiền: ${tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}
    </tr>
    </table>`;
    return html;
}
document.querySelector('#btn-dathang').addEventListener('click', validate);
export{validate};