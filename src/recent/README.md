# Recent Work Folder

Letakkan file/project yang ingin ditampilkan sebagai "Recent Work" di folder ini. Semua file di folder ini akan otomatis di-load dan ditampilkan di bagian Recent Work pada GallerySection.

- Hanya file gambar (jpg, png, webp, dsb) yang akan ditampilkan.
- Untuk tiap project, gunakan nama file yang deskriptif.
- Jika ingin menambah metadata (judul, deskripsi, link), tambahkan file JSON dengan nama yang sama.

Contoh struktur:
```
src/
  recent/
    project1.jpg
    project1.json
    project2.png
    project2.json
```

Contoh `project1.json`:
```json
{
  "title": "Project 1",
  "description": "Deskripsi singkat project 1",
  "link": "https://github.com/username/project1"
}
```
