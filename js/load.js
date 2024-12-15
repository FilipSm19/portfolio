const header = document.getElementById('header');
const home = document.getElementById('home');
function onLoad() {
    showHeader();
}


window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.style.opacity = 1 - scrollTop / 500;
    if (1 - scrollTop / 500 <= 0) {

        home.style.opacity = '0.3';
    }
    else {

        home.style.opacity = '0';
    }
});

home.addEventListener(
    "mouseout",
    (event) => {
        home.style.opacity = '0.3';
    });

home.addEventListener(
    "mouseover",
    (event) => {
        home.style.opacity = '1';
    });