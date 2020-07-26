export default {
    template: `
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class='{disabled: pages.current_page === 1}'>
      <a @click.prevent='updatePage(pages.current_page-1)' class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="item in pages.total_pages" :key='item' class="page-item" :class="{active: pages.current_page === item}">
    <a class="page-link" href="#" @click.prevent='updatePage(item)'>{{item}}</a></li>
    
    <li class="page-item" :class='{disabled: pages.current_page === pages.total_pages}'>
      <a @click.prevent='updatePage(pages.current_page+1)' class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    `,
    props: ['pages'],
    methods: {
        updatePage(page) {
            // console.log(page);
            this.$emit('update',page);
        }
        
    }
}