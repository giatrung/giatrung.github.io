import {display} from '/module/display.js';
import { products } from '/module/product.js';

//Nếu chưa có số lượng trong giỏ hàng thì nút thanh toán sẽ disable
/**
 * Thêm sự kiện vào nút Mua
 */
export function addToCart(x){
    let addToCart = document.getElementsByClassName("buy");
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", () => {
            if(x){
                Buy(x[i]);
            }
            else{
                Buy(products[i]);
            }
        });
    }
}
//=========================================================
/**
 * Phương thức Mua 
 * @param {*} product // 1 đối tượng trong mảng sản phẩm
 */
function Buy(product) {
    // alert(`Bạn đã thêm ${product.ten} vào giỏ hàng` );
    alertAddtoCart(product.ten);
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
function alertAddtoCart(item){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${item} đã thêm vào giỏ hàng`,
        showConfirmButton: false,
        timer: 1500
      })
}
//********************************************************************************* */
/**
 * Phương thức onload
 */
export function onload() {
    let soluongs = localStorage.getItem('soluong');
    document.getElementById('dot-number').textContent = soluongs;
    if(soluongs==0)
    {
        document.querySelector("#thanhtoan").disabled = true;
    }
    let tongtien = localStorage.getItem('tongtien')?localStorage.getItem('tongtien'):0;
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}//end onload()

/**
 * Phương thức List - thêm sản phẩm đã mua vào localStorage
 */
function list(product, soluongs) {
    
    addItemIntoLocalStorage(product);

    //Thêm sản phẩm vào cart của accounts
    addItemIntoAccountLocalStorage(product);

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

function addItemIntoLocalStorage(product){
    //Lấy các giá trị từ trong localStorage ra
    //Nếu localStorage rỗng thì sẽ trả về mảng rỗng
    //Nếu có dữ liệu trong localStorage thì sẽ ép vể kiểu JSON
    let temp = 0;
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    //Nếu có sản phẩm cùng tên trong giỏ hàng thì tăng số lượng của sản phẩm đó lên
    for (let i = 0; i < item.length; i++) {
        if (item[i].sanpham.localeCompare(product.ten) == 0) {
            temp = 1;
            item[i].soluong++;
            localStorage["items"] = JSON.stringify(item);
            break;
        }
    }
    //nếu chưa có sản phẩm trong item thì thêm vào
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
}
function addItemIntoAccountLocalStorage(product){
    let temp = 0;
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
}
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
    //Tăng số lượng giỏ hàng
    let soluongs = localStorage.getItem('soluong');
    soluongs = parseInt(soluongs);
    localStorage.setItem('soluong', soluongs + 1);
    document.getElementById('dot-number').textContent = soluongs + 1;
    //Tăng tổng tiền
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
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Xoa_act(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    // let yes=confirm("Bạn có chắc muốn xoá sản phẩm không?");
    // if(yes==true) {
       
    // }
    
}//end Xoa()
function Xoa_act(id){
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    //Giảm số lượng
    let soluong = localStorage.getItem('soluong');
    localStorage.setItem('soluong', soluong - item[id].soluong);
    document.getElementById('dot-number').innerHTML = soluong - item[id].soluong;
    
    //Giảm tổng tiền
    let tongtien = localStorage.getItem('tongtien');
    tongtien = parseInt(tongtien);
    tongtien -= (item[id].dongia * item[id].soluong);
    localStorage.setItem('tongtien', tongtien);
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    item.splice(id, 1);
    localStorage.setItem('items', JSON.stringify(item));
    if (tongtien == 0) {
        document.querySelector("#thanhtoan").disabled = true;
    }
    let accounts = localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')) : [];
    accounts.forEach((account)=>{
        if(account.status==1)
        {
            account.cart.splice(id, 1);
        }
    });
    localStorage['account']= JSON.stringify(accounts);
    display();
}
//********************************************************************************* */
/**
 * Phương thức Xóa toàn bộ
 */
export function Clear() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Clear_act()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}//end Clear
function Clear_act(){
    //reset soluong hiển thị ngoài giỏ hàng = 0
    localStorage.setItem('soluong', 0);
    document.getElementById('dot-number').textContent = 0;

    //Xóa tất cả phần tử trong giỏ hàng
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    item.splice(0, item.length);
    localStorage.setItem('items', JSON.stringify(item));
    localStorage.setItem('tongtien', 0);

    //Xoá tất cả sản phẩm trong giỏ hàng của user
    let accounts = localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')) : [];
    accounts.forEach((account)=>{
        account.cart=[];
    });
    localStorage['account']= JSON.stringify(accounts);
    document.getElementById('tongtien').textContent = 0;
    document.querySelector("#thanhtoan").disabled = true;
    display();
}

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