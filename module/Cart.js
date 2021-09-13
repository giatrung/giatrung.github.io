import {display} from '/module/display.js';
import { products } from '/module/product.js';

//Nếu chưa có số lượng trong giỏ hàng thì nút thanh toán sẽ disable
/**
 * Thêm sự kiện vào nút Mua
 */
export function addToCart(){
    let addToCart = document.getElementsByClassName("buy");
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", () => {
            Buy(products[i]);
        });
    }
    
}
//=========================================================
/**
 * Phương thức Mua 
 * @param {*} product // 1 đối tượng trong mảng sản phẩm
 */
function Buy(product) {
    alert(`Bạn đã thêm ${product.ten} vào giỏ hàng` );
    let soluongs = localStorage.getItem('soluong');//Lấy dữ liệu từ localStorage
    soluongs = parseInt(soluongs);//Ép thành kiểu số nguyên

    // Nếu soluongs có tồn tại thì tăng số lượng lên 1
    if (soluongs) {
        localStorage.setItem('soluong', soluongs + 1);
        document.getElementById('dot-number').textContent = soluongs + 1;
    }
    //Nếu chưa có thì gán bằng 1
    else {
        localStorage.setItem('soluong', 1);
        document.getElementById('dot-number').textContent = 1;
    }
    list(product, soluongs);
    document.querySelector("#thanhtoan").disabled = false;
}//Buy()
//********************************************************************************* */
/**
 * Phương thức onload
 */
export function onload() {
    let soluongs = localStorage.getItem('soluong');
    document.getElementById('dot-number').textContent = soluongs;
    if(soluongs==0){document.querySelector("#thanhtoan").disabled = true;}
    let tongtien = localStorage.getItem('tongtien');
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    let first = localStorage.getItem('soluong');
    display();
}//end onload()

/**
 * Phương thức List - thêm sản phẩm đã mua vào localStorage
 */
function list(product, soluongs) {
    //Lấy các giá trị từ trong localStorage ra
    //Nếu localStorage rỗng thì sẽ trả về mảng rỗng
    //Nếu có dữ liệu trong localStorage thì sẽ ép vể kiểu JSON
    let temp = 0;
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    //Thêm các đối tượng sản phẩm vào trong mảng item bằng hàm push
    for (let i = 0; i < item.length; i++) {
        if (item[i].sanpham.localeCompare(product.ten) == 0) {
            temp = 1;
            console.log(item[i].sanpham.localeCompare(product.ten));
            item[i].soluong++;
            localStorage["items"] = JSON.stringify(item);
            break;
        }
    }
    if (temp == 0) {
        item.push({
            id: product.id,
            sanpham: product.ten,
            hinhanh: product.hinh,
            soluong: 1,
            dongia: product.gia,
        });
        localStorage.setItem('items', JSON.stringify(item));
        console.log("thanhcong");
    }
    temp=0;
    let accounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];
    for (let i = 0; i < accounts.length; i++) {
        for (let j = 0; j < accounts[i].cart.length; j++) {
            if (accounts[i].cart[j].sanpham.localeCompare(product.ten) == 0) {
                temp = 1;
                accounts[i].cart[j].soluong++;
                localStorage["account"] = JSON.stringify(accounts);
                break;
            }
        }
        if (accounts[i].status == 1 && temp==0) {
            accounts[i].cart.push({
                id: product.id,
                sanpham: product.ten,
                hinhanh: product.hinh,
                soluong: 1,
                dongia: product.gia,
            });
            console.log(accounts[i].cart);
            localStorage["account"] = JSON.stringify(accounts);
        }
    }

    //Ép các giá trị của mảng item thành kiểu chuỗi và
    // Truyền dữ liệu của mảng item vào localStorage  
    //Tinh tong tien
    let tongtien = localStorage.getItem('tongtien') ? parseInt(localStorage.getItem('tongtien')) : 0;//Lấy dữ liệu từ localStorage
    // tongtien = parseInt(tongtien);//Ép thành kiểu số nguyên
    if (tongtien) {
        localStorage.setItem('tongtien', tongtien + product.gia);
        document.getElementById('tongtien').textContent = (tongtien + product.gia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    else {
        localStorage.setItem('tongtien', product.gia);
        document.getElementById('tongtien').textContent = product.gia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    display(soluongs);

}//end list()
//********************************************************************************* */

/**
 * Phương thức tăng số lượng
 * @param {} id - Vị trí phần tử trong mảng  // 
 * 
 */
export function plus(id) {
    //cai debugger nay sẽ chặn code lại..để m kiểm tra từng bước
    //f10 để tiếp 1 bước
    //f8 để kết thúc hàm 
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    item[id].soluong += 1;
    localStorage['items'] = JSON.stringify(item);
    let accounts= localStorage.getItem('account')?JSON.parse(localStorage.getItem('account')) : [];
    for(let i=0;i<accounts.length;i++) {
        if(accounts[i].status==1)
        {
            accounts[i].cart[id].soluong++;
        }
    }
    localStorage['account']=JSON.stringify(accounts);
    let soluongs = localStorage.getItem('soluong');
    soluongs = parseInt(soluongs);
    localStorage.setItem('soluong', soluongs + 1);
    document.getElementById('dot-number').textContent = soluongs + 1;
    let tongtien = localStorage.getItem('tongtien');
    tongtien = parseInt(tongtien);
    localStorage.setItem('tongtien', tongtien + item[id].dongia);
    document.getElementById('tongtien').textContent = (tongtien + item[id].dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}//end plus

/**
 * Phương thức giảm số lượng
 * @param {*} id - Vị trí phần tử trong mảng
 */
export function minus(id) {
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let accounts= localStorage.getItem('account')?JSON.parse(localStorage.getItem('account')) : [];
    //Nếu có đã đăng nhập tài khoản thì trừ số lượng sản phẩm trong giỏ hàng trong tài khoản
    for(let i=0;i<accounts.length;i++) {
        if(accounts[i].status==1)
        {
            accounts[i].cart[id].soluong--;
        }
    }
    localStorage['account']=JSON.stringify(accounts);
    //Giảm số lượng sản phẩm đi 1
    //Nếu số lượng của 1 sản phẩm bằng 0 thì xoá sản phẩm
    if (item[id].soluong > 1) {
        item[id].soluong -= 1;
        localStorage['items'] = JSON.stringify(item);
        //Giảm tổng số lượng giỏ hàng
        let soluongs = localStorage.getItem('soluong');
        if (soluongs > 0) {
            soluongs = parseInt(soluongs);
            localStorage.setItem('soluong', soluongs - 1);
            document.getElementById('dot-number').textContent = soluongs - 1;
        }
        let tongtien = localStorage.getItem('tongtien');
        tongtien = parseInt(tongtien);
        localStorage.setItem('tongtien', tongtien - item[id].dongia);
        document.getElementById('tongtien').textContent = (tongtien - item[id].dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    else {
        Xoa(id);
    }
    display();
}//end minus()

//********************************************************************************* */
/**
 * Phương thức xóa phần tử trong localStorage
 * @param {*} id - vị trí cần xóa 
 */
export function Xoa(id) {
    //Giảm số lượng giỏ hàng được hiển thị bên ngoài
    //Xóa phần tử trong mảng
    let yes=confirm("Bạn có chắc muốn xoá sản phẩm không?")
    if(yes==true) {
        let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
        let soluong = localStorage.getItem('soluong');
       localStorage.setItem('soluong', soluong - item[id].soluong);
        document.getElementById('dot-number').innerHTML = soluong - item[id].soluong;
        let tongtien = localStorage.getItem('tongtien');
        tongtien = parseInt(tongtien);
        tongtien -= (item[id].dongia * item[id].soluong);
        localStorage.setItem('tongtien', tongtien);
        document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        if (tongtien == 0) {
            document.querySelector("#thanhtoan").disabled = true;
        }
        item.splice(id, 1);//splicedùng để xóa phần từ'//dang xoa mang // bay gio la xoa theo id
        // item = item.filter(a =>a.id != id);
    
        localStorage.setItem('items', JSON.stringify(item));
        
        let accounts = localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')) : [];
        accounts.forEach((account)=>{
            if(account.status==1)
            {
                account.cart.splice(id, 1);
            }
        });
        localStorage['account']= JSON.stringify(accounts);
    }
    display();
}//end Xoa()
//********************************************************************************* */
/**
 * Phương thức Xóa toàn bộ
 */
export function Clear() {
    let yes=confirm("Bạn có chắc muốn xoá giỏ hàng không?")
    if(yes==true) {
    //reset soluong hiển thị ngoài giỏ hàng = 0
    localStorage.setItem('soluong', 0);
    document.getElementById('dot-number').textContent = 0;

    //Xóa tất cả phần tử trong giỏ hàng
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    item.splice(0, item.length);
    localStorage.setItem('items', JSON.stringify(item));
    localStorage.setItem('tongtien', 0);
    let accounts = localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')) : [];
    accounts.forEach((account)=>{
        account.cart=[];
    });
    localStorage['account']= JSON.stringify(accounts);
    document.getElementById('tongtien').textContent = 0;
    document.querySelector("#thanhtoan").disabled = true;
    }
    display();
}//end Clear

/**
 * 
 */
export function xoaEvent(){
    let xoa=document.getElementsByClassName('xoa');
    for(let i=0; i<xoa.length; i++){
        xoa[i].addEventListener("click",()=>{
            Xoa(i);
        })
    }
}
export function plusEvent(){
    let cong=document.getElementsByClassName('plus');
    for(let i=0; i<cong.length; i++){
        cong[i].addEventListener("click",()=>{
            plus(i);
        })
    }
}
export function minusEvent(){
    let tru=document.getElementsByClassName('minus');
    for(let i=0; i<tru.length; i++){
        tru[i].addEventListener("click",()=>{
          minus(i);
        })
    }
}



