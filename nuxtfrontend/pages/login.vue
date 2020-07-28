<template>
  <div>
      <div class="container">
          <div class="row">
             <div class="col-md-4 mx-auto">
           <v-app>
             <v-row align="center">
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                style="width:100%"
              >

                <v-text-field
                  v-model="formItem.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  prepend-icon="mdi-account-circle"
                ></v-text-field>

                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formItem.password"
                  label="Password"
                  required
                   prepend-icon="mdi-account-lock"
                   :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                   @click:append="showPassword=!showPassword"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4 mt-4"
                  @click="login"
                  :loading="loading"
                >
                  {{loading ? 'Loging...' : 'Login'}}
                </v-btn>

              </v-form>
            </v-row>
           </v-app>
              </div> 
            </div>
        </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      formItem:{
        email: '',
        password:''
      },
      emailRules: [
        v => !!v || 'E-mail is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      lazy: false,
      loading: false,
      showPassword: false,

    }),

    methods: {
      async login () {
        	this.loading = true
        	const res = await this.callApi('post',`login`,this.formItem)
          if(res.status==200){
            this.s('Login successful!')
            this.formItem={}
            this.$store.commit('loginUser',(res.data));
            this.$router.push('/')
          }
          else if(res.status===401){
            for (let i of res.data) {
                this.w(i.message);
              }   
          }
          else{
            this.swr();
          }
          this.loading = false
      }
    },
  }
</script>

<style scoped>

</style>