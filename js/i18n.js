async function loadTranslations(lang) {
  const response = await fetch(`/i18n/${lang}.json`);
  const translations = await response.json();
  return translations;
}

function applyTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (el.hasAttribute("data-i18n-attr")) {
      const attr = el.getAttribute("data-i18n-attr");
      el.setAttribute(attr, translations[key]);
    } else {
      if (translations[key]) el.textContent = translations[key];
    }
  });
}

function applyGreeting(translations) {
  const time = new Date().getHours();
  let greetingKey;
  if (time < 5) {
    greetingKey = "greeting_night";
  } else if (time < 12) {
    greetingKey = "greeting_morning";
  } else if (time < 18) {
    greetingKey = "greeting_afternoon";
  } else if (time < 22) {
    greetingKey = "greeting_evening";
  } else {
    greetingKey = "greeting_night";
  }
  const salute = document.getElementById("salute");
  if (salute) salute.textContent = translations[greetingKey];
}

async function setLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  applyGreeting(translations);
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);
