<template>
	<div>
		<div class="content">
			<div class="container">
				

				<Button class="_mar_b30" type="primary" @click="addModal = true">Add Product</Button>
				<Modal
					v-model="addModal"
					title="Add a new Product"
					:mask-closable="false"
					:closable="false"
				>
					<div class="row">
						<div class="col-md-12">
							<div class="_3login_input_group">
								<label class="form_label">Name</label>
								<Input v-model="formItem.name" placeholder="Enter Name..."></Input>
							</div>
						</div>
						<div class="col-md-12">
							<div class="_3login_input_group">
								<label class="form_label">Description</label>
								<Input v-model="formItem.description" placeholder="Enter Description..."></Input>
							</div>
						</div>
						<div class="col-md-12">
							<div class="_3login_input_group">
								<label class="form_label">Price</label>
								<Input v-model="formItem.price" type="number" placeholder="Enter price..."></Input>
							</div>
						</div>
					</div>
					<div slot="footer">
						<Button type="default" @click="addModal=false">Close</Button>
						<Button type="primary" @click="product_add" :disabled="loading" :loading="loading">
                            {{loading ? 'Adding...' : 'Add Product'}}
                        </Button>
					</div>
				</Modal>
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20 _mar_t30">

					<p class="_title0">Product</p>
                    
                    <template v-if="pagination.total==0">
                        <Alert>No Data Dound</Alert>
                    </template>
                    <template v-else-if="loading==true">
                        <Alert>Data Loading</Alert>
                    </template>
                    <template v-else>
                        <div class="_overflow _table_div">
                            <table class="_table">
                                    <!-- TABLE TITLE -->
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                                    <!-- TABLE TITLE -->


                                    <!-- ITEMS -->
                                <tr v-for="(item,index) in ProductData" :key="index">
                                    <td>{{item.id}}</td>
                                    <td class="_table_name">
                                        <span>{{item.name}}</span>
                                    </td>  
                                    <td>
                                        {{item.description}}
                                    </td>
                                    <td>
                                        BDT {{item.price}}
                                    </td>   
                                    <td>
                                        <template>
                                            <button class="_btn _action_btn edit_btn1" @click="isEditOn(item,index)" >
                                                Edit
                                            </button>
                                            <button class=" _btn _action_btn make_btn1" @click="delete_product(item.id,index)" :disabled="loading" :loading="loading">
                                                 {{loading ? 'Deleting...' : 'Delete'}}
                                            </button>
                                        </template>
                                    </td>
                                </tr>
                                    <!-- ITEMS -->
                            </table>

                            <div style="text-align:center;" class="pagination_div _mar_t30">
                            <Page :current="parseInt(pagination.page)" :total="pagination.total" @on-change="getpaginate" :page-size="parseInt(pagination.perPage)" />
                        </div>
                        </div>
                    </template>
				</div>
				
				 <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->

				 <Modal
					v-model="editModal"
						:mask-closable="false"
						:closable="false"
						title="Edit Product"
						>
						<div class="row">
							<div class="col-md-12">
                                <div class="_3login_input_group">
                                    <label class="form_label">Name</label>
                                    <Input v-model="edit_form.name" placeholder="Enter Name..."></Input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="_3login_input_group">
                                    <label class="form_label">Description</label>
                                    <Input v-model="edit_form.description" placeholder="Enter Description..."></Input>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="_3login_input_group">
                                    <label class="form_label">Price</label>
                                    <Input v-model="edit_form.price" type="number" placeholder="Enter price..."></Input>
                                </div>
                            </div>
						</div>
						<div slot="footer">
							<Button type="default" @click="editModal=false">Close</Button>
							<Button type="primary" @click="edit_product" :disabled="loading" :loading="loading">
                                {{loading ? 'Updating...' : 'Update'}}
                            </Button>
						</div>
					</Modal>
			</div>
		</div>
	</div>
</template>



<script>

export default {
	data(){
		return {
            addModal:false,
            editModal:false,
            formItem:{
                name:'',
                description:'',
                price:'',
            },
            edit_form:{
                name:'',
                description:'',
                price:'',
            },
            ProductData:[],
            page:1,
			pagination: {},
			loading:false,
            editIndex:-1,

		}
	},

	methods : {
	
		async getpaginate(page = 1){
			const res  = await this.callApi('get',`all_product?page=${page}`)
			if(res.status == 200){
				this.ProductData = res.data.data
				this.pagination = res.data
			}

			else{
				this.swr()
			}
        },
        
        async product_add(){
			if(this.formItem.name.trim()=='') return this.e('Name is required')
			if(this.formItem.description.trim()=='') return this.e('Description is required')
			if(this.formItem.price=='') return this.e('Price is required')
			this.loading = true
        	const res = await this.callApi('post',`product_add?page=${this.page}`,this.formItem)
			if(res.status==200){
				this.addModal=false
				this.s('Product added successfully!')
				this.ProductData = res.data.data
				this.pagination = res.data
				this.formItem={}
			}
			else{
				this.swr();
            }
            this.loading = false
		},
	
		//Delete
		async delete_product(id,index){
			if(!confirm("Are you sure to delete this Product")){
				return;
			}
			let ob = {
				id:id
			}
			this.loading = true
			const res = await this.callApi('post',`delete_product?page=${this.page}`,ob)
			if(res.status == 200){
				this.i('Product have been successfully Deleted!')
				this.ProductData.splice(index,1)
				this.ProductData = res.data.data
				this.pagination = res.data
			}
			else{
				this.swr();
            }
            this.loading = false
        },
        
        //Edit
		async edit_product(){
			if(this.edit_form.name.trim()=='') return this.e('Colour name is required')
 			this.loading = true
        	const res = await this.callApi('post', 'update_product',this.edit_form)
			if(res.status==200){
				this.s('Product has been updated successfully!')
				this.editModal = false
				this.ProductData[this.editIndex].name = this.edit_form.name
				this.ProductData[this.editIndex].description = this.edit_form.description
				this.ProductData[this.editIndex].price = this.edit_form.price
			}
			else{
				this.swr();
            }
            this.loading = false
		},
		isEditOn(item,index){
			this.edit_form.id = this.ProductData[index].id
			this.edit_form.name = this.ProductData[index].name
			this.edit_form.description = this.ProductData[index].description
			this.edit_form.price = this.ProductData[index].price
			this.editIndex = index
			this.editModal = true
		},
		
	}, 

	async created(){
    
        this.loading = true
		const [res1,res2, res3, res4] = await Promise.all([ 
 			this.callApi('get',`all_product?page=${this.page}`),
			])
			if(res1.status == 200) {
                 this.ProductData= res1.data.data
                 this.pagination = res1.data
			}
			else{
				this.swr()
			}
		this.loading = false
	}, 
	
}
</script>