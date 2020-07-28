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
                        v-model="formItem.name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="formItem.phone"
                        :counter="11"
                        :rules="phoneRules"
                        label="Phone"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="formItem.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>

                      <v-text-field
                        type="password"
                        v-model="formItem.password"
                        :counter="6"
                        :rules="passwordRules"
                        label="Password"
                        required
                      ></v-text-field>

                      <v-text-field
                        type="password"
                        v-model="confirm_password"
                        :counter="6"
                        :rules="confirmPasswordRules"
                        label="Confirm Password"
                        required
                      ></v-text-field>

                      <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4 mt-4"
                        @click="register"
                        :loading="loading"
                      >
                        {{loading ? 'Registering...' : 'Register'}}
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
        name: '',
        phone:'',
        email: '',
        password:''
      },
      confirm_password:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => (v && v.length == 11) || 'Phone must be 11 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
      lazy: false,
      loading: false,
    }),

    methods: {
      async register () {
          if(this.formItem.password != this.confirm_password){
                this.i("The password does not match.");
                return;
            }
        	this.loading = true
        	const res = await this.callApi('post',`register`,this.formItem)
          if(res.status==201){
            this.s('Registration successfully!')
            this.formItem={}
            this.confirm_password={}
            this.$router.push('/login')
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