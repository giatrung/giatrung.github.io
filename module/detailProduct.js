import{products} from './product.js';

//MODULE CHỨC NĂNG HIỂN THỊ THÔNG TIN CẤU HÌNH SẢN PHẨM


let x=products;
const detailproducts = (product)=>{
    let contentDetail = `- Màn hình: ${product.manHinh},
    - Hệ điều hành: ${product.heDieuHanh}
    - Camera Trước: ${product.cameraTruoc}
    - Camera Sau:  ${product.cameraSau}
    - Ram: ${product.ram}
    - Rom: ${product.rom}
`
return contentDetail;
}

export function displayDetailproducts(){
    
    let detail = document.getElementsByClassName('detail');
    for(let i = 0; i < detail.length;i++) {
        detail[i].innerText=detailproducts(x[i]);
    }
}