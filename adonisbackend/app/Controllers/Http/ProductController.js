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



      // async login({ request, response, auth }){
      //   const { email, password } = request.all()
      //   let user = await auth.attempt(email, password)
      //   return response.status(200).json(user)
      // }


}

module.exports = ProductController
