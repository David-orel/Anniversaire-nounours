/*********************************
 * RÉCUPÉRATION DES ÉLÉMENTS
 *********************************/
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

/*********************************
 * INTRO + MUSIQUE
 *********************************/
if (startBtn && intro && music) {
    startBtn.addEventListener("click", () => {

        // 🎵 Lancement musique avec fade-in
        music.volume = 0;
        music.play().catch(() => { });

        let fade = setInterval(() => {
            if (music.volume < 0.9) {
                music.volume += 0.05;
            } else {
                clearInterval(fade);
            }
        }, 200);

        // ✨ Disparition intro
        intro.style.opacity = "0";
        intro.style.transition = "opacity 1.5s ease";

        setTimeout(() => {
            intro.style.display = "none";
            document.body.classList.remove("intro-active");

            // 🔝 Scroll automatique vers l'entête
            const homeSection = document.getElementById("home");
            if (homeSection) {
                homeSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

        }, 1500);
    });
}

/*********************************
 * SCROLL REVEAL
 *********************************/
function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/*********************************
 * COEURS FLOTTANTS
 *********************************/
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💙";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.opacity = Math.random();
    heart.style.pointerEvents = "none";
    heart.style.animation = "floatUp 6s linear forwards";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, window.innerWidth < 768 ? 1500 : 800);

/*********************************
 * MENU BURGER
 *********************************/
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

/*********************************
 * ANIMATION CSS DES COEURS
 *********************************/
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-110vh);
    }
}
`;
document.head.appendChild(style);

/*********************************
* VIDEO + STOP MUSIQUE
*********************************/

const video = document.querySelector("video");

if (video && music) {

    // ▶️ Lecture vidéo
    video.addEventListener("play", () => {

        // 🔇 Stop musique
        music.pause();

        // fullscreen uniquement sur desktop
        if (window.innerWidth > 768) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        }
    });

    // ⏸ pause vidéo
    video.addEventListener("pause", () => {
        music.play().catch(() => { });
    });

    // 🔚 fin vidéo
    video.addEventListener("ended", () => {
        music.play().catch(() => { });
    });
}

/*********************************
 * CAROUSEL CINEMA FADE - STABLE
 *********************************/

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
let autoSlide;

dotsContainer.innerHTML = "";

slides.forEach((slide, index) => {
    slide.style.opacity = index === 0 ? "1" : "0";
    slide.style.position = "absolute";
    slide.style.inset = "0";
    slide.style.transition = "opacity 1.5s ease";
});

slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

function updateDots() {
    const dots = document.querySelectorAll(".dots span");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

function goToSlide(index) {
    slides[currentIndex].style.opacity = "0";
    currentIndex = index;
    slides[currentIndex].style.opacity = "1";
    updateDots();
}

function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
}

function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide();
