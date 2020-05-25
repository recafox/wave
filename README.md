# wave

Vue大型電商網站練習
[demo](https://recafox.github.io/wave/)



## Project setup
```
npm install
```
[demo](https://recafox.github.io/soundwave/)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

命名檔案時，請不要使用方向、數字等來命名

?? 請斟酌使用 scoped，濫用 scoped 將會導致你必須每一頁都一直 import SCSS。

?? router/index.js 請改成 VueCli3 import 方式。

撰寫 SCSS 時可以不用寫前綴詞，例如：Admin-searchbar.vue。

變數命名上請不要過度簡化，例如：b，請盡可能語義化變數增加可讀性。

可建立 frontend 及 backend 資料夾區分前後台，區分的好處在於方便自己將來的維護。

可建立一個 scss 資料夾區分相關檔案，例如：all.scss、helpers 等。

可多加美化 index.html 中的 meta，另外請多加注意 lang 要調整至相關語系，例如調整成 「zh-Hant-TW」，若是英語系網站則可以保留預設 「en」。



畫面的修改建議。

### 整體
建議規範出網頁的標準色，並且在套用時要根據相同的邏輯使用（e.g. 紫色是 primary color，綠色是 secondary color）所以像是同一個功能按鈕就應該都套用同一個標準色

### 首頁

最近發行的區塊，可以讓各分類的標題連結到產品頁的相關分類頁面
- 還不知道怎麼做

### 產品頁

最上面的區塊用途可以再更明確一點

產品詳情頁的內容可以再更豐富（e.g. 歌手介紹、歌曲試聽、產品細節、常見問題等等）

###　購物車

同樣的產品分別加入購物車兩次時，建議清單可以合併成一個加總數目的品項
- 若購物車已有商品，跳出提示不另外新增

###　結帳表單

建議讓使用者知道總共有幾個結帳步驟與目前所在的步驟為何

產品建議要能夠調整數量
- 課程提供的api好像沒有提供到客戶端修改訂單的功能，我嘗試用別的方法繞過這個問題，但是變得不必要的複雜，而且也沒成功，失敗了...

「有優惠碼？」的字樣也可以視情況刪除

付款成功後建議可以再做出更大的差異，並引導使用者繼續購物

