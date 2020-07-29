import zh from './zh_TW.js';
import pagination from './pagination.js';

// Class 設定檔案，自定義設定檔案，錯誤的 className
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
        cartTotal: 0,
        quantity: 0,
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
          this.isLoading = true;
          const url = `${this.apiPath}${this.uuid}/ec/product/${id}`;
          axios.get(url).then((res) => {           
            this.tempProduct = Object.assign(res.data.data);
        //  tempProduct 的 num 沒有預設數字 因此 options 無法選擇預設欄位
        // 故要增加這一行解決該問題 如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        this.$set(this.tempProduct, 'num', 0);           
            console.log(this.tempProduct);
            this.isLoading = false;
            $('#productModal').modal('show');
          }).catch((error) => {
            this.isLoading = false;
            console.log(error);
          })
        },
        addToCart(item, quantity=1) {
            this.status.loadingBtn = item.id;
            $('#productModal').modal('hide');
            // this.isLoading = true;
            const url = `${this.apiPath}${this.uuid}/ec/shopping`;            
            const cart = {
                product: item.id,
                quantity,
            };
            console.log(cart.quantity);
            axios.post(url, cart).then(()=>{
                $('#cartAdd').modal('show'); 
                this.status.loadingItem = ''; 
                // this.isLoading = false;
                this.quantity += cart.quantity;                 
            }).catch((error)=>{
                // this.isLoading = false;
                $('#cartAlready').modal('show');
                this.status.loadingItem = '';
            console.log(error.response.data.errors);
        });
        // this.getCartNum();
        },
        getCartList() {
            this.isLoading = true;
            const url = `${this.apiPath}${this.uuid}/ec/shopping`;
            axios.get(url).then((res) => {
              this.cartProducts = res.data.data;
              console.log(this.cartProducts);
              this.isLoading = false;
              // 累加總金額
              this.cartTotal = 0;
              this.cartProducts.forEach((item) => {
                this.cartTotal += item.product.price * item.quantity;
              }); 
              $('#cartModal').modal('show');
            }).catch((error)=>{
                this.isLoading = false;
            console.log(error);
            });
          },
          removeAllCartItem() {
            this.isLoading = true;
            this.cartProducts = [];
            this.cartTotal = 0;
            $('#cartModal').modal('hide');
            const url = `${this.apiPath}${this.uuid}/ec/shopping/all/product`;
            axios.delete(url).then(() => {
              this.isLoading = false;
              $('#cartModal').modal('show');
            }).catch((error)=>{
              this.isLoading = false;              
              console.log(error)
            });
            this.quantity = 0;
            
          },
          removeCartItem(item, num) {
            this.isLoading = true;
            const url = `${this.apiPath}${this.uuid}/ec/shopping/${item.id}`;
            $('#cartModal').modal('hide');
            axios.delete(url).then(() => {
              $('#cartModal').modal('hide');
              // console.log(item);
              this.isLoading = false;       
              this.getCartNum();  
              this.getCartList();                           
            }).catch((error)=>{             
              this.isLoading = false;             
              console.log(error)
            });          
          },
          quantityUpdata(id, num) {
            this.isLoading = true;
            const url = `${this.apiPath}${this.uuid}/ec/shopping`;
            const cart = {
              product: id,
              quantity: num,
           };
            axios.patch(url, cart).then(() => {
                this.isLoading = false;
                this.getCartList();
                this.getCartNum();
            });
          },
          orderForm(){
            $('#cartModal').modal('hide');
            $('#orderFormModal').modal('show');            
          },
          createdOrder() {
            $('#orderFormModal').modal('hide');
            // this.isLoading = true;
            console.log('送出表單');
            $('#orderSuccessModal').modal('show');
            // this.isLoading = false;
          },
        getCartNum() {
        const url = `${this.apiPath}${this.uuid}/ec/shopping`;
        this.quantity = 0;
        axios.get(url).then((res) => {
            this.cartProducts = res.data.data;
            this.cartProducts.forEach((item) => {
            this.quantity += item.quantity;          
            }); 
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
            }).catch((error)=>{
              this.isLoading = false;              
              console.log(error)
            });

        },

    },
    created() {
        this.getProducts();
        this.getCartNum();

    }
    
})
