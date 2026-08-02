/* OPHANARK shared app layer: theme (light / inverse-dark) + language (EN / TR).
   Loaded on every page. Reads persisted prefs from localStorage:
     oph_theme = 'light' | 'dark'
     oph_lang  = 'en' | 'tr'
   A tiny inline boot in each page's <head> applies the theme before paint to
   avoid a flash; this file re-applies and adds language translation + the
   public OphApp API used by the profile settings. */
(function (w, d) {
  'use strict';

  /* ---- prefs ---- */
  function get(k, def) { try { return localStorage.getItem(k) || def; } catch (e) { return def; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function getTheme() { return get('oph_theme', 'light'); }
  function getLang() { return get('oph_lang', 'en'); }

  function applyTheme(t) {
    if (t === 'dark') d.documentElement.setAttribute('data-theme', 'dark');
    else d.documentElement.removeAttribute('data-theme');
  }
  function setTheme(t) { set('oph_theme', t); applyTheme(t); }

  /* ---- language ---- */
  /* EN -> TR dictionary. Keys are the exact trimmed English text of a leaf
     element's first text node. Buttons keep their trailing arrow <span>. */
  var TR = {
    /* nav + brand */
    'Fortunes': 'Fallar',
    'Tarot': 'Tarot',
    'Zodiac Signs': 'Burçlar',
    'Natal Chart': 'Natal Harita',
    'Dream Interpretations': 'Rüya Tabirleri',
    'Profile': 'Profil',
    '← Fortunes': '← Fallar',

    /* hero */
    'Types of': 'Fal',
    'Fortune-Telling': 'Çeşitleri',
    'The Divine Galgalim are Turning For You': 'İlahi Galgalim Senin İçin Dönüyor',

    /* card names */
    'Turkish Coffee Reading': 'Türk Kahvesi Falı',
    'Palm Reading': 'El Falı',
    'Katina Reading': 'Katina Falı',
    'Tarot Reading': 'Tarot Falı',
    'Palmistry': 'El Falı',

    /* scene leads / subs */
    'Coffee grounds do not form at random. Coffee grounds speak to you in the language of destiny, and OPHANARK reads that language for you.':
      'Telve rastgele oluşmaz. Telve sana kaderin dilinden konuşur, OPHANARK da o dili senin için okur.',
    "Some say that a person's destiny is written on their forehead, but the map of one's fate is drawn within the palms of their hands. Ophanark makes this map readable for you.":
      'Kimileri insanın kaderinin alnına yazıldığını söyler; oysa kaderin haritası avuçların içine çizilidir. Ophanark bu haritayı senin için okunur kılar.',
    'You cannot erase fate—the future must be lived—but you can create a turning point.':
      'Kaderi silemezsin—gelecek yaşanmalıdır—ama bir dönüm noktası yaratabilirsin.',
    'Some believe Katina is a mysterious woman who whispers of love, while others see her as a dark sorceress who alters destiny; yet, if there is one thing we know for certain, it is that these prophecies whisper the deepest secrets of your heart.':
      'Kimileri Katina’yı aşkı fısıldayan gizemli bir kadın sanır, kimileri kaderi değiştiren karanlık bir büyücü; ama kesin bildiğimiz tek şey varsa, bu kehanetlerin kalbinin en derin sırlarını fısıldadığıdır.',
    "Love has a definition in many languages, but in Katina's deck, the language of love is the whisper of your heart. Ophanark hears these whispers for you.":
      'Aşkın birçok dilde bir tanımı vardır; ama Katina’nın destesinde aşkın dili, kalbinin fısıltısıdır. Ophanark bu fısıltıları senin için duyar.',
    "We have now brought together the aesthetics of the Renaissance, the mystery of France, and Ophan's style in a single deck. Remember, everything changes with time—empires fall, but the spirit remains the same. Ophan preserves this spirit for you.":
      'Rönesans’ın estetiğini, Fransa’nın gizemini ve Ophan’ın üslubunu tek bir destede bir araya getirdik. Unutma, her şey zamanla değişir—imparatorluklar yıkılır, ama ruh aynı kalır. Ophan bu ruhu senin için korur.',
    'Your feelings will determine the past or the future.':
      'Duyguların geçmişi ya da geleceği belirleyecek.',
    'The Universe whispers your name to the planets using the stars; the warning of the stars and all the energies of the day have taken shape for you. Ophanark is communicating with the Universe on your behalf.':
      'Evren yıldızları kullanarak adını gezegenlere fısıldar; yıldızların uyarısı ve günün tüm enerjileri senin için şekil aldı. Ophanark senin adına Evren’le iletişim kuruyor.',
    'Destiny is not a coincidence; it is a cosmic code prepared for you by the stars. Your birth chart is the first and only book the universe has written for you—and Ophan opens and reads that book for you.':
      'Kader bir tesadüf değildir; yıldızların senin için hazırladığı kozmik bir şifredir. Doğum haritan, evrenin senin için yazdığı ilk ve tek kitaptır—Ophan bu kitabı senin için açar ve okur.',
    'That mysterious journey that begins when you close your eyes is, in fact, the awakening of your soul. The dream you see at night is the language the universe uses to speak to you; Ophan deciphers this language for you.':
      'Gözlerini kapadığında başlayan o gizemli yolculuk, aslında ruhunun uyanışıdır. Gece gördüğün rüya, evrenin seninle konuşmak için kullandığı dildir; Ophan bu dili senin için çözer.',

    /* CTAs (leading text only; arrow span preserved) */
    'What do you want to learn?': 'Ne öğrenmek istersin?',
    'Do you want to do this now?': 'Bunu şimdi yapmak ister misin?',
    'Lay out my cards.': 'Kartlarımı aç.',
    'What are you wondering about?': 'Neyi merak ediyorsun?',
    'I want to find out my natal chart.': 'Natal haritamı öğrenmek istiyorum.',
    'Interpret my birth chart.': 'Doğum haritamı yorumla.',
    'Interpret my dream.': 'Rüyamı yorumla.',
    'scroll ↓': 'kaydır ↓',

    /* flow-page buttons / common */
    'Continue': 'Devam',
    "I'm ready": 'Hazırım',
    'Try again': 'Tekrar dene',
    'Read another cup': 'Başka bir fincan oku',
    'Read another reading': 'Başka bir fal oku',
    'Continue for the detailed reading': 'Ayrıntılı yorum için devam et',
    'Being read...': 'Falına bakılıyor...',
    'Your reading is being prepared...': 'Falın hazırlanıyor...',

    /* footer */
    'ALL RIGHTS RESERVED': 'TÜM HAKLARI SAKLIDIR',

    /* profile page */
    'Profile & Settings': 'Profil ve Ayarlar',
    'Account': 'Hesap',
    'First name': 'Ad',
    'Last name': 'Soyad',
    'Email': 'E-posta',
    'Save changes': 'Değişiklikleri kaydet',
    'Change password': 'Şifre değiştir',
    'New password': 'Yeni şifre',
    'Confirm new password': 'Yeni şifreyi onayla',
    'Update password': 'Şifreyi güncelle',
    'Settings': 'Ayarlar',
    'App language': 'Uygulama dili',
    'App theme': 'Uygulama teması',
    'Light': 'Aydınlık',
    'Dark': 'Karanlık',
    'Sign out': 'Çıkış yap',
    'English': 'English',
    'Türkçe': 'Türkçe',
    'Saved.': 'Kaydedildi.',
    'Passwords do not match.': 'Şifreler eşleşmiyor.',
    'Password updated.': 'Şifre güncellendi.',
    'Loading...': 'Yükleniyor...'
  };

  function firstTextNode(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3 && n.nodeValue && n.nodeValue.trim()) return n;
    }
    return null;
  }

  function translate(root) {
    var els = root.querySelectorAll(
      'nav a,.backlink a,.brandmini,.big,.lead,.sub,.cta,.go,.continue,.cardname,.cap,.fancy,.herotag,' +
      '#cue,h1,h2,h3,button,label,.set-label,.foot-strip,.opt,option,.hint,.note,p'
    );
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.getAttribute('data-noi18n') !== null && el.hasAttribute('data-noi18n')) continue;
      var tn = firstTextNode(el);
      if (!tn) continue;
      var key = tn.nodeValue.trim();
      if (TR.hasOwnProperty(key)) {
        tn.nodeValue = tn.nodeValue.replace(key, TR[key]);
        el.setAttribute('data-en', key);
      }
    }
  }

  function applyLang(lang, root) {
    root = root || d.body;
    d.documentElement.setAttribute('lang', lang === 'tr' ? 'tr' : 'en');
    if (lang === 'tr' && root) translate(root);
  }
  function setLang(lang) { set('oph_lang', lang); w.location.reload(); }

  /* ---- boot ---- */
  function boot() {
    applyTheme(getTheme());
    applyLang(getLang());
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* public API for the settings page */
  w.OphApp = {
    getTheme: getTheme, setTheme: setTheme,
    getLang: getLang, setLang: setLang,
    applyTheme: applyTheme, applyLang: applyLang, dict: TR
  };
})(window, document);
