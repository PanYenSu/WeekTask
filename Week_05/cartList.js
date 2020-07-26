export default {
    template: `<div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      </div>
    </div>`,
    data() {
        return {
            cartProducts: {},
        }
    },
    prots: ['tempProduct'],
    methods: {
        addList(){
            this.cartProducts = Object.assign({}, this.tempProduct);
            
        }
        

    }
}