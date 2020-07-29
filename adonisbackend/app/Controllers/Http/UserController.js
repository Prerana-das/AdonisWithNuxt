'use strict'
const { validate, rule } = use('Validator')
const User = use('App/Models/User')
class UserController {

   async user({request, response, params, auth}){
       try {
          const user = await auth.loginViaId(34)
       } catch (error) {
          return error
       }
   }
  async getUser({request, response, params, auth}){
    try {
      let user = await auth.getUser()
        return user
    } catch (error) {
        return
    }
  }


  async register({ request, response }) {  
    
    let reqData = request.all()
    const rules = {
          name: 'required|string|max:255',
          email: 'required|string|max:255|email|unique:users',
          phone: [
            rule('regex', /^(?:\+?88)?01[15-9]\d{8}$/i)
          ],
          password:'required|string|min:6'
    }
    const messages = {
        'name':'Name is required',
        'email.unique':'Email already exist',
        'phone.regex':'Phone number should be BD standard',
    }
    const validation = await validate(reqData, rules, messages)

    if (validation.fails()) {
        return response.status(401).json(validation.messages())
    }
    const data = await User.create(reqData)

    return response.status(201).json(data) 
  }

  async login({ request, response, auth }){
    const { email, password } = request.all()
    let user = await auth.attempt(email, password)
    return response.status(200).json(user)
  }

 

  async logout({request, response,session, params, auth}){
        session.clear()
        return await auth.logout()
  }

}

module.exports = UserController
