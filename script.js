// ============================================================
// Wedding configuration — edit these to customize the invitation.
// ============================================================
const WEDDING = {
  // ISO 8601 with timezone offset. Default: Oct 17, 2026, 1:00 PM KST.
  dateISO: "2026-10-17T13:00:00+09:00",

  // Photo filenames inside the /pictures folder.
  // The first photo (`main.jpg`) is also used as the hero background (set in index.html).
  // `wide: true` makes a photo span two columns in the gallery grid.
  gallery: [
    { src: "pictures/gallery1.jpg", wide: true },
    { src: "pictures/gallery2.jpg" },
    { src: "pictures/gallery3.jpg" },
    { src: "pictures/gallery4.jpg", wide: true },
  ],
};

// ============================================================
// Translations
// ============================================================
const I18N = {
  en: {
    "hero.eyebrow": "We're getting married",
    "hero.date": "Saturday, October 17, 2026 · 1:00 PM",
    "groom.name": "Minjun",
    "bride.name": "Seoyeon",
    "groom.relation": "'s son",
    "bride.relation": "'s daughter",
    "greeting.title": "Invitation",
    "greeting.body": "The most precious thing in life is meeting the right person.\nAfter walking different paths, we have found each other\nand now begin a new journey together.\nPlease join us as we celebrate the start of our new life\nwith the people we love.",
    "greeting.groom_parents": "Mr. & Mrs. Kim",
    "greeting.bride_parents": "Mr. & Mrs. Lee",
    "countdown.title": "Counting Down",
    "countdown.days": "Days",
    "countdown.hours": "Hours",
    "countdown.mins": "Minutes",
    "countdown.secs": "Seconds",
    "countdown.until": "until",
    "gallery.title": "Our Moments",
    "venue.title": "Where",
    "venue.name": "The Grand Ballroom, Seoul Plaza Hotel",
    "venue.address": "119 Sogong-ro, Jung-gu, Seoul",
    "venue.hall": "5F · Crystal Hall",
    "thanks.body": "Thank you for being part of our story.",
  },
  ko: {
    "hero.eyebrow": "저희 결혼합니다",
    "hero.date": "2026년 10월 17일 토요일 오후 1시",
    "groom.name": "김민준",
    "bride.name": "이서연",
    "groom.relation": "의 장남",
    "bride.relation": "의 차녀",
    "greeting.title": "초 대 합 니 다",
    "greeting.body": "서로 다른 길을 걸어온 두 사람이\n이제 하나의 길을 함께 걷고자 합니다.\n새로운 시작의 자리에\n귀한 걸음 하시어 축복해 주시면\n더없는 기쁨이 되겠습니다.",
    "greeting.groom_parents": "김ㅇㅇ · 박ㅇㅇ",
    "greeting.bride_parents": "이ㅇㅇ · 최ㅇㅇ",
    "countdown.title": "남 은 시 간",
    "countdown.days": "일",
    "countdown.hours": "시간",
    "countdown.mins": "분",
    "countdown.secs": "초",
    "countdown.until": "결혼식까지",
    "gallery.title": "우 리 의 순 간",
    "venue.title": "오 시 는 길",
    "venue.name": "서울 플라자 호텔 그랜드볼룸",
    "venue.address": "서울특별시 중구 소공로 119",
    "venue.hall": "5층 · 크리스탈홀",
    "thanks.body": "함께해 주셔서 진심으로 감사드립니다.",
  },
};

// ============================================================
// Language toggle
// ============================================================
const langToggle = document.getElementById("lang-toggle");
let currentLang = (navigator.language || "en").toLowerCase().startsWith("ko") ? "ko" : "en";

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = I18N[lang][key];
    if (value !== undefined) el.textContent = value;
  });
  langToggle.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === lang);
  });
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "ko" : "en");
});

// ============================================================
// Countdown
// ============================================================
const target = new Date(WEDDING.dateISO).getTime();
const els = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs"),
};

function pad(n, w) { return String(Math.max(0, n)).padStart(w, "0"); }

function updateNum(el, value, width) {
  const next = pad(value, width);
  if (el.textContent !== next) {
    el.textContent = next;
    el.classList.remove("tick");
    void el.offsetWidth; // restart animation
    el.classList.add("tick");
  }
}

function tickCountdown() {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  updateNum(els.days, days, 3);
  updateNum(els.hours, hours, 2);
  updateNum(els.mins, mins, 2);
  updateNum(els.secs, secs, 2);
}

tickCountdown();
setInterval(tickCountdown, 1000);

// ============================================================
// Gallery (with graceful fallback when image is missing)
// ============================================================
const galleryEl = document.getElementById("gallery");
WEDDING.gallery.forEach((item, i) => {
  const fig = document.createElement("div");
  fig.className = "photo" + (item.wide ? " wide" : "");
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = "Wedding photo " + (i + 1);
  img.loading = "lazy";
  img.onerror = () => { img.style.display = "none"; };
  fig.appendChild(img);
  galleryEl.appendChild(fig);
});

// ============================================================
// Reveal sections on scroll
// ============================================================
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".section").forEach((s) => io.observe(s));

// ============================================================
// Initial language paint
// ============================================================
applyLanguage(currentLang);
