async function loadTranslations(lang) {
  const response = await fetch(`/i18n/${lang}.json`);
  const translations = await response.json();
  return translations;
}

function applyTranslations(translations) {
  // Traducir elementos con data-i18n (contenido de texto)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (el.hasAttribute("data-i18n-attr")) {
      // Traducir atributos (como alt)
      const attr = el.getAttribute("data-i18n-attr");
      el.setAttribute(attr, translations[key]);
    } else {
      if (translations[key]) el.textContent = translations[key];
    }
  });
}

async function setLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("lang", lang);
}

// Al cargar la página, usar el idioma guardado o inglés por defecto
const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);
