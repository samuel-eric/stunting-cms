# _Backend_ Aplikasi KMS Stunting

_Backend_ untuk aplikasi KMS _stunting_ II4092 Tugas Akhir

Link _deploy_: https://stunting-cms-498222137345.asia-southeast2.run.app/admin

## Technology

_Backend_ ini dibangun dengan teknologi:
1. Payload CMS
2. Supabase untuk basis data
3. Google Cloud Storage untuk tempat penyimpanan _file_
4. Google Cloud Run untuk tempat _deploy_
5. Docker untuk _deployment_ dan _testing_

## _Integration Testing_

Untuk _integration testing_, ikuti langkah-langkah berikut:
1. Install Docker
2. Pada _root folder_, jalankan _command_ berikut:
```
docker compose up
```
4. Server lokal Payload akan berjalan pada _port_ 3000
5. Pada repositori aplikasi KMS, jalankan _command_ berikut:
```
npm run test
```
