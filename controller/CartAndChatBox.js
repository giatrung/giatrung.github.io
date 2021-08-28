//********************************************************************************* */
switchcase();
//Nếu chưa có số lượng trong giỏ hàng thì nút thanh toán sẽ disable
let first = localStorage.getItem('soluong');
first = parseInt(first);
if (first && first>0) {
    document.querySelector("#thanhtoan").disabled = false;
}
else {
    document.querySelector("#thanhtoan").disabled = true;
}
//=========================================================
/**
 * Phương thức Mua 
 * @param {*} ten 
 * @param {*} hinh 
 * @param {*} gia 
 */
function Buy(ten, hinh, gia) {
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
    list(ten, hinh, gia, soluongs);
    document.querySelector("#thanhtoan").disabled = false;
}//Buy()
//********************************************************************************* */
/**
 * Phương thức onload
 */
function onload() {
    let soluongs = localStorage.getItem('soluong');
    document.getElementById('dot-number').textContent = soluongs;
    let tongtien = localStorage.getItem('tongtien');
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}//end onload()
onload();
/**
 * Phương thức List - thêm sản phẩm đã mua vào localStorage
 */
function list(ten, hinh, gia, soluongs) {
    //Lấy các giá trị từ trong localStorage ra
    //Nếu localStorage rỗng thì sẽ trả về mảng rỗng
    //Nếu có dữ liệu trong localStorage thì sẽ ép vể kiểu JSON
    let temp = 0;
    item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    //Thêm các đối tượng sản phẩm vào trong mảng item bằng hàm push
    for (let i = 0; i < item.length; i++) {
        if (item[i].sanpham.localeCompare(ten) == 0) {
            temp = 1;
            console.log(item[i].sanpham.localeCompare(ten));
            item[i].soluong++;
            localStorage["items"] = JSON.stringify(item);
            break;
        }
    }
    if (temp == 0) {
        item.push({
            sanpham: ten,
            hinhanh: hinh,
            soluong: 1,
            dongia: gia,
        });
        localStorage.setItem('items', JSON.stringify(item));
        console.log("thanhcong");
    }
    temp=0;
    let accounts = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : [];
    for (let i = 0; i < accounts.length; i++) {
        for (let j = 0; j < accounts[i].cart.length; j++) {
            if (accounts[i].cart[j].sanpham.localeCompare(ten) == 0) {
                temp = 1;
                accounts[i].cart[j].soluong++;
                localStorage["account"] = JSON.stringify(accounts);
                break;
            }
        }
        if (accounts[i].status == 1 && temp==0) {
            accounts[i].cart.push({
                sanpham: ten,
                hinhanh: hinh,
                soluong: 1,
                dongia: gia,
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
        localStorage.setItem('tongtien', tongtien + gia);
        document.getElementById('tongtien').textContent = (tongtien + gia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    else {
        localStorage.setItem('tongtien', gia);
        document.getElementById('tongtien').textContent = gia.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    display(soluongs);

}//end list()
//********************************************************************************* */
/**
 *  Hiển thị danh sách các mặt hàng hiện có trong localStorage
 * @param {*} soluongs 
 */
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

/**
 * Phương thức tăng số lượng
 * @param {} id - Vị trí phần tử trong mảng  // :))tao kiu m  dung co nhich con chuu ủa tui thấy 2 con chuột nên tưởng đc xài :v
 * 
 */
function plus(id) {
    //cai debugger nay sẽ chặn code lại..để m kiểm tra từng bước
    //f10 để tiếp 1 bước
    //f8 để kết thúc hàm 
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    item[id].soluong += 1;
    localStorage['items'] = JSON.stringify(item);
    let soluongs = localStorage.getItem('soluong');
    soluongs = parseInt(soluongs);
    localStorage.setItem('soluong', soluongs + 1);
    document.getElementById('dot-number').textContent = soluongs + 1;
    let tongtien = localStorage.getItem('tongtien');
    tongtien = parseInt(tongtien);
    dongia = parseInt(item[id].dongia);
    localStorage.setItem('tongtien', tongtien + dongia);
    document.getElementById('tongtien').textContent = (tongtien + dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    display();
}//end plus

/**
 * Phương thức giảm số lượng
 * @param {*} id - Vị trí phần tử trong mảng
 */
function minus(id) {
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    if (item[id].soluong > 1) {
        item[id].soluong -= 1;
        localStorage['items'] = JSON.stringify(item);
        let soluongs = localStorage.getItem('soluong');
        if (soluongs > 0) {
            soluongs = parseInt(soluongs);
            localStorage.setItem('soluong', soluongs - 1);
            document.getElementById('dot-number').textContent = soluongs - 1;
        }
        let tongtien = localStorage.getItem('tongtien');
        tongtien = parseInt(tongtien);
        dongia = parseInt(item[id].dongia);
        localStorage.setItem('tongtien', tongtien - dongia);
        document.getElementById('tongtien').textContent = (tongtien - dongia).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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
function Xoa(id) {
    //Giảm số lượng giỏ hàng được hiển thị bên ngoài
    //Xóa phần tử trong mảng
    let item = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    let soluong = localStorage.getItem('soluong');
    localStorage.setItem('soluong', soluong - item[id].soluong);
    document.getElementById('dot-number').innerHTML = soluong - item[id].soluong;
    //Tru tien
    let tongtien = localStorage.getItem('tongtien');
    tongtien = parseInt(tongtien);
    tongtien -= (item[id].dongia * item[id].soluong);
    localStorage.setItem('tongtien', tongtien);
    document.getElementById('tongtien').textContent = tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (tongtien == 0) {
        document.querySelector("#thanhtoan").disabled = true;
    }
    item.splice(id, 1);//splicedùng để xóa phần từ'
    localStorage.setItem('items', JSON.stringify(item));
    let accounts = localStorage.getItem('account')? JSON.parse(localStorage.getItem('account')) : [];
    accounts.forEach((account)=>{
        if(account.status==1)
        {
            account.cart.splice(id, 1);
        }
    });
    localStorage['account']= JSON.stringify(accounts);
    display();
}//end Xoa()
//********************************************************************************* */
/**
 * Phương thức Xóa toàn bộ
 * @param {*} soluong 
 */
function Clear(soluong) {
    //reset soluong hiển thị ngoài giỏ hàng = g0
    soluong = localStorage.getItem('soluong');
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
    display();
}//end Clear



//********************************************************************************* */
//=============================Lọc sản phẩm==========================

function switchcase() {
    let key = localStorage.getItem('pick')? parseInt(localStorage.getItem('pick')):0;
    switch (key) {
        case 1: {
            filter(1);
            let tr = document.querySelectorAll(".pick");
            tr[0].checked = true;
            localStorage.setItem('pick', 0)
            break;
        }
        case 2: {
            filter(2);
            let tr = document.querySelectorAll(".pick");
            tr[1].checked = true;
            localStorage.setItem('pick', 0)
            break;
        }
        case 3: {
            filter(3);
            let tr = document.querySelectorAll(".pick");
            tr[2].checked = true;
            localStorage.setItem('pick', 0)
            break;
        }
        default: filter(4);
    }
}

/**
 * Phương thức Bộ lọc
 * @param {*} id 
 */
function filter(id) {
    if (id == 1) {
        document.getElementById("ipad").style.display = "none";
        document.getElementById("mac").style.display = "none";
        document.getElementById("iphone").style.display = "block";
    }
    else if (id == 2) {
        document.getElementById("iphone").style.display = "none";
        document.getElementById("mac").style.display = "none";
        document.getElementById("ipad").style.display = "block";
    }
    else if (id == 3) {
        document.getElementById("ipad").style.display = "none";
        document.getElementById("iphone").style.display = "none";
        document.getElementById("mac").style.display = "block";
    }
    else {
        document.getElementById("ipad").style.display = "block";
        document.getElementById("iphone").style.display = "block";
        document.getElementById("mac").style.display = "block";
    }
}//end filter()

//********************************************************************** */
/**
 * Phương thức đánh giá 5 sao
 */
let cha = document.querySelectorAll(".rate");
function danhgia(index, stt) {
    for (let j = 0; j < 5; j++) {
        cha[stt].children[j].style.color = "orange";
    }
    for (let j = index; j < 5; j++) {
        cha[stt].children[j].style.color = "black";
    }
}// end danhgia()

//********************************************************************** */
/**
 * Phương thức để Reply trả lời tin nhắn
 */
let str = `<p style="float:left;border-radius: 10px 10px 10px 0px;
padding-left: 5px;background-color: rgb(240, 240, 240);color:black;margin: 5px;width:51%;">TrunkApple xin kính chào quý Khách!</p>`;

function Reply() {
    let x = document.getElementById('message').value;
    if (x) {
        for (let j = 0; j < x.length; j++) {
            if (j == 20 || j == 40 || j == 60 || j == 80) {
                let head = x.substring(0, j); // tách chuỗi từ vị trí 0 đến vị trí thứ j
                let foot = x.substring(j, x.length);// tách chuỗi từ vị trí j đến hết chiều dài chuỗi
                x = head + `\n` + foot;
            }
        }
        str += `<p style="float:right;background-color: #0089e4;color:white; width: 51%;margin: 5px;padding-left: 10px;
        border-radius: 10px 10px 0px 10px;">${x}</p>
        <p id="traloi" style="float:left;border-radius:  10px 10px 10px 0px;
         padding-left: 5px;background-color: rgb(240, 240, 240);color:black; width: 51%;margin: 5px;">TrunkApple 
         xin hân hạnh được phục vụ ! Nếu bạn cần tư vấn hãy gọi hotline: 1900.6626 ngay với 
         chúng tôi.</p>`;
        document.getElementById('chatbox').innerHTML = str;
        document.getElementById('message').value = "";
    }
    gotoBottom()
}//end Reply

/**
 * Cuộn xuống cuối dòng
 * link tham khảo
 * https://www.it-swarm-vi.com/vi/javascript/tu-dong-cuon-xuong-cuoi-trang/1067877934/?fbclid=IwAR1kXe0h3Pc_KRT93SPAnj68Xx5j6WoL1xeAGFwjWuJz2yibJYPnUOO7qfI
 */
function gotoBottom() {
    var element = document.getElementById("chatbox");
    element.scrollTop = element.scrollHeight - element.clientHeight;
}
//********************************************************************************* */
// ==========================CHAT-ICON==============================
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//********************************************************************************* */
/**
 * Code tham khảo ở StackoverFlow
 * Bấm Enter sẽ kích hoạt nút gửi
 */
var input = document.getElementById("message");
input.addEventListener("keydown", function (event) { // thêm sự kiến ấn nút cho khối input nhập tin nhắn
    var x = event.key
    //Nếu sự kiện nút ấn là Enter thì giữ nguyên vị trí trang hiện tại và kích hoạt button Gửi
    if (x === 'Enter') {
        event.preventDefault(); //Ngăn chặn việc mở qua URL mới, nếu không có dòng này sẽ bị nhảy qua trang khác
        document.getElementById("gui").click();
    }
});

//********************************************************************************* */
