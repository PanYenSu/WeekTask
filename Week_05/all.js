import zh from './zh_TW.js';
import pagination from './pagination.js';
import cartList from './cartList.js';

// Class 設定檔案
VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 掛載 Vue-Loading 套件
Vue.use(VueLoading);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);

//全域註冊分頁
Vue.component('pagination', pagination);

Vue.component('cartlist', cartList);
// 姓名：必填
// Email：須符合格式
// 電話：必填，超過 8 碼，input type 為 tel
// 地址：必填
// 付款方式：WebATM、ATM、Barcode、Credit、ApplePay、GooglePay
// 留言：非必填
// name	string	required	消費者名稱。
// email	string	required	消費者電子信箱。
// tel	string	required	消費者電話。
// address	string	required	運送地址。
// payment	string	required	購買方式。
// coupon	string	optional	優惠券。
// message	string	optional	使用者備註。

new Vue({
    el: '#app',
    data: {
        products: [],
        tempProduct: {
            num:0,
            imageUrl:[]
        },
        cartProducts: {},
        pagination: {},
        uuid: '7f1638b3-f468-4c9d-a7b1-49b0ae75cd3d',
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        isLoading: false,
        status: {
            loadingItem: '',
          },
        form: {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            coupon: '',
            message: '',
        }


    },
    methods: {
        getDetailed(id) {


        },
        addToCart(item, quantity=1) {
            const url = `${this.apiPath}${this.uuid}/ec/shopping`;
            this.status.loadingBtn = item.id;
            const cart = {
                product: item.id,
                quantity,
            };
            this.isLoading = true;
                axios.post(url, cart).then(()=>{
                    // this.status.loadingItem = '';
                    
                    $('#addCart').modal('show'); 
                    this.status.loadingItem = ''; 
                    this.isLoading = false;                 
                }).catch((error)=>{
                    this.isLoading = false;
                    $('#already').modal('show');
                    this.status.loadingItem = '';
                console.log(error.response.data.errors);

        });
        },
        getProducts(page = 1) {
            console.log(page);
            this.isLoading = true;
            const url = `${this.apiPath}${this.uuid}/ec/products?page=${page}`;
         
            axios.get(url).then((res) =>{                
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;
                console.log(res);
                this.isLoading = false;
                // console.log(page);
            })

        },

    },
    created() {
        this.getProducts();

    }
    
})
