document.addEventListener('DOMContentLoaded', function () {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');
  const customizeBtn = document.getElementById('customize-cookies');
  const cookieModal = document.getElementById('cookie-modal');
  const closeModal = document.getElementById('close-modal');
  const cookieSettingsForm = document.getElementById('cookie-settings-form');

  // Cookie anzeigen, wenn noch kein Consent
  if (!getCookie('cookie_consent')) {
    setTimeout(() => cookieBanner.classList.add('active'), 1000);
  }

  // "Alle akzeptieren"
  acceptBtn.addEventListener('click', function () {
    setCookie('cookie_consent', 'all', 365);
    cookieBanner.classList.remove('active');
    // Hier Tracking-Code laden, falls gewünscht
  });

  // "Nur notwendige"
  rejectBtn.addEventListener('click', function () {
    setCookie('cookie_consent', 'necessary', 365);
    cookieBanner.classList.remove('active');
    deleteCookie('_ga');
    deleteCookie('_gid');
    deleteCookie('_fbp');
  });

  // "Einstellungen" öffnen
  customizeBtn.addEventListener('click', () => {
    cookieModal.classList.add('active');
    cookieModal.classList.remove('hidden');
  });

  // Modal schließen
  closeModal.addEventListener('click', () => {
    cookieModal.classList.remove('active');
    setTimeout(() => cookieModal.classList.add('hidden'), 400);
  });

  // Einstellungen speichern
  cookieSettingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const analytics = cookieSettingsForm.analytics.checked;
    const marketing = cookieSettingsForm.marketing.checked;

    let consent = 'necessary';
    if (analytics && marketing) consent = 'all';
    else if (analytics) consent = 'analytics';
    else if (marketing) consent = 'marketing';

    setCookie('cookie_consent', consent, 365);
    cookieBanner.classList.remove('active');
    cookieModal.classList.remove('active');
    setTimeout(() => cookieModal.classList.add('hidden'), 400);
    // Optional: Tracking-Codes hier dynamisch einfügen
  });

  // Cookie setzen
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax;Secure`;
  }

  // Cookie lesen
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Cookie löschen
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Lax;Secure`;
  }
});