<template>
    <div class="container">
        <div class="content">
         <div class="header">
           <h5 class="title">
             {{ product.title }}
           </h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="body">
          <img :src="product.imageUrl[0]" class="img-fluid" alt=''>
          <!-- 輪播 (Carousel) 無法實現 -->
          <!-- <div class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div v-for='i in tempProduct.imageUrl' :key='i' class="carousel-item active">
                <img :src="i" class="img-fluid" alt=''>
             </div>
        </div>
<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div> -->

      <!-- blockquote 無法實現 -->
           <p class="font-weight-bold" v-html="product.content"></p>
           <p class="font-weight-light text-right" > - {{ product.description }}</p>

           <!-- <blockquote class="blockquote">
             <p class="col-sm-3" v-html="tempProduct.content"></p>
             <footer class="blockquote-footer text-right" >
               {{ tempProduct.description }}
             </footer>
           </blockquote> -->

           <div class="d-flex justify-content-between align-items-baseline">
             <div v-if="!product.price" class="h4">
               {{ product.origin_price }} 元
             </div>
             <del v-if="product.price" class="h6">原價 {{ product.origin_price }} 元</del>
             <div v-if="product.price" class="h4 text-danger">
               現在只要 {{ product.price }} 元
             </div>
           </div>
           <select v-model="product.num" name class="form-control mt-3">
             <option value="0" disabled selected>
               請選擇數量
             </option>
             <option v-for="num in 10" :key="num" :value="num">
               選購 {{ num }} {{ product.unit }}
             </option>
           </select>
         </div>
         <div class="modal-footer">
           <div v-if="product.num" class="text-muted text-nowrap mr-3">
             小計
             <strong>{{ product.num * product.price }}</strong> 元
        </div>
 <button type="button" class="btn btn-secondary ml-auto">
  <!-- <i v-if="product.id === status.loadingItem" class="spinner-border spinner-border-sm"></i> -->
<!-- <i v-if="status.loadingItem === item.id" class="spinner-grow spinner-grow-sm"></i> -->
             加到購物車
           </button>
         </div>
       </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      product: {
        num: 1,
      },
    };
  },
  created() {
    console.log(this.$route);
    // const { id } = this.$route.params;
    const aID = this.$route.params.id;
    console.log(aID);
  },
};
</script>
