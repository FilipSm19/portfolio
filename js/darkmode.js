let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');
const label = document.getElementById("label");

//darkmode !== "active" ? enableDarkmode() : disableDarkmode()

const enableDarkmode = () => {
    if (label.innerHTML !== 'light') { label.style.opacity = '0'; }
    document.body.classList.add('dark');
    localStorage.setItem('darkmode', 'active');
    setTimeout(() => {
        label.innerHTML = "light";
        label.style.opacity = '1';
    }, 600);

}
const disableDarkmode = () => {
    if (label.innerHTML !== 'dark') { label.style.opacity = '0'; }
    document.body.classList.remove('dark');
    localStorage.setItem('darkmode', null);
    setTimeout(() => {
        label.innerHTML = "dark";
        label.style.opacity = '1';
    }, 600);
}

if (darkmode === "active") {
    themeSwitch.checked = true;
    label.innerHTML = "light";
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