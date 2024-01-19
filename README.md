# Bot Jobstreet Exprees Auto Applied

Deskripsi singkat proyek disini.

## Cara Install


1. Clone repositori :

    ```bash
    git clone https://github.com/mhrdwan/bot-auto-applied-jobstreet-express
    ```

2. Masuk ke direktori proyek:

    ```bash
    cd bot-auto-applied-jobstreet-express
    ```


3. Buka https://id.jobstreetexpress.com/ login seperti biasa


4. Buka devtools / ctrl + shift + c lalu ke application => cookies (cari `jora_user_session_token` dan copy valuenya)

   
5. Masuk ke folder bot-auto-applied-jobstreet-express buka file `cookies.json`


6. Masukkan value `jora_user_session_token` yang sudah di copy tadi


7. Kemudian buka file `carijob.js` isikan url dari jobstreet exprees yang kalian cari , contohnya "https://id.jobstreetexpress.com/j?sp=search&trigger_source=serp&q=it&l=Jakarta"


8. Jalankan Script
    ```javascript
    node .
    ```




