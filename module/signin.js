import {display} from './display.js';
function dangnhap() {
    let phone = document.getElementById("phone-signin").value;
    let pass = document.getElementById("password-signin").value;
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    for (let i = 0; i < info.length; i++) {
        if (phone == info[i].phone && pass == info[i].password) {
            info[i].status = 1;
            localStorage["account"] = JSON.stringify(info);
            document.getElementById("status-signin").innerHTML = `Hello <b>${info[i].fname}</b>`;
            document.getElementById("signin").setAttribute("data-toggle", "dropdown");
            document.getElementById("signin").setAttribute("data-target", "");
            // localStorage.setItem("account", JSON.stringify(info));
            document.getElementById("signin").setAttribute("data-status", "1");

            let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
            let accounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];
            for (let j = 0; j < accounts.length; j++) {
                if (accounts[j].status == 1) {
                    item.push(...accounts[j].cart);
                    localStorage.setItem("items", JSON.stringify(item));
                    let onSignIn={
                        fname: info[j].fname,
                        address: info[j].address,
                        mail: info[j].mail,
                        phone:info[j].phone
                    };
                    localStorage.setItem("onSignIn",JSON.stringify(onSignIn));
                    }
                }
            for (let x = 0; x < item.length; x++) {
                    let soluongs = localStorage.getItem('soluong');
                    soluongs = parseInt(soluongs);
                    localStorage.setItem('soluong', soluongs + item[x].soluong);
                    let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
                    localStorage.setItem('tongtien', tongtien + item[x].dongia);
                    // document.getElementById('tongtien').innerHTML = (tongtien + item[x].dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
            
            let soluongs = localStorage.getItem('soluong');
            document.getElementById('dot-number').textContent = soluongs;
            let tongtien = localStorage.getItem('tongtien');
            document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            display();
            window.location.href = "./index.html";
            return;
        }
    }
    document.getElementById("signin-error").textContent = "SDT hoặc mật khẩu chưa đúng!";
    document.getElementById("password-signin").value="";
}
function signout() {
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    for (let i = 0; i < info.length; i++) {
        if (info[i].status == 1) {
            info[i].status = 0;
            localStorage["account"] = JSON.stringify(info);
            localStorage.setItem("onSignIn","");
            document.getElementById("status-signin").innerHTML = `Đăng nhập`;
            document.getElementById("signin").setAttribute("data-toggle", "modal");
            document.getElementById("signin").setAttribute("data-target", "#dangnhap");
            document.getElementById("signin").setAttribute("data-status", "0");
            localStorage.setItem("items", []);
            localStorage.setItem("tongtien", 0);
            localStorage.setItem("soluong", 0);
        }
    }
}

function onload() {
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    for (let i = 0; i < info.length; i++) {
        if (info[i].status == 1) {
            document.getElementById("status-signin").innerHTML = `Hello <b>${info[i].fname}</b>`;
            document.getElementById("signin").setAttribute("data-toggle", "dropdown");
            document.getElementById("signin").setAttribute("data-target", "");
            document.getElementById("signin").setAttribute("data-status", "1");
        }
    }
    let soluongs = localStorage.getItem('soluong');
    soluongs=parseInt(soluongs);
    document.getElementById('dot-number').textContent = soluongs;
    let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}
onload();
export {dangnhap,signout}