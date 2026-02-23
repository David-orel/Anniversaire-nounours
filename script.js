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

// Vitesse différente mobile / desktop
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
* VIDEO FULLSCREEN + BAISSE MUSIQUE
*********************************/

const video = document.querySelector("video");

if (video && music) {

    // Quand on lance la vidéo
    video.addEventListener("play", () => {

        // 📉 Baisser la musique progressivement
        let originalVolume = music.volume;
        let fadeDown = setInterval(() => {
            if (music.volume > 0.2) {
                music.volume -= 0.05;
            } else {
                clearInterval(fadeDown);
            }
        }, 100);

        // 🎥 Plein écran automatique
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Safari
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE
            video.msRequestFullscreen();
        }
    });

    // Quand la vidéo est mise en pause ou se termine
    video.addEventListener("pause", () => {
        restoreMusic();
    });

    video.addEventListener("ended", () => {
        restoreMusic();
    });

    function restoreMusic() {
        let fadeUp = setInterval(() => {
            if (music.volume < 0.9) {
                music.volume += 0.05;
            } else {
                clearInterval(fadeUp);
            }
        }, 100);
    }
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

/* Vider les anciens dots si présents */
dotsContainer.innerHTML = "";

/* Initialisation des slides */
slides.forEach((slide, index) => {
    slide.style.opacity = index === 0 ? "1" : "0";
    slide.style.position = "absolute";
    slide.style.inset = "0";
    slide.style.transition = "opacity 1.5s ease";
});

/* Création des dots */
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

/* Met à jour l'état des dots */
function updateDots() {
    const dots = document.querySelectorAll(".dots span");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

/* Aller à une slide précise */
function goToSlide(index) {
    slides[currentIndex].style.opacity = "0";
    currentIndex = index;
    slides[currentIndex].style.opacity = "1";
    updateDots();
}

/* Slide suivante / précédente */
function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
}

function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
}

/* Événements boutons */
nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

/* Auto fade */
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

/* Lancement automatique */
startAutoSlide();
