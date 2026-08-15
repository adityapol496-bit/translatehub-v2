// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(current);
});

// ---------- LANGUAGE DATA (100+ languages) ----------
const ALL_LANGUAGES = [
  { code: "detect", name: "Detect language" },
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
  { code: "pa", name: "Punjabi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "ur", name: "Urdu" },
  { code: "or", name: "Odia" },
  { code: "as", name: "Assamese" },
  { code: "kok", name: "Konkani" },
  { code: "mai", name: "Maithili" },
  { code: "doi", name: "Dogri" },
  { code: "ne", name: "Nepali" },
  { code: "sa", name: "Sanskrit" },
  { code: "sd", name: "Sindhi" },
  { code: "bho", name: "Bhojpuri" },
  { code: "mni", name: "Manipuri" },
  { code: "sat", name: "Santali" },
  { code: "ks", name: "Kashmiri" },
  { code: "si", name: "Sinhala" },
  { code: "my", name: "Burmese" },
  { code: "km", name: "Khmer" },
  { code: "lo", name: "Lao" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "pt", name: "Portuguese" },
  { code: "pt-br", name: "Portuguese (Brazilian)" },
  { code: "it", name: "Italian" },
  { code: "ru", name: "Russian" },
  { code: "uk", name: "Ukrainian" },
  { code: "pl", name: "Polish" },
  { code: "nl", name: "Dutch" },
  { code: "sv", name: "Swedish" },
  { code: "no", name: "Norwegian (bokmål)" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "is", name: "Icelandic" },
  { code: "el", name: "Greek" },
  { code: "cs", name: "Czech" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "hu", name: "Hungarian" },
  { code: "ro", name: "Romanian" },
  { code: "bg", name: "Bulgarian" },
  { code: "hr", name: "Croatian" },
  { code: "sr", name: "Serbian" },
  { code: "bs", name: "Bosnian" },
  { code: "mk", name: "Macedonian" },
  { code: "sq", name: "Albanian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lv", name: "Latvian" },
  { code: "et", name: "Estonian" },
  { code: "ga", name: "Irish" },
  { code: "cy", name: "Welsh" },
  { code: "mt", name: "Maltese" },
  { code: "ca", name: "Catalan" },
  { code: "eu", name: "Basque" },
  { code: "gl", name: "Galician" },
  { code: "he", name: "Hebrew" },
  { code: "ar", name: "Arabic" },
  { code: "fa", name: "Persian" },
  { code: "tr", name: "Turkish" },
  { code: "az", name: "Azerbaijani" },
  { code: "ka", name: "Georgian" },
  { code: "hy", name: "Armenian" },
  { code: "kk", name: "Kazakh" },
  { code: "uz", name: "Uzbek" },
  { code: "tg", name: "Tajik" },
  { code: "tk", name: "Turkmen" },
  { code: "ky", name: "Kyrgyz" },
  { code: "mn", name: "Mongolian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-tw", name: "Chinese (Traditional)" },
  { code: "th", name: "Thai" },
  { code: "vi", name: "Vietnamese" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "tl", name: "Filipino" },
  { code: "jv", name: "Javanese" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "am", name: "Amharic" },
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yoruba" },
  { code: "ig", name: "Igbo" },
  { code: "zu", name: "Zulu" },
  { code: "xh", name: "Xhosa" },
  { code: "af", name: "Afrikaans" },
  { code: "so", name: "Somali" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "st", name: "Sesotho" },
  { code: "ny", name: "Chichewa" },
  { code: "mg", name: "Malagasy" },
  { code: "haw", name: "Hawaiian" },
  { code: "mi", name: "Maori" },
  { code: "sm", name: "Samoan" },
  { code: "yi", name: "Yiddish" },
  { code: "eo", name: "Esperanto" },
  { code: "la", name: "Latin" },
  { code: "co", name: "Corsican" },
  { code: "fy", name: "Frisian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "hmn", name: "Hmong" },
];

let currentLang = { source: "detect", target: "en" };
let lastDetectedLang = null;
const sourceText = document.getElementById("sourceText");
const targetText = document.getElementById("targetText");
const targetTransliteration = document.getElementById("targetTransliteration");

function selectLang(side, code) {
  currentLang[side] = code;
  const container = document.querySelector(`.lang-tabs[data-side="${side}"]`);
  const langName = ALL_LANGUAGES.find((l) => l.code === code)?.name || code;

  // Highlight matching visible tab if it exists, else swap the last tab to show the picked language
  let matched = false;
  container.querySelectorAll(".tab").forEach((tab) => {
    if (tab.dataset.lang === code) {
      tab.classList.add("active");
      matched = true;
    } else {
      tab.classList.remove("active");
    }
  });

  if (!matched) {
    const tabs = container.querySelectorAll(".tab");
    const lastTab = tabs[tabs.length - 1];
    lastTab.dataset.lang = code;
    lastTab.textContent = langName;
    lastTab.classList.add("active");
  }
}

// ---------- TAB CLICKS ----------
document.querySelectorAll(".lang-tabs").forEach((container) => {
  const side = container.dataset.side;
  container.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      selectLang(side, tab.dataset.lang);
      if (sourceText.value.trim()) runTranslate();
    });
  });
});

// ---------- SEARCHABLE DROPDOWN ----------
const langDropdown = document.getElementById("langDropdown");
const langSearch = document.getElementById("langSearch");
const langList = document.getElementById("langList");
let dropdownSide = "source";

function renderLangList(filter = "") {
  langList.innerHTML = "";
  ALL_LANGUAGES.filter((l) => l.name.toLowerCase().includes(filter.toLowerCase())).forEach((l) => {
    const li = document.createElement("li");
    li.textContent = l.name;
    li.addEventListener("click", () => {
      selectLang(dropdownSide, l.code);
      langDropdown.classList.add("hidden");
      langSearch.value = "";
      if (sourceText.value.trim()) runTranslate();
    });
    langList.appendChild(li);
  });
}

document.querySelectorAll(".chevron-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownSide = btn.dataset.side;
    renderLangList();

    // Position the dropdown directly under the chevron that was clicked
    const wrap = document.querySelector(".translator-wrap");
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    let leftPos = btnRect.left - wrapRect.left - 260; // align dropdown's right edge near the chevron
    leftPos = Math.max(0, Math.min(leftPos, wrapRect.width - 320));
    langDropdown.style.left = `${leftPos}px`;
    langDropdown.style.top = `${btnRect.bottom - wrapRect.top + 6}px`;

    langDropdown.classList.toggle("hidden");
    langSearch.focus();
  });
});

langSearch.addEventListener("input", () => renderLangList(langSearch.value));

document.addEventListener("click", (e) => {
  if (!langDropdown.contains(e.target) && !e.target.classList.contains("chevron-btn")) {
    langDropdown.classList.add("hidden");
  }
});

// ---------- LANGUAGE SWAP ----------
document.getElementById("swapBtn").addEventListener("click", () => {
  let tempCode = currentLang.source;

  if (currentLang.source === "detect") {
    if (!lastDetectedLang) {
      alert("Adhi kahitari translate kara, mag swap kaam karel (auto-detected language pahije).");
      return;
    }
    tempCode = lastDetectedLang;
  }

  selectLang("source", currentLang.target);
  selectLang("target", tempCode);

  const tempText = sourceText.value;
  sourceText.value = targetText.value;
  targetText.value = tempText;
  targetTransliteration.textContent = "";
  targetTransliteration.classList.add("hidden");
  if (sourceText.value.trim()) runTranslate();
});

// ---------- TRANSLATE (connects to your backend API) ----------
const API_BASE_URL = "https://translatehub-backend-v2.onrender.comapi"; // change to your Django backend URL

// ---------- GOOGLE SIGN-IN ----------
// Get this from Google Cloud Console → APIs & Services → Credentials
// (must match the GOOGLE_CLIENT_ID in Developer/backend/translatehub_backend/settings.py)
const GOOGLE_CLIENT_ID = "720295536236-em8fiaha72rmkb9dqpp08nv2hc0fv4ra.apps.googleusercontent.com";

function initGoogleSignIn() {
  if (!window.google || !window.google.accounts) return;
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
  });
  const container = document.getElementById("googleRealBtn");
  if (container) {
    google.accounts.id.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      width: 400,
    });
  }
}
window.addEventListener("load", initGoogleSignIn);

async function handleGoogleCredential(response) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/google/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ credential: response.credential }),
    });
    const data = await res.json();
    if (!res.ok) {
      document.getElementById("authError").textContent = data.error || "Google login failed.";
      document.getElementById("authError").classList.remove("hidden");
      return;
    }
    currentUser = data.user;
    updateAuthUI();
    loadProfile();
  } catch (err) {
    document.getElementById("authError").textContent = "Could not reach the server.";
    document.getElementById("authError").classList.remove("hidden");
  }
}

// A persistent anonymous ID so History still works even when not logged in.
function getClientSessionId() {
  let id = localStorage.getItem("clientSessionId");
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `sess-${Date.now()}-${Math.random()}`);
    localStorage.setItem("clientSessionId", id);
  }
  return id;
}

let translateRequestId = 0;

async function runTranslate() {
  const myRequestId = ++translateRequestId;
  const text = sourceText.value.trim();
  if (!text) {
    targetText.value = "";
    targetTransliteration.textContent = "";
    targetTransliteration.classList.add("hidden");
    return;
  }

  targetText.value = "Translating...";
  targetTransliteration.classList.add("hidden");

  try {
    const res = await fetch(`${API_BASE_URL}/translate/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source_lang: currentLang.source,
        target_lang: currentLang.target,
        session_id: getClientSessionId(),
      }),
    });
    const data = await res.json();

    // A newer translate call started while this one was in flight — its
    // result is stale, so don't let it clobber the up-to-date text.
    if (myRequestId !== translateRequestId) return;

    const translated = data.translated_text || data.error || "(no response from server)";
    targetText.value = translated;
    if (data.detected_lang) lastDetectedLang = data.detected_lang;

    if (data.transliteration) {
      targetTransliteration.textContent = data.transliteration;
      targetTransliteration.classList.remove("hidden");
    } else {
      targetTransliteration.textContent = "";
      targetTransliteration.classList.add("hidden");
    }

    saveToHistory(text, translated);
  } catch (err) {
    if (myRequestId !== translateRequestId) return;
    targetText.value = "Could not reach the server. Is the backend running?";
    targetTransliteration.classList.add("hidden");
  }
}

document.getElementById("translateBtn").addEventListener("click", runTranslate);

// Auto-translate as the user types (debounced, no button press needed)
let debounceTimer;
sourceText.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(runTranslate, 700);
});

// ---------- CLEAR ----------
document.getElementById("clearBtn").addEventListener("click", () => {
  sourceText.value = "";
  targetText.value = "";
  targetTransliteration.textContent = "";
  targetTransliteration.classList.add("hidden");
});

// ---------- PHOTO TRANSLATE (OCR) ----------
document.getElementById("photoTranslateBtn").addEventListener("click", () => {
  document.getElementById("photoTranslateInput").click();
});

document.getElementById("photoTranslateInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const btn = document.getElementById("photoTranslateBtn");
  const originalOpacity = btn.style.opacity;
  btn.style.opacity = "0.4";
  targetText.value = "Reading text from photo…";

  const formData = new FormData();
  formData.append("image", file);
  formData.append("target_lang", currentLang.target);
  formData.append("session_id", getClientSessionId());

  try {
    const res = await fetch(`${API_BASE_URL}/ocr-translate/`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      targetText.value = data.error || "Could not read text from that photo.";
      return;
    }
    sourceText.value = data.extracted_text;
    targetText.value = data.translated_text;
  } catch (err) {
    targetText.value = "Could not reach the server. Is the backend running?";
  } finally {
    btn.style.opacity = originalOpacity;
    e.target.value = ""; // allow picking the same photo again
  }
});

// ---------- COPY ----------
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const el = document.getElementById(btn.dataset.copy);
    navigator.clipboard.writeText(el.value);
  });
});

// ---------- SPEAK (text-to-speech on translation) ----------
// Maps our short language codes to full BCP-47 tags so the browser
// picks the correct voice (e.g. "mr" -> "mr-IN", "hi" -> "hi-IN").
const SPEECH_LANG_MAP = {
  mr: "mr-IN", hi: "hi-IN", gu: "gu-IN", bn: "bn-IN", pa: "pa-IN",
  ta: "ta-IN", te: "te-IN", kn: "kn-IN", ml: "ml-IN", ur: "ur-IN",
  en: "en-US", fr: "fr-FR", de: "de-DE", es: "es-ES", pt: "pt-PT",
  it: "it-IT", ru: "ru-RU", ja: "ja-JP", ko: "ko-KR", zh: "zh-CN",
  ar: "ar-SA",
};

document.getElementById("speakBtn").addEventListener("click", async () => {
  const text = targetText.value.trim();
  if (!text) return;

  const bcp47 = SPEECH_LANG_MAP[currentLang.target] || currentLang.target;
  const speakBtn = document.getElementById("speakBtn");
  const originalHTML = speakBtn.innerHTML;
  speakBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE_URL}/speak/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang: currentLang.target }),
    });
    if (!res.ok) throw new Error("TTS request failed");
    const blob = await res.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();
  } catch (err) {
    // Fall back to the browser's built-in voice if the server is unreachable
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = bcp47;
    speechSynthesis.speak(utterance);
  } finally {
    speakBtn.disabled = false;
  }
});

// ---------- MIC (speech-to-text on source text) ----------
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
const micBtn = document.getElementById("micBtn");

if (SpeechRecognitionAPI) {
  const recognition = new SpeechRecognitionAPI();
  recognition.interimResults = false;

  micBtn.addEventListener("click", () => {
    recognition.lang = currentLang.source === "detect" ? "en-US" : (SPEECH_LANG_MAP[currentLang.source] || currentLang.source);
    micBtn.classList.add("recording");
    try {
      recognition.start();
    } catch (err) {
      // already running (e.g. double-click) — ignore, it'll fire 'end' on its own
      micBtn.classList.remove("recording");
    }
  });

  recognition.addEventListener("result", (e) => {
    sourceText.value = e.results[0][0].transcript;
    runTranslate();
  });

  recognition.addEventListener("error", (e) => {
    micBtn.classList.remove("recording");
    if (e.error === "not-allowed" || e.error === "service-not-allowed") {
      alert("Microphone access was blocked. Please allow microphone permission for this site and try again.");
    } else if (e.error === "no-speech") {
      // user didn't say anything — no need to alert, just stop the recording indicator
    } else {
      alert(`Voice input error: ${e.error}`);
    }
  });

  recognition.addEventListener("end", () => micBtn.classList.remove("recording"));
} else {
  micBtn.addEventListener("click", () => {
    alert("Voice input isn't supported in this browser. Try Chrome.");
  });
}

// ---------- HISTORY (backend-backed) ----------
const historyList = document.getElementById("historyList");

function saveToHistory() {
  // The backend already saves every translation when /api/translate/ is called
  // (linked to the logged-in user, or to the anonymous session_id). Nothing to do here.
}

async function renderHistory() {
  historyList.innerHTML = `<p class="empty-msg">Loading...</p>`;
  try {
    const res = await fetch(
      `${API_BASE_URL}/history/?session_id=${encodeURIComponent(getClientSessionId())}`,
      { credentials: "include" }
    );
    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      historyList.innerHTML = `<p class="empty-msg">No translations yet — try translating something first.</p>`;
      return;
    }

    historyList.innerHTML = results
      .map((h) => {
        const dt = new Date(h.created_at);
        const dateStr = dt.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
        const timeStr = dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        return `
        <div class="history-item" data-id="${h.id}">
          <div class="h-top-row">
            <span class="h-langs">${h.source_lang} <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg> ${h.target_lang}</span>
            <span class="h-right">
              <span class="h-datetime"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>${dateStr}, ${timeStr}</span>
              <button class="h-icon-btn h-download-btn" data-id="${h.id}" title="Download as Word (.docx)">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
              </button>
              <button class="h-icon-btn h-delete-btn" data-id="${h.id}" title="Delete this entry">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/><path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              </button>
            </span>
          </div>
          <p class="h-source">${h.source_text}</p>
          <p class="h-target">${h.translated_text}</p>
        </div>`;
      })
      .join("");

    historyList.querySelectorAll(".h-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => deleteHistoryItem(btn.dataset.id));
    });
    historyList.querySelectorAll(".h-download-btn").forEach((btn) => {
      btn.addEventListener("click", () => downloadHistoryItem(btn.dataset.id));
    });
  } catch (err) {
    historyList.innerHTML = `<p class="empty-msg">Could not reach the server. Is the backend running?</p>`;
  }
}

function downloadHistoryItem(id) {
  const url = `${API_BASE_URL}/history/${id}/download/?session_id=${encodeURIComponent(getClientSessionId())}`;
  window.open(url, "_blank");
}

async function deleteHistoryItem(id) {
  const item = historyList.querySelector(`.history-item[data-id="${id}"]`);
  if (item) item.style.opacity = "0.5"; // instant feedback while the request is in flight
  try {
    const res = await fetch(`${API_BASE_URL}/history/${id}/delete/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: getClientSessionId() }),
    });
    if (!res.ok) throw new Error("delete failed");
    if (item) item.remove();
    if (!historyList.querySelector(".history-item")) {
      historyList.innerHTML = `<p class="empty-msg">No translations yet — try translating something first.</p>`;
    }
  } catch (err) {
    if (item) item.style.opacity = "1";
    alert("Could not delete this entry. Is the backend running?");
  }
}

document.getElementById("clearHistoryBtn").addEventListener("click", async () => {
  try {
    await fetch(`${API_BASE_URL}/history/clear/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: getClientSessionId() }),
    });
  } catch (err) {
    // ignore — renderHistory() below will show the current (unchanged) state if this failed
  }
  renderHistory();
});

// ---------- PROFILE (backend-backed) ----------
const profileForm = document.getElementById("profileForm");

function showProfileView(viewId) {
  ["profileLoginView", "profileForgotView", "profileOtpView", "profileResetView", "profileMenuView", "profileDetailsView", "profileSettingsView"].forEach((id) => {
    document.getElementById(id).classList.toggle("hidden", id !== viewId);
  });
}

document.getElementById("openProfileDetailsBtn").addEventListener("click", () => showProfileView("profileDetailsView"));
document.getElementById("openProfileSettingsBtn").addEventListener("click", () => showProfileView("profileSettingsView"));
document.querySelectorAll(".profile-back-btn").forEach((btn) => {
  btn.addEventListener("click", () => showProfileView(btn.dataset.back));
});

document.getElementById("profileLogoutBtn").addEventListener("click", async () => {
  if (!currentUser) return;
  if (confirm(`Log out of ${currentUser.name}'s account?`)) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout/`, { method: "POST", credentials: "include" });
    } catch (err) {
      // ignore network errors on logout — we still clear the local UI state below
    }
    currentUser = null;
    updateAuthUI();
    closeModal("profileModal");
  }
});

document.getElementById("saveSettingsBtn").addEventListener("click", async () => {
  try {
    const body = { preferred_lang: document.getElementById("profilePrefLang").value };
    const res = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.user) currentUser = data.user;
    showProfileView("profileMenuView");
  } catch (err) {
    alert("Could not save settings. Is the backend running?");
  }
});

let pendingPhotoBase64 = null; // holds a newly-picked photo until Save is clicked

function renderAvatar(name, email, photo) {
  const el = document.getElementById("profileAvatar");
  if (photo) {
    el.innerHTML = `<img src="${photo}" alt="Profile photo" />`;
  } else {
    const initial = (name || email || "?").trim().charAt(0).toUpperCase();
    el.textContent = initial || "?";
  }
}

document.getElementById("profilePhotoInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    pendingPhotoBase64 = reader.result;
    renderAvatar("", "", pendingPhotoBase64);
  };
  reader.readAsDataURL(file);
});

async function loadProfile() {
  if (!currentUser) {
    setAuthMode("login");
    showProfileView("profileLoginView");
    return;
  }
  showProfileView("profileMenuView");
  pendingPhotoBase64 = null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile/`, { credentials: "include" });
    const data = await res.json();
    if (data.user) {
      document.getElementById("profileName").value = data.user.name || "";
      document.getElementById("profileEmail").value = data.user.email || "";
      document.getElementById("profilePhone").value = data.user.phone || "";
      document.getElementById("profilePrefLang").value = data.user.preferred_lang || "en";
      renderAvatar(data.user.name, data.user.email, data.user.photo);
      document.getElementById("profileDisplayName").textContent = data.user.name || "Your Name";
      document.getElementById("profileDisplayEmail").textContent = data.user.email || "";
      document.getElementById("profileDisplayEmailSub").textContent = data.user.email || "";
      document.getElementById("profileDisplayPhone").textContent = data.user.phone || "—";
    }
  } catch (err) {
    // leave fields as-is if the backend is unreachable
  }
}

profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const body = {
      name: document.getElementById("profileName").value,
      phone: document.getElementById("profilePhone").value,
      preferred_lang: document.getElementById("profilePrefLang").value,
    };
    if (pendingPhotoBase64 !== null) body.photo = pendingPhotoBase64;

    const res = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.user) {
      currentUser = data.user;
      updateAuthUI();
      document.getElementById("profileDisplayName").textContent = data.user.name || "Your Name";
      document.getElementById("profileDisplayPhone").textContent = data.user.phone || "—";
    }
    showProfileView("profileMenuView");
  } catch (err) {
    alert("Could not save profile. Is the backend running?");
  }
});

// ---------- HERO BUTTONS ----------
document.getElementById("heroTryBtn").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("heroAboutBtn").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// ---------- LANGUAGE BANNER ----------
document.getElementById("langBannerBtn").addEventListener("click", () => {
  document.getElementById("home").scrollIntoView({ behavior: "smooth" });
});

// ---------- FOOTER LINKS ----------
document.getElementById("footerSendMessage").addEventListener("click", (e) => {
  e.preventDefault();
  const to = "your.email@example.com";
  const subject = encodeURIComponent("Message from TranslateHub website");
  // Opens Gmail's own compose window in the browser — works everywhere,
  // unlike a plain mailto: link which silently does nothing if the visitor
  // has no desktop mail app configured.
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`,
    "_blank"
  );
});

document.getElementById("footerHistory").addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentUser) {
    loadProfile();
    openModal("profileModal");
    return;
  }
  renderHistory();
  openModal("historyModal");
});
document.getElementById("footerProfile").addEventListener("click", (e) => {
  e.preventDefault();
  loadProfile();
  openModal("profileModal");
});
document.getElementById("footerLoginDark").addEventListener("click", (e) => {
  e.preventDefault();
  loadProfile();
  openModal("profileModal");
});
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

document.getElementById("forgotPasswordLink").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("forgotEmail").value = document.getElementById("authEmail").value;
  document.getElementById("forgotError").classList.add("hidden");
  document.getElementById("forgotSuccess").classList.add("hidden");
  showProfileView("profileForgotView");
});

document.getElementById("backToLoginLink").addEventListener("click", (e) => {
  e.preventDefault();
  showProfileView("profileLoginView");
});

let resetFlowEmail = ""; // remembered across the OTP → new-password steps

document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("forgotError");
  errorEl.classList.add("hidden");
  const email = document.getElementById("forgotEmail").value;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    await res.json();
    resetFlowEmail = email;
    document.getElementById("otpInput").value = "";
    showProfileView("profileOtpView");
  } catch (err) {
    errorEl.textContent = "Could not reach the server. Is the backend running?";
    errorEl.classList.remove("hidden");
  }
});

document.getElementById("backToForgotLink").addEventListener("click", (e) => {
  e.preventDefault();
  showProfileView("profileForgotView");
});

document.getElementById("otpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("otpError");
  errorEl.classList.add("hidden");
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetFlowEmail, otp: document.getElementById("otpInput").value }),
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || "Invalid OTP.";
      errorEl.classList.remove("hidden");
      return;
    }
    document.getElementById("resetPasswordForm").reset();
    showProfileView("profileResetView");
  } catch (err) {
    errorEl.textContent = "Could not reach the server. Is the backend running?";
    errorEl.classList.remove("hidden");
  }
});

document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("resetError");
  errorEl.classList.add("hidden");
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    errorEl.textContent = "Passwords do not match.";
    errorEl.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: resetFlowEmail,
        otp: document.getElementById("otpInput").value,
        new_password: newPassword,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || "Could not reset password.";
      errorEl.classList.remove("hidden");
      return;
    }
    document.getElementById("authEmail").value = resetFlowEmail;
    document.getElementById("authPassword").value = "";
    setAuthMode("login");
    showProfileView("profileLoginView");
  } catch (err) {
    errorEl.textContent = "Could not reach the server. Is the backend running?";
    errorEl.classList.remove("hidden");
  }
});

document.getElementById("loginBtn").addEventListener("click", () => {
  loadProfile();
  openModal("profileModal");
});

document.getElementById("navHistory").addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentUser) {
    loadProfile();
    openModal("profileModal");
    return;
  }
  renderHistory();
  openModal("historyModal");
});

document.getElementById("navProfile").addEventListener("click", (e) => {
  e.preventDefault();
  loadProfile();
  openModal("profileModal");
});

document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close || "profileModal"));
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
});

// ---------- AUTH: login / signup / logout / session check ----------
let currentUser = null;
let authMode = "login"; // or "signup"

function updateAuthUI() {
  const loginBtn = document.getElementById("loginBtn");
  if (!currentUser) {
    loginBtn.textContent = "Login";
    return;
  }
  const initial = (currentUser.name || currentUser.email || "?").trim().charAt(0).toUpperCase();
  const avatarHtml = currentUser.photo
    ? `<img src="${currentUser.photo}" alt="" class="nav-user-avatar" />`
    : `<span class="nav-user-avatar nav-user-avatar-fallback">${initial}</span>`;
  loginBtn.innerHTML = `${avatarHtml}<span>${currentUser.name}</span>`;
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  document.getElementById("authModalTitle").innerHTML = isSignup
    ? "Join <span>TranslateHub</span>"
    : "Welcome to <span>TranslateHub</span>";
  document.getElementById("authModalSubtitle").textContent = isSignup
    ? "Create your account to start translating."
    : "Login to continue your translation journey.";
  document.getElementById("nameFieldWrap").classList.toggle("hidden", !isSignup);
  document.getElementById("authSubmitBtn").innerHTML = isSignup ? "→ Sign Up" : "→ Login";
  document.getElementById("authToggleText").textContent = isSignup
    ? "Already have an account?"
    : "Don't have account?";
  document.getElementById("authToggleLink").textContent = isSignup ? "Login" : "Register Now";
  document.getElementById("authError").classList.add("hidden");
}

document.getElementById("authPasswordToggle").addEventListener("click", () => {
  const pwd = document.getElementById("authPassword");
  pwd.type = pwd.type === "password" ? "text" : "password";
});

function showAuthComingSoon(provider) {
  const el = document.getElementById("authError");
  el.textContent = `${provider} login isn't connected yet — try Email or Google for now.`;
  el.classList.remove("hidden");
}
document.getElementById("githubLoginBtn").addEventListener("click", () => showAuthComingSoon("GitHub"));
document.getElementById("linkedinLoginBtn").addEventListener("click", () => showAuthComingSoon("LinkedIn"));
document.getElementById("facebookLoginBtn").addEventListener("click", () => showAuthComingSoon("Facebook"));

document.getElementById("authToggleLink").addEventListener("click", (e) => {
  e.preventDefault();
  setAuthMode(authMode === "login" ? "signup" : "login");
});

async function checkAuth() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me/`, { credentials: "include" });
    const data = await res.json();
    currentUser = data.user || null;
  } catch (err) {
    currentUser = null; // backend not running yet — treat as logged out
  }
  updateAuthUI();
}
checkAuth();

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const authError = document.getElementById("authError");
  authError.classList.add("hidden");

  const endpoint = authMode === "signup" ? "signup" : "login";
  const payload = {
    email: document.getElementById("authEmail").value,
    password: document.getElementById("authPassword").value,
  };
  if (authMode === "signup") payload.name = document.getElementById("authName").value;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/${endpoint}/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      authError.textContent = data.error || "Something went wrong.";
      authError.classList.remove("hidden");
      return;
    }

    currentUser = data.user;
    updateAuthUI();
    document.getElementById("loginForm").reset();
    loadProfile();
  } catch (err) {
    authError.textContent = "Could not reach the server. Is the backend running?";
    authError.classList.remove("hidden");
  }
});

document.querySelectorAll(".social-btn").forEach((btn) => {
  if (btn.classList.contains("google")) return;
  btn.addEventListener("click", () => {
    alert(`${btn.textContent.trim()} login not yet connected — hook this up to OAuth.`);
  });
});
