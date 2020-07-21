/* global Vue */
/* eslint-disable no-new */
import pagination from './pagination.js';
import modal from './modal.js';
import delmodal from './delmodal.js';
import imgmodal from './imgmodal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delmodal', delmodal);
Vue.component('imgmodal', imgmodal);

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: []
    },
    api: {
      uuid: '7f1638b3-f468-4c9d-a7b1-49b0ae75cd3d',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '9qHKqNGdSSEyNUxuJeR1CxaUcnz8C7oSL2beY9FG7eJ6yndOettY5AoD5zbG',
    isNew: '',
    loadingBtn: '',
    status: {
      fileUploading: false,
    },
  },
  methods: {
    updateProduct() {},
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = { imageUrl: [] };
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.loadingBtn = item.id;
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(url).then((res) => {
            this.tempProduct = res.data.data;
            $('#productModal').modal('show');
            this.loadingBtn = ''; //清除
          });
          break;
        case 'del':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;
        case 'img':
          $('#imgProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    // 外層del方法
    // delProduct() {
    //   if (this.tempProduct.id) {
    //     const id = this.tempProduct.id;
    //     this.products.forEach((item, i) => {
    //       if (item.id === id) {
    //         this.products.splice(i, 1);
    //         this.tempProduct = {imageUrl:[]};
    //       }
    //     });
    //   }
    //   $('#delProductModal').modal('hide');
    // },
    getProducts(num = 1) {
      console.log(num);
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
      axios.get(url).then((res) => {
        console.log(res);
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.tempProduct = { imageUrl: [], };
        $('#productModal').modal('hide');        

        // if (this.tempProduct.id) {
        //   this.tempProduct = {
        //     imageUrl: [],
        //   };
        //   $('#productModal').modal('hide');
        // }

      });
    },
    logout() {
      // 請加入 Token
      // var vm = this;
      const url = `${this.api.path}auth/logout`;
          axios.post(url, this.token).then(() => {
            // if (response.data.success) {
              // vm.$router.push('/login');
              // console.log(res);

      // document.cookie = `CelesteToken=; expires=; path=/`;
      // document.cookie = `hexToken=${this.token}; expires=${new Date(expired * 1000)}; path=/`;

            window.location = 'login.html';
          // }
        });
      
    },
  },
  created() {
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
  },
  
});
