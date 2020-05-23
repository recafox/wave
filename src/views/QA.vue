<template>
<!-- eslint-disable max-len -->
	<div class='container-fluid p-3 d-flex flex-column align-items-center'>
		<h2 class='title-primary m-top'>常見問答</h2>
		<div class='col-sm-8 text-white mt-4'>
			<h3>退換貨說明</h3>
			<div class='p-2 text-container'>
				<ul>
					<li>
						請注意：商品一經開封，恕無法辦理退貨，敬請見諒。（外包塑膠膜已撕開或商品塑膠袋已打開，即算開封狀態）
					</li>
					<li>
						依《消費者保護法》，消費者享有7天猶豫期之權益，收到商品超過7天，恕不接受退貨。
					</li>
					<li>
						請務必完整保留包裹中的包裝材料，退貨商品須完整保護包裝，若回收商品後發現商品外觀有瑕疵，我們將保留退貨退款的權利。
					</li>
					<li>
						如因退貨收件地址填寫錯誤（廠商上收退貨時）或產生的其他因素，導致本公司無法取得退貨商品，將會延長退換貨時間，並會由您支付額外的退換貨運費。
					</li>
					<li>
						若您於本網站3個月內退貨次數超過5次或有其他異常者，本網站有權不經事先通知，逕行限制您使用會員帳號的權利，若造成您的不便，敬請見諒。
					</li>
				</ul>
			</div>
				<h3 class='mt-5'>可以代訂商品嗎？</h3>
				<div class='p-2 text-container'>
					<p>
						可以！請您將商品資料包含產品條碼或編號、藝人、專輯名稱等資料寄到客服信箱，資料的齊全程度會影響我們的客服處理速度。
					</p>
				</div>
			<h3 class='mt-5'>約多久能收到商品？</h3>
			<div class='p-2 text-container'>
				<p>
					如您的訂單為現貨商品(已到貨商品)：
					<ul style='list-style:disc'>
						<li>
							使用「信用卡刷卡」、「貨到付款」、「ATM轉帳/匯款」、「支付寶付款」之訂單：於本站出貨後預計1-2日送達(如遇連續假日將順延)。配送至國內離島地區、國外除外。
						</li>
						<li>
							使用「便利商店取貨付款」之訂單：於本站出貨後預計2-4個工作日送達指定門市(如遇連續假日將順延)。如您需在短時間內收到商品(例如參加活動)，請改用其他付款方式。
						</li>
					</ul>
					如您的訂單包含預購商品(未到貨商品)，將待全部商品到貨後出貨，無法分開處理。
					<ul style='list-style:disc'>
						<li>
							國外發行之進口商品，因下單訂購的時間問題，有可能無法於發行當周到貨。預計到貨日依本站商品頁面說明為主。
						</li>
						<li>
							台灣唱片公司代理進口商品，依台灣唱片公司到貨時間為主。
						</li>
					</ul>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Customer_QA',
  beforeRouteLeave(to, from, next) {
    const vm = this;
    vm.$bus.$emit('home-navbarClose');
    next();
  },
};
</script>

<style lang='scss' scoped>
.text-container{
	background: rgba(52, 58, 64, 0.7);
	padding: 1rem;
	margin-top: 1rem;
	ul{
		list-style-position: inside !important;
		}
}
</style>
