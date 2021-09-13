import { products } from "./product.js";
let list =() =>{

    let temp='';
    products.forEach((item,index)=>{
        let id=index+1;
        index++;
        temp+=`
        <${item.tag}>
        <div class="card" data-tag="${id}">
        <div class="card-body bg-light card-body-product">
            <div class="row">
                <div class="col-lg-5 bg-white">
                    <img src="image/logo.png" alt="" style="width:60%;height:20px;">
                    <img src="${item.hinh}" alt="">
                    <div class="rate text-center" id="rate">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <p style="font-size:smaller; text-align:center;">656 đánh giá</p>
                </div>
                <div class="content bg-light col-lg-7">
                    <h5 id="name-product1">iPhone 12 chính hãng VN/A(Full VAT)(128GB)</h5>
                    <p style="font-size: 13px ;text-decoration-line: line-through; text-align: left;margin: 0 0 0 0">
                        9.990.000đ
                    </p>
                    <h4 id="dongia1" style="color: red;margin:0px;">7.990.000đ</h4>
        
                    <p style="font-size:smaller;margin-bottom: 2px;margin-top: 10px;"><b>Cấu hình:</b>
                    </p>
                    <p style="font-size:small">
                    - Màn hình: ${item.manHinh}<br>
                    - Hệ điều hành: ${item.heDieuHanh}<br>
                    - Camera Trước: ${item.cameraTruoc}<br>
                    - Camera Sau:  ${item.cameraSau}<br>
                    - Ram: ${item.ram}<br>
                    - Rom: ${item.rom}<br>
                    </p>
                </div>
        
                <div class="col-lg-12">
                    <p class="mt-4">iPhone 12 chính hãng VN/A(Full VAT) <br>Giá tốt nhất:
                        <b>7.990.000đ</b>
                    </p>
                </div>
            </div>
            <button class="buy btn btn-secondary" style="width: 100%;">Mua</button>
        </div>
        </div>
        </${item.tag}>`;
        
    });
    return temp;
    }
////////////////////////////////////////////////////////////////////////////////////////////////
export let product = `
<div id="title" class="title" style="width: 100%; border-bottom: 1px solid rgb(196, 196, 196) ; height: 60px;">
        <div class="row" style="width: 100%;">
            <h1 class="col-lg-7" style="margin: 0px 80px; font-weight: normal;">Sản phẩm</h1>
            <div class="col-lg-3" style="padding-top: 30px;">Bộ lọc:
                <input class="pick" type="radio" name="choose" > iPhone
                <input class="pick" type="radio" name="choose" > iPad
                <input class="pick" type="radio" name="choose" > Macbook
                <input class="pick" type="radio" name="choose" checked> Tất cả
            </div>
        </div>
    </div>
<div class="container-fluid iphone-product mt-3 mb-3">
<div class="card-columns" style="flex-wrap:wrap;" >
               ${list()}
</div>
`;

