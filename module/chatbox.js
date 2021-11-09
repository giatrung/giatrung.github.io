//********************************************************************** */
//MODULE CHỨC NĂNG HỘP CHAT (CHATBOX)

/**
 * Phương thức để Reply trả lời tin nhắn
 */
 let str = `<p style="float:left;border-radius: 10px 10px 10px 0px;
 padding-left: 5px;background-color: rgb(240, 240, 240);color:black;margin: 5px;width:51%;">TrunkApple xin kính chào quý Khách!</p>`;
export function Reply() {
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
 export function gotoBottom() {
     var element = document.getElementById("chatbox");
     element.scrollTop = element.scrollHeight - element.clientHeight;
 }
 //********************************************************************************* */
 // ==========================CHAT-ICON==============================
 export function openAndCloseForm() {
     document.querySelector('#openForm').addEventListener('click',() =>{
        document.getElementById("myForm").style.display = "block";
     })
     document.querySelector('#closeForm').addEventListener('click',() =>{
        document.getElementById("myForm").style.display = "none";
     })
     
 }
 
 //********************************************************************************* */
 /**
  * Code tham khảo ở StackoverFlow Bấm Enter sẽ kích hoạt nút gửi
  */
 export function submit(){
 var input = document.getElementById("message");
 input.addEventListener("keydown", function (event) { // thêm sự kiến ấn nút cho khối input nhập tin nhắn
     var x = event.key
     //Nếu sự kiện nút ấn là Enter thì giữ nguyên vị trí trang hiện tại và kích hoạt button Gửi
     if (x === 'Enter') {
         event.preventDefault(); //Ngăn chặn việc mở qua URL mới, nếu không có dòng này sẽ bị nhảy qua trang khác
         document.getElementById("gui").click();
     }
 });
 }
 //********************************************************************************* */