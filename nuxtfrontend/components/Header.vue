<template>
 <div>
  <!-- Header Area Start -->
    <header id="mainNav"> 
        <div class="container">
            <div class="row">
                <div class="col-md-12 mx-auto text-center">
                    <!-- Main menu Area start -->
                    <div class="main-menu">
                        <div class="navbar-collapse nav_div">
                        <div class="logo">
                             <a class="js-scroll-trigger" href="team.html">
                                <img src="images/travello.png" alt="travello" />
                            </a>
                        </div>
                            <ul class="nav-list nav-open" id="nav">
                                <li class="nav-item">
                                    <router-link class="js-scroll-trigger current" to="/">
                                    Home
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="js-scroll-trigger" to="/blog">Blog</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="js-scroll-trigger" to="/crud">Product Crud</router-link>
                                </li>
                            </ul>
                        <div class="login_area">
                            <template v-if="isLoggedIn">
                                <ul class="nav-list nav-open" id="nav">
                                <li class="nav-item">
                                        <router-link class="js-scroll-trigger" to="/login">Login</router-link>
                                    </li>
                                <li class="nav-item">
                                        <router-link class="js-scroll-trigger" to="/register">Register</router-link>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                 <p class="js-scroll-trigger" @click="logout">Logout</p>
                            </template>
                        </div>
                        </div>
                    </div>
                    <!-- Main menu Area End -->
                </div>
            </div>
        </div>
    </header>
    <!-- Header Area End -->
 </div>
</template>

<script>

export default {
	data(){
		return {
    

		}
	},

	methods : {

        async logout(){
        const res = await this.callApi('get','logout')
          if(res.status==204){
            window.location = '/';
          }
          else{
              this.swr();
          }
        }
		
	}, 

	async created(){
    
	
	}, 
	
}
</script>
