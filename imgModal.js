export default {
  template: `<div class="modal-dialog" role="document">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="exampleModalLabel" class="modal-title">
          <span>預覽產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" @click='i=0'>&times;</span>
        </button>
    </div>
    <div class="modal-body">
      <strong class="text-">{{tempProduct.title}}</strong>
    
       <nav aria-label="Page navigation example" >   
       <ul class="pagination justify-content-center">
       <li class="page-item" :class="{disabled: i === 0}">
       <a v-if='i==0' @click.prevent='i=0' class="page-link" href="#">&laquo;</a>
       <a v-else @click.prevent='i--' class="page-link" href="#">&laquo;</a>
       </li>
       <li class="page-item" :class="{disabled: i === tempProduct.imageUrl.length-1}">
       <a v-if='i < tempProduct.imageUrl.length' @click.prevent='i++' class="page-link" href="#">&raquo;</a>
       <a v-else @click.prevent='i == tempProduct.imageUrl.length-1' class="page-link" href="#">&raquo;</a>
       </li>
       </ul>
     </nav>

     </div> 
   </div>
   <img class="img-fluid img-thumbnail" :src="tempProduct.imageUrl[i]" alt="" style="height:300px;width:800px;">
 </div>`,
data(){
    return {
      i: 0,
    }
},
props: ['tempProduct'],
methods: {  
    imgView() {

      // this.$emit('update',num);   
  },

}
};