# Diary App

Aplikasi buku harian sederhana yang dibuat dengan **React Native + Expo** untuk tugas praktikum Mobile Programming (Pertemuan 2).

Nama : M. Abdullah Harun Musa F 
NIM  : 2430511074 


## Cara Menjalankan Proyek

1. Pastikan Node.js sudah terpasang.
2. Clone atau ekstrak proyek, lalu masuk ke foldernya:
   ```bash
   cd Diary-App-M.Abdullah-main
   ```
3. Pasang dependensi:
   ```bash
   npm install
   ```
4. Jalankan proyek:
   ```bash
   npx expo start
   ```
5. Scan QR code dengan aplikasi **Expo Go** di HP, atau tekan `a` untuk membuka emulator Android.

> Jika jaringan bermasalah, gunakan `npx expo start --tunnel`.

## Fitur yang Diselesaikan

- [x] Menampilkan **5 entri diary** (judul, tanggal, pratinjau, dan mood).
- [x] **Gambar lokal** dari folder `assets/moods` (tidak lagi memakai gambar remote).
- [x] **Avatar pengguna** pada header menggunakan komponen `Image`.
- [x] **Variasi tampilan kartu berdasarkan mood**: warna border dan label mood berbeda untuk Bahagia (hijau), Tenang (biru), dan Fokus (ungu).
- [x] **Reusable component**: `DiaryCard` dipisahkan ke folder `components` dan dipakai ulang untuk setiap entri.
- [x] Penggunaan komponen dasar: `View`, `Text`, `Image`, `ScrollView`, props, dan `StyleSheet`.

## Struktur Folder

```
Diary-App-M.Abdullah-main/
├── App.js
├── index.js
├── app.json
├── package.json
├── assets/
│   └── moods/
│       └── happy.png
└── src/
    ├── components/
    │   └── DiaryCard.js
    └── screens/
        └── DiaryListScreen.js
```

## Screenshot

Tampilan aplikasi di Expo Go / emulator:

![Tampilan Diary App](screenshots/screenshot.jpg)

<!-- Letakkan screenshot di folder screenshots/ dengan nama screenshot.png -->

## Teknologi

- React Native
- Expo
- react-native-safe-area-context
