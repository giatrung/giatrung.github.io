/**
 * Chọn sản phẩm ở trang chủ
 * @param {} id 
 */
export function choose(){
    let pick = document.getElementsByClassName('pick');
    for(let i=0; i<pick.length; i++){
        pick[i].addEventListener('click', ()=>{
                localStorage.setItem("pick",i+1);
                switchcase()
            
        });
    }
}
export function switchcase() {
    let key = localStorage.getItem('pick')? parseInt(localStorage.getItem('pick')):0;
    switch (key) {
        case 1: {
            filter(1);
            let tr = document.querySelectorAll(".pick");
            tr[0].checked = true;
            
            break;
        }
        case 2: {
            filter(2);
            let tr = document.querySelectorAll(".pick");
            tr[1].checked = true;
            
            break;
        }
        case 3: {
            filter(3);
            let tr = document.querySelectorAll(".pick");
            tr[2].checked = true;
            
            break;
        }
        default: filter(4);
    }
}

/**
 * Phương thức Bộ lọc
 * @param {*} id 
 */
export function filter(id) {
    if (id == 1) {
        // document.getElementById("ipad").style.display = "none";
        // document.getElementById("mac").style.display = "none";
        // document.getElementById("iphone").style.display = "block";
        loopFilterNone('ipad');
        loopFilterNone('mac');
        loopFilterBlock('iphone');
    }
    else if (id == 2) {
        // document.getElementById("iphone").style.display = "none";
        // document.getElementById("mac").style.display = "none";
        // document.getElementById("ipad").style.display = "block";
        loopFilterNone('iphone');
        loopFilterNone('mac');
        loopFilterBlock('ipad');
    }
    else if (id == 3) {
        // document.getElementById("ipad").style.display = "none";
        // document.getElementById("iphone").style.display = "none";
        // document.getElementById("mac").style.display = "block";
        loopFilterNone('ipad');
        loopFilterNone('iphone');
        loopFilterBlock('mac');
    }
    else {
        loopFilterBlock('mac');
        loopFilterBlock('iphone');
        loopFilterBlock('ipad');
    }
}//end filter()
function loopFilterNone(tagName){
    let tagname=document.getElementsByTagName(tagName);
    for(let i = 0; i <tagname.length; i++){
        tagname[i].style.display="none";
    }
}
function loopFilterBlock(tagName){
    let tagname=document.getElementsByTagName(tagName);
    for(let i = 0; i <tagname.length; i++){
        tagname[i].style.display="block";
    }
}