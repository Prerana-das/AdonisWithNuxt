<template>
  <div>
        <!-- Blog Promo Area Start -->
		<section class="blog-promo black-overlay"> 
			<div class="container">
				<div class="row">
					<div class="col-lg-8 text-center mx-auto">
						<div class="blog-promo-content">
							<h1>Blog</h1>
              			<Button class="_mar_b30 create_btnn" type="primary" @click="addModal = true">Create Blog</Button>
						</div>
					</div>
				</div>	
			</div>
		</section>
		<!-- Blog Promo Area End -->

    
				<Modal
					v-model="addModal"
					title="Add a new Product"
					:mask-closable="false"
					:closable="false"
				>
					<div class="row">
						<div class="col-md-12">
							<div class="_3login_input_group">
								<label class="form_label">Title</label>
								<Input v-model="formItem.title" placeholder="Enter Name..."></Input>
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
								<label class="form_label">Image</label>
                					<div class="form-group">
										<div class="custom-file upload_ad_img">
											<template class="mb-4">
												<Upload
													ref="uploads"
													type="drag"
													:on-success="handleSuccess"
													:format="['jpg','jpeg','png']"
													:max-size="2048"
													action="http://localhost:3333/upload">
													<div style="padding: 20px 0">
													<Icon type="ios-cloud-upload" size="32" style="color: #3399ff"></Icon>
													<p>Upload Image</p>
													</div>
												</Upload>
											</template>
										</div>
									</div>
									<div class="p-2 border mb-4">
										<div class="upload-images d-flex">
											<div>
												<img v-if="formItem.image" :src="formItem.image" class="w73 h73 border p-0">
											</div>
											<div class="float-right ml-auto" v-if="formItem.image">
												<div class="float-right btn btn-icon btn-danger btn-sm mt-5">
													
													<span @click="deleteImage()"><i class="fa fa-trash-o" ></i>Delete</span>
												</div>
											</div>
										</div>
									</div>
							</div>
						</div>
					</div>
					<div slot="footer">
						<Button type="default" @click="addModal=false">Close</Button>
						<Button type="primary" @click="blog_add" :disabled="loading" :loading="loading">
                  {{loading ? 'Adding...' : 'Add Blog'}}
              </Button>
					</div>
				</Modal>

    <!-- Blog Area Start -->
		<section class="blog-area">
			<div class="container">
				<div class="row">
					<div class="col-lg-12 col-md-12  col-sm-12 col-xs-12 text-center">
						<div class="section-title">
							<span>Events & Blog</span>
							<h2>Travell Tips and Blog</h2>
						</div>
					</div>
				</div>
				<div class="blog">
					<div class="row">
						<div v-for="(item,index) in BlogData" :key="index" class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div class="single-blog _box_shadow">
								<div class="blog-img">
									<nuxt-link :to="`/singleBlog/${item.id}`">
										<img :src="item.image" alt="blog" />
										<span>TRAVEL</span>
									</nuxt-link>
								</div>
								<div class="blog-content">
									<ul>
										<li>{{item.__meta__.totalLike_count}} Like</li>
										<li v-if="item.user" class="_mar_b10 author_name">
											<strong>Author:</strong> {{item.user.name}}
										</li>
										<li>{{item.created_at}}</li>
									</ul>
									<h4>{{item.description}}</h4>
								</div>
							</div>
						</div>		
					</div>
				</div>
			</div>
		</section>
		<!-- Team Area End -->

  </div>
</template>

<script>

export default {
	data(){
		return {
        addModal:false,
        editModal:false,
        formItem:{
            title:'',
            description:'',
			image:'',
			user_id:''
        },
        BlogData:[],
        page:1,
        pagination: {},
        loading:false,

		}
	},

	methods : {
		async getpaginate(page = 1){
			const res  = await this.callApi('get',`all_blog?page=${page}`)
			if(res.status == 200){
				this.BlogData = res.data.data
				this.pagination = res.data
			}

			else{
				this.swr()
			}
        },
        
		async blog_add(){
				if(!this.isLoggedIn){
					return this.i("Please Login first  !")
				}
				if(this.formItem.title.trim()=='') return this.e('Name is required')
				if(this.formItem.description.trim()=='') return this.e('Description is required')
				if(this.formItem.image=='') return this.e('Image is required')
				this.formItem.user_id=this.authUser.id
				this.loading = true
				const res = await this.callApi('post',`blog_add?page=${this.page}`,this.formItem)
				if(res.status==200){
					this.addModal=false
					this.s('Blog added successfully!')
					this.BlogData = res.data.data
					this.pagination = res.data
					this.formItem={}
				}
				else{
					this.swr();
		}
		this.loading = false
		},
    
   		 //upload 
		handleSuccess (res, file) {
			this.formItem.image = res
		},

		//delete img from server
		async deleteImage(){
			var url = this.formItem.image;
			console.log(url);
			var get_id =url.split("http://localhost:3333/uploads/");
			var imgName = get_id[get_id.length-1]
			const res = await this.callApi('post', 'delete_image', {imageName: imgName})
			if(res.status==200){
				this.formItem.image=''
			}
			else{
				this.swr()
			}
		},
	}, 

	async created(){
    
		this.loading = true
		const res = await this.callApi('get',`all_blog?page=${this.page}`)
		if(res.status == 200) {
				this.BlogData= res.data.data
				this.pagination = res.data
		}
		else{
			this.swr()
		}
		this.loading = false
	}, 
	
}
</script>

