// OPHANARK · 3D Çarklar (bekleme ekranı + genel çark görseli)
// carklar.glb'yi yükler ve her yöne (çok eksenli) döndürür.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export const OphanCarklar = {
  olustur(kap, secenekler = {}) {
    const o = Object.assign({
      url: "model/carklar_m.glb",
      dracoPath: "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
      arka: null, hiz: 1,
    }, secenekler);

    const g = kap.clientWidth || 300, y = kap.clientHeight || 300;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(g, y);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    kap.appendChild(renderer.domElement);

    const sahne = new THREE.Scene();
    if (o.arka != null) sahne.background = new THREE.Color(o.arka);
    const pmrem = new THREE.PMREMGenerator(renderer);
    sahne.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const kamera = new THREE.PerspectiveCamera(40, g / y, 0.01, 100);
    kamera.position.set(0, 0, 3);
    sahne.add(new THREE.HemisphereLight(0xffe0c0, 0x30060a, 0.6));
    const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(2, 3, 4); sahne.add(d);

    const kok = new THREE.Group(); sahne.add(kok);
    const parcalar = [];
    let canli = true;

    const draco = new DRACOLoader().setDecoderPath(o.dracoPath);
    new GLTFLoader().setDRACOLoader(draco).load(o.url, (gltf) => {
      const m = gltf.scene;
      const box = new THREE.Box3().setFromObject(m);
      const c = box.getCenter(new THREE.Vector3());
      const s = box.getSize(new THREE.Vector3());
      m.position.sub(c);
      kok.scale.setScalar(1.7 / Math.max(s.x, s.y, s.z));
      kok.add(m);
      // her mesh'e kendi rastgele ekseni + hızı
      m.traverse((n) => {
        if (n.isMesh) {
          parcalar.push({
            n, eks: new THREE.Vector3(Math.sin(parcalar.length * 1.7),
              Math.cos(parcalar.length * 2.3), Math.sin(parcalar.length * 0.9)).normalize(),
            hiz: 0.4 + (parcalar.length % 5) * 0.22,
          });
        }
      });
      if (typeof o.onYuklendi === "function") { try { o.onYuklendi(); } catch (_) {} }
    }, undefined, () => {});

    function boyutlandir() {
      const w = kap.clientWidth || g, h = kap.clientHeight || y;
      renderer.setSize(w, h); kamera.aspect = w / h; kamera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(boyutlandir); ro.observe(kap);

    const saat = new THREE.Clock();
    function dongu() {
      if (!canli) return;
      requestAnimationFrame(dongu);
      if (kap.offsetParent === null) { saat.getDelta(); return; }  // gizliyken render etme
      const dt = saat.getDelta() * o.hiz;
      // grup her yöne
      kok.rotation.y += dt * 0.5; kok.rotation.x += dt * 0.22; kok.rotation.z += dt * 0.12;
      // her çark kendi ekseninde
      for (const p of parcalar) p.n.rotateOnAxis(p.eks, dt * p.hiz);
      renderer.render(sahne, kamera);
    }
    dongu();

    return {
      hizAyarla(v) { o.hiz = v; },
      yokEt() { canli = false; ro.disconnect(); renderer.dispose(); pmrem.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); },
    };
  },
};
