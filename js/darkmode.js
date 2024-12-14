let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');


//darkmode !== "active" ? enableDarkmode() : disableDarkmode()

const enableDarkmode = () => {

    document.body.classList.add('dark');
    localStorage.setItem('darkmode', 'active');
}
const disableDarkmode = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('darkmode', null);
}

if (darkmode === "active") {
    themeSwitch.click();
    enableDarkmode();
}
else {
    disableDarkmode();
}

themeSwitch.addEventListener("click", () => {
    if (themeSwitch.checked) {
        enableDarkmode();
    }
    else {
        disableDarkmode();
    }
})