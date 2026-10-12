# APV Fuel Tracker (PWA)

Aplikasi web offline untuk menghitung biaya bahan bakar, rata-rata konsumsi,
dan estimasi jarak tempuh mobil APV. Dibangun sebagai **Progressive Web App
(PWA)** — bisa diinstall seperti aplikasi asli di HP/laptop, dan tetap
berfungsi tanpa internet setelah pertama kali dibuka.

## Isi Folder

```
apv-pwa/
├── index.html          # aplikasi utama (form input, hitung, riwayat)
├── manifest.json        # Web App Manifest (nama, ikon, warna tema)
├── service-worker.js     # caching offline
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-192-maskable.png
│   └── icon-512-maskable.png
├── .nojekyll             # supaya GitHub Pages tidak memproses file lewat Jekyll
└── README.md
```

Semua data riwayat perjalanan disimpan di **localStorage** milik browser
pengguna (bukan server), jadi tidak butuh database/backend apa pun.

---

## 1. Menjalankan di GitHub (GitHub Pages)

1. Buat repository baru di GitHub, misalnya `apv-fuel-tracker`.
2. Upload/push seluruh isi folder ini (bukan foldernya, tapi isinya) ke
   branch `main` repository tersebut. Bisa lewat:
   - **Cara termudah (tanpa command line):** di halaman repo GitHub, klik
     **Add file → Upload files**, lalu drag semua file & folder ini, commit.
   - **Cara command line:**
     ```bash
     git init
     git add .
     git commit -m "Initial commit APV Fuel Tracker PWA"
     git branch -M main
     git remote add origin https://github.com/USERNAME/apv-fuel-tracker.git
     git push -u origin main
     ```
3. Di repo GitHub, buka **Settings → Pages**.
4. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
5. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
6. Tunggu 1-2 menit, GitHub akan memberi URL seperti:
   ```
   https://USERNAME.github.io/apv-fuel-tracker/
   ```
7. Buka URL tersebut — aplikasi sudah live dan bisa diakses siapa saja.

> Pastikan nama file utama tetap **index.html** (huruf kecil semua) karena
> GitHub Pages otomatis mencari file ini sebagai halaman utama.

---

## 2. Membuat APK/App Package dengan PWA Builder

Setelah aplikasi live di GitHub Pages (langkah di atas), kamu bisa
membungkusnya jadi APK Android (atau paket untuk Windows/iOS) lewat
[PWABuilder.com](https://www.pwabuilder.com):

1. Buka **https://www.pwabuilder.com**
2. Masukkan URL GitHub Pages kamu (`https://USERNAME.github.io/apv-fuel-tracker/`)
   ke kolom pencarian, lalu klik **Start**.
3. PWA Builder akan otomatis membaca `manifest.json` dan `service-worker.js`
   dari repo ini, lalu menampilkan skor kesiapan PWA (idealnya semua ✅ hijau
   karena manifest & service worker sudah lengkap di project ini).
4. Klik tab **Android**, lalu **Generate Package** untuk mendapatkan file
   `.apk` / `.aab` yang bisa di-install langsung di HP Android atau diupload
   ke Google Play Store.
5. Ada juga opsi **Windows** dan **iOS** kalau ingin dibungkus untuk platform
   lain.

## 3. Install Langsung dari Browser (Tanpa PWA Builder)

Setelah live di GitHub Pages, pengguna juga bisa langsung install tanpa
perlu APK:

- **Android (Chrome):** buka URL → muncul banner "Tambahkan ke layar utama"
  atau tap menu ⋮ → **Install app** / **Add to Home screen**.
- **Desktop (Chrome/Edge):** buka URL → klik ikon install (⊕) di address bar.
- **iPhone (Safari):** buka URL → tombol Share → **Add to Home Screen**.

Setelah diinstall, aplikasi punya ikon sendiri, dibuka full-screen tanpa
address bar, dan tetap bisa dipakai offline karena service worker sudah
meng-cache semua file yang dibutuhkan.

---

## Fitur Aplikasi

- Input KM Pertama, KM Terakhir, jenis BBM (Pertalite/Pertamax/Pertamax
  Turbo), liter dibeli, harga per liter, dan tanggal pengisian BBM.
- Hitung otomatis: jarak tempuh, konsumsi (km/liter), total biaya, biaya
  per km.
- Otomatis menghitung perkiraan sisa BBM di tangki dan estimasi jarak
  tambahan yang masih bisa ditempuh, berdasarkan rata-rata konsumsi dari
  riwayat tersimpan.
- Kartu tambahan untuk estimasi jarak dari sisa BBM yang diketahui manual
  (misalnya dari indikator bensin).
- Riwayat perjalanan tersimpan permanen di device (localStorage), dengan
  fitur hapus satu per satu atau hapus semua.
- Ringkasan rata-rata keseluruhan (total jarak, rata-rata konsumsi, total
  biaya, rata-rata biaya per km) dari semua riwayat.

## Catatan Teknis

- Karena data disimpan di `localStorage` per-browser/per-device, riwayat
  **tidak tersinkron otomatis** antar HP atau antar browser berbeda. Ini
  murni aplikasi offline-first tanpa server.
- Kalau ingin update `manifest.json`, `service-worker.js`, atau
  `index.html` di kemudian hari: naikkan angka versi di
  `CACHE_NAME` pada `service-worker.js` (misalnya jadi `apv-fuel-tracker-v2`)
  supaya pengguna lama otomatis mendapat versi terbaru, bukan versi cache
  lama.
