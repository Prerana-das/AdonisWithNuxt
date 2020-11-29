<template>
  <div>
        <!-- Blog Promo Area Start -->
		<section class="blog-promo black-overlay"> 
			<div class="container">
				<div class="row">
					<div class="col-lg-8 text-center mx-auto">
						<div class="blog-promo-content">
							<h1>All Video</h1>
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
					<div class="col-lg-12 col-md-12  col-sm-12 col-xs-12 text-center">
						<div class="section-title">
							<span>Videos</span>
							<!-- <h2> videos</h2> -->
						</div>
					</div>
				</div>
				<div class="blog">
					<div class="row">
						<div v-for="(item,index) in BlogData" :key="index" class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
							<div class="single-blog _box_shadow">
								<div class="blog-img">
									<iframe width="100%" height="200" :src="item.url | videooo" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								</div>
								<!-- <div class="blog-content">
									<ul>
										<li>{{item.__meta__.totalLike_count}} Like</li>
										<li v-if="item.user" class="_mar_b10 author_name">
											<strong>Author:</strong> {{item.user.name}}
										</li>
										<li>{{item.created_at}}</li>
									</ul>
									<h4>{{item.description}}</h4>
								</div> -->
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
       
        BlogData:[],
        page:1,
        pagination: {},
        loading:false,

		}
	},

	methods : {
		// async getpaginate(page = 1){
		// 	const res  = await this.callApi('get',`all_blog?page=${page}`)
		// 	if(res.status == 200){
		// 		this.BlogData = res.data.data
		// 		this.pagination = res.data
		// 	}

		// 	else{
		// 		this.swr()
		// 	}
        // },
    
   	
    }, 
     filters: {
    videooo(videoLink) {
       var lastid =videoLink.split(`https://youtu.be/`);
        if(lastid.length<=1){
            lastid =videoLink.split(`https://www.youtube.com/watch?v=`);
        }
        console.log(lastid);
      var id = lastid[lastid.length-1]
      // this.video = "https://www.youtube.com/embed/"+id;
      var neww = "https://www.youtube.com/embed/"+id;
      return neww;
    },
  },

	async created(){
    
		this.loading = true
		const res = await this.callApi('get',`all_video?page=${this.page}`)
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

