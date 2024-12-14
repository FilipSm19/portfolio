
const div = document.querySelector(".typewriter")
const text1 = "Welcome to "
const text2 = "my portfolio."
var functionRunning = true;
function textTypingEffect(element, text, s = 150, i = 0) {
    element.textContent += text[i];

    if (i === text.length - 1 && functionRunning === true) {
        functionRunning = false;
        textTypingEffect(div, text2, 300);
        return
    }
    else if (i === text.length - 1) { setTimeout(() => dots(div, '|||'), s); return }
    setTimeout(() =>
        textTypingEffect(element, text, s, i + 1), s);
}
textTypingEffect(div, text1);
function dots(element, text, s = 300, i = 0) {
    element.textContent = element.textContent.replace('|', '\ ');
    if (i == text.length - 1) {
        element.textContent = element.textContent.replace(/.$/, '\\');

        setTimeout(() =>
            dots(element, text, s, i + 1), 800);
    }
    else if (i == text.length) {
        element.textContent = element.textContent.replace(/.$/, '/');

        setTimeout(() =>
            dots(element, text, s, i - 1), 700);
    }
    else {
        element.textContent += text[i];

        setTimeout(() =>
            dots(element, text, s, i + 1), 500);
    }
}

const spinnerWrapperEl = document.querySelector('.spinner-wrapper');

window.addEventListener('load', () => {
    spinnerWrapperEl.style.opacity = '0';

    setTimeout(() => {
        spinnerWrapperEl.style.display = 'none';
    }, 500);
})

