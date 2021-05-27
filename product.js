import pagination from './components/pagination.js';
import productModal from './components/product-modal.js';

const app = Vue.createApp({
  data(){
    return{
      products:[],
      tempProduct:{},
      isNew:true,
      productQuantity:0,
      pages:{},
    }
  },
  mounted() {
    this.getData();
    this.checkLogin();
  },
  methods: {
    openProductModal(status,item){
      console.log(status=== 'new')
      if(status === 'new'){
        this.tempProduct = {},
        this.isNew = true;
        this.$refs.productModal.openModal();
      }else{
        this.tempProduct = {...item}
        this.isNew =false;
        this.$refs.productModal.openModal();
      }
    },
    getData(page=1){
      let url = `${apiUrl}/api/${apiPath}/products`;
      if(page !== undefined){
        url =  `${apiUrl}/api/${apiPath}/products?page=${page}`;
      }
      axios.get(url)
        .then((response) => {
          console.log(response)
          this.products = response.data.products;
          this.pages = response.data.pagination;
          this.productQuantity = this.products.length;

        })
    },
    removeData(id){
      const url = `${apiUrl}/api/${apiPath}/admin/product/${id}`;
      axios.delete(url)
      .then(() => {
        this.getData();
      })
    },
    // 驗證
    checkLogin(){
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = `${myCookie}`;
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
    },
  },
})
app.component('product-modal', productModal)
app.component('pagination', pagination)
app.mount('#app');