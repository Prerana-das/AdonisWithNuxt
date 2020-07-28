<template>
  <div>
    <!-- Blog Promo Area Start -->
		<section class="blog-promo black-overlay"> 
			<div class="container">
				<div class="row">
					<div class="col-lg-8 text-center mx-auto">
						<div class="blog-promo-content">
							<h1>Single Blog</h1>
						</div>
					</div>
				</div>	
			</div>
		</section>
		<!-- Blog Promo Area End -->
		
		<!-- Blog Area Start -->
		<section class="blog-area"> 
			<div class="container">
				<div class="row">
					<div class="col-lg-9 col-md-9 col-sm-12 col-xm-12">
						<div class="col-lg-12">
							<div class="single-blog">
								<div class="blog-img">
									<img :src="blogData.image" alt="blog" />
								</div>
								<div class="col-lg-10 mx-auto">
									<div class="single-blog-content">
										<div class="profile">	
											<ul>
												<li><img src="/../images/blog/user1.jpg" alt="blog" /></li>
												<li v-if="blogData.user">
													{{blogData.user.name}}
												</li>
												<li>{{blogData.created_at}}</li>
												<li>Travel</li>
											</ul>
										</div>
										<h4>{{blogData.description}}</h4>
										<div class="single-blog-social">
											<ul>
												<li @click="wishlists(blogData)">
												<span v-if="blogData.__meta__">{{blogData.__meta__.totalLike_count}}</span>
													<i class="far fa-thumbs-up"></i> 
													<span v-if="blogData.wishlist">
														<span v-if="blogData.wishlist.isTrue == 0">
															Like
														</span>
														<span v-else>
															Unlike
														</span>
													</span>
													<span v-else>
														Like
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div class="col-lg-12">
							<div class="comment-area">
								<h3>{{commentCount}} Comments</h3>
								<div class="row comment" v-for="(item,index) in commentData" :key="index">
									<div class="col-lg-1">
										<div class="comment-img">
											<img src="/../images/profile.png" alt="blog" />
										</div>
									</div>
									<div class="col-lg-11">
										<div class="comment-content">
											<h4 v-if="item.user">
												{{item.user.name}}
											</h4>
											<p>{{item.description}}</p>
											<p>{{item.created_at}}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="blog-contact-area">
								<h3>Leave a comment</h3>
								
									<ul>
										<li>Comment<br/>
										<textarea v-model="commentItem.description" placeholder="Enter something" cols="30" rows="5"></textarea></li>
										<li>
											<button class="btn btn-primary" @click="comment()">Send</button>
										</li>
									</ul>
								
							</div>
						</div>
					</div>	
					<div class="col-lg-3">
						<div class="blog-sidebar">
							<span class="search"><input type="text" placeholder="Search anything"/></span>
							<div class="all-latest-post">
								<h4>Latest Post</h4>
								<div class="latest-post">
									<img src="/../images/blog/post1.jpg" alt="post" />
									<ul>
										<li>May you like</li>
										<li>Nov 10, 2018</li>
									</ul>
								</div>
								<div class="latest-post">
									<img src="/../images/blog/post2.jpg" alt="post" />
									<ul>
										<li>May you like</li>
										<li>Nov 10, 2018</li>
									</ul>
								</div>
							</div>
							<div class="tag">
								<h4>Tag Clouds</h4>
								<ul>
									<li><a href="">LIFE STYLE</a></li>
									<li><a href="">PANDA</a></li>
									<li><a href="">EYES</a></li>
									<li><a href="">DESIGN</a></li>
									<li><a href="">STAR</a></li>
									<li><a href="">CREATIVE</a></li>
									<li><a href="">THINKING</a></li>
								</ul>
							</div>
							<div class="instragram">
								<ul>
									<li><img src="/../images/instragram/instragram1.jpg" alt="instragram" /></li>
									<li><img src="/../images/instragram/instragram2.jpg" alt="instragram" /></li>
									<li><img src="/../images/instragram/instragram3.jpg" alt="instragram" /></li>
									<li><img src="/../images/instragram/instragram4.jpg" alt="instragram" /></li>
									<li><img src="/../images/instragram/instragram5.jpg" alt="instragram" /></li>
									<li><img src="/../images/instragram/instragram6.jpg" alt="instragram" /></li>
								</ul>
							</div>
							<div class="add">
								<p>50% Off  on</p>
								<h4>Black Friday</h4>
								<img src="/../images/hd-travel.png" alt="add" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Blog Area End -->
  </div>
</template>

<script>
export default {
   
    data(){
       return {
		   commentItem:{
			   user_id:'',
			   blog_id:'',
			   description:'',
		   },
		   wishItem:{
                blog_id:'',
                user_id:'',
                isTrue:'',
            },
		   blog_id:'',
		   user_id:'',
		   blogData:{},
		   commentData:[],
		   commentCount:'',
		   
       }
	},
	 methods: {
		    async wishlists(item){
				if(!this.authUser){ 
						return this.i("Please Login First  !")
					}
				if(item.wishlist){
					if(item.wishlist.isTrue==0){
						this.wishItem.isTrue=1
						console.log('checkkkkkkkkkk');
					}
					else{
						this.wishItem.isTrue=0
					}
				}
				this.wishItem.blog_id=item.id
				this.wishItem.user_id=this.authUser.id
				const res = await this.callApi('post','add_wishlists',this.wishItem)
				if(res.status==201){
					this.s('Like!')
					this.blogData.wishlist = {
						isTrue:1
					}
				}
				else if(res.status==200){ 
					// this.s('UnLike!')
					this.blogData.wishlist.isTrue = this.wishItem.isTrue
					if(this.blogData.wishlist.isTrue==1){
						this.blogData.__meta__.totalLike_count +=1
					}
					else{
						this.blogData.__meta__.totalLike_count -=1
					}
					
				}
				else{
					this.swr()
				}

      		  },
			
			async comment(){
				if(!this.authUser){
					return this.i("Please Login First !")
				}
				if(this.commentItem.description.trim()=='') return this.i('Description is required!');
				this.commentItem.user_id=this.authUser.id
				this.commentItem.blog_id = this.blog_id
				const res=await this.callApi('post','post_comment',this.commentItem);

				if(res.status==200){
					this.s("Comment Successful");
					this.commentData.push(res.data)
					this.commentCount+=1
					this.commentItem.description = ''
				}
				else{
					this.swr();
				}
			},
			
		}, 
    async created(){
		this.blog_id = this.$route.params.id
		if(this.authUser){
			this.user_id = this.authUser.id
		}

		const [res1,res2,res3] = await Promise.all([ 
			this.callApi('get',`single_blog?blog_id=${this.blog_id}&user_id=${this.user_id}`),
			this.callApi('get',`all_comment?blog_id=${this.blog_id}`),
			this.callApi('get',`comment_count?blog_id=${this.blog_id}`),
		])
		if(res1.status == 200 && res2.status == 200) {
			this.blogData = res1.data
			this.commentData = res2.data
			this.commentCount = res3.data
		}
		else{
			this.swr()
		}

    }
}
</script>