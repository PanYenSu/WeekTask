export default {
  template: `<div class="modal-dialog" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="exampleModalLabel" class="modal-title">
          <span>預覽產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
      <strong class="text-">{{tempProduct.title}}</strong>
    </div> 
   </div>
   <img class="img-fluid img-thumbnail" :src="tempProduct.imageUrl[0]" alt="">
 </div>`,
data(){
    return {
      // products: '',
      // tempProduct: { imgaeUrl:[]},

    }
},
props: ['tempProduct','api'],
methods: { 
    //內層del方法
    imgView() {
      let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
      if (this.tempProduct.id){
      axios.delete(url).then((res) =>{
      // this.products = res.data.data;
      console.log(res);
      this.$emit('update')

      });
      
  }
      $('#delProductModal').modal('hide');
    },
}

};