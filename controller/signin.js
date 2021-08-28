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
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].status == 1) {
                    item.push(...accounts[i].cart);
                    localStorage.setItem("items", JSON.stringify(item));
                    let onSignIn={
                        fname: info[i].fname,
                        address: info[i].address,
                        mail: info[i].mail,
                        phone:info[i].phone
                    };
                    localStorage.setItem("onSignIn",JSON.stringify(onSignIn));
                    }
                }
                for (let j = 0; j < item.length; j++) {
                    let soluongs = localStorage.getItem('soluong');
                    soluongs = parseInt(soluongs);
                    localStorage.setItem('soluong', soluongs + item[j].soluong);
                    
                    let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
                    localStorage.setItem('tongtien', tongtien + item[j].dongia);
                    document.getElementById('tongtien').innerHTML = (tongtien += item[j].dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
            
            let soluongs = localStorage.getItem('soluong')?parseInt(localStorage.getItem('soluong')) : 0;
            document.getElementById('dot-number').textContent = soluongs;
            let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
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
            localStorage.setItem("onSignIn",[]);
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
    let soluongs = localStorage.getItem('soluong')?parseInt(localStorage.getItem('soluong')) : 0;
    document.getElementById('dot-number').textContentL = soluongs;
    let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}
function user_data() {
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let accounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].status == 1) {
            accounts[i].cart.push(...item);
            console.log(accounts[i].cart);
            localStorage["account"] = JSON.stringify(accounts);
        }
    }
}
function display(soluongs) {
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let tableContent = `<tr class="bg-dark text-light"><td class="col-lg-5" style="width=300px">Tất cả sản phẩm</td>
        <td class='col-lg-2'>Hinh ảnh</td>
        <td class='col-lg-2'>Số lượng</td>
        <td class='col-lg-2'>Thành tiền</td>
        <td class='col-lg-1'><button class='btn bg-light' onclick="Clear(${soluongs})"><i class='fa fa-trash' aria-hidden='true'></i></button></td>
        </tr>`
    // array.foreach((value,index)=>function)
    // duyệt qua các phần tử và xuất ra màn hình các sản phẩm có trong mảng item
    item.forEach((items, index) => {
        let id = index;
        index++;
        tableContent += `<tr><td class="col-lg-5" style="width=300px">${items.sanpham}</td>
        <td class='col-lg-2'><img style="width:70px;height:70px" src="${items.hinhanh}"></td>
        <td class='col-lg-2'>
        <button type="button" class="btn btn-outline-secondary btn-number" style="width: 20px;padding: 0px;"   onClick="minus(${id})">
        <span class="fa fa-minus"></span>
        </button> ${items.soluong} <button type="button" class="btn btn-outline-secondary btn-number" style="width: 20px;padding: 0px;" onClick="plus(${id})">
        <span class="fa fa-plus"></span>
        </button></td>
        <td class='col-lg-2'>${(items.dongia * items.soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</td>
        <td class='col-lg-1'><button class='btn bg-light' onclick="Xoa(${id})"><i class='fa fa-trash' aria-hidden='true'></i></button></td>
        </tr>`;

    })
    document.getElementById('modal-list').innerHTML = tableContent;
}//end display()
display();
onload();
document.querySelector("#signin-button").addEventListener("click", dangnhap);
document.querySelector("#exit").addEventListener("click", signout);
