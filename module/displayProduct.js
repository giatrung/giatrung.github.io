// import { products } from "./product.js";
export let list =(key) =>{
    let temp=``;
    key.forEach((item,index)=>{
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
                    <h5 id="name-product1">${item.ten}</h5>
                    <p style="font-size: 13px ;text-decoration-line: line-through; text-align: left;margin: 0 0 0 0">
                        ${item.giaGoc.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ
                    </p>
                    <h4 id="dongia1" style="color: red;margin:0px;">${item.gia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</h4>
        
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
                    <p class="mt-4">${item.ten}<br>Giá tốt nhất:
                        <b>${item.gia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</b>
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



