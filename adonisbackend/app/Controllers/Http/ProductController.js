'use strict'
const Product = use('App/Models/Product')
const User = use('App/Models/User')
class ProductController {
  
    async product_add({request,response}){
        let reqData = request.all()
        let createData= await Product.create(
            {
                name:reqData.name,
                description:reqData.description,
                price:reqData.price,
            }
        )

        let page = request.input('page');
        return await Product.query().orderBy('id','desc').paginate(page,7)
    }

    async all_product({request,response}){
        let page = request.input('page');
        return await Product.query().orderBy('id','desc').paginate(page,7)
      }

      async update_product ({ request,response}) {   
        const reqData = request.all()
        return await Product.query().where('id',reqData.id).update(reqData)
    }

    async delete_product ({ request, response }) {
        const reqData = request.all()
        let page = request.input('page');
        await Product.query().where('id',reqData.id).delete()
        return await Product.query().orderBy('id','desc').paginate(page,7)
      }



      async login({ request, response, auth }){

        const { email, password } = request.all()
        let user = await auth.attempt(email, password)
        return response.status(200).json(user)
            // return 'Logged in successfully'
        // const data = request.all()
        //   try {
        //     console.log(data)
        //     let user = await auth.query().attempt(data.email, data.password)  
    
        //     const { email, password } = request.all()
        //     await auth.attempt(email, password)
    
        //     return 'Logged in successfully'
    
    
        //     // return response.status(200).json(user) 
        //   } catch (e) {
        //       console.log(e.message)
        //       return response.status(401).json(
        //           {
        //               'msg': 'Invalid email or password. Please try again.'
        //           }
        //       )
        //   }
      }


}

module.exports = ProductController
