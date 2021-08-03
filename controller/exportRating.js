let cha = document.getElementById('rate');
function danhgia(index) {
    for (let i = 0; i < index; i++) {
        cha.children[i].style.color = "orange";
    }
    for (let i = index; i < 5; i++) {
        cha.children[i].style.color = "black ";
    }
}
export{danhgia};