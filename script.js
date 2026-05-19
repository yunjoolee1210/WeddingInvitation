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
  ],
};

// ============================================================
// Translations
// ============================================================
const I18N = {
  en: {
    "hero.eyebrow": "We're getting married",
    "hero.date": "Saturday, October 17, 2026 · 1:00 PM",
    "groom.name": "Kim Woo-bin",
    "bride.name": "Shin Min-a",
    "groom.relation": "'s son",
    "bride.relation": "'s daughter",
    "greeting.title": "Invitation",
    "greeting.body": "The most precious thing in life is meeting the right person.\nAfter walking different paths, we have found each other\nand now begin a new journey together.\nPlease join us as we celebrate the start of our new life\nwith the people we love.",
    "greeting.groom_parents": "Mr. & Mrs. Kim",
    "greeting.bride_parents": "Mr. & Mrs. Shin",
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
    "venue.map": "View on Google Maps",
    "account.title": "Wedding Gift",
    "account.intro": "Your presence is our greatest gift. If you wish to send your blessing in this way, we gratefully accept.",
    "account.groom_side": "Groom's side",
    "account.bride_side": "Bride's side",
    "account.groom_name": "Kim Woo-bin",
    "account.groom_rel": "Groom",
    "account.groom_bank": "Kookmin Bank",
    "account.groom_father": "Mr. Kim",
    "account.groom_father_rel": "Father of the Groom",
    "account.groom_father_bank": "Shinhan Bank",
    "account.bride_name": "Shin Min-a",
    "account.bride_rel": "Bride",
    "account.bride_bank": "Woori Bank",
    "account.bride_father": "Mr. Shin",
    "account.bride_father_rel": "Father of the Bride",
    "account.bride_father_bank": "Hana Bank",
    "account.copy": "Copy",
    "account.copied": "Copied",
  },
  ko: {
    "hero.eyebrow": "저희 결혼합니다",
    "hero.date": "2026년 10월 17일 토요일 오후 1시",
    "groom.name": "김우빈",
    "bride.name": "신민아",
    "groom.relation": "의 장남",
    "bride.relation": "의 차녀",
    "greeting.title": "초 대 합 니 다",
    "greeting.body": "서로 다른 길을 걸어온 두 사람이\n이제 하나의 길을 함께 걷고자 합니다.\n새로운 시작의 자리에\n귀한 걸음 하시어 축복해 주시면\n더없는 기쁨이 되겠습니다.",
    "greeting.groom_parents": "김ㅇㅇ · 박ㅇㅇ",
    "greeting.bride_parents": "신ㅇㅇ · 최ㅇㅇ",
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
    "venue.map": "구글 지도에서 보기",
    "account.title": "마 음 전 하 실 곳",
    "account.intro": "참석만으로도 큰 축복이지만, 마음 전하실 곳을 안내드립니다.",
    "account.groom_side": "신랑측",
    "account.bride_side": "신부측",
    "account.groom_name": "김우빈",
    "account.groom_rel": "신랑",
    "account.groom_bank": "국민은행",
    "account.groom_father": "김OO",
    "account.groom_father_rel": "신랑 아버지",
    "account.groom_father_bank": "신한은행",
    "account.bride_name": "신민아",
    "account.bride_rel": "신부",
    "account.bride_bank": "우리은행",
    "account.bride_father": "신OO",
    "account.bride_father_rel": "신부 아버지",
    "account.bride_father_bank": "하나은행",
    "account.copy": "복사",
    "account.copied": "복사됨",
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
// Copy account number to clipboard
// ============================================================
function showToast(text) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1500);
}

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const num = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(num);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    showToast(I18N[currentLang]["account.copied"] + ": " + num);
  });
});

// ============================================================
// Background music toggle
// ============================================================
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("music-toggle");

function setMusicState(playing) {
  musicBtn.classList.toggle("paused", !playing);
  musicBtn.setAttribute("aria-pressed", playing ? "true" : "false");
}

musicBtn.addEventListener("click", async () => {
  if (bgm.paused) {
    try {
      await bgm.play();
      setMusicState(true);
    } catch {
      setMusicState(false);
    }
  } else {
    bgm.pause();
    setMusicState(false);
  }
});
bgm.addEventListener("play", () => setMusicState(true));
bgm.addEventListener("pause", () => setMusicState(false));

// Try autoplay; most mobile browsers block until user interaction, in which
// case the button stays in "paused" state until tapped.
(async () => {
  try {
    await bgm.play();
  } catch {
    setMusicState(false);
    const wake = async () => {
      try { await bgm.play(); setMusicState(true); } catch {}
      document.removeEventListener("touchstart", wake);
      document.removeEventListener("click", wake);
    };
    document.addEventListener("touchstart", wake, { once: true });
    document.addEventListener("click", wake, { once: true });
  }
})();

// ============================================================
// Initial language paint
// ============================================================
applyLanguage(currentLang);
