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
頁面之間的導航要再更明確一點，沒有 logo、其他分頁選單、或是該頁面的標題等，很難在頁面之間流暢移動與知道自己所在的位置，很容易造成使用者迷路

### 首頁

最近發行的區塊，可以讓各分類的標題連結到產品頁的相關分類頁面

以優惠資訊目前的內容可以更改成像是 Alert 的樣式且 fix 在頂部或底部

首頁的內容區塊可以再更豐富一些（e.g. 產品分類、熱門產品、行銷活動、訂閱電子報等等）
產品頁

最上面的區塊用途可以再更明確一點

產品詳情頁的內容可以再更豐富（e.g. 歌手介紹、歌曲試聽、產品細節、常見問題等等）

###　購物車

同樣的產品分別加入購物車兩次時，建議清單可以合併成一個加總數目的品項

###　結帳表單

建議讓使用者知道總共有幾個結帳步驟與目前所在的步驟為何

產品建議要能夠調整數量

優惠碼欄位的總欄寬可以與手機的欄位寬度一致並靠右對齊，「有優惠碼？」的字樣也可以視情況刪除

選填必填必須要區分

地址的縣市和區的欄位寬度與姓名和手機的欄位寬度都應該要保持一致，且地址的欄位可以都直接顯示，並加上相對應的 Placeholder（e.g. 請選擇縣市、鄉鎮市區之類的）

如果沒有撰寫留言在確認付款的頁面就不需要出現留言的欄位

付款成功後建議可以再做出更大的差異，並引導使用者繼續購物

按鈕若是在資料還沒填齊之前不能點擊，建議在 cursor 加上 not-allowed