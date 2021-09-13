/**
 * Hàm để đánh giá số sao
 */
export function rating(){
    let cha = document.querySelectorAll(".rate");
    cha.forEach(con=>{
        con.addEventListener('click',()=>{
            for (let j = 0; j < 5; j++) {
                con.children[j].style.color = "orange";
            }
            
        });
    });
    // for (let j = index; j < 5; j++) {
            //     con.children[j].style.color = "black";
            // }
    // function danhgia(index, stt) {
     
    // }// end danhgia()
}