export default {
    template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{disabled: pages.current_page === 1}">
        <a @click.prevent='updatePage(pages.current_page-1)' class="page-link" href="#">Previous</a></li>

        <li v-for='i in pages.total_pages' :key='i' class="page-item" :class="{active: pages.current_page === i}">
        <a class="page-link" href="#" @click.prevent='updatePage(i)'>
        {{ i }}</a></li>

        <li class="page-item" :class="{disabled: pages.current_page === pages.total_pages}">
        <a @click.prevent='updatePage(pages.current_page+1)' class="page-link" href="#">Next</a></li>
        </ul>
      </nav>`,
      props: ['pages'],
      methods: {
          updatePage(num){
              this.$emit('update' , num)  
          }

      }

};