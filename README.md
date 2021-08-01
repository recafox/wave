# wave

Vue 大型電商網站練習
[demo](https://recafox.github.io/wave/)

## 簡介

是 2020 年剛上完六角學院的[Vue 出一個電商網站](https://www.udemy.com/course/vue-hexschool/)時, 繳交的作品。現在看來真的非常稚嫩，程式碼有太多需要改進的地方，UI 也是一團糟，但不知道從何改起了……就先當作個黑歷史吧。
另，六角似乎沒有在維護這個電商的 API 了, 後台的 API 即使在登入成功之後, 再發出其他 request 也會跳錯。前台不受影響。

## 功能

- 購買
  - 加入 / 刪除購物車
  - 使用優惠券
- 可以按照音樂類別搜索, 也可以搭配價格, 產品名稱做搜尋及排序
- 首頁會展示各音樂種類的最新發行, 以及後台可設定首頁的「推薦給你」區塊

- 管理員功能 (註: 六角提供的 API 似乎已不再維護, 後台會出錯)
  - 登入 / 登出
  - 產品 / 優惠券 / 訂單的 CRUD
  - 產品 / 優惠券 / 訂單的搜尋以及排序

## 使用技術

- Vue, Vue router, Vue validate 做表單驗證
- Axios 處理 http request
- Sass
- Bootstrap
- Eslint
- Canvas 做**酷炫**震幅效果

## Project setup

```
npm install
```

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
