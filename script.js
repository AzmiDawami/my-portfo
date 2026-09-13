// ==========================================================================
// CONFIGURATION & CONSTANTS
// ==========================================================================
const CONFIG = {
  USER_ID: "722083917724647506",
  SPOTIFY_PLAYLIST_ID: "0nZis5ePycLlX70IrDIX6o"
};

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const themeIcon = document.getElementById('themeIcon');
const discordIframe = document.getElementById('discord-embed');
const spotifyIframe = document.getElementById('spotify-embed');
const currentYearText = document.getElementById('currentYear');
const projectsCarousel = document.getElementById('projectsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

/**
 * Memperbarui URL widget Discord dan Spotify berdasarkan tema saat ini
 * @param {boolean} isDark - Status mode gelap
 */
const updateEmbedThemes = (isDark) => {
  const discordTheme = isDark ? "dark" : "light";
  const spotifyTheme = isDark ? "0" : "1";

  if (discordIframe) {
    discordIframe.src = `https://lanyard-profile-readme.vercel.app/api/${CONFIG.USER_ID}?theme=${discordTheme}`;
  }
  
  if (spotifyIframe) {
    spotifyIframe.src = `https://open.spotify.com/embed/playlist/${CONFIG.SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=${spotifyTheme}`;
  }
};

/**
 * Mengatur tema aplikasi (Dark/Light)
 * @param {boolean} isDark - Status mode gelap
 */
const setTheme = (isDark) => {
  if (isDark) {
    body.classList.add('dark-mode');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    body.classList.remove('dark-mode');
    if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
  }

  localStorage.setItem('darkMode', isDark.toString());
  updateEmbedThemes(isDark);
};

// ==========================================================================
// PROJECTS SLIDER NAVIGATION
// ==========================================================================
const initProjectsSlider = () => {
  if (!projectsCarousel || !prevBtn || !nextBtn) return;

  // Klik Panah Kanan
  nextBtn.addEventListener('click', () => {
    const card = projectsCarousel.querySelector('.project-card');
    if (card) {
      const cardWidth = card.offsetWidth;
      projectsCarousel.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  });

  // Klik Panah Kiri
  prevBtn.addEventListener('click', () => {
    const card = projectsCarousel.querySelector('.project-card');
    if (card) {
      const cardWidth = card.offsetWidth;
      projectsCarousel.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  });
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
const init = () => {
  // 1. Cek preferensi tersimpan di LocalStorage (default to dark jika belum ada)
  const savedDarkMode = localStorage.getItem('darkMode') !== 'false';
  setTheme(savedDarkMode);

  // 2. Set tahun footer secara otomatis
  if (currentYearText) {
    currentYearText.textContent = new Date().getFullYear();
  }

  // 3. Event Listener untuk tombol Dark Mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isCurrentlyDark = body.classList.contains('dark-mode');
      setTheme(!isCurrentlyDark);
    });
  }

  // 4. Inisialisasi Slider Proyek
  initProjectsSlider();
};

// Jalankan inisialisasi saat script dimuat
document.addEventListener('DOMContentLoaded', init);