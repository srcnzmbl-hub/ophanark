/* OPHANARK shared app layer: theme (light / inverse-dark) + language (15 langs).
   Loaded on every page. Persisted prefs in localStorage:
     oph_theme = 'light' | 'dark'
     oph_lang  = en tr de fr es it pt ru ar zh ja ko hi nl pl
   A tiny inline boot in each page <head> applies the theme before paint (no flash);
   this file re-applies theme, applies language translation (incl. RTL for Arabic),
   and exposes the OphApp API used by the profile settings/history. */
(function (w, d) {
  'use strict';

  var EN = {
"nav_fortunes": "Fortunes",
"nav_tarot": "Tarot",
"nav_zodiac": "Zodiac Signs",
"nav_natal": "Natal Chart",
"nav_dream": "Dream Interpretations",
"nav_profile": "Profile",
"nav_ready": "My Readings",
"nav_gecmis": "My Past Readings",
"hz_sub": "Even if no notification arrives, every reading that is ready waits for you here. Scroll down to read them.",
"hz_empty": "You have no ready readings yet.",
"hazir_list_sub": "Readings that are ready but you haven't opened yet. Tap one to read it.",
"gecmis_list_sub": "Readings you have already opened. Tap one to read it again.",
"hazir_empty2": "You have no unread ready readings.",
"gecmis_empty": "You have no past readings yet.",
"fal_ac": "Open reading",
"back_fortunes": "← Fortunes",
"hero_types": "Types of",
"hero_fortune": "Fortune-Telling",
"hero_tagline": "The Divine Galgalim are Turning For You",
"card_coffee": "Turkish Coffee Reading",
"card_palm": "Palm Reading",
"card_katina": "Katina Reading",
"card_tarot": "Tarot Reading",
"big_palmistry": "Palmistry",
"cta_coffee": "What do you want to learn?",
"cta_palm": "Do you want to do this now?",
"cta_katina": "Lay out my cards.",
"cta_tarot": "What are you wondering about?",
"cta_zodiac": "I want to find out my natal chart.",
"cta_natal": "Interpret my birth chart.",
"cta_dream": "Interpret my dream.",
"cue_scroll": "scroll ↓",
"btn_continue": "Continue",
"btn_ready": "I'm ready",
"btn_tryagain": "Try again",
"btn_anothercup": "Read another cup",
"btn_anotherreading": "Read another reading",
"btn_detailed": "Continue for the detailed reading",
"load_beingread": "Being read...",
"load_preparing": "Your reading is being prepared...",
"foot_rights": "ALL RIGHTS RESERVED",
"p_title": "Profile & Settings",
"p_account": "Account",
"p_first": "First name",
"p_last": "Last name",
"p_email": "Email",
"p_save": "Save changes",
"p_changepw": "Change password",
"p_newpw": "New password",
"p_confirmpw": "Confirm new password",
"p_updatepw": "Update password",
"p_settings": "Settings",
"p_applang": "App language",
"p_apptheme": "App theme",
"p_light": "Light",
"p_dark": "Dark",
"p_signout": "Sign out",
"p_saved": "Saved.",
"p_pwmismatch": "Passwords do not match.",
"p_pwupdated": "Password updated.",
"p_loading": "Loading...",
"lead_coffee": "Coffee grounds do not form at random. Coffee grounds speak to you in the language of destiny, and OPHANARK reads that language for you.",
"lead_palm": "Some say that a person's destiny is written on their forehead, but the map of one's fate is drawn within the palms of their hands. Ophanark makes this map readable for you.",
"sub_palm": "You cannot erase fate—the future must be lived—but you can create a turning point.",
"lead_katina": "Some believe Katina is a mysterious woman who whispers of love, while others see her as a dark sorceress who alters destiny; yet, if there is one thing we know for certain, it is that these prophecies whisper the deepest secrets of your heart.",
"sub_katina": "Love has a definition in many languages, but in Katina's deck, the language of love is the whisper of your heart. Ophanark hears these whispers for you.",
"lead_tarot": "We have now brought together the aesthetics of the Renaissance, the mystery of France, and Ophan's style in a single deck. Remember, everything changes with time—empires fall, but the spirit remains the same. Ophan preserves this spirit for you.",
"sub_tarot": "Your feelings will determine the past or the future.",
"lead_zodiac": "The Universe whispers your name to the planets using the stars; the warning of the stars and all the energies of the day have taken shape for you. Ophanark is communicating with the Universe on your behalf.",
"lead_natal": "Destiny is not a coincidence; it is a cosmic code prepared for you by the stars. Your birth chart is the first and only book the universe has written for you—and Ophan opens and reads that book for you.",
"lead_dream": "That mysterious journey that begins when you close your eyes is, in fact, the awakening of your soul. The dream you see at night is the language the universe uses to speak to you; Ophan deciphers this language for you.",
"p_history": "History",
"p_history_empty": "No readings yet.",
"ft_kahve": "Coffee",
"ft_el": "Palm",
"ft_tarot": "Tarot",
"ft_ruya": "Dream"
};
  var L = {"tr":{"nav_fortunes":"Fallar","nav_tarot":"Tarot","nav_zodiac":"Burçlar","nav_natal":"Natal Harita","nav_dream":"Rüya Tabirleri","nav_profile":"Profil","nav_ready":"Hazır Fallarım","hz_sub":"Bildirim gelmese bile hazır olan her falın burada seni bekler. Okumak için aşağı kaydır.","hz_empty":"Henüz hazır falın yok.","nav_gecmis":"Geçmiş Fallarım","hazir_list_sub":"Hazır olan ama henüz açmadığın fallar. Okumak için birine dokun.","gecmis_list_sub":"Daha önce açtığın fallar. Tekrar okumak için birine dokun.","hazir_empty2":"Okunmamış hazır falın yok.","gecmis_empty":"Henüz geçmiş falın yok.","fal_ac":"Falı aç","back_fortunes":"← Fallar","hero_types":"Fal","hero_fortune":"Çeşitleri","hero_tagline":"İlahi Galgalim Senin İçin Dönüyor","card_coffee":"Türk Kahvesi Falı","card_palm":"El Falı","card_katina":"Katina Falı","card_tarot":"Tarot Falı","big_palmistry":"El Falı","cta_coffee":"Ne öğrenmek istersin?","cta_palm":"Bunu şimdi yapmak ister misin?","cta_katina":"Kartlarımı aç.","cta_tarot":"Neyi merak ediyorsun?","cta_zodiac":"Natal haritamı öğrenmek istiyorum.","cta_natal":"Doğum haritamı yorumla.","cta_dream":"Rüyamı yorumla.","cue_scroll":"kaydır ↓","btn_continue":"Devam","btn_ready":"Hazırım","btn_tryagain":"Tekrar dene","btn_anothercup":"Başka bir fincan oku","btn_anotherreading":"Başka bir fal oku","btn_detailed":"Ayrıntılı yorum için devam et","load_beingread":"Falına bakılıyor...","load_preparing":"Falın hazırlanıyor...","foot_rights":"TÜM HAKLARI SAKLIDIR","p_title":"Profil ve Ayarlar","p_account":"Hesap","p_first":"Ad","p_last":"Soyad","p_email":"E-posta","p_save":"Değişiklikleri kaydet","p_changepw":"Şifre değiştir","p_newpw":"Yeni şifre","p_confirmpw":"Yeni şifreyi onayla","p_updatepw":"Şifreyi güncelle","p_settings":"Ayarlar","p_applang":"Uygulama dili","p_apptheme":"Uygulama teması","p_light":"Aydınlık","p_dark":"Karanlık","p_signout":"Çıkış yap","p_saved":"Kaydedildi.","p_pwmismatch":"Şifreler eşleşmiyor.","p_pwupdated":"Şifre güncellendi.","p_loading":"Yükleniyor...","lead_coffee":"Telve rastgele oluşmaz. Telve sana kaderin dilinden konuşur, OPHANARK da o dili senin için okur.","lead_palm":"Kimileri insanın kaderinin alnına yazıldığını söyler; oysa kaderin haritası avuçların içine çizilidir. Ophanark bu haritayı senin için okunur kılar.","sub_palm":"Kaderi silemezsin—gelecek yaşanmalıdır—ama bir dönüm noktası yaratabilirsin.","lead_katina":"Kimileri Katina'yı aşkı fısıldayan gizemli bir kadın sanır, kimileri kaderi değiştiren karanlık bir büyücü; ama kesin bildiğimiz tek şey varsa, bu kehanetlerin kalbinin en derin sırlarını fısıldadığıdır.","sub_katina":"Aşkın birçok dilde bir tanımı vardır; ama Katina'nın destesinde aşkın dili, kalbinin fısıltısıdır. Ophanark bu fısıltıları senin için duyar.","lead_tarot":"Rönesans'ın estetiğini, Fransa'nın gizemini ve Ophan'ın üslubunu tek bir destede bir araya getirdik. Unutma, her şey zamanla değişir—imparatorluklar yıkılır, ama ruh aynı kalır. Ophan bu ruhu senin için korur.","sub_tarot":"Duyguların geçmişi ya da geleceği belirleyecek.","lead_zodiac":"Evren yıldızları kullanarak adını gezegenlere fısıldar; yıldızların uyarısı ve günün tüm enerjileri senin için şekil aldı. Ophanark senin adına Evren'le iletişim kuruyor.","lead_natal":"Kader bir tesadüf değildir; yıldızların senin için hazırladığı kozmik bir şifredir. Doğum haritan, evrenin senin için yazdığı ilk ve tek kitaptır—Ophan bu kitabı senin için açar ve okur.","lead_dream":"Gözlerini kapadığında başlayan o gizemli yolculuk, aslında ruhunun uyanışıdır. Gece gördüğün rüya, evrenin seninle konuşmak için kullandığı dildir; Ophan bu dili senin için çözer.","p_history":"Geçmiş","p_history_empty":"Henüz fal yok.","ft_kahve":"Kahve","ft_el":"El","ft_tarot":"Tarot","ft_ruya":"Rüya"},"de":{"nav_fortunes":"Wahrsagungen","nav_tarot":"Tarot","nav_zodiac":"Sternzeichen","nav_natal":"Geburtshoroskop","nav_dream":"Traumdeutungen","nav_profile":"Profil","nav_ready":"Meine Deutungen","back_fortunes":"← Wahrsagungen","hero_types":"Arten der","hero_fortune":"Wahrsagekunst","hero_tagline":"Die göttlichen Galgalim drehen sich für dich","card_coffee":"Türkisches Kaffeesatzlesen","card_palm":"Handlesen","card_katina":"Katina-Legung","card_tarot":"Tarot-Legung","big_palmistry":"Chiromantie","cta_coffee":"Was möchtest du erfahren?","cta_palm":"Möchtest du es jetzt tun?","cta_katina":"Lege meine Karten aus.","cta_tarot":"Was beschäftigt dich?","cta_zodiac":"Ich möchte mein Geburtshoroskop erfahren.","cta_natal":"Deute mein Geburtshoroskop.","cta_dream":"Deute meinen Traum.","cue_scroll":"scrollen ↓","btn_continue":"Weiter","btn_ready":"Ich bin bereit","btn_tryagain":"Erneut versuchen","btn_anothercup":"Eine weitere Tasse lesen","btn_anotherreading":"Eine weitere Deutung lesen","btn_detailed":"Weiter zur ausführlichen Deutung","load_beingread":"Wird gelesen …","load_preparing":"Deine Deutung wird vorbereitet …","foot_rights":"ALLE RECHTE VORBEHALTEN","p_title":"Profil & Einstellungen","p_account":"Konto","p_first":"Vorname","p_last":"Nachname","p_email":"E-Mail","p_save":"Änderungen speichern","p_changepw":"Passwort ändern","p_newpw":"Neues Passwort","p_confirmpw":"Neues Passwort bestätigen","p_updatepw":"Passwort aktualisieren","p_settings":"Einstellungen","p_applang":"App-Sprache","p_apptheme":"App-Design","p_light":"Hell","p_dark":"Dunkel","p_signout":"Abmelden","p_saved":"Gespeichert.","p_pwmismatch":"Die Passwörter stimmen nicht überein.","p_pwupdated":"Passwort aktualisiert.","p_loading":"Wird geladen …","lead_coffee":"Der Kaffeesatz formt sich nicht durch Zufall. Der Kaffeesatz spricht zu dir in der Sprache des Schicksals, und OPHANARK liest diese Sprache für dich.","lead_palm":"Manche sagen, das Schicksal eines Menschen stehe ihm auf der Stirn geschrieben, doch die Karte des eigenen Schicksals ist in die Handflächen gezeichnet. Ophanark macht diese Karte für dich lesbar.","sub_palm":"Das Schicksal lässt sich nicht auslöschen – die Zukunft muss gelebt werden –, doch du kannst einen Wendepunkt erschaffen.","lead_katina":"Manche glauben, Katina sei eine geheimnisvolle Frau, die von der Liebe flüstert, andere sehen in ihr eine dunkle Zauberin, die das Schicksal wendet; doch wenn wir eines mit Gewissheit wissen, dann dass diese Prophezeiungen die tiefsten Geheimnisse deines Herzens flüstern.","sub_katina":"Die Liebe hat in vielen Sprachen eine Bedeutung, doch in Katinas Kartendeck ist die Sprache der Liebe das Flüstern deines Herzens. Ophanark vernimmt dieses Flüstern für dich.","lead_tarot":"Nun haben wir die Ästhetik der Renaissance, das Geheimnis Frankreichs und Ophans Stil in einem einzigen Kartendeck vereint. Denke daran: Alles wandelt sich mit der Zeit – Reiche fallen, doch der Geist bleibt derselbe. Ophan bewahrt diesen Geist für dich.","sub_tarot":"Deine Gefühle werden die Vergangenheit oder die Zukunft bestimmen.","lead_zodiac":"Das Universum flüstert deinen Namen den Planeten zu und bedient sich dabei der Sterne; die Warnung der Sterne und alle Energien des Tages haben für dich Gestalt angenommen. Ophanark tritt in deinem Namen mit dem Universum in Verbindung.","lead_natal":"Das Schicksal ist kein Zufall; es ist ein kosmischer Code, den die Sterne für dich bereitet haben. Dein Geburtshoroskop ist das erste und einzige Buch, das das Universum für dich geschrieben hat – und Ophan schlägt dieses Buch auf und liest es für dich.","lead_dream":"Jene geheimnisvolle Reise, die beginnt, wenn du die Augen schließt, ist in Wahrheit das Erwachen deiner Seele. Der Traum, den du in der Nacht siehst, ist die Sprache, mit der das Universum zu dir spricht; Ophan entschlüsselt diese Sprache für dich.","p_history":"Verlauf","p_history_empty":"Noch keine Deutungen.","ft_kahve":"Kaffee","ft_el":"Hand","ft_tarot":"Tarot","ft_ruya":"Traum"},"fr":{"nav_fortunes":"Divinations","nav_tarot":"Tarot","nav_zodiac":"Signes du zodiaque","nav_natal":"Thème natal","nav_dream":"Interprétation des rêves","nav_profile":"Profil","nav_ready":"Mes lectures","back_fortunes":"← Divinations","hero_types":"Les arts de la","hero_fortune":"Divination","hero_tagline":"Les divins Galgalim tournent pour vous","card_coffee":"Lecture du marc de café turc","card_palm":"Lecture des lignes de la main","card_katina":"Oracle de Katina","card_tarot":"Lecture du tarot","big_palmistry":"Chiromancie","cta_coffee":"Que souhaitez-vous découvrir ?","cta_palm":"Voulez-vous le faire dès maintenant ?","cta_katina":"Étalez mes cartes.","cta_tarot":"Quelle est votre interrogation ?","cta_zodiac":"Je veux découvrir mon thème natal.","cta_natal":"Interprétez mon thème de naissance.","cta_dream":"Interprétez mon rêve.","cue_scroll":"faites défiler ↓","btn_continue":"Continuer","btn_ready":"Je suis prêt","btn_tryagain":"Réessayer","btn_anothercup":"Lire une autre tasse","btn_anotherreading":"Faire une autre lecture","btn_detailed":"Continuer vers la lecture détaillée","load_beingread":"Lecture en cours...","load_preparing":"Votre lecture se prépare...","foot_rights":"TOUS DROITS RÉSERVÉS","p_title":"Profil et paramètres","p_account":"Compte","p_first":"Prénom","p_last":"Nom","p_email":"E-mail","p_save":"Enregistrer les modifications","p_changepw":"Changer le mot de passe","p_newpw":"Nouveau mot de passe","p_confirmpw":"Confirmer le nouveau mot de passe","p_updatepw":"Mettre à jour le mot de passe","p_settings":"Paramètres","p_applang":"Langue de l'application","p_apptheme":"Thème de l'application","p_light":"Clair","p_dark":"Sombre","p_signout":"Se déconnecter","p_saved":"Enregistré.","p_pwmismatch":"Les mots de passe ne correspondent pas.","p_pwupdated":"Mot de passe mis à jour.","p_loading":"Chargement...","lead_coffee":"Le marc de café ne se dépose jamais au hasard. Le marc de café vous parle dans la langue du destin, et OPHANARK déchiffre cette langue pour vous.","lead_palm":"Certains disent que le destin d'un être est écrit sur son front, mais la carte de sa destinée se dessine au creux de ses paumes. Ophanark rend cette carte lisible pour vous.","sub_palm":"On ne peut effacer le destin — l'avenir doit être vécu — mais on peut en faire naître un tournant.","lead_katina":"Certains croient que Katina est une femme mystérieuse qui murmure des paroles d'amour, tandis que d'autres voient en elle une sombre magicienne qui infléchit le destin ; pourtant, s'il est une chose que nous savons avec certitude, c'est que ces prophéties murmurent les secrets les plus profonds de votre cœur.","sub_katina":"L'amour possède une définition dans bien des langues, mais dans le jeu de Katina, la langue de l'amour est le murmure de votre cœur. Ophanark entend ces murmures pour vous.","lead_tarot":"Nous avons réuni l'esthétique de la Renaissance, le mystère de la France et le style d'Ophan en un seul et même jeu. Souvenez-vous : tout change avec le temps — les empires s'effondrent, mais l'esprit demeure inchangé. Ophan préserve cet esprit pour vous.","sub_tarot":"Vos sentiments détermineront le passé ou l'avenir.","lead_zodiac":"L'Univers murmure votre nom aux planètes à travers les étoiles ; l'avertissement des astres et toutes les énergies du jour ont pris forme pour vous. Ophanark communie avec l'Univers en votre nom.","lead_natal":"Le destin n'est pas un hasard ; c'est un code cosmique que les étoiles ont préparé pour vous. Votre thème de naissance est le premier et le seul livre que l'univers ait écrit pour vous — et Ophan ouvre ce livre et le lit pour vous.","lead_dream":"Ce voyage mystérieux qui commence lorsque vous fermez les yeux est, en vérité, l'éveil de votre âme. Le rêve que vous faites la nuit est la langue par laquelle l'univers vous parle ; Ophan déchiffre cette langue pour vous.","p_history":"Historique","p_history_empty":"Aucune lecture pour le moment.","ft_kahve":"Café","ft_el":"Main","ft_tarot":"Tarot","ft_ruya":"Rêve"},"es":{"nav_fortunes":"Adivinaciones","nav_tarot":"Tarot","nav_zodiac":"Signos del zodiaco","nav_natal":"Carta natal","nav_dream":"Interpretación de los sueños","nav_profile":"Perfil","nav_ready":"Mis lecturas","back_fortunes":"← Adivinaciones","hero_types":"Las artes de la","hero_fortune":"Adivinación","hero_tagline":"Los divinos Galgalim giran para ti","card_coffee":"Lectura del café turco","card_palm":"Lectura de la mano","card_katina":"Oráculo de Katina","card_tarot":"Lectura del tarot","big_palmistry":"Quiromancia","cta_coffee":"¿Qué deseas descubrir?","cta_palm":"¿Quieres hacerlo ahora mismo?","cta_katina":"Extiende mis cartas.","cta_tarot":"¿Qué es lo que te inquieta?","cta_zodiac":"Quiero descubrir mi carta natal.","cta_natal":"Interpreta mi carta de nacimiento.","cta_dream":"Interpreta mi sueño.","cue_scroll":"desplázate ↓","btn_continue":"Continuar","btn_ready":"Estoy listo","btn_tryagain":"Intentar de nuevo","btn_anothercup":"Leer otra taza","btn_anotherreading":"Realizar otra lectura","btn_detailed":"Continuar hacia la lectura detallada","load_beingread":"Leyendo...","load_preparing":"Tu lectura se está preparando...","foot_rights":"TODOS LOS DERECHOS RESERVADOS","p_title":"Perfil y ajustes","p_account":"Cuenta","p_first":"Nombre","p_last":"Apellido","p_email":"Correo electrónico","p_save":"Guardar cambios","p_changepw":"Cambiar contraseña","p_newpw":"Nueva contraseña","p_confirmpw":"Confirmar la nueva contraseña","p_updatepw":"Actualizar contraseña","p_settings":"Ajustes","p_applang":"Idioma de la aplicación","p_apptheme":"Tema de la aplicación","p_light":"Claro","p_dark":"Oscuro","p_signout":"Cerrar sesión","p_saved":"Guardado.","p_pwmismatch":"Las contraseñas no coinciden.","p_pwupdated":"Contraseña actualizada.","p_loading":"Cargando...","lead_coffee":"Los posos del café no se forman al azar. Los posos del café te hablan en la lengua del destino, y OPHANARK descifra esa lengua para ti.","lead_palm":"Algunos dicen que el destino de una persona está escrito en su frente, pero el mapa de su sino se dibuja en las palmas de sus manos. Ophanark hace legible ese mapa para ti.","sub_palm":"No puedes borrar el destino —el futuro ha de vivirse—, pero sí puedes crear un punto de inflexión.","lead_katina":"Algunos creen que Katina es una mujer misteriosa que susurra sobre el amor, mientras que otros la ven como una oscura hechicera que altera el destino; sin embargo, si hay algo que sabemos con certeza, es que estas profecías susurran los secretos más profundos de tu corazón.","sub_katina":"El amor tiene una definición en muchas lenguas, pero en la baraja de Katina, la lengua del amor es el susurro de tu corazón. Ophanark escucha esos susurros por ti.","lead_tarot":"Ahora hemos reunido la estética del Renacimiento, el misterio de Francia y el estilo de Ophan en una sola baraja. Recuerda: todo cambia con el tiempo —los imperios caen, pero el espíritu permanece inmutable. Ophan preserva ese espíritu para ti.","sub_tarot":"Tus sentimientos determinarán el pasado o el futuro.","lead_zodiac":"El Universo susurra tu nombre a los planetas a través de las estrellas; la advertencia de los astros y todas las energías del día han tomado forma para ti. Ophanark se comunica con el Universo en tu nombre.","lead_natal":"El destino no es una casualidad; es un código cósmico que las estrellas han preparado para ti. Tu carta de nacimiento es el primer y único libro que el universo ha escrito para ti, y Ophan abre y lee ese libro para ti.","lead_dream":"Ese misterioso viaje que comienza cuando cierras los ojos es, en realidad, el despertar de tu alma. El sueño que ves por la noche es la lengua con la que el universo te habla; Ophan descifra esa lengua para ti.","p_history":"Historial","p_history_empty":"Aún no hay lecturas.","ft_kahve":"Café","ft_el":"Mano","ft_tarot":"Tarot","ft_ruya":"Sueño"},"it":{"nav_fortunes":"Divinazioni","nav_tarot":"Tarocchi","nav_zodiac":"Segni Zodiacali","nav_natal":"Tema Natale","nav_dream":"Interpretazione dei Sogni","nav_profile":"Profilo","nav_ready":"Le mie letture","back_fortunes":"← Divinazioni","hero_types":"Le Arti della","hero_fortune":"Divinazione","hero_tagline":"I Divini Galgalim Ruotano per Te","card_coffee":"Lettura dei Fondi di Caffè","card_palm":"Lettura della Mano","card_katina":"Lettura di Katina","card_tarot":"Lettura dei Tarocchi","big_palmistry":"Chiromanzia","cta_coffee":"Cosa desideri sapere?","cta_palm":"Vuoi farlo ora?","cta_katina":"Disponi le mie carte.","cta_tarot":"Su cosa ti interroghi?","cta_zodiac":"Voglio scoprire il mio tema natale.","cta_natal":"Interpreta il mio tema natale.","cta_dream":"Interpreta il mio sogno.","cue_scroll":"scorri ↓","btn_continue":"Continua","btn_ready":"Sono pronto","btn_tryagain":"Riprova","btn_anothercup":"Leggi un'altra tazza","btn_anotherreading":"Fai un'altra lettura","btn_detailed":"Continua per la lettura dettagliata","load_beingread":"In lettura...","load_preparing":"La tua lettura è in preparazione...","foot_rights":"TUTTI I DIRITTI RISERVATI","p_title":"Profilo e Impostazioni","p_account":"Account","p_first":"Nome","p_last":"Cognome","p_email":"Email","p_save":"Salva modifiche","p_changepw":"Cambia password","p_newpw":"Nuova password","p_confirmpw":"Conferma la nuova password","p_updatepw":"Aggiorna password","p_settings":"Impostazioni","p_applang":"Lingua dell'app","p_apptheme":"Tema dell'app","p_light":"Chiaro","p_dark":"Scuro","p_signout":"Esci","p_saved":"Salvato.","p_pwmismatch":"Le password non coincidono.","p_pwupdated":"Password aggiornata.","p_loading":"Caricamento...","lead_coffee":"I fondi di caffè non si formano per caso. I fondi di caffè ti parlano nella lingua del destino, e OPHANARK legge quella lingua per te.","lead_palm":"Alcuni dicono che il destino di una persona sia scritto sulla sua fronte, ma la mappa del proprio fato è tracciata nel palmo delle mani. Ophanark rende leggibile per te questa mappa.","sub_palm":"Il destino non si può cancellare—il futuro va vissuto—ma puoi creare un punto di svolta.","lead_katina":"Alcuni credono che Katina sia una donna misteriosa che sussurra d'amore, mentre altri la vedono come un'oscura incantatrice che muta il destino; eppure, se c'è una cosa che sappiamo con certezza, è che queste profezie sussurrano i segreti più profondi del tuo cuore.","sub_katina":"L'amore ha una definizione in molte lingue, ma nel mazzo di Katina la lingua dell'amore è il sussurro del tuo cuore. Ophanark ode questi sussurri per te.","lead_tarot":"Abbiamo ora riunito in un solo mazzo l'estetica del Rinascimento, il mistero della Francia e lo stile di Ophan. Ricorda, tutto muta con il tempo—gli imperi cadono, ma lo spirito resta immutato. Ophan custodisce questo spirito per te.","sub_tarot":"Saranno i tuoi sentimenti a determinare il passato o il futuro.","lead_zodiac":"L'Universo sussurra il tuo nome ai pianeti servendosi delle stelle; il monito degli astri e tutte le energie del giorno hanno preso forma per te. Ophanark comunica con l'Universo in tua vece.","lead_natal":"Il destino non è una coincidenza; è un codice cosmico preparato per te dalle stelle. Il tuo tema natale è il primo e unico libro che l'universo abbia scritto per te—e Ophan apre e legge quel libro per te.","lead_dream":"Quel viaggio misterioso che comincia quando chiudi gli occhi è, in verità, il risveglio della tua anima. Il sogno che vedi nella notte è la lingua che l'universo usa per parlarti; Ophan decifra questa lingua per te.","p_history":"Cronologia","p_history_empty":"Ancora nessuna lettura.","ft_kahve":"Caffè","ft_el":"Mano","ft_tarot":"Tarocchi","ft_ruya":"Sogno"},"pt":{"nav_fortunes":"Adivinhações","nav_tarot":"Tarô","nav_zodiac":"Signos do Zodíaco","nav_natal":"Mapa Natal","nav_dream":"Interpretação dos Sonhos","nav_profile":"Perfil","nav_ready":"Minhas leituras","back_fortunes":"← Adivinhações","hero_types":"As Artes da","hero_fortune":"Adivinhação","hero_tagline":"Os Divinos Galgalim Giram por Ti","card_coffee":"Leitura da Borra de Café","card_palm":"Leitura da Mão","card_katina":"Leitura de Katina","card_tarot":"Leitura do Tarô","big_palmistry":"Quiromancia","cta_coffee":"O que desejas saber?","cta_palm":"Queres fazê-lo agora?","cta_katina":"Dispõe as minhas cartas.","cta_tarot":"Sobre o que te interrogas?","cta_zodiac":"Quero descobrir o meu mapa natal.","cta_natal":"Interpreta o meu mapa natal.","cta_dream":"Interpreta o meu sonho.","cue_scroll":"rola ↓","btn_continue":"Continuar","btn_ready":"Estou pronto","btn_tryagain":"Tentar de novo","btn_anothercup":"Ler outra chávena","btn_anotherreading":"Fazer outra leitura","btn_detailed":"Continuar para a leitura detalhada","load_beingread":"A ler...","load_preparing":"A tua leitura está a ser preparada...","foot_rights":"TODOS OS DIREITOS RESERVADOS","p_title":"Perfil e Definições","p_account":"Conta","p_first":"Nome","p_last":"Apelido","p_email":"Email","p_save":"Guardar alterações","p_changepw":"Alterar palavra-passe","p_newpw":"Nova palavra-passe","p_confirmpw":"Confirmar nova palavra-passe","p_updatepw":"Atualizar palavra-passe","p_settings":"Definições","p_applang":"Idioma da aplicação","p_apptheme":"Tema da aplicação","p_light":"Claro","p_dark":"Escuro","p_signout":"Terminar sessão","p_saved":"Guardado.","p_pwmismatch":"As palavras-passe não coincidem.","p_pwupdated":"Palavra-passe atualizada.","p_loading":"A carregar...","lead_coffee":"A borra de café não se forma ao acaso. A borra de café fala-te na língua do destino, e OPHANARK lê essa língua por ti.","lead_palm":"Há quem diga que o destino de uma pessoa está escrito na sua fronte, mas o mapa do seu fado é traçado na palma das mãos. Ophanark torna esse mapa legível para ti.","sub_palm":"Não podes apagar o destino—o futuro deve ser vivido—mas podes criar um ponto de viragem.","lead_katina":"Alguns acreditam que Katina é uma mulher misteriosa que sussurra sobre o amor, enquanto outros a veem como uma sombria feiticeira que altera o destino; contudo, se há algo que sabemos com certeza, é que estas profecias sussurram os segredos mais profundos do teu coração.","sub_katina":"O amor tem uma definição em muitas línguas, mas no baralho de Katina a língua do amor é o sussurro do teu coração. Ophanark escuta esses sussurros por ti.","lead_tarot":"Reunimos agora, num único baralho, a estética do Renascimento, o mistério da França e o estilo de Ophan. Lembra-te, tudo muda com o tempo—os impérios caem, mas o espírito permanece o mesmo. Ophan preserva esse espírito por ti.","sub_tarot":"Serão os teus sentimentos a determinar o passado ou o futuro.","lead_zodiac":"O Universo sussurra o teu nome aos planetas por meio das estrelas; o aviso dos astros e todas as energias do dia tomaram forma por ti. Ophanark comunica com o Universo em teu nome.","lead_natal":"O destino não é uma coincidência; é um código cósmico preparado para ti pelas estrelas. O teu mapa natal é o primeiro e único livro que o universo escreveu para ti—e Ophan abre e lê esse livro por ti.","lead_dream":"Essa viagem misteriosa que começa quando fechas os olhos é, na verdade, o despertar da tua alma. O sonho que vês à noite é a língua que o universo usa para falar contigo; Ophan decifra essa língua por ti.","p_history":"Histórico","p_history_empty":"Ainda não há leituras.","ft_kahve":"Café","ft_el":"Mão","ft_tarot":"Tarô","ft_ruya":"Sonho"},"ru":{"nav_fortunes":"Гадания","nav_tarot":"Таро","nav_zodiac":"Знаки зодиака","nav_natal":"Натальная карта","nav_dream":"Толкование снов","nav_profile":"Профиль","nav_ready":"Мои гадания","back_fortunes":"← Гадания","hero_types":"Виды","hero_fortune":"Предсказаний судьбы","hero_tagline":"Божественные Galgalim вращаются ради тебя","card_coffee":"Гадание на турецком кофе","card_palm":"Чтение по ладони","card_katina":"Гадание Katina","card_tarot":"Расклад Таро","big_palmistry":"Хиромантия","cta_coffee":"Что ты желаешь узнать?","cta_palm":"Хочешь сделать это сейчас?","cta_katina":"Разложить мои карты.","cta_tarot":"О чём ты размышляешь?","cta_zodiac":"Я хочу узнать свою натальную карту.","cta_natal":"Истолковать мою натальную карту.","cta_dream":"Истолковать мой сон.","cue_scroll":"прокрути ↓","btn_continue":"Продолжить","btn_ready":"Я готов","btn_tryagain":"Попробовать снова","btn_anothercup":"Прочесть другую чашку","btn_anotherreading":"Сделать новое гадание","btn_detailed":"Продолжить к подробному гаданию","load_beingread":"Читаем...","load_preparing":"Твоё гадание готовится...","foot_rights":"ВСЕ ПРАВА ЗАЩИЩЕНЫ","p_title":"Профиль и настройки","p_account":"Учётная запись","p_first":"Имя","p_last":"Фамилия","p_email":"Электронная почта","p_save":"Сохранить изменения","p_changepw":"Изменить пароль","p_newpw":"Новый пароль","p_confirmpw":"Подтвердите новый пароль","p_updatepw":"Обновить пароль","p_settings":"Настройки","p_applang":"Язык приложения","p_apptheme":"Тема приложения","p_light":"Светлая","p_dark":"Тёмная","p_signout":"Выйти","p_saved":"Сохранено.","p_pwmismatch":"Пароли не совпадают.","p_pwupdated":"Пароль обновлён.","p_loading":"Загрузка...","lead_coffee":"Кофейная гуща складывается не случайно. Кофейная гуща говорит с тобой на языке судьбы, и OPHANARK читает этот язык для тебя.","lead_palm":"Одни говорят, что судьба человека начертана на его челе, но карта его рока начертана на ладонях его рук. Ophanark делает эту карту читаемой для тебя.","sub_palm":"Судьбу нельзя стереть — будущее должно быть прожито, — но ты можешь создать поворотный момент.","lead_katina":"Одни верят, что Katina — загадочная женщина, что шепчет о любви, другие видят в ней тёмную чародейку, что меняет судьбу; и всё же, если есть нечто, что мы знаем наверняка, так это то, что эти пророчества шепчут о самых сокровенных тайнах твоего сердца.","sub_katina":"У любви есть определение во многих языках, но в колоде Katina язык любви — это шёпот твоего сердца. Ophanark слышит эти шёпоты для тебя.","lead_tarot":"Ныне мы соединили эстетику Ренессанса, тайну Франции и стиль Ophan в единой колоде. Помни: со временем меняется всё — империи рушатся, но дух остаётся неизменным. Ophan хранит этот дух для тебя.","sub_tarot":"Твои чувства определят прошлое или будущее.","lead_zodiac":"Вселенная шепчет твоё имя планетам через звёзды; предостережение звёзд и все энергии дня обрели форму для тебя. Ophanark ведёт беседу со Вселенной от твоего имени.","lead_natal":"Судьба — не случайность; это космический код, приготовленный для тебя звёздами. Твоя натальная карта — первая и единственная книга, что вселенная написала для тебя, — и Ophan открывает и читает эту книгу для тебя.","lead_dream":"То таинственное странствие, что начинается, когда ты закрываешь глаза, есть, воистину, пробуждение твоей души. Сон, что ты видишь ночью, — это язык, которым вселенная говорит с тобой; Ophan разгадывает этот язык для тебя.","p_history":"История","p_history_empty":"Пока нет гаданий.","ft_kahve":"Кофе","ft_el":"Ладонь","ft_tarot":"Таро","ft_ruya":"Сон"},"ar":{"nav_fortunes":"الفنون العرافة","nav_tarot":"التاروت","nav_zodiac":"الأبراج","nav_natal":"الخريطة الفلكية للميلاد","nav_dream":"تفسير الأحلام","nav_profile":"الملف الشخصي","nav_ready":"قراءاتي","back_fortunes":"← الفنون العرافة","hero_types":"ضروبٌ من","hero_fortune":"قراءة الغيب","hero_tagline":"إنّ الـ Galgalim المقدّسة تدور من أجلك","card_coffee":"قراءة فنجان القهوة التركية","card_palm":"قراءة الكف","card_katina":"قراءة كاتينا","card_tarot":"قراءة التاروت","big_palmistry":"علم قراءة الكف","cta_coffee":"ما الذي تودّ أن تعرفه؟","cta_palm":"أترغب في القيام بهذا الآن؟","cta_katina":"افردْ لي أوراقي.","cta_tarot":"عمّاذا تتساءل؟","cta_zodiac":"أريد أن أكتشف خريطتي الفلكية.","cta_natal":"فسّرْ لي خريطتي الفلكية للميلاد.","cta_dream":"فسّرْ لي حلمي.","cue_scroll":"مرّرْ للأسفل ↓","btn_continue":"متابعة","btn_ready":"أنا مستعد","btn_tryagain":"حاولْ مرة أخرى","btn_anothercup":"اقرأْ فنجاناً آخر","btn_anotherreading":"اقرأْ قراءة أخرى","btn_detailed":"تابعْ للحصول على القراءة المفصّلة","load_beingread":"جارٍ القراءة...","load_preparing":"جارٍ تحضير قراءتك...","foot_rights":"جميع الحقوق محفوظة","p_title":"الملف الشخصي والإعدادات","p_account":"الحساب","p_first":"الاسم الأول","p_last":"اسم العائلة","p_email":"البريد الإلكتروني","p_save":"حفظ التغييرات","p_changepw":"تغيير كلمة المرور","p_newpw":"كلمة المرور الجديدة","p_confirmpw":"تأكيد كلمة المرور الجديدة","p_updatepw":"تحديث كلمة المرور","p_settings":"الإعدادات","p_applang":"لغة التطبيق","p_apptheme":"مظهر التطبيق","p_light":"فاتح","p_dark":"داكن","p_signout":"تسجيل الخروج","p_saved":"تمّ الحفظ.","p_pwmismatch":"كلمتا المرور غير متطابقتين.","p_pwupdated":"تمّ تحديث كلمة المرور.","p_loading":"جارٍ التحميل...","lead_coffee":"لا تنعقد ثفالة القهوة عبثاً، بل تُحدّثك بلسان القدر، وOPHANARK يقرأ لك ذلك اللسان.","lead_palm":"يقول بعضهم إنّ قدر المرء مكتوبٌ على جبينه، غير أنّ خريطة المصير إنّما تُرسم في باطن الكفّين. وOphanark يجعل هذه الخريطة قابلةً للقراءة من أجلك.","sub_palm":"لا سبيل إلى محو القدر، فالمستقبل لا بدّ أن يُعاش، لكنّك تستطيع أن تصنع نقطة تحوّل.","lead_katina":"يرى بعضهم في كاتينا امرأةً غامضة تهمس بأسرار الحبّ، ويراها آخرون ساحرةً مظلمة تُبدّل المصائر؛ ومع ذلك، إن كان ثمّة أمرٌ نعلمه علم اليقين، فهو أنّ هذه النبوءات تهمس بأعمق أسرار قلبك.","sub_katina":"للحبّ تعريفٌ في لغاتٍ كثيرة، أمّا في مجموعة أوراق كاتينا، فإنّ لغة الحبّ هي همس قلبك. وOphanark يُصغي إلى هذه الهمسات من أجلك.","lead_tarot":"لقد جمعنا الآن بين جماليّات عصر النهضة، وسحر فرنسا، وأسلوب Ophan في مجموعةٍ واحدة من الأوراق. تذكّرْ أنّ كلّ شيء يتبدّل مع الزمن؛ فالإمبراطوريات تزول، لكنّ الروح تبقى كما هي. وOphan يصون هذه الروح من أجلك.","sub_tarot":"مشاعرك هي التي ستحدّد الماضي أو المستقبل.","lead_zodiac":"يهمس الكون باسمك إلى الكواكب مستعيناً بالنجوم؛ وقد تجسّد لك تحذير النجوم وجميع طاقات اليوم. وOphanark يتواصل مع الكون نيابةً عنك.","lead_natal":"ليس القدر محض مصادفة، بل هو شيفرةٌ كونيّة أعدّتها لك النجوم. إنّ خريطتك الفلكية للميلاد هي أوّل كتابٍ وأوحده كتبه الكون من أجلك، وOphan يفتح لك ذلك الكتاب ويقرؤه.","lead_dream":"إنّ تلك الرحلة الغامضة التي تبدأ حين تغمض عينيك ليست في حقيقتها إلّا يقظةً لروحك. فالحلم الذي تراه في الليل هو اللغة التي يخاطبك بها الكون؛ وOphan يفكّ لك رموز هذه اللغة.","p_history":"السجل","p_history_empty":"لا قراءات بعد.","ft_kahve":"قهوة","ft_el":"الكف","ft_tarot":"تاروت","ft_ruya":"حلم"},"zh":{"nav_fortunes":"占卜","nav_tarot":"塔罗","nav_zodiac":"星座","nav_natal":"本命盘","nav_dream":"解梦","nav_profile":"个人档案","nav_ready":"我的解读","back_fortunes":"← 占卜","hero_types":"种种","hero_fortune":"占卜之术","hero_tagline":"神圣的 Galgalim 正为你而转动","card_coffee":"土耳其咖啡占卜","card_palm":"手相占卜","card_katina":"Katina 占卜","card_tarot":"塔罗占卜","big_palmistry":"手相","cta_coffee":"你想知晓什么？","cta_palm":"你愿意此刻开始吗？","cta_katina":"为我摊开牌局。","cta_tarot":"你心中所惑为何？","cta_zodiac":"我想探寻我的本命盘。","cta_natal":"为我解读出生星盘。","cta_dream":"为我解梦。","cue_scroll":"向下滑动 ↓","btn_continue":"继续","btn_ready":"我已准备好","btn_tryagain":"再试一次","btn_anothercup":"再读一杯","btn_anotherreading":"再作一次占卜","btn_detailed":"继续查看详细解读","load_beingread":"解读中……","load_preparing":"你的占卜正在准备中……","foot_rights":"版权所有","p_title":"个人档案与设置","p_account":"账户","p_first":"名字","p_last":"姓氏","p_email":"电子邮箱","p_save":"保存更改","p_changepw":"更改密码","p_newpw":"新密码","p_confirmpw":"确认新密码","p_updatepw":"更新密码","p_settings":"设置","p_applang":"应用语言","p_apptheme":"应用主题","p_light":"浅色","p_dark":"深色","p_signout":"退出登录","p_saved":"已保存。","p_pwmismatch":"两次输入的密码不一致。","p_pwupdated":"密码已更新。","p_loading":"加载中……","lead_coffee":"咖啡渣绝非偶然成形。它以命运的语言向你低语，而 OPHANARK 为你解读这门语言。","lead_palm":"有人说，一个人的命运写在额上；然而命运的地图，却绘于掌心之间。Ophanark 为你读懂这幅地图。","sub_palm":"命运无法抹去——未来终须亲历——但你可以创造属于自己的转折。","lead_katina":"有人相信 Katina 是低语爱情的神秘女子，也有人视她为改写命运的暗黑女巫；然而若说有一件事我们确知无疑，那便是这些预言低诉着你心底最深的秘密。","sub_katina":"爱在众多语言中皆有其定义，但在 Katina 的牌阵里，爱的语言正是你内心的低语。Ophanark 为你聆听这些低语。","lead_tarot":"如今，我们将文艺复兴的美学、法国的神秘，以及 Ophan 的风格，汇聚于同一副牌中。请记住，万物皆随时光流转——帝国倾覆，而精魂长存。Ophan 为你守护这一精魂。","sub_tarot":"你的心之所感，将决定是过去，还是未来。","lead_zodiac":"宇宙借群星向众行星低语你的名字；星辰的警示与今日的一切能量，皆已为你成形。Ophanark 正代你与宇宙交谈。","lead_natal":"命运并非偶然，而是群星为你写就的宇宙密码。你的出生星盘，是宇宙为你书写的第一本、也是唯一一本书——而 Ophan 为你翻开并诵读这本书。","lead_dream":"当你闭上双眼时开启的那段神秘旅程，实则是灵魂的觉醒。你夜间所见的梦，是宇宙用以向你诉说的语言；Ophan 为你破译这门语言。","p_history":"历史","p_history_empty":"暂无占卜记录。","ft_kahve":"咖啡","ft_el":"手掌","ft_tarot":"塔罗","ft_ruya":"梦"},"ja":{"nav_fortunes":"占い","nav_tarot":"タロット","nav_zodiac":"星座","nav_natal":"出生図","nav_dream":"夢占い","nav_profile":"プロフィール","nav_ready":"私の占い","back_fortunes":"← 占い","hero_types":"さまざまな","hero_fortune":"占いの術","hero_tagline":"聖なる Galgalim があなたのために巡っています","card_coffee":"トルココーヒー占い","card_palm":"手相占い","card_katina":"Katina 占い","card_tarot":"タロット占い","big_palmistry":"手相","cta_coffee":"あなたは何を知りたいのですか？","cta_palm":"今、始めてみますか？","cta_katina":"私のためにカードを並べて。","cta_tarot":"あなたが思い惑うものは何ですか？","cta_zodiac":"自分の出生図を知りたい。","cta_natal":"私の出生図を読み解いて。","cta_dream":"私の夢を読み解いて。","cue_scroll":"スクロール ↓","btn_continue":"続ける","btn_ready":"準備ができました","btn_tryagain":"もう一度試す","btn_anothercup":"別のカップを読む","btn_anotherreading":"もう一度占う","btn_detailed":"詳しい占いへ進む","load_beingread":"読み解いています…","load_preparing":"あなたの占いを準備しています…","foot_rights":"無断複製・転載を禁じます","p_title":"プロフィールと設定","p_account":"アカウント","p_first":"名","p_last":"姓","p_email":"メールアドレス","p_save":"変更を保存","p_changepw":"パスワードの変更","p_newpw":"新しいパスワード","p_confirmpw":"新しいパスワードの確認","p_updatepw":"パスワードを更新","p_settings":"設定","p_applang":"アプリの言語","p_apptheme":"アプリのテーマ","p_light":"ライト","p_dark":"ダーク","p_signout":"サインアウト","p_saved":"保存しました。","p_pwmismatch":"パスワードが一致しません。","p_pwupdated":"パスワードを更新しました。","p_loading":"読み込み中…","lead_coffee":"コーヒーの澱は、偶然に形づくられるのではありません。澱は運命の言葉であなたに語りかけ、OPHANARK がその言葉をあなたのために読み解きます。","lead_palm":"人の運命は額に記されているという者もいますが、宿命の地図は手のひらの内に描かれています。Ophanark はその地図をあなたのために読み解きます。","sub_palm":"運命を消すことはできません——未来は生きられねばならないのです——けれど、あなたは転機を生み出すことができます。","lead_katina":"Katina を愛をささやく神秘の女と信じる者もいれば、運命を書き換える闇の魔女と見る者もいます。けれど、ひとつだけ確かなことがあるとすれば、それは、これらの予言があなたの心の最も深い秘密をささやくということです。","sub_katina":"愛は多くの言語で定義を持ちますが、Katina のカードにおいて、愛の言葉とはあなたの心のささやきです。Ophanark はそのささやきをあなたのために聴き取ります。","lead_tarot":"私たちは今、Renaissance の美学、France の神秘、そして Ophan の作風を、ひとつのデッキに集めました。忘れないでください、すべては時とともに移ろい——帝国は滅びても、魂は変わらず在り続けます。Ophan はその魂をあなたのために守り続けます。","sub_tarot":"あなたの心の思いが、過去となるか、未来となるかを定めるのです。","lead_zodiac":"宇宙は星々を用いて、あなたの名を惑星へとささやきます。星の告げる警めと、その日のすべての気（エネルギー）が、あなたのために形をなしました。Ophanark はあなたに代わって宇宙と語り合っています。","lead_natal":"運命は偶然ではなく、星々があなたのために整えた宇宙の暗号です。あなたの出生図は、宇宙があなたのために記した最初にして唯一の書——そして Ophan は、その書を開き、あなたのために読み上げます。","lead_dream":"あなたが目を閉じたときに始まるあの神秘の旅は、じつは魂の目覚めなのです。夜に見る夢は、宇宙があなたに語りかけるために用いる言葉。Ophan はその言葉をあなたのために読み解きます。","p_history":"履歴","p_history_empty":"まだ占いはありません。","ft_kahve":"コーヒー","ft_el":"手相","ft_tarot":"タロット","ft_ruya":"夢"},"ko":{"nav_fortunes":"점술","nav_tarot":"타로","nav_zodiac":"별자리","nav_natal":"출생 차트","nav_dream":"해몽","nav_profile":"프로필","nav_ready":"내 리딩","back_fortunes":"← 점술","hero_types":"여러 갈래의","hero_fortune":"점술","hero_tagline":"신성한 Galgalim이 당신을 위해 돌고 있습니다","card_coffee":"터키 커피 점","card_palm":"손금 보기","card_katina":"Katina 점","card_tarot":"타로 점","big_palmistry":"손금술","cta_coffee":"무엇을 알고 싶으신가요?","cta_palm":"지금 보시겠어요?","cta_katina":"제 카드를 펼쳐 주세요.","cta_tarot":"무엇이 궁금하신가요?","cta_zodiac":"제 출생 차트를 알고 싶어요.","cta_natal":"제 출생 차트를 풀이해 주세요.","cta_dream":"제 꿈을 풀이해 주세요.","cue_scroll":"스크롤 ↓","btn_continue":"계속","btn_ready":"준비되었어요","btn_tryagain":"다시 시도","btn_anothercup":"다른 잔 읽기","btn_anotherreading":"다른 점 보기","btn_detailed":"자세한 풀이 보기","load_beingread":"읽는 중...","load_preparing":"당신의 점괘를 준비하고 있습니다...","foot_rights":"모든 권리 보유","p_title":"프로필 및 설정","p_account":"계정","p_first":"이름","p_last":"성","p_email":"이메일","p_save":"변경 사항 저장","p_changepw":"비밀번호 변경","p_newpw":"새 비밀번호","p_confirmpw":"새 비밀번호 확인","p_updatepw":"비밀번호 업데이트","p_settings":"설정","p_applang":"앱 언어","p_apptheme":"앱 테마","p_light":"라이트","p_dark":"다크","p_signout":"로그아웃","p_saved":"저장되었습니다.","p_pwmismatch":"비밀번호가 일치하지 않습니다.","p_pwupdated":"비밀번호가 업데이트되었습니다.","p_loading":"불러오는 중...","lead_coffee":"커피 앙금은 결코 우연히 자리 잡지 않습니다. 커피 앙금은 운명의 언어로 당신에게 속삭이며, OPHANARK는 당신을 위해 그 언어를 읽어냅니다.","lead_palm":"누군가는 사람의 운명이 이마에 새겨진다고 말하지만, 정작 그 운명의 지도는 손바닥 안에 그려져 있습니다. Ophanark는 당신을 위해 이 지도를 읽어냅니다.","sub_palm":"운명은 지울 수 없고 미래는 결국 살아내야 하지만, 당신은 하나의 전환점을 만들어낼 수 있습니다.","lead_katina":"어떤 이는 Katina를 사랑을 속삭이는 신비로운 여인이라 여기고, 또 어떤 이는 운명을 뒤바꾸는 어둠의 마녀라 여깁니다. 그러나 우리가 분명히 아는 한 가지가 있다면, 이 예언들이 당신 마음속 가장 깊은 비밀을 속삭인다는 것입니다.","sub_katina":"사랑은 수많은 언어로 정의되지만, Katina의 카드 속에서 사랑의 언어는 곧 당신 마음의 속삭임입니다. Ophanark는 당신을 위해 그 속삭임에 귀 기울입니다.","lead_tarot":"우리는 이제 Renaissance의 미학, France의 신비, 그리고 Ophan의 감각을 하나의 카드 덱에 담아냈습니다. 기억하세요, 모든 것은 시간과 함께 변합니다. 제국은 무너져도 정신은 그대로 남습니다. Ophan은 당신을 위해 그 정신을 지켜냅니다.","sub_tarot":"당신의 감정이 과거를, 혹은 미래를 결정할 것입니다.","lead_zodiac":"우주는 별들을 빌려 당신의 이름을 행성들에게 속삭입니다. 별들의 경고와 오늘 하루의 모든 기운이 당신을 위해 모습을 갖추었습니다. Ophanark는 당신을 대신하여 우주와 교감하고 있습니다.","lead_natal":"운명은 우연이 아닙니다. 그것은 별들이 당신을 위해 마련한 우주의 암호입니다. 당신의 출생 차트는 우주가 오직 당신만을 위해 써 내려간 최초이자 유일한 책이며, Ophan은 당신을 위해 그 책을 펼쳐 읽어냅니다.","lead_dream":"눈을 감는 순간 시작되는 그 신비로운 여정은 사실 당신 영혼의 깨어남입니다. 밤에 꾸는 꿈은 우주가 당신에게 건네는 언어이며, Ophan은 당신을 위해 그 언어를 풀어냅니다.","p_history":"기록","p_history_empty":"아직 기록이 없습니다.","ft_kahve":"커피","ft_el":"손금","ft_tarot":"타로","ft_ruya":"꿈"},"hi":{"nav_fortunes":"भविष्यवाणियाँ","nav_tarot":"टैरो","nav_zodiac":"राशि","nav_natal":"जन्म कुंडली","nav_dream":"स्वप्न व्याख्या","nav_profile":"प्रोफ़ाइल","nav_ready":"मेरी रीडिंग","back_fortunes":"← भविष्यवाणियाँ","hero_types":"प्रकार","hero_fortune":"भविष्यवाणी के","hero_tagline":"दिव्य Galgalim आपके लिए घूम रहे हैं","card_coffee":"तुर्की कॉफ़ी भविष्यवाणी","card_palm":"हस्तरेखा वाचन","card_katina":"Katina वाचन","card_tarot":"टैरो वाचन","big_palmistry":"हस्तरेखा विद्या","cta_coffee":"आप क्या जानना चाहते हैं?","cta_palm":"क्या आप इसे अभी करना चाहते हैं?","cta_katina":"मेरे पत्ते बिछा दीजिए।","cta_tarot":"आप किस बारे में सोच रहे हैं?","cta_zodiac":"मैं अपनी जन्म कुंडली जानना चाहता हूँ।","cta_natal":"मेरी जन्म कुंडली की व्याख्या कीजिए।","cta_dream":"मेरे स्वप्न की व्याख्या कीजिए।","cue_scroll":"स्क्रॉल करें ↓","btn_continue":"जारी रखें","btn_ready":"मैं तैयार हूँ","btn_tryagain":"पुनः प्रयास करें","btn_anothercup":"एक और प्याला पढ़ें","btn_anotherreading":"एक और वाचन करें","btn_detailed":"विस्तृत वाचन के लिए आगे बढ़ें","load_beingread":"पढ़ा जा रहा है...","load_preparing":"आपका वाचन तैयार किया जा रहा है...","foot_rights":"सर्वाधिकार सुरक्षित","p_title":"प्रोफ़ाइल और सेटिंग्स","p_account":"खाता","p_first":"पहला नाम","p_last":"अंतिम नाम","p_email":"ईमेल","p_save":"परिवर्तन सहेजें","p_changepw":"पासवर्ड बदलें","p_newpw":"नया पासवर्ड","p_confirmpw":"नया पासवर्ड पुष्टि करें","p_updatepw":"पासवर्ड अपडेट करें","p_settings":"सेटिंग्स","p_applang":"ऐप की भाषा","p_apptheme":"ऐप की थीम","p_light":"उजली","p_dark":"गहरी","p_signout":"साइन आउट","p_saved":"सहेजा गया।","p_pwmismatch":"पासवर्ड मेल नहीं खाते।","p_pwupdated":"पासवर्ड अपडेट हो गया।","p_loading":"लोड हो रहा है...","lead_coffee":"कॉफ़ी की तलछट यूँ ही संयोग से नहीं बनती। कॉफ़ी की तलछट आपसे नियति की भाषा में बात करती है, और OPHANARK आपके लिए उस भाषा को पढ़ता है।","lead_palm":"कुछ कहते हैं कि मनुष्य का भाग्य उसके माथे पर लिखा होता है, पर नियति का असली मानचित्र तो हथेलियों की रेखाओं में अंकित होता है। Ophanark आपके लिए इस मानचित्र को पढ़ने योग्य बना देता है।","sub_palm":"आप नियति को मिटा नहीं सकते—भविष्य को जीना ही पड़ता है—पर आप एक मोड़ अवश्य रच सकते हैं।","lead_katina":"कुछ मानते हैं कि Katina एक रहस्यमयी स्त्री है जो प्रेम की फुसफुसाहटें कहती है, तो कुछ उसे एक श्यामल जादूगरनी समझते हैं जो नियति को बदल देती है; फिर भी, यदि एक बात निश्चित रूप से हम जानते हैं, तो वह यह कि ये भविष्यवाणियाँ आपके हृदय के गहनतम रहस्यों को फुसफुसाती हैं।","sub_katina":"प्रेम की परिभाषा अनेक भाषाओं में है, पर Katina के पत्तों में प्रेम की भाषा आपके हृदय की फुसफुसाहट है। Ophanark आपके लिए इन फुसफुसाहटों को सुनता है।","lead_tarot":"अब हमने Renaissance की सौंदर्यता, France के रहस्य और Ophan की शैली को एक ही पत्तों की गड्डी में समेट दिया है। स्मरण रखिए, समय के साथ सब कुछ बदल जाता है—साम्राज्य ढह जाते हैं, पर आत्मा वही रहती है। Ophan आपके लिए इस आत्मा को संजोकर रखता है।","sub_tarot":"आपकी भावनाएँ ही अतीत या भविष्य को तय करेंगी।","lead_zodiac":"ब्रह्मांड तारों के माध्यम से आपका नाम ग्रहों के कानों में फुसफुसाता है; तारों की चेतावनी और दिन की समस्त ऊर्जाएँ आपके लिए आकार ले चुकी हैं। Ophanark आपकी ओर से ब्रह्मांड से संवाद कर रहा है।","lead_natal":"नियति कोई संयोग नहीं; यह तारों द्वारा आपके लिए रचा गया एक ब्रह्मांडीय संकेत है। आपकी जन्म कुंडली वह पहली और एकमात्र पुस्तक है जिसे ब्रह्मांड ने केवल आपके लिए लिखा है—और Ophan आपके लिए उस पुस्तक को खोलकर पढ़ता है।","lead_dream":"आँखें मूँदते ही जो रहस्यमयी यात्रा आरंभ होती है, वह वास्तव में आपकी आत्मा का जागरण है। रात में देखा गया स्वप्न वह भाषा है जिसमें ब्रह्मांड आपसे बात करता है; Ophan आपके लिए इस भाषा को उकेरता है।","p_history":"इतिहास","p_history_empty":"अभी तक कोई भविष्यवाणी नहीं।","ft_kahve":"कॉफ़ी","ft_el":"हस्त","ft_tarot":"टैरो","ft_ruya":"स्वप्न"},"nl":{"nav_fortunes":"Waarzeggingen","nav_tarot":"Tarot","nav_zodiac":"Sterrenbeelden","nav_natal":"Geboortehoroscoop","nav_dream":"Droomduidingen","nav_profile":"Profiel","nav_ready":"Mijn lezingen","back_fortunes":"← Waarzeggingen","hero_types":"Vormen van","hero_fortune":"Waarzeggerij","hero_tagline":"De goddelijke Galgalim wentelen voor jou","card_coffee":"Turks koffiedik lezen","card_palm":"Handlezen","card_katina":"Katina-legging","card_tarot":"Tarot-legging","big_palmistry":"Chiromantie","cta_coffee":"Wat wil je te weten komen?","cta_palm":"Wil je dit nu doen?","cta_katina":"Leg mijn kaarten uit.","cta_tarot":"Waar vraag je je over af?","cta_zodiac":"Ik wil mijn geboortehoroscoop ontdekken.","cta_natal":"Duid mijn geboortehoroscoop.","cta_dream":"Duid mijn droom.","cue_scroll":"scrollen ↓","btn_continue":"Doorgaan","btn_ready":"Ik ben er klaar voor","btn_tryagain":"Opnieuw proberen","btn_anothercup":"Nog een kopje lezen","btn_anotherreading":"Nog een duiding lezen","btn_detailed":"Doorgaan naar de uitgebreide duiding","load_beingread":"Wordt gelezen …","load_preparing":"Je duiding wordt voorbereid …","foot_rights":"ALLE RECHTEN VOORBEHOUDEN","p_title":"Profiel & Instellingen","p_account":"Account","p_first":"Voornaam","p_last":"Achternaam","p_email":"E-mail","p_save":"Wijzigingen opslaan","p_changepw":"Wachtwoord wijzigen","p_newpw":"Nieuw wachtwoord","p_confirmpw":"Nieuw wachtwoord bevestigen","p_updatepw":"Wachtwoord bijwerken","p_settings":"Instellingen","p_applang":"App-taal","p_apptheme":"App-thema","p_light":"Licht","p_dark":"Donker","p_signout":"Afmelden","p_saved":"Opgeslagen.","p_pwmismatch":"De wachtwoorden komen niet overeen.","p_pwupdated":"Wachtwoord bijgewerkt.","p_loading":"Laden …","lead_coffee":"Koffiedik vormt zich niet bij toeval. Het koffiedik spreekt tot je in de taal van het lot, en OPHANARK leest die taal voor jou.","lead_palm":"Sommigen zeggen dat iemands lot op het voorhoofd geschreven staat, maar de kaart van je bestemming is getekend in de palmen van je handen. Ophanark maakt die kaart voor jou leesbaar.","sub_palm":"Het lot laat zich niet uitwissen – de toekomst moet worden geleefd –, maar je kunt een keerpunt scheppen.","lead_katina":"Sommigen geloven dat Katina een raadselachtige vrouw is die van liefde fluistert, terwijl anderen in haar een duistere tovenares zien die het lot verandert; toch, als er één ding is dat we met zekerheid weten, dan is het dat deze voorspellingen de diepste geheimen van je hart fluisteren.","sub_katina":"Liefde heeft in vele talen een betekenis, maar in Katina's kaartspel is de taal van de liefde het gefluister van je hart. Ophanark verneemt dit gefluister voor jou.","lead_tarot":"Nu hebben we de esthetiek van de renaissance, het mysterie van Frankrijk en Ophans stijl samengebracht in één kaartspel. Onthoud: alles verandert met de tijd – rijken vallen, maar de geest blijft dezelfde. Ophan bewaart deze geest voor jou.","sub_tarot":"Je gevoelens zullen het verleden of de toekomst bepalen.","lead_zodiac":"Het Universum fluistert je naam aan de planeten met behulp van de sterren; de waarschuwing van de sterren en alle energieën van de dag hebben voor jou vorm gekregen. Ophanark treedt namens jou in verbinding met het Universum.","lead_natal":"Het lot is geen toeval; het is een kosmische code die de sterren voor jou hebben bereid. Je geboortehoroscoop is het eerste en enige boek dat het universum voor jou heeft geschreven – en Ophan opent dat boek en leest het voor jou.","lead_dream":"Die raadselachtige reis die begint wanneer je je ogen sluit, is in werkelijkheid het ontwaken van je ziel. De droom die je 's nachts ziet, is de taal waarmee het universum tot je spreekt; Ophan ontcijfert deze taal voor jou.","p_history":"Geschiedenis","p_history_empty":"Nog geen lezingen.","ft_kahve":"Koffie","ft_el":"Hand","ft_tarot":"Tarot","ft_ruya":"Droom"},"pl":{"nav_fortunes":"Wróżby","nav_tarot":"Tarot","nav_zodiac":"Znaki zodiaku","nav_natal":"Kosmogram","nav_dream":"Interpretacje snów","nav_profile":"Profil","nav_ready":"Moje odczyty","back_fortunes":"← Wróżby","hero_types":"Rodzaje","hero_fortune":"Wróżbiarstwa","hero_tagline":"Boskie Galgalim obracają się dla Ciebie","card_coffee":"Wróżenie z tureckiej kawy","card_palm":"Wróżenie z dłoni","card_katina":"Wróżba Katina","card_tarot":"Rozkład Tarota","big_palmistry":"Chiromancja","cta_coffee":"Czego pragniesz się dowiedzieć?","cta_palm":"Czy chcesz to uczynić teraz?","cta_katina":"Rozłóż moje karty.","cta_tarot":"Nad czym się zastanawiasz?","cta_zodiac":"Chcę poznać swój kosmogram.","cta_natal":"Odczytaj mój kosmogram.","cta_dream":"Wytłumacz mój sen.","cue_scroll":"przewiń ↓","btn_continue":"Dalej","btn_ready":"Jestem gotów","btn_tryagain":"Spróbuj ponownie","btn_anothercup":"Odczytaj kolejną filiżankę","btn_anotherreading":"Wykonaj kolejną wróżbę","btn_detailed":"Przejdź do szczegółowej wróżby","load_beingread":"Odczytywanie...","load_preparing":"Twoja wróżba jest przygotowywana...","foot_rights":"WSZELKIE PRAWA ZASTRZEŻONE","p_title":"Profil i ustawienia","p_account":"Konto","p_first":"Imię","p_last":"Nazwisko","p_email":"E-mail","p_save":"Zapisz zmiany","p_changepw":"Zmień hasło","p_newpw":"Nowe hasło","p_confirmpw":"Potwierdź nowe hasło","p_updatepw":"Zaktualizuj hasło","p_settings":"Ustawienia","p_applang":"Język aplikacji","p_apptheme":"Motyw aplikacji","p_light":"Jasny","p_dark":"Ciemny","p_signout":"Wyloguj się","p_saved":"Zapisano.","p_pwmismatch":"Hasła nie są zgodne.","p_pwupdated":"Hasło zaktualizowane.","p_loading":"Ładowanie...","lead_coffee":"Fusy kawy nie układają się przypadkiem. Fusy przemawiają do Ciebie językiem przeznaczenia, a OPHANARK odczytuje ten język dla Ciebie.","lead_palm":"Jedni powiadają, że los człowieka zapisany jest na jego czole, lecz mapa jego przeznaczenia nakreślona jest we wnętrzu dłoni. Ophanark czyni tę mapę czytelną dla Ciebie.","sub_palm":"Losu nie da się wymazać — przyszłość musi zostać przeżyta — lecz możesz stworzyć punkt zwrotny.","lead_katina":"Jedni wierzą, że Katina to tajemnicza kobieta szepcząca o miłości, inni widzą w niej mroczną czarodziejkę, która odmienia przeznaczenie; jeśli jednak jest coś, co wiemy z pewnością, to to, że te przepowiednie szepczą najgłębsze sekrety Twojego serca.","sub_katina":"Miłość ma swoją definicję w wielu językach, lecz w talii Katina językiem miłości jest szept Twojego serca. Ophanark słyszy te szepty dla Ciebie.","lead_tarot":"Oto połączyliśmy estetykę Renesansu, tajemnicę Francji i styl Ophana w jednej talii. Pamiętaj, wszystko zmienia się z czasem — imperia upadają, lecz duch pozostaje ten sam. Ophan zachowuje tego ducha dla Ciebie.","sub_tarot":"Twoje uczucia określą przeszłość albo przyszłość.","lead_zodiac":"Wszechświat szepcze Twoje imię planetom za pomocą gwiazd; przestroga gwiazd i wszystkie energie dnia przybrały dla Ciebie kształt. Ophanark porozumiewa się z Wszechświatem w Twoim imieniu.","lead_natal":"Przeznaczenie nie jest przypadkiem; to kosmiczny kod przygotowany dla Ciebie przez gwiazdy. Twój kosmogram to pierwsza i jedyna księga, jaką wszechświat napisał dla Ciebie — a Ophan otwiera i czyta tę księgę dla Ciebie.","lead_dream":"Ta tajemnicza podróż, która rozpoczyna się, gdy zamykasz oczy, jest w istocie przebudzeniem Twojej duszy. Sen, który widzisz nocą, to język, którym wszechświat przemawia do Ciebie; Ophan odczytuje ten język dla Ciebie.","p_history":"Historia","p_history_empty":"Brak wróżb.","ft_kahve":"Kawa","ft_el":"Dłoń","ft_tarot":"Tarot","ft_ruya":"Sen"}};
  var LABELS = [["en", "English"], ["tr", "Türkçe"], ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"], ["it", "Italiano"], ["pt", "Português"], ["ru", "Русский"], ["ar", "العربية"], ["zh", "中文"], ["ja", "日本語"], ["ko", "한국어"], ["hi", "हिन्दी"], ["nl", "Nederlands"], ["pl", "Polski"]];
  var RTL = { ar: 1 };

  var _ADD={"btn_back":{en:"Back",tr:"Geri",de:"Zurück",fr:"Retour",es:"Atrás",it:"Indietro",pt:"Voltar",ru:"Назад",ar:"رجوع",zh:"返回",ja:"戻る",ko:"뒤로",hi:"वापस",nl:"Terug",pl:"Wstecz"},"lbl_country":{en:"Country",tr:"Ülke",de:"Land",fr:"Pays",es:"País",it:"Paese",pt:"País",ru:"Страна",ar:"الدولة",zh:"国家",ja:"国",ko:"국가",hi:"देश",nl:"Land",pl:"Kraj"},"lbl_birth_city":{en:"Birth city",tr:"Doğum şehri",de:"Geburtsstadt",fr:"Ville de naissance",es:"Ciudad de nacimiento",it:"Città di nascita",pt:"Cidade de nascimento",ru:"Город рождения",ar:"مدينة الميلاد",zh:"出生城市",ja:"出生地（市）",ko:"출생 도시",hi:"जन्म शहर",nl:"Geboortestad",pl:"Miasto urodzenia"},"lbl_birth_date":{en:"Birth date",tr:"Doğum tarihi",de:"Geburtsdatum",fr:"Date de naissance",es:"Fecha de nacimiento",it:"Data di nascita",pt:"Data de nascimento",ru:"Дата рождения",ar:"تاريخ الميلاد",zh:"出生日期",ja:"生年月日",ko:"생년월일",hi:"जन्म तिथि",nl:"Geboortedatum",pl:"Data urodzenia"},"lbl_birth_time":{en:"Birth time",tr:"Doğum saati",de:"Geburtszeit",fr:"Heure de naissance",es:"Hora de nacimiento",it:"Ora di nascita",pt:"Hora de nascimento",ru:"Время рождения",ar:"وقت الميلاد",zh:"出生时间",ja:"出生時刻",ko:"출생 시간",hi:"जन्म समय",nl:"Geboortetijd",pl:"Godzina urodzenia"},"lbl_state_region":{en:"State / Region",tr:"Eyalet / Bölge",de:"Bundesland / Region",fr:"État / Région",es:"Estado / Región",it:"Stato / Regione",pt:"Estado / Região",ru:"Штат / Регион",ar:"الولاية / المنطقة",zh:"州 / 地区",ja:"州・地域",ko:"주 / 지역",hi:"राज्य / क्षेत्र",nl:"Staat / Regio",pl:"Stan / Region"},"ph_full_name":{en:"Your full name",tr:"Ad soyad",de:"Ihr vollständiger Name",fr:"Votre nom complet",es:"Tu nombre completo",it:"Il tuo nome completo",pt:"Seu nome completo",ru:"Ваше полное имя",ar:"اسمك الكامل",zh:"您的全名",ja:"氏名",ko:"성명",hi:"आपका पूरा नाम",nl:"Uw volledige naam",pl:"Imię i nazwisko"},"ph_write_name":{en:"Write your name",tr:"Adını yaz",de:"Namen eingeben",fr:"Écrivez votre nom",es:"Escribe tu nombre",it:"Scrivi il tuo nome",pt:"Escreva seu nome",ru:"Введите имя",ar:"اكتب اسمك",zh:"写下你的名字",ja:"名前を入力",ko:"이름을 입력",hi:"अपना नाम लिखें",nl:"Schrijf je naam",pl:"Wpisz imię"},"ph_your_name":{en:"Your name",tr:"Adın",de:"Ihr Name",fr:"Votre nom",es:"Tu nombre",it:"Il tuo nome",pt:"Seu nome",ru:"Ваше имя",ar:"اسمك",zh:"你的名字",ja:"お名前",ko:"이름",hi:"आपका नाम",nl:"Je naam",pl:"Twoje imię"},"ph_select_country":{en:"Select country…",tr:"Ülke seçin…",de:"Land wählen…",fr:"Choisir un pays…",es:"Selecciona país…",it:"Seleziona paese…",pt:"Selecione o país…",ru:"Выберите страну…",ar:"اختر الدولة…",zh:"选择国家…",ja:"国を選択…",ko:"국가 선택…",hi:"देश चुनें…",nl:"Kies land…",pl:"Wybierz kraj…"},"ph_select_country_first":{en:"Select country first…",tr:"Önce ülke seçin…",de:"Zuerst Land wählen…",fr:"Choisir d'abord un pays…",es:"Selecciona país primero…",it:"Prima seleziona paese…",pt:"Selecione o país primeiro…",ru:"Сначала выберите страну…",ar:"اختر الدولة أولاً…",zh:"请先选择国家…",ja:"先に国を選択…",ko:"먼저 국가 선택…",hi:"पहले देश चुनें…",nl:"Kies eerst land…",pl:"Najpierw wybierz kraj…"},"hd_your_sky":{en:"Your Sky",tr:"Gökyüzün",de:"Dein Himmel",fr:"Ton Ciel",es:"Tu Cielo",it:"Il Tuo Cielo",pt:"Seu Céu",ru:"Твоё небо",ar:"سماؤك",zh:"你的星空",ja:"あなたの空",ko:"당신의 하늘",hi:"आपका आकाश",nl:"Jouw Hemel",pl:"Twoje Niebo"},"hd_twelve_houses":{en:"The Twelve Houses",tr:"On İki Ev",de:"Die zwölf Häuser",fr:"Les Douze Maisons",es:"Las Doce Casas",it:"Le Dodici Case",pt:"As Doze Casas",ru:"Двенадцать домов",ar:"البيوت الاثنا عشر",zh:"十二宫",ja:"十二ハウス",ko:"열두 하우스",hi:"बारह भाव",nl:"De Twaalf Huizen",pl:"Dwanaście Domów"},"lead_houses":{en:"Each house is a room of your life; the sign on its cusp colours how you live there.",tr:"Her ev, hayatının bir odasıdır; kapısındaki burç, orada nasıl yaşadığını renklendirir.",de:"Jedes Haus ist ein Raum deines Lebens; das Zeichen an seiner Spitze prägt, wie du dort lebst.",fr:"Chaque maison est une pièce de ta vie ; le signe à sa cuspide colore ta façon d'y vivre.",es:"Cada casa es una habitación de tu vida; el signo en su cúspide colorea cómo vives allí.",it:"Ogni casa è una stanza della tua vita; il segno sulla cuspide colora come vi abiti.",pt:"Cada casa é um cômodo da sua vida; o signo em sua cúspide colore como você vive ali.",ru:"Каждый дом — комната твоей жизни; знак на его вершине окрашивает то, как ты в ней живёшь.",ar:"كل بيت غرفة من حياتك؛ والبرج على طالعه يلوّن كيف تعيش فيه.",zh:"每一宫都是你生命中的一个房间；宫头的星座为你在其中的生活着色。",ja:"各ハウスはあなたの人生の一室。カスプの星座が、そこでの生き方に色を添えます。",ko:"각 하우스는 당신 삶의 한 방입니다; 커스프의 별자리가 그곳에서의 삶을 물들입니다.",hi:"हर भाव आपके जीवन का एक कमरा है; उसके आरंभ पर स्थित राशि रंग देती है कि आप वहाँ कैसे जीते हैं।",nl:"Elk huis is een kamer van je leven; het teken op de cuspis kleurt hoe je daar leeft.",pl:"Każdy dom to pokój twojego życia; znak na jego szczycie barwi to, jak w nim żyjesz."},"lead_natal_form":{en:"Your birth chart is the first book the universe wrote for you. Enter your details and Ophan will open it.",tr:"Doğum haritan, evrenin senin için yazdığı ilk kitaptır. Bilgilerini gir, Ophan onu açsın.",de:"Dein Geburtshoroskop ist das erste Buch, das das Universum für dich schrieb. Gib deine Daten ein und Ophan öffnet es.",fr:"Ton thème natal est le premier livre que l'univers a écrit pour toi. Saisis tes informations et Ophan l'ouvrira.",es:"Tu carta natal es el primer libro que el universo escribió para ti. Introduce tus datos y Ophan lo abrirá.",it:"Il tuo tema natale è il primo libro che l'universo ha scritto per te. Inserisci i tuoi dati e Ophan lo aprirà.",pt:"Seu mapa natal é o primeiro livro que o universo escreveu para você. Insira seus dados e Ophan o abrirá.",ru:"Твоя натальная карта — первая книга, что вселенная написала для тебя. Введи данные, и Ophan откроет её.",ar:"خريطتك الفلكية هي أول كتاب كتبه الكون لك. أدخل بياناتك وسيفتحه أوفان.",zh:"你的本命星盘是宇宙为你写下的第一本书。输入你的信息，Ophan 将为你开启。",ja:"あなたの出生図は、宇宙があなたのために書いた最初の書物。情報を入力すれば、Ophan が開きます。",ko:"당신의 출생 차트는 우주가 당신을 위해 쓴 첫 책입니다. 정보를 입력하면 Ophan이 열어드립니다.",hi:"आपकी जन्म कुंडली वह पहली किताब है जो ब्रह्मांड ने आपके लिए लिखी। अपनी जानकारी भरें और Ophan उसे खोलेगा।",nl:"Je geboortehoroscoop is het eerste boek dat het universum voor je schreef. Vul je gegevens in en Ophan opent het.",pl:"Twój horoskop urodzeniowy to pierwsza księga, którą wszechświat napisał dla ciebie. Podaj dane, a Ophan ją otworzy."},"load_natal":{en:"Your natal chart is being drawn…",tr:"Natal haritan çiziliyor…",de:"Dein Geburtshoroskop wird gezeichnet…",fr:"Ton thème natal se dessine…",es:"Se está dibujando tu carta natal…",it:"Il tuo tema natale viene disegnato…",pt:"Seu mapa natal está sendo desenhado…",ru:"Твоя натальная карта рисуется…",ar:"يتم رسم خريطتك الفلكية…",zh:"正在绘制你的本命星盘…",ja:"出生図を描いています…",ko:"출생 차트를 그리는 중…",hi:"आपकी जन्म कुंडली बन रही है…",nl:"Je geboortehoroscoop wordt getekend…",pl:"Twój horoskop jest rysowany…"},"load_natal_sub":{en:"Ophan is mapping the sky of your birth.",tr:"Ophan doğum anının gökyüzünü haritalıyor.",de:"Ophan kartiert den Himmel deiner Geburt.",fr:"Ophan cartographie le ciel de ta naissance.",es:"Ophan está trazando el cielo de tu nacimiento.",it:"Ophan sta mappando il cielo della tua nascita.",pt:"Ophan está mapeando o céu do seu nascimento.",ru:"Ophan наносит на карту небо твоего рождения.",ar:"يرسم أوفان سماء لحظة ميلادك.",zh:"Ophan 正在绘制你出生时的星空。",ja:"Ophan があなたの誕生の空を描いています。",ko:"Ophan이 당신이 태어난 하늘을 그리고 있습니다.",hi:"Ophan आपके जन्म के आकाश का नक्शा बना रहा है।",nl:"Ophan brengt de hemel van je geboorte in kaart.",pl:"Ophan mapuje niebo twoich narodzin."},"hd_your_cup":{en:"Your Cup",tr:"Fincanın",de:"Deine Tasse",fr:"Ta Tasse",es:"Tu Taza",it:"La Tua Tazza",pt:"Sua Xícara",ru:"Твоя чашка",ar:"فنجانك",zh:"你的咖啡杯",ja:"あなたのカップ",ko:"당신의 잔",hi:"आपका प्याला",nl:"Jouw Kopje",pl:"Twoja Filiżanka"},"hd_your_reading":{en:"Your Reading",tr:"Falın",de:"Deine Deutung",fr:"Ta Lecture",es:"Tu Lectura",it:"La Tua Lettura",pt:"Sua Leitura",ru:"Твоё гадание",ar:"قراءتك",zh:"你的解读",ja:"あなたの占い",ko:"당신의 리딩",hi:"आपका फलादेश",nl:"Jouw Lezing",pl:"Twój Odczyt"},"hd_add_six_frames":{en:"Add Your Six Frames",tr:"Altı Kareni Ekle",de:"Füge deine sechs Bilder hinzu",fr:"Ajoute tes six photos",es:"Añade tus seis fotos",it:"Aggiungi i tuoi sei scatti",pt:"Adicione seus seis quadros",ru:"Добавь шесть кадров",ar:"أضف لقطاتك الست",zh:"添加你的六张照片",ja:"6枚の写真を追加",ko:"여섯 장을 추가",hi:"अपने छह चित्र जोड़ें",nl:"Voeg je zes beelden toe",pl:"Dodaj sześć zdjęć"},"hd_how_photograph":{en:"How to Photograph",tr:"Nasıl Fotoğraflanır",de:"So fotografierst du",fr:"Comment photographier",es:"Cómo fotografiar",it:"Come fotografare",pt:"Como fotografar",ru:"Как фотографировать",ar:"كيفية التصوير",zh:"如何拍摄",ja:"撮影方法",ko:"촬영 방법",hi:"फोटो कैसे लें",nl:"Zo fotografeer je",pl:"Jak fotografować"},"cap_toward_light":{en:"Toward the light",tr:"Işığa doğru",de:"Zum Licht",fr:"Vers la lumière",es:"Hacia la luz",it:"Verso la luce",pt:"Em direção à luz",ru:"К свету",ar:"نحو الضوء",zh:"朝向光线",ja:"光に向けて",ko:"빛을 향해",hi:"रोशनी की ओर",nl:"Naar het licht",pl:"W stronę światła"},"cap_plate_symbols":{en:"The plate & symbols",tr:"Tabak ve semboller",de:"Der Teller & Symbole",fr:"La soucoupe et les symboles",es:"El plato y los símbolos",it:"Il piattino e i simboli",pt:"O pires e os símbolos",ru:"Блюдце и символы",ar:"الصحن والرموز",zh:"杯托与图案",ja:"受け皿と模様",ko:"받침과 상징",hi:"तश्तरी और प्रतीक",nl:"Het schoteltje en symbolen",pl:"Spodek i symbole"},"cap_topdown_interior":{en:"Top-down, interior clear",tr:"Yukarıdan, iç net",de:"Von oben, Inneres klar",fr:"Vue de dessus, intérieur net",es:"Desde arriba, interior nítido",it:"Dall'alto, interno nitido",pt:"De cima, interior nítido",ru:"Сверху, дно чётко",ar:"من الأعلى، الداخل واضح",zh:"俯拍，杯内清晰",ja:"真上から、内側くっきり",ko:"위에서, 내부 선명하게",hi:"ऊपर से, अंदर साफ",nl:"Van bovenaf, binnenkant scherp",pl:"Z góry, wnętrze wyraźne"},"cap_open_toward_light":{en:"Open, toward the light",tr:"Açık, ışığa doğru",de:"Offen, zum Licht",fr:"Ouverte, vers la lumière",es:"Abierta, hacia la luz",it:"Aperta, verso la luce",pt:"Aberta, em direção à luz",ru:"Открыто, к свету",ar:"مفتوح، نحو الضوء",zh:"打开，朝向光线",ja:"開いて、光に向けて",ko:"펼쳐서, 빛을 향해",hi:"खुला, रोशनी की ओर",nl:"Open, naar het licht",pl:"Otwarta, w stronę światła"},"cap_closeup_lines":{en:"Close-up, lines clear",tr:"Yakından, çizgiler net",de:"Nahaufnahme, Linien klar",fr:"Gros plan, lignes nettes",es:"Primer plano, líneas nítidas",it:"Primo piano, linee nitide",pt:"Close, linhas nítidas",ru:"Крупно, линии чётко",ar:"لقطة قريبة، الخطوط واضحة",zh:"特写，纹路清晰",ja:"接写、線くっきり",ko:"클로즈업, 손금 선명하게",hi:"पास से, रेखाएँ साफ",nl:"Close-up, lijnen duidelijk",pl:"Zbliżenie, linie wyraźne"},"btn_interpret_cup":{en:"Interpret my cup",tr:"Fincanımı yorumla",de:"Meine Tasse deuten",fr:"Interpréter ma tasse",es:"Interpreta mi taza",it:"Interpreta la mia tazza",pt:"Interpretar minha xícara",ru:"Растолковать чашку",ar:"فسّر فنجاني",zh:"解读我的咖啡杯",ja:"カップを占う",ko:"내 잔 해석하기",hi:"मेरा प्याला पढ़ें",nl:"Lees mijn kopje",pl:"Odczytaj moją filiżankę"},"btn_interpret_palms":{en:"Interpret my palms",tr:"Avuçlarımı yorumla",de:"Meine Hände deuten",fr:"Interpréter mes paumes",es:"Interpreta mis palmas",it:"Interpreta i miei palmi",pt:"Interpretar minhas mãos",ru:"Прочитать ладони",ar:"اقرأ كفّي",zh:"解读我的手掌",ja:"手のひらを占う",ko:"내 손금 해석하기",hi:"मेरी हथेलियाँ पढ़ें",nl:"Lees mijn handpalmen",pl:"Odczytaj moje dłonie"},"btn_read_agreement":{en:"Read the agreement",tr:"Sözleşmeyi oku",de:"Vereinbarung lesen",fr:"Lire l'accord",es:"Leer el acuerdo",it:"Leggi l'accordo",pt:"Ler o termo",ru:"Читать соглашение",ar:"اقرأ الاتفاقية",zh:"阅读协议",ja:"規約を読む",ko:"약관 읽기",hi:"अनुबंध पढ़ें",nl:"Lees de overeenkomst",pl:"Przeczytaj umowę"},"load_cup":{en:"Your cup is being read…",tr:"Fincanın okunuyor…",de:"Deine Tasse wird gelesen…",fr:"Ta tasse est lue…",es:"Se está leyendo tu taza…",it:"La tua tazza viene letta…",pt:"Sua xícara está sendo lida…",ru:"Твою чашку читают…",ar:"تتم قراءة فنجانك…",zh:"正在解读你的咖啡杯…",ja:"カップを読み解いています…",ko:"당신의 잔을 읽는 중…",hi:"आपका प्याला पढ़ा जा रहा है…",nl:"Je kopje wordt gelezen…",pl:"Twoja filiżanka jest odczytywana…"},"load_cup_sub":{en:"Ophan is consulting the galgalim — this can take a moment.",tr:"Ophan galgalime danışıyor — bu biraz sürebilir.",de:"Ophan befragt das Galgalim — das kann einen Moment dauern.",fr:"Ophan consulte le galgalim — cela peut prendre un instant.",es:"Ophan consulta al galgalim — esto puede tardar un momento.",it:"Ophan consulta il galgalim — può richiedere un momento.",pt:"Ophan está consultando o galgalim — isso pode levar um momento.",ru:"Ophan советуется с галгалим — это может занять мгновение.",ar:"يستشير أوفان الجَلجَليم — قد يستغرق هذا لحظة.",zh:"Ophan 正在请教 galgalim — 这可能需要片刻。",ja:"Ophan がガルガリムに問いかけています — 少々お待ちください。",ko:"Ophan이 갈갈림에게 묻고 있습니다 — 잠시 걸릴 수 있습니다.",hi:"Ophan गलगलीम से परामर्श कर रहा है — इसमें थोड़ा समय लग सकता है।",nl:"Ophan raadpleegt de galgalim — dit kan even duren.",pl:"Ophan konsultuje się z galgalim — to może chwilę potrwać."},"hd_your_palms":{en:"Your Palms",tr:"Avuçların",de:"Deine Hände",fr:"Tes Paumes",es:"Tus Palmas",it:"I Tuoi Palmi",pt:"Suas Mãos",ru:"Твои ладони",ar:"كفّاك",zh:"你的手掌",ja:"あなたの手のひら",ko:"당신의 손금",hi:"आपकी हथेलियाँ",nl:"Jouw Handpalmen",pl:"Twoje Dłonie"},"hd_palm_photos":{en:"Palm Photos",tr:"Avuç Fotoğrafları",de:"Handfotos",fr:"Photos des paumes",es:"Fotos de palmas",it:"Foto dei palmi",pt:"Fotos das mãos",ru:"Фото ладоней",ar:"صور الكفّين",zh:"手掌照片",ja:"手のひらの写真",ko:"손금 사진",hi:"हथेली की तस्वीरें",nl:"Handpalmfoto's",pl:"Zdjęcia dłoni"},"hd_six_frames":{en:"Six Frames",tr:"Altı Kare",de:"Sechs Bilder",fr:"Six photos",es:"Seis fotos",it:"Sei scatti",pt:"Seis quadros",ru:"Шесть кадров",ar:"ست لقطات",zh:"六张照片",ja:"6枚の写真",ko:"여섯 장",hi:"छह चित्र",nl:"Zes beelden",pl:"Sześć zdjęć"},"load_palms":{en:"Your palms are being read…",tr:"Avuçların okunuyor…",de:"Deine Hände werden gelesen…",fr:"Tes paumes sont lues…",es:"Se están leyendo tus palmas…",it:"I tuoi palmi vengono letti…",pt:"Suas mãos estão sendo lidas…",ru:"Твои ладони читают…",ar:"تتم قراءة كفّيك…",zh:"正在解读你的手掌…",ja:"手のひらを読み解いています…",ko:"당신의 손금을 읽는 중…",hi:"आपकी हथेलियाँ पढ़ी जा रही हैं…",nl:"Je handpalmen worden gelezen…",pl:"Twoje dłonie są odczytywane…"},"consent_notice":{en:"I have read and accept the privacy & consent notice, and allow Ophan to read my photos.",tr:"Gizlilik ve açık rıza metnini okudum, kabul ediyorum; Ophan'ın fotoğraflarımı okumasına izin veriyorum.",de:"Ich habe die Datenschutz- und Einwilligungserklärung gelesen und akzeptiere sie und erlaube Ophan, meine Fotos zu lesen.",fr:"J'ai lu et j'accepte l'avis de confidentialité et de consentement, et j'autorise Ophan à lire mes photos.",es:"He leído y acepto el aviso de privacidad y consentimiento, y permito que Ophan lea mis fotos.",it:"Ho letto e accetto l'informativa su privacy e consenso e autorizzo Ophan a leggere le mie foto.",pt:"Li e aceito o aviso de privacidade e consentimento e permito que Ophan leia minhas fotos.",ru:"Я прочитал(а) и принимаю уведомление о конфиденциальности и согласии и разрешаю Ophan читать мои фото.",ar:"لقد قرأت وأوافق على إشعار الخصوصية والموافقة، وأسمح لأوفان بقراءة صوري.",zh:"我已阅读并接受隐私与授权声明，允许 Ophan 解读我的照片。",ja:"プライバシーと同意に関する通知を読み、これに同意し、Ophan が私の写真を読むことを許可します。",ko:"개인정보 및 동의 고지를 읽고 동의하며, Ophan이 내 사진을 읽는 것을 허용합니다.",hi:"मैंने गोपनीयता व सहमति सूचना पढ़ ली है और स्वीकार करता/करती हूँ, और Ophan को अपनी तस्वीरें पढ़ने की अनुमति देता/देती हूँ।",nl:"Ik heb de privacy- en toestemmingsverklaring gelezen en geaccepteerd en sta Ophan toe mijn foto's te lezen.",pl:"Przeczytałem/am i akceptuję informację o prywatności i zgodzie oraz zezwalam Ophan na odczyt moich zdjęć."},"tip_photograph_cup":{en:"Turn the cup onto the saucer and let the grounds dry. Then capture six frames from these angles so Ophan can read the whole cup.",tr:"Fincanı tabağın üstüne kapat ve telveyi kurumaya bırak. Sonra bu açılardan altı kare çek ki Ophan tüm fincanı okuyabilsin.",de:"Stülpe die Tasse auf die Untertasse und lass den Satz trocknen. Nimm dann sechs Bilder aus diesen Winkeln auf, damit Ophan die ganze Tasse lesen kann.",fr:"Retourne la tasse sur la soucoupe et laisse le marc sécher. Prends ensuite six photos sous ces angles pour qu'Ophan puisse lire toute la tasse.",es:"Voltea la taza sobre el plato y deja secar los posos. Luego toma seis fotos desde estos ángulos para que Ophan pueda leer toda la taza.",it:"Capovolgi la tazza sul piattino e lascia asciugare i fondi. Poi scatta sei foto da queste angolazioni affinché Ophan possa leggere tutta la tazza.",pt:"Vire a xícara sobre o pires e deixe a borra secar. Depois capture seis fotos destes ângulos para que Ophan possa ler a xícara inteira.",ru:"Переверни чашку на блюдце и дай гуще подсохнуть. Затем сделай шесть кадров с этих ракурсов, чтобы Ophan прочитал всю чашку.",ar:"اقلب الفنجان على الصحن واترك التفل يجف. ثم التقط ست صور من هذه الزوايا ليتمكن أوفان من قراءة الفنجان كاملاً.",zh:"将咖啡杯倒扣在杯托上，让咖啡渣晾干。然后从这些角度拍摄六张照片，让 Ophan 解读整个杯子。",ja:"カップを受け皿にかぶせ、粉を乾かします。次にこれらの角度から6枚撮影すると、Ophan がカップ全体を読めます。",ko:"잔을 받침 위에 엎어 찌꺼기를 말리세요. 그런 다음 이 각도들에서 여섯 장을 찍으면 Ophan이 잔 전체를 읽을 수 있습니다.",hi:"प्याले को तश्तरी पर उल्टा रखें और तलछट सूखने दें। फिर इन कोणों से छह तस्वीरें लें ताकि Ophan पूरे प्याले को पढ़ सके।",nl:"Keer het kopje om op het schoteltje en laat het bezinksel drogen. Maak dan zes foto's vanuit deze hoeken zodat Ophan het hele kopje kan lezen.",pl:"Odwróć filiżankę na spodek i pozwól fusom wyschnąć. Następnie zrób sześć zdjęć pod tymi kątami, aby Ophan mógł odczytać całą filiżankę."},"tip_photograph_palm":{en:"Relax your open hand under good light so the lines show clearly. Capture your right hand first (three frames), then your left, so Ophan can read both palms.",tr:"Açık elini iyi ışıkta gevşet ki çizgiler net görünsün. Önce sağ elini (üç kare), sonra solunu çek ki Ophan iki avucu da okuyabilsin.",de:"Entspanne deine offene Hand bei gutem Licht, damit die Linien klar zu sehen sind. Nimm zuerst die rechte Hand auf (drei Bilder), dann die linke, damit Ophan beide Hände lesen kann.",fr:"Détends ta main ouverte sous une bonne lumière pour que les lignes ressortent nettement. Prends d'abord ta main droite (trois photos), puis la gauche, pour qu'Ophan puisse lire les deux paumes.",es:"Relaja tu mano abierta con buena luz para que las líneas se vean claras. Toma primero tu mano derecha (tres fotos), luego la izquierda, para que Ophan pueda leer ambas palmas.",it:"Rilassa la mano aperta con una buona luce affinché le linee risaltino. Fotografa prima la mano destra (tre scatti), poi la sinistra, così Ophan può leggere entrambi i palmi.",pt:"Relaxe a mão aberta sob boa luz para que as linhas apareçam nítidas. Fotografe primeiro a mão direita (três quadros), depois a esquerda, para Ophan ler as duas mãos.",ru:"Расслабь открытую ладонь при хорошем свете, чтобы линии были чёткими. Сначала сними правую руку (три кадра), затем левую, чтобы Ophan прочитал обе ладони.",ar:"أرخِ يدك المفتوحة تحت إضاءة جيدة لتظهر الخطوط بوضوح. صوّر يدك اليمنى أولاً (ثلاث لقطات) ثم اليسرى، ليقرأ أوفان كلتا الكفّين.",zh:"在良好光线下放松张开的手，让掌纹清晰显现。先拍右手（三张），再拍左手，让 Ophan 解读双手手掌。",ja:"良い光の下で開いた手をリラックスさせ、線がはっきり見えるようにします。まず右手を（3枚）、次に左手を撮ると、Ophan が両手を読めます。",ko:"좋은 조명 아래 손을 편하게 펴서 손금이 선명하게 보이도록 하세요. 오른손을 먼저(세 장), 그다음 왼손을 찍으면 Ophan이 양손을 읽을 수 있습니다.",hi:"अच्छी रोशनी में अपना खुला हाथ ढीला रखें ताकि रेखाएँ साफ दिखें। पहले दायाँ हाथ (तीन चित्र), फिर बायाँ लें, ताकि Ophan दोनों हथेलियाँ पढ़ सके।",nl:"Ontspan je open hand bij goed licht zodat de lijnen duidelijk zichtbaar zijn. Fotografeer eerst je rechterhand (drie beelden), dan je linker, zodat Ophan beide handpalmen kan lezen.",pl:"Rozluźnij otwartą dłoń w dobrym świetle, aby linie były wyraźne. Sfotografuj najpierw prawą dłoń (trzy zdjęcia), potem lewą, aby Ophan mógł odczytać obie dłonie."},"btn_apple":{en:"Continue with Apple",tr:"Apple ile devam et",de:"Mit Apple fortfahren",fr:"Continuer avec Apple",es:"Continuar con Apple",it:"Continua con Apple",pt:"Continuar com a Apple",ru:"Продолжить с Apple",ar:"المتابعة عبر Apple",zh:"使用 Apple 继续",ja:"Apple で続ける",ko:"Apple로 계속하기",hi:"Apple के साथ जारी रखें",nl:"Doorgaan met Apple",pl:"Kontynuuj z Apple"},"btn_google":{en:"Continue with Google",tr:"Google ile devam et",de:"Mit Google fortfahren",fr:"Continuer avec Google",es:"Continuar con Google",it:"Continua con Google",pt:"Continuar com o Google",ru:"Продолжить с Google",ar:"المتابعة عبر Google",zh:"使用 Google 继续",ja:"Google で続ける",ko:"Google로 계속하기",hi:"Google के साथ जारी रखें",nl:"Doorgaan met Google",pl:"Kontynuuj z Google"},"auth_signin_hint":{en:"Sign in, or create your account with email.",tr:"Giriş yap ya da e-posta ile hesabını oluştur.",de:"Melde dich an oder erstelle dein Konto mit E-Mail.",fr:"Connecte-toi ou crée ton compte par e-mail.",es:"Inicia sesión o crea tu cuenta con correo.",it:"Accedi o crea il tuo account con l'email.",pt:"Entre ou crie sua conta com e-mail.",ru:"Войдите или создайте аккаунт по эл. почте.",ar:"سجّل الدخول أو أنشئ حسابك بالبريد الإلكتروني.",zh:"登录，或用邮箱创建账户。",ja:"サインイン、またはメールでアカウントを作成。",ko:"로그인하거나 이메일로 계정을 만드세요.",hi:"साइन इन करें, या ईमेल से खाता बनाएँ।",nl:"Log in of maak je account met e-mail.",pl:"Zaloguj się lub utwórz konto e-mailem."}};
for(var _k in _ADD){var _e=_ADD[_k];EN[_k]=_e.en;for(var _lg in _e){if(_lg==='en')continue;(L[_lg]=L[_lg]||{})[_k]=_e[_lg];}}
  var _ADD2={"lbl_front":{en:"Front",tr:"Ön",de:"Vorne",fr:"Face",es:"Frente",it:"Fronte",pt:"Frente",ru:"Спереди",ar:"الأمام",zh:"正面",ja:"正面",ko:"앞면",hi:"सामने",nl:"Voorkant",pl:"Przód"},"lbl_right":{en:"Right",tr:"Sağ",de:"Rechts",fr:"Droite",es:"Derecha",it:"Destra",pt:"Direita",ru:"Справа",ar:"اليمين",zh:"右侧",ja:"右",ko:"오른쪽",hi:"दायाँ",nl:"Rechts",pl:"Prawa"},"lbl_left":{en:"Left",tr:"Sol",de:"Links",fr:"Gauche",es:"Izquierda",it:"Sinistra",pt:"Esquerda",ru:"Слева",ar:"اليسار",zh:"左侧",ja:"左",ko:"왼쪽",hi:"बायाँ",nl:"Links",pl:"Lewa"},"lbl_inside":{en:"Inside",tr:"İç",de:"Innen",fr:"Intérieur",es:"Interior",it:"Interno",pt:"Interior",ru:"Внутри",ar:"الداخل",zh:"内部",ja:"内側",ko:"안쪽",hi:"अंदर",nl:"Binnenkant",pl:"Wnętrze"},"lbl_saucer":{en:"Saucer",tr:"Tabak",de:"Untertasse",fr:"Soucoupe",es:"Plato",it:"Piattino",pt:"Pires",ru:"Блюдце",ar:"الصحن",zh:"杯托",ja:"受け皿",ko:"받침",hi:"तश्तरी",nl:"Schoteltje",pl:"Spodek"},"cap_quarter_turn":{en:"Quarter turn",tr:"Çeyrek çevir",de:"Vierteldrehung",fr:"Quart de tour",es:"Cuarto de giro",it:"Quarto di giro",pt:"Um quarto de volta",ru:"Поворот на четверть",ar:"ربع دورة",zh:"转四分之一",ja:"4分の1回転",ko:"4분의 1 회전",hi:"चौथाई घुमाव",nl:"Kwartslag",pl:"Ćwierć obrotu"},"cap_opposite_side":{en:"Opposite side",tr:"Karşı taraf",de:"Gegenüber",fr:"Côté opposé",es:"Lado opuesto",it:"Lato opposto",pt:"Lado oposto",ru:"Противоположная сторона",ar:"الجانب المقابل",zh:"对面",ja:"反対側",ko:"반대쪽",hi:"विपरीत ओर",nl:"Andere kant",pl:"Przeciwna strona"},"lbl_right_palm":{en:"Right Palm",tr:"Sağ Avuç",de:"Rechte Handfläche",fr:"Paume droite",es:"Palma derecha",it:"Palmo destro",pt:"Palma direita",ru:"Правая ладонь",ar:"الكف الأيمن",zh:"右手掌",ja:"右の手のひら",ko:"오른손 손바닥",hi:"दायीं हथेली",nl:"Rechterhandpalm",pl:"Prawa dłoń"},"lbl_left_palm":{en:"Left Palm",tr:"Sol Avuç",de:"Linke Handfläche",fr:"Paume gauche",es:"Palma izquierda",it:"Palmo sinistro",pt:"Palma esquerda",ru:"Левая ладонь",ar:"الكف الأيسر",zh:"左手掌",ja:"左の手のひら",ko:"왼손 손바닥",hi:"बायीं हथेली",nl:"Linkerhandpalm",pl:"Lewa dłoń"},"lbl_right_hand":{en:"Right Hand",tr:"Sağ El",de:"Rechte Hand",fr:"Main droite",es:"Mano derecha",it:"Mano destra",pt:"Mão direita",ru:"Правая рука",ar:"اليد اليمنى",zh:"右手",ja:"右手",ko:"오른손",hi:"दायाँ हाथ",nl:"Rechterhand",pl:"Prawa ręka"},"lbl_left_hand":{en:"Left Hand",tr:"Sol El",de:"Linke Hand",fr:"Main gauche",es:"Mano izquierda",it:"Mano sinistra",pt:"Mão esquerda",ru:"Левая рука",ar:"اليد اليسرى",zh:"左手",ja:"左手",ko:"왼손",hi:"बायाँ हाथ",nl:"Linkerhand",pl:"Lewa ręka"},"lbl_right_lines":{en:"Right Lines",tr:"Sağ Çizgiler",de:"Rechte Linien",fr:"Lignes droites",es:"Líneas derechas",it:"Linee destre",pt:"Linhas direitas",ru:"Правые линии",ar:"خطوط اليمين",zh:"右手纹路",ja:"右の手相",ko:"오른손 손금",hi:"दायीं रेखाएँ",nl:"Rechter lijnen",pl:"Prawe linie"},"lbl_left_lines":{en:"Left Lines",tr:"Sol Çizgiler",de:"Linke Linien",fr:"Lignes gauches",es:"Líneas izquierdas",it:"Linee sinistre",pt:"Linhas esquerdas",ru:"Левые линии",ar:"خطوط اليسار",zh:"左手纹路",ja:"左の手相",ko:"왼손 손금",hi:"बायीं रेखाएँ",nl:"Linker lijnen",pl:"Lewe linie"},"cap_fingers_spread":{en:"Full, fingers spread",tr:"Açık, parmaklar ayrık",de:"Ganz, Finger gespreizt",fr:"Entière, doigts écartés",es:"Completa, dedos separados",it:"Intera, dita divaricate",pt:"Inteira, dedos abertos",ru:"Целиком, пальцы врозь",ar:"كاملة، الأصابع مفرودة",zh:"张开，手指分开",ja:"全体、指を広げて",ko:"활짝, 손가락 펴서",hi:"पूरा, उंगलियाँ फैलाकर",nl:"Volledig, vingers gespreid",pl:"Cała, palce rozłożone"},"hd_add_palm_photos":{en:"Add Your Palm Photos",tr:"Avuç Fotoğraflarını Ekle",de:"Füge deine Handfotos hinzu",fr:"Ajoute tes photos de paumes",es:"Añade tus fotos de palmas",it:"Aggiungi le foto dei palmi",pt:"Adicione suas fotos das mãos",ru:"Добавь фото ладоней",ar:"أضف صور كفّيك",zh:"添加你的手掌照片",ja:"手のひらの写真を追加",ko:"손금 사진을 추가",hi:"अपनी हथेली की तस्वीरें जोड़ें",nl:"Voeg je handpalmfoto's toe",pl:"Dodaj zdjęcia dłoni"},"cnt_tap_add_photos":{en:"Tap to add photos",tr:"Fotoğraf eklemek için dokun",de:"Zum Hinzufügen tippen",fr:"Touche pour ajouter des photos",es:"Toca para añadir fotos",it:"Tocca per aggiungere foto",pt:"Toque para adicionar fotos",ru:"Нажми, чтобы добавить фото",ar:"انقر لإضافة الصور",zh:"点按添加照片",ja:"タップして写真を追加",ko:"눌러서 사진 추가",hi:"फोटो जोड़ने के लिए टैप करें",nl:"Tik om foto's toe te voegen",pl:"Dotknij, aby dodać zdjęcia"},"cnt_right_hand_first":{en:"Right hand first",tr:"Önce sağ el",de:"Zuerst rechte Hand",fr:"Main droite d'abord",es:"Primero la mano derecha",it:"Prima la mano destra",pt:"Primeiro a mão direita",ru:"Сначала правая рука",ar:"اليد اليمنى أولاً",zh:"先拍右手",ja:"まず右手",ko:"오른손 먼저",hi:"पहले दायाँ हाथ",nl:"Eerst rechterhand",pl:"Najpierw prawa ręka"},"hd_daily_horo":{en:"Daily Horoscopes",tr:"Günlük Burçlar",de:"Tägliche Horoskope",fr:"Horoscopes du jour",es:"Horóscopos diarios",it:"Oroscopi giornalieri",pt:"Horóscopos diários",ru:"Гороскопы на день",ar:"الأبراج اليومية",zh:"每日星座运势",ja:"今日の星占い",ko:"오늘의 운세",hi:"दैनिक राशिफल",nl:"Dagelijkse horoscopen",pl:"Horoskopy dzienne"},"hd_weekly_horo":{en:"Weekly Horoscopes",tr:"Haftalık Burçlar",de:"Wöchentliche Horoskope",fr:"Horoscopes de la semaine",es:"Horóscopos semanales",it:"Oroscopi settimanali",pt:"Horóscopos semanais",ru:"Гороскопы на неделю",ar:"الأبراج الأسبوعية",zh:"每周星座运势",ja:"今週の星占い",ko:"주간 운세",hi:"साप्ताहिक राशिफल",nl:"Wekelijkse horoscopen",pl:"Horoskopy tygodniowe"},"hd_monthly_horo":{en:"Monthly Horoscopes",tr:"Aylık Burçlar",de:"Monatliche Horoskope",fr:"Horoscopes du mois",es:"Horóscopos mensuales",it:"Oroscopi mensili",pt:"Horóscopos mensais",ru:"Гороскопы на месяц",ar:"الأبراج الشهرية",zh:"每月星座运势",ja:"今月の星占い",ko:"월간 운세",hi:"मासिक राशिफल",nl:"Maandelijkse horoscopen",pl:"Horoskopy miesięczne"},"ph_name_surname":{en:"Name & surname",tr:"Ad & soyad",de:"Vor- & Nachname",fr:"Nom & prénom",es:"Nombre y apellido",it:"Nome e cognome",pt:"Nome e sobrenome",ru:"Имя и фамилия",ar:"الاسم واللقب",zh:"姓名",ja:"氏名",ko:"이름과 성",hi:"नाम व उपनाम",nl:"Voor- & achternaam",pl:"Imię i nazwisko"},"lbl_optional":{en:"optional",tr:"isteğe bağlı",de:"optional",fr:"facultatif",es:"opcional",it:"facoltativo",pt:"opcional",ru:"необязательно",ar:"اختياري",zh:"可选",ja:"任意",ko:"선택 사항",hi:"वैकल्पिक",nl:"optioneel",pl:"opcjonalne"},"ph_eg_city":{en:"e.g. Los Angeles",tr:"örn. Los Angeles",de:"z. B. Los Angeles",fr:"p. ex. Los Angeles",es:"p. ej. Los Ángeles",it:"es. Los Angeles",pt:"ex. Los Angeles",ru:"напр. Лос-Анджелес",ar:"مثال: لوس أنجلوس",zh:"例如 洛杉矶",ja:"例：ロサンゼルス",ko:"예: 로스앤젤레스",hi:"उदा. लॉस एंजिल्स",nl:"bijv. Los Angeles",pl:"np. Los Angeles"},"el_fire":{en:"Fire",tr:"Ateş",de:"Feuer",fr:"Feu",es:"Fuego",it:"Fuoco",pt:"Fogo",ru:"Огонь",ar:"نار",zh:"火",ja:"火",ko:"불",hi:"अग्नि",nl:"Vuur",pl:"Ogień"},"el_earth":{en:"Earth",tr:"Toprak",de:"Erde",fr:"Terre",es:"Tierra",it:"Terra",pt:"Terra",ru:"Земля",ar:"تراب",zh:"土",ja:"地",ko:"흙",hi:"पृथ्वी",nl:"Aarde",pl:"Ziemia"},"el_air":{en:"Air",tr:"Hava",de:"Luft",fr:"Air",es:"Aire",it:"Aria",pt:"Ar",ru:"Воздух",ar:"هواء",zh:"风",ja:"風",ko:"공기",hi:"वायु",nl:"Lucht",pl:"Powietrze"},"el_water":{en:"Water",tr:"Su",de:"Wasser",fr:"Eau",es:"Agua",it:"Acqua",pt:"Água",ru:"Вода",ar:"ماء",zh:"水",ja:"水",ko:"물",hi:"जल",nl:"Water",pl:"Woda"},"sign_aries":{en:"Aries",tr:"Koç",de:"Widder",fr:"Bélier",es:"Aries",it:"Ariete",pt:"Áries",ru:"Овен",ar:"الحمل",zh:"白羊座",ja:"牡羊座",ko:"양자리",hi:"मेष",nl:"Ram",pl:"Baran"},"sign_taurus":{en:"Taurus",tr:"Boğa",de:"Stier",fr:"Taureau",es:"Tauro",it:"Toro",pt:"Touro",ru:"Телец",ar:"الثور",zh:"金牛座",ja:"牡牛座",ko:"황소자리",hi:"वृषभ",nl:"Stier",pl:"Byk"},"sign_gemini":{en:"Gemini",tr:"İkizler",de:"Zwillinge",fr:"Gémeaux",es:"Géminis",it:"Gemelli",pt:"Gêmeos",ru:"Близнецы",ar:"الجوزاء",zh:"双子座",ja:"双子座",ko:"쌍둥이자리",hi:"मिथुन",nl:"Tweelingen",pl:"Bliźnięta"},"sign_cancer":{en:"Cancer",tr:"Yengeç",de:"Krebs",fr:"Cancer",es:"Cáncer",it:"Cancro",pt:"Câncer",ru:"Рак",ar:"السرطان",zh:"巨蟹座",ja:"蟹座",ko:"게자리",hi:"कर्क",nl:"Kreeft",pl:"Rak"},"sign_leo":{en:"Leo",tr:"Aslan",de:"Löwe",fr:"Lion",es:"Leo",it:"Leone",pt:"Leão",ru:"Лев",ar:"الأسد",zh:"狮子座",ja:"獅子座",ko:"사자자리",hi:"सिंह",nl:"Leeuw",pl:"Lew"},"sign_virgo":{en:"Virgo",tr:"Başak",de:"Jungfrau",fr:"Vierge",es:"Virgo",it:"Vergine",pt:"Virgem",ru:"Дева",ar:"العذراء",zh:"处女座",ja:"乙女座",ko:"처녀자리",hi:"कन्या",nl:"Maagd",pl:"Panna"},"sign_libra":{en:"Libra",tr:"Terazi",de:"Waage",fr:"Balance",es:"Libra",it:"Bilancia",pt:"Libra",ru:"Весы",ar:"الميزان",zh:"天秤座",ja:"天秤座",ko:"천칭자리",hi:"तुला",nl:"Weegschaal",pl:"Waga"},"sign_scorpio":{en:"Scorpio",tr:"Akrep",de:"Skorpion",fr:"Scorpion",es:"Escorpio",it:"Scorpione",pt:"Escorpião",ru:"Скорпион",ar:"العقرب",zh:"天蝎座",ja:"蠍座",ko:"전갈자리",hi:"वृश्चिक",nl:"Schorpioen",pl:"Skorpion"},"sign_sagittarius":{en:"Sagittarius",tr:"Yay",de:"Schütze",fr:"Sagittaire",es:"Sagitario",it:"Sagittario",pt:"Sagitário",ru:"Стрелец",ar:"القوس",zh:"射手座",ja:"射手座",ko:"궁수자리",hi:"धनु",nl:"Boogschutter",pl:"Strzelec"},"sign_capricorn":{en:"Capricorn",tr:"Oğlak",de:"Steinbock",fr:"Capricorne",es:"Capricornio",it:"Capricorno",pt:"Capricórnio",ru:"Козерог",ar:"الجدي",zh:"摩羯座",ja:"山羊座",ko:"염소자리",hi:"मकर",nl:"Steenbok",pl:"Koziorożec"},"sign_aquarius":{en:"Aquarius",tr:"Kova",de:"Wassermann",fr:"Verseau",es:"Acuario",it:"Acquario",pt:"Aquário",ru:"Водолей",ar:"الدلو",zh:"水瓶座",ja:"水瓶座",ko:"물병자리",hi:"कुंभ",nl:"Waterman",pl:"Wodnik"},"sign_pisces":{en:"Pisces",tr:"Balık",de:"Fische",fr:"Poissons",es:"Piscis",it:"Pesci",pt:"Peixes",ru:"Рыбы",ar:"الحوت",zh:"双鱼座",ja:"魚座",ko:"물고기자리",hi:"मीन",nl:"Vissen",pl:"Ryby"},"trait_fire":{en:"Energetic, brave, a natural-born leader, and full of passion.",tr:"Enerjik, cesur, doğuştan lider ve tutku dolu.",de:"Energisch, mutig, geborener Anführer und voller Leidenschaft.",fr:"Énergique, courageux, leader-né et plein de passion.",es:"Enérgico, valiente, líder nato y lleno de pasión.",it:"Energico, coraggioso, leader nato e pieno di passione.",pt:"Enérgico, corajoso, líder nato e cheio de paixão.",ru:"Энергичный, смелый, прирождённый лидер, полный страсти.",ar:"نشيط، شجاع، قائد بالفطرة، ومفعم بالشغف.",zh:"充满活力、勇敢、天生的领导者，热情洋溢。",ja:"エネルギッシュで勇敢、生まれながらのリーダーで情熱にあふれる。",ko:"활기차고 용감하며 타고난 리더이자 열정으로 가득함.",hi:"ऊर्जावान, बहादुर, जन्मजात नेता और जोश से भरपूर।",nl:"Energiek, moedig, een geboren leider en vol passie.",pl:"Energiczny, odważny, urodzony przywódca i pełen pasji."},"trait_earth":{en:"Calm, grounded, reliable, and endlessly patient.",tr:"Sakin, sağlam, güvenilir ve sonsuz sabırlı.",de:"Ruhig, geerdet, verlässlich und unendlich geduldig.",fr:"Calme, ancré, fiable et infiniment patient.",es:"Tranquilo, con los pies en la tierra, fiable e infinitamente paciente.",it:"Calmo, concreto, affidabile e infinitamente paziente.",pt:"Calmo, centrado, confiável e infinitamente paciente.",ru:"Спокойный, надёжный, основательный и бесконечно терпеливый.",ar:"هادئ، متزن، جدير بالثقة، وصبور بلا حدود.",zh:"沉稳、务实、可靠，且极有耐心。",ja:"穏やかで地に足がつき、信頼でき、限りなく忍耐強い。",ko:"차분하고 안정적이며 믿음직하고 한없이 인내심이 있음.",hi:"शांत, स्थिर, भरोसेमंद और असीम धैर्यवान।",nl:"Kalm, geaard, betrouwbaar en eindeloos geduldig.",pl:"Spokojny, stabilny, niezawodny i niezmiernie cierpliwy."},"trait_air":{en:"Social, sharp-minded, expressive, and outgoing.",tr:"Sosyal, keskin zekâlı, ifade gücü yüksek ve dışa dönük.",de:"Gesellig, scharfsinnig, ausdrucksstark und aufgeschlossen.",fr:"Sociable, à l'esprit vif, expressif et ouvert.",es:"Sociable, perspicaz, expresivo y extrovertido.",it:"Socievole, dalla mente acuta, espressivo ed estroverso.",pt:"Sociável, perspicaz, expressivo e extrovertido.",ru:"Общительный, остроумный, выразительный и открытый.",ar:"اجتماعي، حاد الذهن، معبّر، ومنفتح.",zh:"善于社交、思维敏捷、善于表达、外向。",ja:"社交的で頭が切れ、表現力豊かで外向的。",ko:"사교적이고 명석하며 표현력이 풍부하고 외향적임.",hi:"मिलनसार, तीव्र बुद्धि, अभिव्यक्तिपूर्ण और बहिर्मुखी।",nl:"Sociaal, scherpzinnig, expressief en extravert.",pl:"Towarzyski, bystry, ekspresyjny i otwarty."},"trait_water":{en:"Emotional, intuitive, tender, and full of deep empathy.",tr:"Duygusal, sezgisel, şefkatli ve derin empati dolu.",de:"Emotional, intuitiv, zärtlich und voller tiefer Empathie.",fr:"Émotif, intuitif, tendre et plein d'une profonde empathie.",es:"Emocional, intuitivo, tierno y lleno de profunda empatía.",it:"Emotivo, intuitivo, tenero e pieno di profonda empatia.",pt:"Emocional, intuitivo, terno e cheio de profunda empatia.",ru:"Эмоциональный, интуитивный, нежный и полный глубокого сочувствия.",ar:"عاطفي، حدسي، حنون، ومفعم بتعاطف عميق.",zh:"感性、直觉敏锐、温柔，充满深切的同理心。",ja:"感情豊かで直感的、優しく、深い共感に満ちている。",ko:"감성적이고 직관적이며 다정하고 깊은 공감으로 가득함.",hi:"भावुक, सहज-बोध वाला, कोमल और गहरी सहानुभूति से भरा।",nl:"Emotioneel, intuïtief, teder en vol diepe empathie.",pl:"Emocjonalny, intuicyjny, czuły i pełen głębokiej empatii."}};
  for(var _k2 in _ADD2){var _e2=_ADD2[_k2];EN[_k2]=_e2.en;for(var _lg2 in _e2){if(_lg2==='en')continue;(L[_lg2]=L[_lg2]||{})[_k2]=_e2[_lg2];}}
  var _ADD3={"help_scroll_nav":{en:"This app has a scroll-based layout: as you scroll down you reach each section of the menu in turn. If there is a section you want to go to directly, pick it from the menu to jump straight to that page.",tr:"Uygulama menüsü kaydırmalı bir yapıya sahiptir; aşağı indikçe sırayla menüdeki başlıklara ulaşabilirsiniz. Doğrudan gitmek istediğiniz bir başlık varsa menüden seçip ilgili sayfaya inebilirsiniz.",de:"Diese App hat ein scrollbasiertes Layout: Beim Nach-unten-Scrollen erreichst du nacheinander die einzelnen Menübereiche. Möchtest du direkt zu einem Bereich, wähle ihn im Menü, um sofort zu dieser Seite zu springen.",fr:"Cette application a une mise en page basée sur le défilement : en faisant défiler vers le bas, vous atteignez tour à tour chaque rubrique du menu. Si vous souhaitez aller directement à une rubrique, sélectionnez-la dans le menu pour accéder à cette page.",es:"Esta app tiene un diseño basado en el desplazamiento: al desplazarte hacia abajo llegas a cada sección del menú por orden. Si quieres ir directamente a una sección, selecciónala en el menú para saltar a esa página.",it:"Questa app ha un layout basato sullo scorrimento: scorrendo verso il basso raggiungi una dopo l'altra le sezioni del menu. Se vuoi andare direttamente a una sezione, selezionala dal menu per passare subito a quella pagina.",pt:"Este app tem um layout baseado em rolagem: ao rolar para baixo você alcança cada seção do menu em ordem. Se quiser ir direto a uma seção, selecione-a no menu para ir direto para essa página.",ru:"У приложения прокручиваемая структура: листая вниз, вы по очереди доходите до каждого раздела меню. Если хотите сразу перейти к нужному разделу, выберите его в меню, чтобы попасть на эту страницу.",ar:"يعتمد تصميم التطبيق على التمرير: عند التمرير للأسفل تصل إلى كل قسم من أقسام القائمة تباعًا. وإذا أردت الانتقال مباشرة إلى قسم معيّن، فاختره من القائمة للانتقال إلى تلك الصفحة.",zh:"本应用采用滚动式布局：向下滚动即可依次到达菜单中的各个板块。若想直接前往某个板块，从菜单中选择即可跳转到对应页面。",ja:"このアプリはスクロール型の構成です。下にスクロールすると、メニューの各項目に順番にたどり着きます。直接行きたい項目があれば、メニューから選ぶとそのページへ移動できます。",ko:"이 앱은 스크롤 기반 구성입니다. 아래로 스크롤하면 메뉴의 각 항목에 차례로 도달합니다. 바로 가고 싶은 항목이 있으면 메뉴에서 선택해 해당 페이지로 이동할 수 있습니다.",hi:"इस ऐप का लेआउट स्क्रॉल-आधारित है: नीचे स्क्रॉल करते हुए आप मेनू के हर भाग तक क्रम से पहुँचते हैं। यदि किसी भाग पर सीधे जाना चाहें, तो उसे मेनू से चुनकर उस पृष्ठ पर जा सकते हैं।",nl:"Deze app heeft een scrollende opzet: terwijl je omlaag scrolt, bereik je één voor één de onderdelen van het menu. Wil je direct naar een onderdeel, kies het dan in het menu om meteen naar die pagina te gaan.",pl:"Ta aplikacja ma układ oparty na przewijaniu: przewijając w dół, docierasz kolejno do każdej sekcji menu. Jeśli chcesz przejść bezpośrednio do jakiejś sekcji, wybierz ją z menu, aby od razu przejść na tę stronę."}};
  for(var _k3 in _ADD3){var _e3=_ADD3[_k3];EN[_k3]=_e3.en;for(var _lg3 in _e3){if(_lg3==='en')continue;(L[_lg3]=L[_lg3]||{})[_k3]=_e3[_lg3];}}
  var _ADD4={"read_palmistry":{en:"Palmistry Reading",tr:"El Falı",de:"Handlesen",fr:"Lecture des lignes de la main",es:"Lectura de la mano",it:"Lettura della mano",pt:"Leitura da mão",ru:"Хиромантия",ar:"قراءة الكف",zh:"手相解读",ja:"手相占い",ko:"손금 보기",hi:"हस्तरेखा वाचन",nl:"Handlezen",pl:"Chiromancja"},"cue_scroll_all":{en:"Scroll down to see all fortunes",tr:"Bütün falları görmek için aşağı kaydırın",de:"Scrolle nach unten, um alle Wahrsagungen zu sehen",fr:"Faites défiler pour voir toutes les divinations",es:"Desplázate para ver todas las lecturas",it:"Scorri per vedere tutte le letture",pt:"Role para ver todas as leituras",ru:"Прокрутите вниз, чтобы увидеть все гадания",ar:"مرّر لأسفل لرؤية جميع أنواع القراءة",zh:"向下滚动查看所有占卜",ja:"下にスクロールしてすべての占いを見る",ko:"아래로 스크롤하여 모든 운세 보기",hi:"सभी भविष्यवाणियाँ देखने के लिए नीचे स्क्रॉल करें",nl:"Scroll omlaag om alle waarzeggingen te zien",pl:"Przewiń w dół, aby zobaczyć wszystkie wróżby"},"btn_back_top":{en:"Back to the top",tr:"En başa dönmek için bas",de:"Zurück nach oben",fr:"Retour en haut",es:"Volver arriba",it:"Torna su",pt:"Voltar ao topo",ru:"Наверх",ar:"العودة إلى الأعلى",zh:"返回顶部",ja:"トップに戻る",ko:"맨 위로",hi:"शुरुआत पर वापस जाएँ",nl:"Terug naar boven",pl:"Powrót na górę"}};
  for(var _k4 in _ADD4){var _e4=_ADD4[_k4];EN[_k4]=_e4.en;for(var _lg4 in _e4){if(_lg4==='en')continue;(L[_lg4]=L[_lg4]||{})[_k4]=_e4[_lg4];}}
  var _ADD5={
"nav_numerology":{en:"Numerology",tr:"Numeroloji",de:"Numerologie",fr:"Numérologie",es:"Numerología",it:"Numerologia",pt:"Numerologia",ru:"Нумерология",ar:"علم الأعداد",zh:"数字学",ja:"数秘術",ko:"수비학",hi:"अंक ज्योतिष",nl:"Numerologie",pl:"Numerologia"},
"big_numerology":{en:"Numerology",tr:"Numeroloji",de:"Numerologie",fr:"Numérologie",es:"Numerología",it:"Numerologia",pt:"Numerologia",ru:"Нумерология",ar:"علم الأعداد",zh:"数字学",ja:"数秘術",ko:"수비학",hi:"अंक ज्योतिष",nl:"Numerologie",pl:"Numerologia"},
"cta_numerology":{en:"Decode the cipher in your name",tr:"İsminin şifresini çöz",de:"Entschlüssle den Code deines Namens",fr:"Décryptez le code de votre nom",es:"Descifra el código de tu nombre",it:"Decifra il codice del tuo nome",pt:"Decifre o código do seu nome",ru:"Расшифруй код своего имени",ar:"فُكّ شيفرة اسمك",zh:"破解你名字的密码",ja:"名前の暗号を解き明かす",ko:"이름에 담긴 암호를 풀다",hi:"अपने नाम का रहस्य खोलें",nl:"Ontcijfer de code van je naam",pl:"Odczytaj szyfr swojego imienia"},
"lead_numerology":{en:"Numerology is a spiritual map that deciphers the cosmic frequencies in your birth date and name\u2014the hidden language of the universe whispered through numbers. Ophanark illuminates the cipher of your life map for you through the mathematics of numbers.",tr:"Numeroloji, evrenin gizli dilinin sayılarla fısıldandığı, doğum tarihin ve adındaki kozmik frekansları çözen ruhsal bir haritadır. Ophanark yaşam haritanın şifresini rakamların matematiğiyle senin için aydınlatıyor."},
"tag_numerology":{en:"Every turn in the universe is a frequency; the Divine Galgalim turn to calculate for you the geometric vibrations behind your name and birth date.",tr:"Evrendeki her dönüş bir frekanstır; İlahi Çarklar, adının ve doğum tarihinin arkasındaki geometrik titreşimleri senin için hesaplamak üzere dönüyor."}
};
  for(var _k5 in _ADD5){var _e5=_ADD5[_k5];EN[_k5]=_e5.en;for(var _lg5 in _e5){if(_lg5==='en')continue;(L[_lg5]=L[_lg5]||{})[_k5]=_e5[_lg5];}}
  var _ADD6={
"nav_starname":{en:"Star Name",tr:"Yıldızname",de:"Sternendeutung",fr:"Nom d'étoile",es:"Nombre estelar",it:"Nome stellare",pt:"Nome estelar",ru:"Звёздное имя",ar:"اسم النجم",zh:"星名",ja:"星名占い",ko:"별 이름",hi:"तारा नाम",nl:"Sterrennaam",pl:"Imię gwiazdy"},
"big_starname":{en:"Star Name",tr:"Yıldızname",de:"Sternendeutung",fr:"Nom d'étoile",es:"Nombre estelar",it:"Nome stellare",pt:"Nome estelar",ru:"Звёздное имя",ar:"اسم النجم",zh:"星名",ja:"星名占い",ko:"별 이름",hi:"तारा नाम",nl:"Sterrennaam",pl:"Imię gwiazdy"},
"cta_starname":{en:"Find my star",tr:"Yıldızımı bul"},
"lead_starname":{en:"Yıldızname is an ancient art of the Ottoman-Islamic tradition: the letters of your name and your mother's name turn into numbers through ebced calculation, and that number reveals the star and planet that govern you. Ophanark reads the story of that star for you.",tr:"Yıldızname, Osmanlı-İslam geleneğinin kadim bir ilmidir: adının ve annenin adının harfleri ebced hesabıyla sayıya döner, bu sayı seni yöneten yıldızı ve gezegeni açığa çıkarır. Ophanark bu yıldızın hikâyesini senin için okur."},
"tag_starname":{en:"Every letter is a number, every number a star; the Divine Galgalim turn to calculate for you the sky behind your name.",tr:"Her harf bir sayı, her sayı bir yıldızdır; İlahi Çarklar adının ardındaki göğü senin için hesaplamak üzere döner."}
};
  for(var _k6 in _ADD6){var _e6=_ADD6[_k6];EN[_k6]=_e6.en;for(var _lg6 in _e6){if(_lg6==='en')continue;(L[_lg6]=L[_lg6]||{})[_k6]=_e6[_lg6];}}
  var _ADD7={
"sub_starname":{en:"ebced calculation",tr:"ebced hesabı",de:"Ebced-Berechnung",fr:"calcul ebced",es:"cálculo ebced",it:"calcolo ebced",pt:"cálculo ebced",ru:"расчёт эбджед",ar:"حساب الأبجد",zh:"艾卜杰德计算",ja:"アブジャド計算",ko:"에브젣 계산",hi:"अब्जद गणना",nl:"ebced-berekening",pl:"obliczenie ebced"}
};
  for(var _k7 in _ADD7){var _e7=_ADD7[_k7];EN[_k7]=_e7.en;for(var _lg7 in _e7){if(_lg7==='en')continue;(L[_lg7]=L[_lg7]||{})[_k7]=_e7[_lg7];}}
  var REV = {};
  for (var _id in EN) { if (EN.hasOwnProperty(_id)) REV[EN[_id].trim()] = _id; }

  function get(k, def) { try { return localStorage.getItem(k) || def; } catch (e) { return def; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function getTheme() { return get('oph_theme', 'light'); }
  function applyTheme(t) {
    if (t === 'dark') d.documentElement.setAttribute('data-theme', 'dark');
    else d.documentElement.removeAttribute('data-theme');
  }
  function setTheme(t) { set('oph_theme', t); applyTheme(t); }

  function getLang() {
    try { var m=/[?&]lang=([a-z]{2})/.exec(w.location.search); if(m){ var u=m[1];
      if('en tr de fr es it pt ru ar zh ja ko hi nl pl'.indexOf(u)>=0){ set('oph_lang',u); return u; } } } catch(e){}
    return get('oph_lang', 'tr');
  }
  function setLang(lang) { set('oph_lang', lang); w.location.reload(); }

  function firstTextNode(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3 && n.nodeValue && n.nodeValue.trim()) return n;
    }
    return null;
  }

  var SEL = 'nav a,.backlink a,.brandmini,.big,.lead,.sub,.cta,.go,.continue,.cardname,.cap,.fancy,.herotag,' +
    '#cue,h1,h2,h3,button,label,.set-label,.foot-strip,.opt,option,.hint,.note,p';

  function translate(root, lang) {
    var map = L[lang]; if (!map) return;
    // 1) every text node anywhere (in-dictionary strings), skipping script/style
    try {
      var w = d.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), tn, nodes = [];
      while ((tn = w.nextNode())) nodes.push(tn);
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j], p = n.parentNode;
        if (p && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName)) continue;
        var key = (n.nodeValue || '').trim();
        if (!key) continue;
        var id = REV[key];
        if (id && map[id]) n.nodeValue = n.nodeValue.replace(key, map[id]);
      }
    } catch (e) {
      var els = root.querySelectorAll(SEL);
      for (var i = 0; i < els.length; i++) { var el = els[i]; var t = firstTextNode(el); if (!t) continue; var k = t.nodeValue.trim(); var ii = REV[k]; if (ii && map[ii]) t.nodeValue = t.nodeValue.replace(k, map[ii]); }
    }
    // 2) translatable attributes (placeholder / title / aria-label / value on buttons)
    try {
      var ae = root.querySelectorAll('[placeholder],[title],[aria-label]');
      for (var a = 0; a < ae.length; a++) {
        var e2 = ae[a], attrs = ['placeholder', 'title', 'aria-label'];
        for (var b = 0; b < attrs.length; b++) {
          var v = e2.getAttribute(attrs[b]); if (!v) continue;
          var kk = v.trim(), di = REV[kk];
          if (di && map[di]) e2.setAttribute(attrs[b], v.replace(kk, map[di]));
        }
      }
    } catch (e) {}
  }

  var _langObs = null;
  var _LOCALE={tr:'tr_TR',en:'en_US',de:'de_DE',fr:'fr_FR',es:'es_ES',it:'it_IT',pt:'pt_PT',ru:'ru_RU',ar:'ar_AR',zh:'zh_CN',ja:'ja_JP',ko:'ko_KR',hi:'hi_IN',nl:'nl_NL',pl:'pl_PL'};
  function updateSeoForLang(lang){ try{
    var base=w.location.origin+w.location.pathname;
    var url=(lang && lang!=='tr') ? base+'?lang='+lang : base;
    var c=d.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href',url);
    var ou=d.querySelector('meta[property="og:url"]'); if(ou) ou.setAttribute('content',url);
    var ol=d.querySelector('meta[property="og:locale"]'); if(ol) ol.setAttribute('content', _LOCALE[lang]||'tr_TR');
  }catch(e){} }
  function applyLang(lang, root) {
    root = root || d.body;
    d.documentElement.setAttribute('lang', lang);
    d.documentElement.setAttribute('dir', RTL[lang] ? 'rtl' : 'ltr');
    updateSeoForLang(lang);
    if (lang !== 'en' && root) {
      translate(root, lang);
      // re-translate content added dynamically after boot (readings, results, etc.)
      if (_langObs) { try { _langObs.disconnect(); } catch (e) {} }
      try {
        var pending = false;
        _langObs = new MutationObserver(function () {
          if (pending) return; pending = true;
          (window.requestAnimationFrame || setTimeout)(function () { pending = false; translate(d.body, lang); }, 0);
        });
        _langObs.observe(d.body, { childList: true, subtree: true, characterData: true });
      } catch (e) {}
    }
  }

  // translate a known English UI string into the current language (dynamic messages)
  function tByText(enText) {
    var lang = getLang(); if (lang === 'en') return enText;
    var id = REV[String(enText).trim()]; var map = L[lang];
    return (id && map && map[id]) || enText;
  }
  // translate by string id into the current language
  function tById(id) {
    var lang = getLang(); if (lang === 'en') return EN[id] || id;
    var map = L[lang]; return (map && map[id]) || EN[id] || id;
  }
  function langName(code) {
    for (var i = 0; i < LABELS.length; i++) if (LABELS[i][0] === code) return LABELS[i][1];
    return code;
  }

  // App-wide readability + dark-mode override (injected once, applies to every page)
  function injectScale() {
    if (d.getElementById('oph-scale')) return;
    var css = ''
      + '#spiral{display:none !important;}'
      + 'html[data-theme="dark"]{--bg:#121216 !important;--ink:#ffffff !important;--line:rgba(255,255,255,.18) !important;--muted:#AEB6C2 !important;}'
      + 'html[data-theme="dark"] body{background:#121216 !important;}'
      + 'html[data-theme="dark"] .rbody,html[data-theme="dark"] .rtext,html[data-theme="dark"] .lead,html[data-theme="dark"] .sub,html[data-theme="dark"] .rmeta{color:#EDEDF1 !important;}'
      + 'html:not([data-theme="dark"]) .lead,html:not([data-theme="dark"]) .sub{color:#2b1d18 !important;}'
      + '.backlink,.backlink a{font-size:15px !important;letter-spacing:.06em !important;text-transform:none !important;}'
      + '.brandmini{font-size:14.5px !important;}'
      + '.kicker{font-size:13px !important;letter-spacing:.3em !important;}'
      + '.num{font-size:18px !important;}'
      + '.lead{font-size:clamp(15px,4vw,19px) !important;line-height:1.5 !important;}'
      + '.tagline{font-size:clamp(19px,5.4vw,26px) !important;line-height:1.16 !important;}'
      + '.big{font-size:clamp(30px,9.6vw,54px) !important;}'
      + '.continue{font-size:14px !important;}'
      + '.cap{font-size:12px !important;}'
      + '.consent{font-size:12.5px !important;line-height:1.5 !important;}'
      + '.loadsub{font-size:12.5px !important;}'
      + '.loadtxt{font-size:clamp(20px,5.4vw,27px) !important;}'
      + '.rtext,.rbody,.rbd{font-size:clamp(15px,4vw,18px) !important;line-height:1.6 !important;}'
      + '.rlab,.hint,.note,.opt{font-size:12.5px !important;}'
      + '.cardname{font-size:clamp(15px,4vw,18px) !important;}'
      + '.brand{font-size:clamp(21px,5.4vw,27px) !important;}'
      + 'nav{flex-wrap:wrap !important;justify-content:center !important;}'
      + 'nav a{font-size:12.5px !important;}'
      // proportionally enlarge home/intro visuals (transform keeps layout box → no reflow/overflow)
      + '.cup{transform:scale(1.18) !important;}'
      + '.handimg{transform:scale(1.18) !important;}'
      + '.tt,.tb{transform:scale(1.12) !important;}'
      + '.kicker ~ div canvas{transform:scale(1.16) !important;}'
      // audio (TTS) controls + word-follow highlight
      + '.oph-tts{display:flex;gap:.3cm;justify-content:center;align-items:center;margin:22px auto 8px;}'
      + '.oph-tts button{width:46px;height:46px;border-radius:50%;border:1px solid var(--ink);background:transparent;color:var(--ink);font-size:15px;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;padding:0;-webkit-tap-highlight-color:transparent;}'
      + '.oph-tts button:disabled{opacity:.32;cursor:default;}'
      + '.ttw-on{background:rgba(190,150,70,.40);border-radius:3px;}'
      + 'html[data-theme="dark"] .ttw-on{background:rgba(255,215,130,.34);color:#fff !important;}'
      + '.sub{font-size:clamp(14px,3.7vw,17px) !important;line-height:1.5 !important;}'
      + '.herotag{font-size:clamp(13px,3.6vw,16px) !important;}'
      + '.hero h1{font-size:clamp(27px,8vw,51px) !important;}'
      + '.zlist{margin-top:1.4cm !important;width:min(94vw,560px) !important;}'
      + '.zcircle{width:min(30vw,112px) !important;}'
      + '.zrow .zn{font-size:16px !important;}'
      + '.zrow .zl{font-size:clamp(11px,2.8vw,13px) !important;}'
      + '.cta{font-size:clamp(12px,3.1vw,14.5px) !important;border-top-width:1.5px !important;border-bottom-width:1.5px !important;padding:10px 2.4cm !important;max-width:96vw !important;}'
      + '.go{font-size:clamp(12px,3vw,14px) !important;border-top-width:1.5px !important;border-bottom-width:1.5px !important;padding:11px calc(22px + 2.4cm) !important;max-width:96vw !important;}'
      + '.foot-strip{font-size:clamp(10px,2.4vw,12px) !important;opacity:.6 !important;}'
      + 'input,select,textarea,.field input,.field select{font-size:16px !important;}'
      + '.field label,.set-label{font-size:12.5px !important;}'
      + '.foot-site{font-size:clamp(10.5px,2.6vw,12.5px) !important;}'
      + '.totop{display:block;margin:0 auto 12px;font-family:var(--sans);font-size:clamp(11.5px,2.9vw,13.5px);letter-spacing:.14em;text-transform:uppercase;color:var(--ink);background:transparent;border:1.5px solid var(--ink);border-radius:999px;padding:10px 22px;cursor:pointer;-webkit-tap-highlight-color:transparent;}'
      + '.totop-arrow{display:block;text-align:center;font-size:22px;line-height:1;color:var(--ink);margin:0 auto 8px;}';
    var st = d.createElement('style'); st.id = 'oph-scale'; st.textContent = css;
    (d.head || d.documentElement).appendChild(st);
  }

  // ---- Sesli dinleme (Text-to-Speech) ----
  function ttsLangCode() {
    var m = { en: 'en-US', tr: 'tr-TR', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', it: 'it-IT', pt: 'pt-PT', ru: 'ru-RU', ar: 'ar-SA', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', hi: 'hi-IN', nl: 'nl-NL', pl: 'pl-PL' };
    return m[getLang()] || 'en-US';
  }
  var _tts = { spans: null, paused: false };
  function _ttsClear() { if (_tts.spans) { for (var i = 0; i < _tts.spans.length; i++) _tts.spans[i].el.classList.remove('ttw-on'); } }
  // insertBeforeEl: node to place the control bar before; textEls: array of elements whose text is read + highlighted
  function mountTTS(insertBeforeEl, textEls) {
    if (!insertBeforeEl || !insertBeforeEl.parentNode || !('speechSynthesis' in w)) return null;
    if (insertBeforeEl.parentNode.querySelector(':scope > .oph-tts')) return null; // already mounted here
    var spans = [], full = '';
    for (var t = 0; t < textEls.length; t++) {
      var el = textEls[t]; if (!el) continue;
      var tw = d.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodes = [], n;
      while ((n = tw.nextNode())) nodes.push(n);
      for (var k = 0; k < nodes.length; k++) {
        var tn = nodes[k]; if (!tn.parentNode) continue;
        if (/^(SCRIPT|STYLE)$/.test(tn.parentNode.tagName)) continue;
        var parts = (tn.nodeValue || '').split(/(\s+)/), frag = d.createDocumentFragment();
        for (var p = 0; p < parts.length; p++) {
          var wd = parts[p]; if (wd === '') continue;
          if (/^\s+$/.test(wd)) { frag.appendChild(d.createTextNode(wd)); full += wd; }
          else { var sp = d.createElement('span'); sp.className = 'ttw'; sp.textContent = wd; frag.appendChild(sp); spans.push({ el: sp, start: full.length, len: wd.length }); full += wd; }
        }
        tn.parentNode.replaceChild(frag, tn);
      }
      full += '\n\n';
    }
    full = full.trim();
    if (!full) return null;
    var bar = d.createElement('div'); bar.className = 'oph-tts';
    function mk(sym, lab) { var b = d.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', lab); b.textContent = sym; return b; }
    var pl = mk('▶', 'Dinle'), pa = mk('❙❙', 'Duraklat'), stp = mk('■', 'Durdur');
    bar.appendChild(pl); bar.appendChild(pa); bar.appendChild(stp);
    insertBeforeEl.parentNode.insertBefore(bar, insertBeforeEl);
    function setState(s) { pa.disabled = (s !== 'playing'); stp.disabled = (s === 'idle'); }
    setState('idle');
    function start() {
      try { w.speechSynthesis.cancel(); } catch (e) {}
      _ttsClear();
      var u = new w.SpeechSynthesisUtterance(full); u.lang = ttsLangCode(); u.rate = 0.98;
      u.onboundary = function (e) {
        var ci = e.charIndex; if (ci == null) return; _ttsClear();
        for (var i = 0; i < spans.length; i++) { if (ci >= spans[i].start && ci < spans[i].start + spans[i].len) { spans[i].el.classList.add('ttw-on'); try { spans[i].el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e2) {} break; } }
      };
      u.onend = function () { _ttsClear(); _tts.paused = false; setState('idle'); };
      u.onerror = function () { _ttsClear(); _tts.paused = false; setState('idle'); };
      _tts.spans = spans; _tts.paused = false;
      w.speechSynthesis.speak(u); setState('playing');
    }
    pl.onclick = function () { if (_tts.paused && w.speechSynthesis.paused) { try { w.speechSynthesis.resume(); } catch (e) {} _tts.paused = false; setState('playing'); } else { start(); } };
    pa.onclick = function () { if (w.speechSynthesis.speaking && !w.speechSynthesis.paused) { try { w.speechSynthesis.pause(); } catch (e) {} _tts.paused = true; setState('paused'); } };
    stp.onclick = function () { try { w.speechSynthesis.cancel(); } catch (e) {} _ttsClear(); _tts.paused = false; setState('idle'); };
    // ---- Paylas (Ilet) butonu: her platformda calisir ----
    var shr = d.createElement('button'); shr.type = 'button'; shr.className = 'oph-share'; shr.setAttribute('aria-label', 'İlet');
    shr.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v13"/><path d="M8 7l4-4 4 4"/><path d="M5 12v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/></svg>';
    bar.appendChild(shr);
    function _flash(msg) {
      try { var t = d.createElement('div'); t.textContent = msg; t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:var(--ink,#231613);color:#fff;font-family:var(--sans,sans-serif);font-size:13px;padding:9px 16px;border-radius:999px;z-index:9999;opacity:0;transition:opacity .2s'; d.body.appendChild(t); requestAnimationFrame(function(){ t.style.opacity = '1'; }); setTimeout(function(){ t.style.opacity = '0'; setTimeout(function(){ try { t.remove(); } catch (e) {} }, 300); }, 1600); } catch (e) {}
    }
    // metinden sik bir alinti cikar
    function _exc(t, max) {
      t = String(t || '').replace(/[#◆*✦"]/g, ' ').replace(/\s+/g, ' ').trim();
      if (t.length <= max) return t;
      var cut = t.slice(0, max);
      var dot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
      if (dot > max * 0.5) return cut.slice(0, dot + 1);
      var sp = cut.lastIndexOf(' '); return (sp > 0 ? cut.slice(0, sp) : cut) + '…';
    }
    // fal turu basligini sayfadan sez
    function _titleTxt() {
      var el = d.querySelector('#f-type, #tr-name, .tr-title');
      if (el && el.textContent && el.textContent.trim()) return el.textContent.trim();
      var p = location.pathname;
      if (/kahve/.test(p)) return 'Kahve Falı';
      if (/el\.html/.test(p)) return 'El Falı';
      if (/tarot/.test(p)) return 'Tarot Falı';
      var dt = (d.title || '').replace(/OPHANARK[\s·•|\-]*/i, '').trim();
      return dt || 'OPHANARK Falı';
    }
    function _spc(x, txt, cx, cy, sp) { var o; try { o = x.letterSpacing; x.letterSpacing = sp + 'px'; } catch (e) {} x.fillText(txt, cx, cy); try { x.letterSpacing = o; } catch (e) {} }
    function _wrap(x, txt, cx, cy, maxW, lh, maxLines) {
      var words = txt.split(' '), line = '', lines = [];
      for (var i = 0; i < words.length; i++) {
        var test = line ? line + ' ' + words[i] : words[i];
        if (x.measureText(test).width > maxW && line) { lines.push(line); line = words[i]; if (lines.length >= maxLines) break; }
        else line = test;
      }
      if (line && lines.length < maxLines) lines.push(line);
      if (lines.length >= maxLines && line && lines[lines.length - 1] !== line) { lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s.,;:]+$/, '') + '…'; }
      lines = lines.slice(0, maxLines);
      for (var j = 0; j < lines.length; j++) x.fillText(lines[j], cx, cy + j * lh);
    }
    // metni en fazla 3 paragrafa ayir (toplam uzunlugu sinirla)
    function _paras(text, maxTotal) {
      var arr = String(text || '').replace(/[#◆*✦]/g, ' ').split(/\n{2,}/).map(function (s) { return s.replace(/\s+/g, ' ').trim(); }).filter(Boolean).slice(0, 3);
      if (!arr.length) arr = [String(text || '').replace(/\s+/g, ' ').trim()];
      var total = 0; for (var i = 0; i < arr.length; i++) total += arr[i].length;
      if (total > maxTotal) {
        var acc = 0, out = [];
        for (var j = 0; j < arr.length; j++) {
          var remain = maxTotal - acc; if (remain < 40) break;
          if (arr[j].length <= remain) { out.push(arr[j]); acc += arr[j].length; }
          else { var cut = arr[j].slice(0, remain); var sp = cut.lastIndexOf(' '); out.push((sp > 40 ? cut.slice(0, sp) : cut).replace(/[\s.,;:]+$/, '') + '…'); break; }
        }
        arr = out.length ? out : arr.slice(0, 1);
      }
      return arr;
    }
    function _wrapLines(x, txt, maxW) { var w = txt.split(' '), line = '', out = []; for (var i = 0; i < w.length; i++) { var t = line ? line + ' ' + w[i] : w[i]; if (x.measureText(t).width > maxW && line) { out.push(line); line = w[i]; } else line = t; } if (line) out.push(line); return out; }
    // galgalim carklari (ic ice halkalar) - kanatsiz filigran
    function _rings(x, cx, cy, R, alpha) {
      x.save(); x.globalAlpha = alpha; x.strokeStyle = '#a9791f'; x.lineCap = 'round';
      for (var a = 0; a < 3; a++) {
        x.save(); x.translate(cx, cy); x.rotate(a * Math.PI / 3);
        x.lineWidth = 11; x.beginPath(); x.ellipse(0, 0, R, R * 0.40, 0, 0, Math.PI * 2); x.stroke();
        x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, R * 0.86, R * 0.335, 0, 0, Math.PI * 2); x.stroke();
        x.restore();
      }
      x.lineWidth = 7; x.beginPath(); x.arc(cx, cy, R * 0.64, 0, Math.PI * 2); x.stroke();
      x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, R * 0.15, 0, Math.PI * 2); x.stroke();
      x.restore();
    }
    // dikey hikaye karti (1080x1920): galgalim carklari filigrani + OPHANARK + 3 paragraf
    function _card(title, text) {
      return new Promise(function (resolve) {
        var done = false;
        function go() { if (done) return; done = true; draw(); }
        try { if (d.fonts && d.fonts.ready) { d.fonts.ready.then(go, go); } else go(); } catch (e) { go(); }
        setTimeout(go, 1200);
        function draw() {
          try {
            var W = 1080, H = 1920, cv = d.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
            var ink = '#241712', gold = '#9a6c2e', muted = '#8f7d69';
            x.fillStyle = '#F3ECDD'; x.fillRect(0, 0, W, H);
            var g = x.createRadialGradient(W / 2, H * 0.46, 150, W / 2, H * 0.5, H * 0.72); g.addColorStop(0, 'rgba(255,252,245,0.55)'); g.addColorStop(1, 'rgba(120,90,50,0.10)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
            // GALGALIM CARKLARI FILIGRANI — buyuk, dusuk opaklik, yazinin arkasinda
            _rings(x, W / 2, H / 2 + 40, W * 0.36, 0.17);
            x.strokeStyle = 'rgba(154,108,46,0.55)'; x.lineWidth = 3; x.strokeRect(56, 56, W - 112, H - 112);
            x.strokeStyle = 'rgba(154,108,46,0.30)'; x.lineWidth = 1; x.strokeRect(74, 74, W - 148, H - 148);
            x.textAlign = 'center'; x.textBaseline = 'alphabetic';
            x.fillStyle = ink; x.font = '600 76px "Cormorant Garamond", Georgia, serif'; _spc(x, 'OPHANARK', W / 2, 236, 12);
            x.strokeStyle = gold; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 130, 278); x.lineTo(W / 2 + 130, 278); x.stroke();
            x.fillStyle = gold; x.font = '600 32px "DM Sans", Arial, sans-serif'; _spc(x, (title || 'FAL').toUpperCase(), W / 2, 356, 7);
            // 3 paragrafi alana sigacak sekilde otomatik boyutla ve dikeyde ortala
            var paras = _paras(text, 620), maxW = W - 250, yTop = 430, yBottom = 1700, areaH = yBottom - yTop, chosen = null;
            for (var fs = 56; fs >= 34; fs -= 2) {
              x.font = 'italic ' + fs + 'px "Cormorant Garamond", Georgia, serif';
              var lh = Math.round(fs * 1.42), pg = Math.round(fs * 0.95);
              var wrapped = paras.map(function (p) { return _wrapLines(x, p, maxW); });
              var tl = 0; for (var w2 = 0; w2 < wrapped.length; w2++) tl += wrapped[w2].length;
              var th = tl * lh + (wrapped.length - 1) * pg;
              if (th <= areaH) { chosen = { fs: fs, lh: lh, pg: pg, wrapped: wrapped, th: th }; break; }
            }
            if (!chosen) { x.font = 'italic 34px "Cormorant Garamond", Georgia, serif'; var lh0 = 48, pg0 = 32, wr0 = paras.map(function (p) { return _wrapLines(x, p, maxW); }); chosen = { fs: 34, lh: lh0, pg: pg0, wrapped: wr0, th: areaH }; }
            x.fillStyle = ink; x.font = 'italic ' + chosen.fs + 'px "Cormorant Garamond", Georgia, serif';
            var y = yTop + Math.max(0, (areaH - chosen.th) / 2) + chosen.fs;
            for (var pi = 0; pi < chosen.wrapped.length; pi++) {
              var lines = chosen.wrapped[pi];
              for (var li = 0; li < lines.length; li++) { x.fillText(lines[li], W / 2, y); y += chosen.lh; }
              if (pi < chosen.wrapped.length - 1) y += chosen.pg;
            }
            x.fillStyle = gold; x.font = '40px "Cormorant Garamond", Georgia, serif'; x.fillText('✦', W / 2, H - 208);
            x.fillStyle = muted; x.font = '600 27px "DM Sans", Arial, sans-serif'; _spc(x, 'WWW.OPHANARK.COM', W / 2, H - 150, 5);
            cv.toBlob(function (b) { resolve(b); }, 'image/png');
          } catch (e) { resolve(null); }
        }
      });
    }
    shr.onclick = function () {
      var body = full.length > 1600 ? full.slice(0, 1600) + '…' : full;
      var url = 'https://www.ophanark.com';
      var teaser = _exc(full, 180);
      _card(_titleTxt(), full).then(function (blob) {
        var file = null; try { if (blob) file = new File([blob], 'ophanark-fal.png', { type: 'image/png' }); } catch (e) {}
        // 1) hikaye kartini gorsel olarak paylas (Instagram/WhatsApp story vb.)
        if (file && navigator.canShare && navigator.share) { try { if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: 'OPHANARK', text: teaser }).catch(function () {}); return; } } catch (e) {} }
        // 2) yalniz metin paylas
        if (navigator.share) { navigator.share({ title: 'OPHANARK', text: body, url: url }).catch(function () {}); return; }
        // 3) masaustu: karti indir + metni kopyala
        if (file) { try { var a = d.createElement('a'); a.href = URL.createObjectURL(file); a.download = 'ophanark-fal.png'; d.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { try { URL.revokeObjectURL(a.href); } catch (e) {} }, 5000); _flash('Kart indirildi'); } catch (e) {} }
        var copyTxt = body + '\n\n' + url;
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(copyTxt).then(function () { if (!file) _flash('Panoya kopyalandı'); }).catch(function () {}); }
        else { try { var ta = d.createElement('textarea'); ta.value = copyTxt; ta.style.cssText = 'position:fixed;opacity:0'; d.body.appendChild(ta); ta.select(); d.execCommand('copy'); ta.remove(); if (!file) _flash('Panoya kopyalandı'); } catch (e) {} }
      });
    };
    return bar;
  }

  // Relabel the top-left back link to a clear, localized "Home" (was "Fortunes")
  function fixBackHome() {
    var H = { en: 'Home', tr: 'Ana Ekran', de: 'Startseite', fr: 'Accueil', es: 'Inicio', it: 'Home', pt: 'Início', ru: 'Главная', ar: 'الرئيسية', zh: '主页', ja: 'ホーム', ko: '홈', hi: 'होम', nl: 'Home', pl: 'Główna' };
    var t = H[getLang()] || 'Home';
    try {
      var a = d.querySelector('.backlink a'); if (a) a.textContent = '← ' + t;
    } catch (e) {}
  }

  function regSW(){ try{ if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(function(){}); } }catch(e){} }
  function boot() { injectScale(); applyTheme(getTheme()); applyLang(getLang()); fixBackHome(); regSW(); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* ---- Web Push: kapalı uygulamaya bildirim planlama ---- */
  var PUSH_SB = 'https://lssyopqxthausyegeire.supabase.co';
  var PUSH_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzc3lvcHF4dGhhdXN5ZWdlaXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMTE4MzEsImV4cCI6MjA5OTc4NzgzMX0.WZeL9kPQmC86m747B3jOOObcNR0If4FADH12VxUpFqo';
  var VAPID_PUB = 'BM_IgsPXfteJkZR9lLXxe6kDXFO1b2oJpy4E-mBzFDGC1LZrcZVvxFoXIs9ZxIXigGgKQZUzpa4MSoe_N-dxUH0';

  function b64ToU8(base64){
    var pad = '='.repeat((4 - base64.length % 4) % 4);
    var b = (base64 + pad).replace(/-/g,'+').replace(/_/g,'/');
    var raw = atob(b); var out = new Uint8Array(raw.length);
    for(var i=0;i<raw.length;i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  function pushSession(){
    try{ var k='oph_oturum',v=localStorage.getItem(k);
      if(!v){ v='oz_'+Date.now().toString(36)+Math.random().toString(36).slice(2,10); localStorage.setItem(k,v);} return v;
    }catch(e){ return 'oz_anon'; }
  }
  // İzin ister, aboneliği alır, push-planla'ya gecikmeli bildirim kaydeder.
  // opts: {gecikme_sn, baslik, govde, url}  -> Promise<boolean>
  function pushPlanla(opts){
    opts = opts || {};
    if(!('serviceWorker' in navigator) || !('PushManager' in window)) return Promise.resolve(false);
    return Promise.resolve().then(function(){
      return (Notification.permission==='granted') ? 'granted' : Notification.requestPermission();
    }).then(function(perm){
      if(perm!=='granted') return false;
      return navigator.serviceWorker.ready.then(function(reg){
        return reg.pushManager.getSubscription().then(function(sub){
          if(sub) return sub;
          return reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey: b64ToU8(VAPID_PUB) });
        });
      }).then(function(sub){
        return fetch(PUSH_SB+'/functions/v1/push-planla',{
          method:'POST',
          headers:{'Content-Type':'application/json','apikey':PUSH_ANON,'Authorization':'Bearer '+PUSH_ANON},
          body:JSON.stringify({
            oturum_id: pushSession(),
            abonelik: sub,
            gecikme_sn: (opts.gecikme_sn!=null ? opts.gecikme_sn : 180),
            baslik: opts.baslik || 'OPHANARK',
            govde: opts.govde || 'Falınız hazır ✨',
            url: opts.url || './'
          })
        }).then(function(r){ return r.ok; }).catch(function(){ return false; });
      }).catch(function(){ return false; });
    }).catch(function(){ return false; });
  }

  /* ================= KVKK: oku-onayla kapısı (her falda ortak) ================= */
  var KVKK_METIN =
    '<h3>KVKK Aydınlatma ve Açık Rıza Metni</h3>'
    + '<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, OPHANARK (OZARK COLLECTIVE CO. — "veri sorumlusu") tarafından kişisel verilerinizin nasıl işlendiğini açıklar ve açık rızanıza sunar.</p>'
    + '<h4>1. İşlenen kişisel veriler</h4>'
    + '<p>Seçtiğiniz fal türüne göre şunlar işlenebilir: adınız; doğum tarihi, saati ve yeri (natal harita, burç ve tarot için); el veya kahve falı için gönderdiğiniz fotoğraflar; rüya metniniz; giriş yaparsanız e-posta ve profil bilginiz; uygulamanın çalışması için tarayıcı/cihaz türü gibi standart teknik veriler.</p>'
    + '<h4>2. İşleme amaçları</h4>'
    + '<p>Verileriniz; natal harita, tarot, kahve falı, el falı, rüya tabiri ve burç yorumlarını üretmek; doğum yerinizi enlem/boylam ve saat dilimine çevirmek; girişinizi hatırlamak ve deneyiminizi kişiselleştirmek amacıyla işlenir. Ayrıca, yalnızca ayrı olarak onay verirseniz, hizmet kalitesini artırmak üzere yapay zekâ modelinin eğitiminde kullanılabilir.</p>'
    + '<h4>3. Aktarım ve hizmet sağlayıcılar</h4>'
    + '<p>Yorumların üretilmesi için verileriniz güvenli yapay zekâ sağlayıcısına; doğum yeri koordinatları için yalnızca yer adı Open-Meteo coğrafi kodlama servisine; hesap girişi ve kayıt için Supabase altyapısına aktarılır. Tüm iletişim HTTPS/SSL ile şifrelenir.</p>'
    + '<h4>4. Saklama ve silme</h4>'
    + '<p>Doğum bilgileri öncelikle cihazınızın belleğinde (localStorage) tutulur; tarayıcı/uygulama verilerini temizleyerek dilediğiniz an silebilirsiniz. Hesabınızın ve ilişkili verilerin silinmesi için hello@ozarkcollective.co adresinden bize ulaşabilirsiniz.</p>'
    + '<h4>5. Haklarınız (KVKK md. 11)</h4>'
    + '<p>Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini, silinmesini veya yok edilmesini isteme, işlemeye itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Taleplerinizi yukarıdaki e-posta adresine iletebilirsiniz.</p>'
    + '<div class="kvkk-onem"><h4>Ophan AI\'ye Destek ve Görsel Analiz İzni</h4>'
    + '<p>Uygulamamızın yapay zekâ motoru olan <b>Ophan AI</b>, daha iyi görsel analiz yapabilmesi için sizin desteğinizle gelişmeye devam ediyor. Ophan AI\'nin gelişmesine destek olmak amacıyla; paylaştığım tüm bilgilerin ve görsellerin — el falı ve kahve falı için gönderdiğim fotoğraflar dâhil — daha isabetli analiz edilmesi için Ophan AI tarafından işlenmesine, OPHANARK belleğinde saklanmasına ve modelin eğitilip geliştirilmesinde süresiz olarak kullanılmasına açık ve özgür irademle rıza veriyorum. Bu izni istediğim zaman hello@ozarkcollective.co adresine yazarak geri çekebilirim.</p></div>'
    + '<h4>6. Açık rıza</h4>'
    + '<p>Bu metni okudum ve anladım. Seçtiğim falın oluşturulabilmesi için yukarıda belirtilen kişisel verilerimin bu amaçlarla işlenmesine, saklanmasına ve gerekli hizmet sağlayıcılara aktarılmasına açık rıza veriyorum. Uygulama 13 yaşın altındaki çocuklara yönelik değildir.</p>';

  var _kvkkOkundu = false, _kvkkCb = null;
  function kvkkCssInjekte(){
    if (d.getElementById('kvkk-css')) return;
    var st = d.createElement('style'); st.id = 'kvkk-css';
    st.textContent =
      '.consent{display:flex;align-items:flex-start;gap:10px;width:min(370px,90%);margin:18px auto 0;text-align:left;cursor:pointer}'
    + '.consent .cb{width:19px;height:19px;min-width:19px;border:1px solid var(--muted,#8a7a72);border-radius:3px;margin-top:2px;position:relative}'
    + '.consent .cb.on{background:var(--ink,#231613);border-color:var(--ink,#231613)}'
    + '.consent .cb.on::after{content:\'\\2713\';position:absolute;inset:0;color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center}'
    + '.consent p{font-size:15px!important;line-height:1.5!important;color:var(--ink,#5a4a44)}'
    + '.consent a{color:var(--ink,#231613);font-weight:600;text-decoration:underline}'
    + '.consent.kvkk-lock{opacity:.72}'
    + '.consent.kvkk-lock .cb{border-style:dashed}'
    + '.kvkk-ov{position:fixed;inset:0;z-index:9000;display:none;align-items:center;justify-content:center;'
    + 'background:rgba(15,9,8,.82);backdrop-filter:blur(4px);padding:5vh 18px}'
    + '.kvkk-ov.on{display:flex}'
    + '.kvkk-box{width:min(560px,94%);max-height:88vh;display:flex;flex-direction:column;background:var(--bg,#fbf7ef);'
    + 'border:1px solid var(--line,rgba(0,0,0,.15));border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.45)}'
    + '.kvkk-metin{overflow:auto;-webkit-overflow-scrolling:touch;padding:22px 22px 8px;color:var(--ink,#231613)}'
    + '.kvkk-metin h3{font-family:var(--disp,serif);font-size:22px;letter-spacing:.02em;margin:0 0 12px}'
    + '.kvkk-metin h4{font-family:var(--sans,sans-serif);font-size:14px;letter-spacing:.02em;margin:16px 0 4px}'
    + '.kvkk-metin p{font-family:var(--serif,serif);font-size:15px;line-height:1.6;margin:0 0 10px;color:var(--ink,#231613)}'
    + '.kvkk-onem{margin:18px 0;padding:15px 16px;border:1.5px solid var(--ink,#231613);border-radius:11px;background:rgba(210,59,46,.06)}'
    + '.kvkk-onem h4{font-family:var(--disp,serif)!important;font-size:17px!important;font-weight:700!important;letter-spacing:.01em;margin:0 0 7px!important;color:var(--ink,#231613)}'
    + '.kvkk-onem p{font-family:var(--serif,serif);font-size:16px!important;font-weight:600;line-height:1.6!important;margin:0!important;color:var(--ink,#231613)}'
    + '.kvkk-onem b{font-weight:800}'
    + '.kvkk-foot{flex:none;padding:14px 22px 18px;border-top:1px solid var(--line,rgba(0,0,0,.12));text-align:center}'
    + '.kvkk-ok{font-family:var(--sans,sans-serif);text-transform:uppercase;letter-spacing:.12em;font-size:13px;'
    + 'color:#fff;background:var(--ink,#231613);border:none;border-radius:999px;padding:13px 30px;cursor:pointer}'
    + '.kvkk-ok[disabled]{opacity:.32;cursor:default}'
    + '.kvkk-hint{font-family:var(--sans,sans-serif);font-size:11px;letter-spacing:.06em;color:var(--muted,#8a7a72);margin:0 0 9px}';
    (d.head || d.documentElement).appendChild(st);
  }
  function kvkkModalKur(){
    if (d.getElementById('kvkk-ov')) return;
    kvkkCssInjekte();
    var ov = d.createElement('div'); ov.id = 'kvkk-ov'; ov.className = 'kvkk-ov';
    ov.innerHTML = '<div class="kvkk-box"><div class="kvkk-metin" id="kvkk-metin">' + KVKK_METIN + '</div>'
      + '<div class="kvkk-foot"><p class="kvkk-hint" id="kvkk-hint">Metni sonuna kadar okuyun</p>'
      + '<button class="kvkk-ok" id="kvkk-ok" disabled>Okudum, anladım</button></div></div>';
    d.body.appendChild(ov);
    var metin = ov.querySelector('#kvkk-metin'), ok = ov.querySelector('#kvkk-ok'), hint = ov.querySelector('#kvkk-hint');
    function acilabilir(){ ok.disabled = false; if (hint) hint.style.display = 'none'; }
    function chk(){ if (metin.scrollTop + metin.clientHeight >= metin.scrollHeight - 6) acilabilir(); }
    metin.addEventListener('scroll', chk);
    ov.__acilabilir = acilabilir; ov.__chk = chk;
    ok.addEventListener('click', function(){ _kvkkOkundu = true; ov.classList.remove('on'); var cb = _kvkkCb; _kvkkCb = null; if (cb) cb(); });
    ov.addEventListener('click', function(e){ if (e.target === ov) ov.classList.remove('on'); });
  }
  // Metni aç; okununca (Okudum, anladım) onRead() çalışır
  function kvkkAc(onRead){
    kvkkModalKur();
    _kvkkCb = onRead || null;
    var ov = d.getElementById('kvkk-ov'), metin = d.getElementById('kvkk-metin'), ok = d.getElementById('kvkk-ok'), hint = d.getElementById('kvkk-hint');
    ov.classList.add('on');
    if (_kvkkOkundu){ ov.__acilabilir(); }
    else {
      ok.disabled = true; if (hint) hint.style.display = '';
      metin.scrollTop = 0;
      // metin kutudan kısa ise (scroll gerekmiyorsa) butonu doğrudan aç
      setTimeout(function(){ if (metin.scrollHeight <= metin.clientHeight + 6) ov.__acilabilir(); else ov.__chk(); }, 60);
    }
  }
  // Bir .consent bloğunu yükselt: kutuyu kilitle → "oku" modalı açar → okununca kutu tıklanabilir
  function kvkkConsent(consentEl, onChange){
    if (!consentEl) return null;
    kvkkCssInjekte();
    consentEl.classList.add('kvkk-lock');
    var cb = consentEl.querySelector('.cb');
    var st = { checked:false, unlocked:false };
    function unlock(){ st.unlocked = true; consentEl.classList.remove('kvkk-lock'); st.checked = true; if (cb) cb.classList.add('on'); if (onChange) onChange(true); }
    var link = consentEl.querySelector('a');
    if (link){ link.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); kvkkAc(unlock); }); }
    consentEl.addEventListener('click', function(e){
      if (e.target && e.target.tagName === 'A') return;      // "oku" linki kendi işini yapar
      if (!st.unlocked){ kvkkAc(unlock); return; }            // önce metni okut
      st.checked = !st.checked; if (cb) cb.classList.toggle('on', st.checked);
      if (onChange) onChange(st.checked);
    });
    return { isChecked:function(){ return st.checked && st.unlocked; },
             reset:function(){ st.checked=false; if(cb) cb.classList.remove('on'); if(onChange) onChange(false); } };
  }

  /* ============================================================
     PREMIUM PAKET / GÜNLÜK KOTA — v1 (istemci tarafı geçit)
     Seviye: 'free' | 'plus' | 'pro'  (localStorage 'oph_seviye', ayrıca
     giriş yapılınca Supabase kullanici_abonelik tablosundan yüklenir).
     Kota istemci tarafında localStorage sayaçlarıyla tutulur; sunucu
     tarafı zorlama (edge function) Faz 2'de eklenecek.
     ============================================================ */
  // tur: { free:[adet, periyotGun], plus:[...], pro:[...] }  (adet=Infinity -> sınırsız)
  var PAKET_LIMIT = {
    kahve:      { free:[1,1], plus:[3,1],        pro:[Infinity,1] },
    el:         { free:[1,1], plus:[3,1],        pro:[Infinity,1] },
    natal:      { free:[1,1], plus:[3,1],        pro:[Infinity,1] },
    tarot:      { free:[1,1], plus:[Infinity,1], pro:[Infinity,1] },
    katina:     { free:[1,1], plus:[Infinity,1], pro:[Infinity,1] },
    ruya:       { free:[1,1], plus:[3,1],        pro:[Infinity,1] },
    numeroloji: { free:[1,3], plus:[1,2],        pro:[1,1] },
    yildizname: { free:[1,3], plus:[1,2],        pro:[1,1] }
    // burc + melek: her seviyede sınırsız -> geçit uygulanmaz
  };
  var FAL_AD = {
    kahve:{tr:'kahve falı',en:'coffee reading'}, el:{tr:'el falı',en:'palm reading'},
    natal:{tr:'natal harita',en:'natal chart'}, tarot:{tr:'tarot falı',en:'tarot reading'},
    katina:{tr:'katina falı',en:'coffee-card reading'}, ruya:{tr:'rüya tabiri',en:'dream reading'},
    numeroloji:{tr:'numeroloji',en:'numerology'}, yildizname:{tr:'yıldızname',en:'star-name reading'}
  };

  function _gun(){ var x=new Date(); return x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate(); }
  function paketSeviye(){ var s=get('oph_seviye','free'); return (s==='plus'||s==='pro')?s:'free'; }
  function paketAyarla(s){ if(s==='free'||s==='plus'||s==='pro') set('oph_seviye',s); return paketSeviye(); }
  function _kotaKey(t){ return 'oph_kota_'+t; }
  function _kotaOku(t){ try{ return JSON.parse(localStorage.getItem(_kotaKey(t))||'{}'); }catch(e){ return {}; } }

  // {izin, sinirsiz?, kullanildi?, limit?, periyotGun?, kalanGun?}
  function kotaDurum(tur){
    var cfg=PAKET_LIMIT[tur]; if(!cfg) return {izin:true, sinirsiz:true};
    var lim=cfg[paketSeviye()]||cfg.free, adet=lim[0], gun=lim[1];
    if(adet===Infinity) return {izin:true, sinirsiz:true, limit:Infinity};
    var st=_kotaOku(tur);
    if(gun<=1){
      var c=(st.tarih===_gun())?(st.sayi||0):0;
      return {izin:c<adet, kullanildi:c, limit:adet, periyotGun:1};
    }
    var son=st.son||0, farkGun=son?((Date.now()-son)/86400000):9999;
    return {izin:farkGun>=gun, periyotGun:gun, kalanGun:Math.max(1,Math.ceil(gun-farkGun)), limit:adet};
  }
  function kotaKullan(tur){
    var cfg=PAKET_LIMIT[tur]; if(!cfg) return;
    var lim=cfg[paketSeviye()]||cfg.free; if(lim[0]===Infinity) return;
    var gun=lim[1], st=_kotaOku(tur);
    if(gun<=1){ var g=_gun(); if(st.tarih!==g) st={tarih:g,sayi:0}; st.sayi=(st.sayi||0)+1; }
    else { st.son=Date.now(); }
    set(_kotaKey(tur), JSON.stringify(st));
  }
  // Ana geçit: fal başlamadan önce çağır. İzin varsa sayacı artırır + true döner.
  // İzin yoksa paywall gösterir + false döner.
  function falKontrol(tur){
    var st=kotaDurum(tur);
    if(st.izin){ kotaKullan(tur); return true; }
    paywallGoster(tur, st);
    return false;
  }

  function bolgeTR(){
    try{ if((navigator.language||'').toLowerCase().indexOf('tr')===0) return true; }catch(e){}
    try{ var tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''; if(tz==='Europe/Istanbul') return true; }catch(e){}
    return false;
  }

  function _sbToken(){
    try{ for(var i=0;i<localStorage.length;i++){ var k=localStorage.key(i);
      if(k&&/^sb-.*-auth-token$/.test(k)){ var o=JSON.parse(localStorage.getItem(k)||'null');
        var t=o&&(o.access_token||(o.currentSession&&o.currentSession.access_token)); if(t) return t; } } }catch(e){}
    return null;
  }
  // Supabase'den güncel seviyeyi çek + önbelleğe al. Promise<seviye>.
  function paketYukle(){
    var t=_sbToken(); if(!t) return Promise.resolve(paketSeviye());
    return fetch(PUSH_SB+'/rest/v1/kullanici_abonelik?select=seviye,durum&limit=1',{
      headers:{'apikey':PUSH_ANON,'Authorization':'Bearer '+t}
    }).then(function(r){ return r.ok?r.json():[]; }).then(function(rows){
      var row=rows&&rows[0], s=(row&&row.seviye)||'free';
      // seviye'ye güven: webhook, abonelik süresi bitince (expired) seviye'yi 'free' yapar.
      // İptal edilmiş ama dönem sonu gelmemiş abonelikte erişim sürer (durum!=='active' olsa da).
      return paketAyarla(s);
    }).catch(function(){ return paketSeviye(); });
  }

  var _pwStil=false;
  function paywallGoster(tur, st){
    var lang=(getLang()==='tr')?'tr':'en';
    var ad=(FAL_AD[tur]&&FAL_AD[tur][lang])||tur;
    var baslik = lang==='tr'?'Ücretsiz hakkın doldu':'Free limit reached';
    var mesaj;
    if(st&&st.periyotGun>1){
      mesaj = lang==='tr'
        ? (ad.charAt(0).toUpperCase()+ad.slice(1)+' için '+(st.kalanGun||1)+' gün sonra tekrar bakabilir, ya da paket alarak daha sık bakabilirsin.')
        : ('You can view your '+ad+' again in '+(st.kalanGun||1)+' day(s), or upgrade to view it more often.');
    } else {
      mesaj = lang==='tr'
        ? ('Bugünkü ücretsiz '+ad+' hakkını kullandın. Daha fazlası için paketlere göz at.')
        : ("You've used today's free "+ad+'. Check the plans for more.');
    }
    var btnT = lang==='tr'?'Paketleri görmek için tıkla':'See plans';
    var kapatT = lang==='tr'?'Kapat':'Close';
    if(!_pwStil){
      var s=d.createElement('style'); s.textContent=
        '.oph-pw{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,12,23,.55);backdrop-filter:blur(3px);font-family:var(--sans,sans-serif)}'+
        '.oph-pw-card{width:min(420px,100%);background:var(--bg,#F7F3E8);color:var(--ink,#25181C);border:1px solid var(--line,rgba(37,24,28,.16));border-radius:16px;padding:30px 26px;box-shadow:0 24px 70px rgba(0,0,0,.4);text-align:center}'+
        '.oph-pw-card h3{font-family:var(--serif,Georgia,serif);font-weight:400;font-size:23px;margin:0 0 12px}'+
        '.oph-pw-card p{font-size:14px;line-height:1.6;opacity:.85;margin:0 0 22px}'+
        '.oph-pw-go{display:block;width:100%;background:var(--ink,#25181C);color:var(--bg,#F7F3E8);border:0;border-radius:10px;padding:15px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-family:inherit}'+
        '.oph-pw-x{display:block;width:100%;margin-top:10px;background:transparent;color:var(--muted,#9c8666);border:0;padding:10px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:inherit}';
      d.head.appendChild(s); _pwStil=true;
    }
    var ov=d.createElement('div'); ov.className='oph-pw';
    var card=d.createElement('div'); card.className='oph-pw-card';
    var h=d.createElement('h3'); h.textContent=baslik;
    var p=d.createElement('p'); p.textContent=mesaj;
    var b=d.createElement('button'); b.className='oph-pw-go'; b.textContent=btnT;
    b.onclick=function(){ w.location.href='paketler.html'; };
    var x=d.createElement('button'); x.className='oph-pw-x'; x.textContent=kapatT;
    x.onclick=function(){ if(ov.parentNode) ov.parentNode.removeChild(ov); };
    card.appendChild(h); card.appendChild(p); card.appendChild(b); card.appendChild(x);
    ov.appendChild(card); ov.addEventListener('click',function(e){ if(e.target===ov) x.onclick(); });
    d.body.appendChild(ov);
  }

  w.OphApp = {
    getTheme: getTheme, setTheme: setTheme,
    getLang: getLang, setLang: setLang,
    applyTheme: applyTheme, applyLang: applyLang,
    tByText: tByText, tById: tById, langName: langName, LABELS: LABELS,
    mountTTS: mountTTS, pushPlanla: pushPlanla,
    kvkkConsent: kvkkConsent, kvkkAc: kvkkAc,
    PAKET_LIMIT: PAKET_LIMIT, FAL_AD: FAL_AD,
    paketSeviye: paketSeviye, paketAyarla: paketAyarla, paketYukle: paketYukle,
    kotaDurum: kotaDurum, kotaKullan: kotaKullan, falKontrol: falKontrol,
    paywallGoster: paywallGoster, bolgeTR: bolgeTR
  };
})(window, document);
