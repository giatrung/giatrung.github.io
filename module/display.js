import {xoaEvent,plusEvent,minusEvent,Clear} from './Cart.js';
export function display() {
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let tableContent = `<tr class="bg-dark text-light"><td class="col-lg-5" style="width=300px">Tất cả sản phẩm</td>
        <td class='col-lg-2'>Hinh ảnh</td>
        <td class='col-lg-2'>Số lượng</td>
        <td class='col-lg-2'>Thành tiền</td>
        <td class='col-lg-1'><button class='btn bg-light' id="clear"><i class='fa fa-trash' aria-hidden='true'></i></button></td>
        </tr>`
    // array.foreach((value,index)=>function)
    // duyệt qua các phần tử và xuất ra màn hình các sản phẩm có trong mảng item
    item.forEach((items,index) => {
        tableContent += `<tr data-index="${index}" class="productInCart"><td class="col-lg-5" style="width=300px">${items.sanpham}</td>
        <td class='col-lg-2'><img style="width:70px;height:70px" src="${items.hinhanh}"></td>
        <td class='col-lg-2'>
        <button type="button" class="btn btn-outline-secondary btn-number minus" style="width: 20px;padding: 0px;">
        <span class="fa fa-minus"></span>
        </button> ${items.soluong} <button type="button" class="btn btn-outline-secondary btn-number plus" style="width: 20px;padding: 0px;">
        <span class="fa fa-plus"></span>
        </button></td>
        <td class='col-lg-2'>${(items.dongia * items.soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</td>
        <td class='col-lg-1'><button class='btn bg-light xoa' dataabc=${items.id}>
         <i class='fa fa-trash' dataabc=${items.id}></i> 
        </button></td>
        </tr>`;

    })
    document.getElementById('modal-list').innerHTML = tableContent;
    xoaEvent();
    minusEvent();
    plusEvent();
    document.getElementById('clear').addEventListener('click',()=>{Clear()});
}//end display()
