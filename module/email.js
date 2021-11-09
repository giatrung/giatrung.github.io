//MODULE XỬ LÍ HOẠT ĐỘNG GỬI EMAIL CHO KHÁCH HÀNG KHI KHÁCH HÀNG ĐẶT HÀNG
//CÓ SỬ DỤNG PROMISE, THEN, CATCH

/**
 * Hàm gửi mail
 * @param {*} name - Tên khách hàng
 * @param {*} email - email khách hàng
 */
export function sendEmail(name,email){
        //Tạo thanh xử lí đơn hàng
        let timerInterval
        Swal.fire({
        title: 'Đang xử lí đơn hàng!',
        html: 'Xử lí đơn hàng trong <b></b> giây.',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })
        //end Tạo thanh xử lí đơn hàng

        //Gửi mail
        Email.send({
        // SecureToken:"fc650f52-ff65-40df-b668-d2868f49f23a", //Mã bảo mật 2 lớp đã được mã hóa.
        Host: "smtp.gmail.com",
        Username: "dgtunicity@gmail.com",
        Password: "idoilwsshynyxglv",
        To:`${email}`,
        From: "duonggiatrung113@gmail.com",
        Subject: "Trunk Apple - Đơn hàng của bạn:",
        Body: `
        Xin chân thành cám ơn ${name} đã ủng hộ chúng tôi! 
        ${emailContent()}
        `
        }).then((email) => setTimeout(()=>{
        //Nếu email gửi thành công sẽ xuất ra thông báo này.
        Swal.fire({
            title: '<strong>Đặt hàng thành công</strong>',
            icon: 'success',
            html: 'Đơn đặt hàng đã được gửi đến mail của bạn',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<a href="../iPhone.html" style="color: white"><i class="fa fa-thumbs-up"></i> Great!</a>',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<a href="../iPhone.html" style="color: white"><i class="fa fa-thumbs-down"></i></a>',
            cancelButtonAriaLabel: 'Thumbs down'
          })
        },1500)
    )
    .catch((err)=>alert("Fail! Mail has not been send!"));
}

/**
 * Nội dung email mà khách nhận được
 * @returns 
 */
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