/* OPHANARK — scroll-guide spiral: DEVRE DIŞI.
   Kullanıcı isteğiyle kırmızı spiral takip animasyonları kaldırıldı.
   Görünürlük ayrıca oph_app.js içinde '#spiral{display:none}' ile de kapatılır. */
(function () {
  window.__ophSpiral = 1; // eski sürümlerin yeniden enjekte etmesini engelle
  function kaldir() {
    try { var s = document.getElementById('spiral'); if (s && s.parentNode) s.parentNode.removeChild(s); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kaldir);
  else kaldir();
})();
