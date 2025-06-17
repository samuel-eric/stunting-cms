# _Backend_ untuk Aplikasi KMS Stunting

_Backend_ dibangun menggunakan Payload, dengan basis data Postgres yang disediakan Supabase dan telah di-_deploy_ di Google Cloud.

Link _deploy_: https://stunting-cms-498222137345.asia-southeast2.run.app/admin

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
