export default {
  props: ['temp-product','isNew'],
  template: '#productModal',
  data() {
    return {
      modal: null
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false
    });
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal(){
      this.modal.hide();
    },
    updateProduct(){
      const product = {
      data: this.tempProduct 
      }
        let url = `${apiUrl}/api/${apiPath}/admin/product`;
        let httpMethod = 'post';
        // 當不是新增商品時則切換成編輯商品 API
        if (!this.isNew) {
          url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
          httpMethod = 'put';
        }
        axios[httpMethod](url, product)
        .then((res) => {
          console.log(res)
          this.$emit('getProduct')
          // this.closeModal();
        })
    },
    updateImg(){
      const url = `https://vue3-course-api.hexschool.io/api/${this.apiPath}/admin/upload`;
      const file= document.querySelector('#file').files[0];
      const formData = new FormData();
      formData.append('file-to-upload',file)
      axios.post(url,formData)
      .then((res)=>{
        this.$emit('getImage',res.data.imageUrl)

        this.tempProduct.imageUrl=res.data.imageUrl
      })
    },
  },
  template:`
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="imageUrl">輸入圖片網址</label>
              <input id="imageUrl" v-model="tempProduct.imageUrl" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <input id="file" type="file" name="file-to-upload" @change="updateImg">

            <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                  placeholder="請輸入分類">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control" placeholder="請輸入單位">
              </div>
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input id="origin_price" v-model.number ="tempProduct.origin_price" type="number" class="form-control"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input id="price" v-model.number ="tempProduct.price" type="number" class="form-control"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                placeholder="請輸入產品描述">
            </textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                placeholder="請輸入說明內容">
            </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                  :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>
</div>
  `
}