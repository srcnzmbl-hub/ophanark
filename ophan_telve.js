// OPHANARK · 3D Telve Fincanı  (doku + kabartma)
// -----------------------------------------------
// Kullanıcının kahve fincanı fotoğraflarını, senin Fincan.glb modelinin içine
// telve olarak giydirir ve parlaklıktan kabartma (heightmap) verir; kullanıcı
// fincanı 360° çevirebilir.
//
// Kullanım (ES module):
//   import { OphanTelve } from "./ophan_telve.js";
//   const sahne = OphanTelve.olustur(document.getElementById("kap"), {
//     fincanUrl: "model/Fincan_m.glb",
//     tabakUrl:  "model/Tabak_m.glb",
//     dracoPath: "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
//     telveTepe: dataURLveyaURL,          // tepeden çekilmiş telve fotoğrafı
//   });
//   ...
//   sahne.telveAyarla(yeniFotoUrl);       // fotoğrafı değiştir
//   sahne.yokEt();                         // temizle
//
// three.js r0.160+ (importmap ile) gerektirir.

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const VARSAYILAN = {
  dracoPath: "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
  arka: 0x160406,          // OPHANARK koyu bordo
  kabartma: 0.045,         // telve rölyef yüksekliği (model birimiyle)
  telveOran: 0.96,        // tespit edilen iç yarıçapa oran
  telveYukseklik: 0.16,    // fincan dibinden yukarı (bbox yüksekliğine oran)
  otoDon: true,
  // Fincan.glb için önceden hesaplı iç-taban fiti (ışın atma yok → mobil hızlı).
  // Başka model kullanırsan telveFit'i null yap; modül ışınla otomatik bulur.
  telveFit: { cx: -0.1163, cz: 0.0, tabanY: -0.2085, icR: 0.3216 },
};

// --- bir canvas'tan gri yükseklik (koyu telve = kalın = yüksek) çıkarır
function yukseklikDokusu(cv) {
  const w = cv.width, h = cv.height;
  const cx = cv.getContext("2d");
  const px = cx.getImageData(0, 0, w, h);
  const g = document.createElement("canvas");
  g.width = w; g.height = h;
  const gc = g.getContext("2d");
  const gd = gc.createImageData(w, h);
  for (let i = 0; i < px.data.length; i += 4) {
    const luma = 0.299 * px.data[i] + 0.587 * px.data[i + 1] + 0.114 * px.data[i + 2];
    const v = 255 - luma;
    gd.data[i] = gd.data[i + 1] = gd.data[i + 2] = v;
    gd.data[i + 3] = 255;
  }
  gc.putImageData(gd, 0, 0);
  gc.globalAlpha = 0.5; gc.filter = "blur(1.5px)"; gc.drawImage(g, 0, 0);
  gc.filter = "none"; gc.globalAlpha = 1;
  return new THREE.CanvasTexture(g);
}

// --- tek görselden renk+yükseklik (dip için)
function dipDoku(img, boy = 512) {
  const cv = document.createElement("canvas"); cv.width = cv.height = boy;
  cv.getContext("2d").drawImage(img, 0, 0, boy, boy);
  const renk = new THREE.CanvasTexture(cv); renk.colorSpace = THREE.SRGBColorSpace;
  return { renk, yuk: yukseklikDokusu(cv) };
}

// --- 4 açı görselini iç duvara 4 eşit sektör olarak birleştirir (silindirik)
function duvarDoku(imgler, en = 2048, boyu = 512) {
  const cv = document.createElement("canvas"); cv.width = en; cv.height = boyu;
  const cx = cv.getContext("2d");
  const n = Math.max(1, imgler.length);
  const dilim = en / n;
  for (let i = 0; i < n; i++) {
    // hafif taşma ile çiz (dikişleri gizlemek için)
    cx.drawImage(imgler[i], i * dilim - 2, 0, dilim + 4, boyu);
  }
  // sektör kenarlarını yumuşat
  cx.globalAlpha = 0.35; cx.filter = "blur(2px)";
  cx.drawImage(cv, 0, 0); cx.filter = "none"; cx.globalAlpha = 1;
  const renk = new THREE.CanvasTexture(cv);
  renk.colorSpace = THREE.SRGBColorSpace;
  renk.wrapS = THREE.RepeatWrapping;
  const yuk = yukseklikDokusu(cv); yuk.wrapS = THREE.RepeatWrapping;
  return { renk, yuk };
}

function imgYukle(src) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => res(im);
    im.onerror = rej;
    im.src = src;
  });
}

export const OphanTelve = {
  olustur(kap, secenekler = {}) {
    const o = Object.assign({}, VARSAYILAN, secenekler);
    const g = kap.clientWidth || 360, y = kap.clientHeight || 480;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(g, y);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    kap.appendChild(renderer.domElement);

    const sahne = new THREE.Scene();
    if (o.arka != null) sahne.background = new THREE.Color(o.arka);

    const pmrem = new THREE.PMREMGenerator(renderer);
    sahne.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const kamera = new THREE.PerspectiveCamera(38, g / y, 0.01, 100);
    kamera.position.set(0, 1.15, 2.1);

    const kontrol = new OrbitControls(kamera, renderer.domElement);
    kontrol.enableDamping = true;
    kontrol.dampingFactor = 0.08;
    kontrol.minDistance = 1.1;
    kontrol.maxDistance = 5;
    kontrol.maxPolarAngle = Math.PI * 0.92;
    kontrol.autoRotate = o.otoDon;
    kontrol.autoRotateSpeed = 0.8;
    kontrol.target.set(0, 0.28, 0);

    sahne.add(new THREE.HemisphereLight(0xffffff, 0x30060a, 0.55));
    const yon = new THREE.DirectionalLight(0xffffff, 1.4);
    yon.position.set(2, 4, 3);
    sahne.add(yon);
    // fincan içini aydınlatan yumuşak ışık (telve kabartması görünsün)
    const icIsik = new THREE.PointLight(0xffe8cc, 6, 2.4, 2);
    icIsik.position.set(0, 0.75, 0.15);
    sahne.add(icIsik);

    const kok = new THREE.Group();
    sahne.add(kok);

    let telveMesh = null, fincanBBox = null, fincanObj = null, canli = true;

    // Fincanın iç tabanını ızgara ışın taramasıyla bul (kulbu dışlar, dünya uzayı)
    function icTaban() {
      fincanObj.updateWorldMatrix(true, true);
      const box = new THREE.Box3().setFromObject(fincanObj);
      const boyut = box.getSize(new THREE.Vector3());
      const ust = box.max.y + boyut.y;
      const asagi = new THREE.Vector3(0, -1, 0);
      const ray = new THREE.Raycaster();
      const N = 16, ilkVurus = [];
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const x = box.min.x + (i + 0.5) / N * boyut.x;
        const z = box.min.z + (j + 0.5) / N * boyut.z;
        ray.set(new THREE.Vector3(x, ust, z), asagi);
        const h = ray.intersectObject(fincanObj, true);
        if (!h.length) continue;
        const p = h[0].point;
        const n = h[0].face ? h[0].face.normal.clone()
          .applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(h[0].object.matrixWorld)) : null;
        if (n && n.y > 0.4) ilkVurus.push(p);   // yukarı bakan yüzeyler
      }
      if (!ilkVurus.length) {
        const c = box.getCenter(new THREE.Vector3());
        return { merkez: c, tabanY: box.min.y + boyut.y * 0.15, icR: Math.min(boyut.x, boyut.z) * 0.3, boyut };
      }
      // iç taban = düşük y'li küme (rim ve kulp yüksek y'de kalır → elenir)
      const rimY = Math.max(...ilkVurus.map(p => p.y));
      const taban = ilkVurus.filter(p => p.y < rimY - boyut.y * 0.22);
      const kume = taban.length ? taban : ilkVurus;
      const merkez = kume.reduce((a, p) => a.add(p), new THREE.Vector3()).multiplyScalar(1 / kume.length);
      const tabanY = kume.reduce((s, p) => s + p.y, 0) / kume.length;
      const uzak = kume.map(p => Math.hypot(p.x - merkez.x, p.z - merkez.z)).sort((a, b) => a - b);
      const icR = uzak[Math.floor(uzak.length * 0.9)] || Math.min(boyut.x, boyut.z) * 0.3;
      return { merkez, tabanY, icR, boyut };
    }

    const draco = new DRACOLoader().setDecoderPath(o.dracoPath);
    const loader = new GLTFLoader().setDRACOLoader(draco);

    function merkezle(obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const merkez = box.getCenter(new THREE.Vector3());
      const boyut = box.getSize(new THREE.Vector3());
      obj.position.sub(merkez);          // merkeze al
      const olcek = 1.2 / Math.max(boyut.x, boyut.y, boyut.z);
      return { box, boyut, olcek };
    }

    // fincan yükle
    const durum = { hazir: false, hata: null };
    loader.load(o.fincanUrl, (gltf) => {
      const fincan = gltf.scene;
      const m = merkezle(fincan);
      kok.add(fincan);
      kok.scale.setScalar(m.olcek);
      fincanBBox = m;
      fincanObj = fincan;
      durum.hazir = true;
      if (o.telveYanlar || o.telveTepe) sahne_telveAyarla({ yanlar: o.telveYanlar, tepe: o.telveTepe });
      if (secenekler.tabakUrl) {
        loader.load(secenekler.tabakUrl, (t) => {
          const tb = t.scene;
          const tbox = new THREE.Box3().setFromObject(tb);
          const tc = tbox.getCenter(new THREE.Vector3());
          tb.position.sub(tc);
          tb.position.y = -m.boyut.y * 0.5 - 0.02 / m.olcek;
          kok.add(tb);
        }, undefined, () => {});
      }
    }, undefined, (e) => { durum.hata = e; console.error("Fincan yüklenemedi", e); });

    function girdiCoz(src) {
      if (typeof src === "string") return { yanlar: [src, src, src, src], tepe: src };
      const y = (src.yanlar && src.yanlar.length) ? src.yanlar : [src.tepe];
      const yy = []; for (let i = 0; i < 4; i++) yy.push(y[i % y.length]);
      return { yanlar: yy, tepe: src.tepe || y[0] };
    }

    // Tüm iç yüzeyi kaplayan telve: 4 açı → 4 duvar sektörü + tepe → dip, kabartmalı.
    async function sahne_telveAyarla(src) {
      try {
        if (!fincanObj) return;
        const g = girdiCoz(src);
        const yanImg = await Promise.all(g.yanlar.map(imgYukle));
        const tepeImg = await imgYukle(g.tepe);
        if (telveMesh) {
          sahne.remove(telveMesh);
          telveMesh.traverse((n) => { if (n.geometry) n.geometry.dispose(); if (n.material) n.material.dispose(); });
        }
        const fit = o.telveFit
          ? { merkez: new THREE.Vector3(o.telveFit.cx, 0, o.telveFit.cz), tabanY: o.telveFit.tabanY, icR: o.telveFit.icR }
          : icTaban();
        durum.fit = { cx: fit.merkez.x, cz: fit.merkez.z, tabanY: fit.tabanY, icR: fit.icR };

        const wbox = new THREE.Box3().setFromObject(fincanObj);
        const yuk = Math.max(0.05, wbox.max.y - fit.tabanY);      // iç yükseklik (rim'e kadar)
        const rTop = fit.icR * (o.duvarUst ?? 1.02);
        const rBot = fit.icR * (o.duvarAlt ?? 0.60);
        const grup = new THREE.Group();

        // iç duvar (4 sektör)
        const dw = duvarDoku(yanImg);
        const duvarGeo = new THREE.CylinderGeometry(rTop, rBot, yuk * 0.94, 180, 72, true);
        const duvarMat = new THREE.MeshStandardMaterial({
          map: dw.renk, displacementMap: dw.yuk,
          displacementScale: -o.kabartma * fit.icR * 1.3,        // içe doğru kabartma
          roughness: 0.92, metalness: 0.0, side: THREE.BackSide,  // içeriden görünür
        });
        const duvar = new THREE.Mesh(duvarGeo, duvarMat);
        duvar.position.set(fit.merkez.x, fit.tabanY + yuk * 0.5, fit.merkez.z);
        grup.add(duvar);

        // dip (tepe fotoğrafı)
        const dd = dipDoku(tepeImg);
        const dipGeo = new THREE.CircleGeometry(rBot * 1.04, 120);
        dipGeo.rotateX(-Math.PI / 2);
        const dipMat = new THREE.MeshStandardMaterial({
          map: dd.renk, displacementMap: dd.yuk, displacementScale: o.kabartma * fit.icR * 1.6,
          roughness: 0.92, metalness: 0.0, side: THREE.DoubleSide,
        });
        const dip = new THREE.Mesh(dipGeo, dipMat);
        dip.position.set(fit.merkez.x, fit.tabanY + fit.icR * 0.02, fit.merkez.z);
        grup.add(dip);

        telveMesh = grup;
        sahne.add(grup);                         // dünyaya ekli: kamera dönerken içeride kalır
      } catch (e) { console.error("telve doku hatası", e); }
    }

    function boyutlandir() {
      const w = kap.clientWidth || g, h = kap.clientHeight || y;
      renderer.setSize(w, h);
      kamera.aspect = w / h;
      kamera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(boyutlandir);
    ro.observe(kap);

    function dongu() {
      if (!canli) return;
      requestAnimationFrame(dongu);
      kontrol.update();
      renderer.render(sahne, kamera);
    }
    dongu();

    return {
      telveAyarla: sahne_telveAyarla,
      durum,
      _kamera: kamera, _kontrol: kontrol, _sahne: sahne,
      telveGorunur(v) { if (telveMesh) telveMesh.visible = v; },
      bak(px, py, pz, tx, ty, tz) {
        kamera.position.set(px, py, pz);
        kontrol.target.set(tx || 0, ty || 0.2, tz || 0);
        kontrol.update();
      },
      otoDon(v) { kontrol.autoRotate = v; },
      yokEt() {
        canli = false;
        ro.disconnect();
        kontrol.dispose();
        renderer.dispose();
        pmrem.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  },
};
