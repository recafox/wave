import Vue from 'vue';
import VueRouter from 'vue-router';
// -------view
import login from '../views/Login.vue';

import admin from '../views/Admin.vue';
import welcome from '../views/Welcome.vue';
import adminProduct from '../Components/Admin-components/Admin-product.vue';
import adminCoupon from '../Components/Admin-components/Admin-coupon.vue';
import adminOrder from '../Components/Admin-components/Admin-order.vue';

import home from '../views/Home.vue';
import customerHomepage from '../Components/Customer-components/Home-Homepage.vue';
import customerProduct from '../Components/Customer-components/Product.vue';
import customerCart from '../Components/Customer-components/Cart.vue';
import customerBill from '../Components/Customer-components/Bill.vue';
import customerBillConfirm from '../Components/Customer-components/Bill-Confirm.vue';
import customerProductDetail from '../Components/Customer-components/Product-detail.vue';
import customerQA from '../views/QA.vue';


Vue.use(VueRouter);

const routes = [
  {
    // 避免用戶進入不存在頁面
    path: '*',
    redirect: '/homepage',
  },
  {
    path: '/homepage',
    component: home,
    children: [
      {
        path: '',
        name: 'Homepage',
        component: customerHomepage,

      },
      {
        path: 'qa-corner',
        name: 'Customer_QA',
        component: customerQA,
      },
      {
        path: 'customer-products',
        name: 'Custom_products',
        component: customerProduct,
      },
      {
        path: '/detail/:id',
        name: 'Product_detail',
        component: customerProductDetail,
      },
      {
        path: 'customer-cart',
        name: 'Custom_cart',
        component: customerCart,
      },
      {
        path: 'customer-bill',
        name: 'Custom_bill',
        component: customerBill,
      },
    ],
  },
  {
    path: '/customer-billConfirm/:id',
    name: 'Customer_billConfirm',
    component: customerBillConfirm,
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: welcome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: adminProduct,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: adminCoupon,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'orderlist',
        name: 'orderlist',
        component: adminOrder,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
