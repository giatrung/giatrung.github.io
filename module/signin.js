import {display} from './display.js';
//MODULE CHỨC NĂNG ĐĂNG NHẬP, ĐĂNG XUẤT

/**
 * Phương thức đăng nhập bằng số điện thoại
 * @returns 
 */
function dangnhap() {
    //Lấy dữ liệu số điện thoại và mật khẩu để kiểm tra
    let phone = document.getElementById("phone-signin").value;
    let pass = document.getElementById("password-signin").value;
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    //Kiểm tra xem số điện thoại và mật khẩu có trùng khớp với tài khoản nào trong LocalStrage không
    for (let i = 0; i < info.length; i++) {
        if (phone == info[i].phone && pass == info[i].password) {//Nếu SDT và mật khẩu nhập vào đúng
            //status=0: trạng thái tài khoảng không hoạt động
            //status=1: trạng thái tài khoảng đang hoạt động
            info[i].status = 1;//Thay đổi thuộc tính status của tài khoản đó thành 1;
            localStorage["account"] = JSON.stringify(info);
            document.getElementById("status-signin").innerHTML = `Hello <b>${info[i].fname}</b>`;//Thay đổi attribute Dome của nút signin.
            changeAttribute("dropdown","",1);
            let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
            let accounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];//Lưu lại các sản phẩm trong giỏ hàng mà user đã thêm trước đó
            saveItemFromAccToCart(accounts,item,info);//Cập nhật lại số lượng và tổng tiền khi user đăng nhập
            updateInfoItemWhenUserLogin(item);//Hiển thị lại số lượng và tổng tiền khi user đăng nhập vừa cập nhật lại
            reDisplayQuantityAndSumCost();
            display(); //Hiển thị các sản phẩm trong giỏ hàng vẫn còn lưu ở lần đăng nhập trước
            alertSignIn() //Xuất thông báo đăng nhập thành công
            return;
        }
    }
    //Nếu đang nhập sai thì xuất ra thông báo lỗi
    document.getElementById("signin-error").textContent = "SDT hoặc mật khẩu chưa đúng!";
    document.getElementById("password-signin").value="";
}

/**
 * Hiển thị lại số lượng và tổng tiền của giỏ hàng
 */
function reDisplayQuantityAndSumCost(){
    let soluongs = localStorage.getItem('soluong');
    document.getElementById('dot-number').textContent = soluongs;
    let tongtien = localStorage.getItem('tongtien');
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

//Lưu lại các sản phẩm trong giỏ hàng mà user đã thêm trước đó
function saveItemFromAccToCart(accounts,item,info){
    for (let j = 0; j < accounts.length; j++) {
        //Tìm tài khoảng vừa mới đăng nhập và thêm các sản phẩm từ account.cart sang vào localStorage của item
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
}
//Cập nhật lại số lượng và tổng tiền khi user đăng nhập
function updateInfoItemWhenUserLogin(item){
    for (let x = 0; x < item.length; x++) 
    {
            let soluongs = localStorage.getItem('soluong');
            soluongs = parseInt(soluongs);
            localStorage.setItem('soluong', soluongs + item[x].soluong);
            let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;
            localStorage.setItem('tongtien', tongtien + item[x].dongia);
    }
}

/**
 * Đổi thuộc tính khi đăng nhập vào.
 * @param {} dataToggle - Các thuộc tính Dom html
 * @param {*} dataTarget - Các thuộc tính Dom html
 * @param {*} dataStatus - Các thuộc tính Dom html
 */
function changeAttribute(dataToggle,dataTarget,dataStatus){
    document.getElementById("signin").setAttribute("data-toggle", dataToggle); 
    document.getElementById("signin").setAttribute("data-target", dataTarget);
    document.getElementById("signin").setAttribute("data-status", dataStatus);
}
/**
 * Phương thức đăng xuất
 */
function signout() {
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    //Duyệt mảng
    for (let i = 0; i < info.length; i++) {
        //đổi trạng thái đang đặng nhập là 1 thành 0
        if (info[i].status == 1) {
            info[i].status = 0;
            localStorage["account"] = JSON.stringify(info);
            //Reset các thuộc tính lại như lúc chưa đăng nhập
            localStorage.setItem("onSignIn","");
            document.getElementById("status-signin").innerHTML = `Đăng nhập`;
            changeAttribute("modal","#dangnhap",0); //khi đăng xuất thì sẽ thay đổi từ tên người dùng thành chữ "Đăng nhập"
            //Reset lại bộ nhớ Local
            localStorage.setItem("items", []);
            localStorage.setItem("tongtien", 0);
            localStorage.setItem("soluong", 0);
        }
    }
    //Xuất thông báo
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Đăng xuất thành công!',
        showConfirmButton: false,
        timer: 1500
      })
}//end signout

/**
 * Phương thức luôn thực thi
 */
function onload() {
    let info = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
    for (let i = 0; i < info.length; i++) {
        if (info[i].status == 1) {
            document.getElementById("status-signin").innerHTML = `Hello <b>${info[i].fname}</b>`;
            changeAttribute("dropdown","",1);
        }
    }
    reDisplayQuantityAndSumCost();
    display();
}
/**
 * Hàm xuất thông báo khi đăng nhập
 */
export function alertSignIn(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đăng nhập thành công',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        location.reload();
      },1200)
      
}
onload();
export {dangnhap,signout}