'use strict'
const Blog = use('App/Models/Blog')
const User = use('App/Models/User')
const Wishlist = use('App/Models/Wishlist')
const Comment = use('App/Models/Comment')
const Helpers = use('Helpers')
const Env = use('Env')
const fs = require('fs')
class BlogController {
  
    async blog_add({request,response}){
        let reqData = request.all()
        let createData= await Blog.create(
            {
                title:reqData.title,
                description:reqData.description,
                image:reqData.image,
                user_id:reqData.user_id,
            }
        )
        let page = request.input('page');
        return await Blog.query().orderBy('id','desc').paginate(page,7)
    }

    async all_blog({request,response}){
        let page = request.input('page');
        return await Blog.query().with('user').orderBy('id','desc').paginate(page,7)
      }


      async upload({request,response}){
        const photo = request.file('file')
        const name = new Date().getTime() +'.'+photo.subtype
        await photo.move(Helpers.publicPath('uploads'), {
            name:name,
            overwrite: true
        
          })
          let siteUrl = Env.get('APP_URL')
          let upFile = `${siteUrl}/uploads/${name}`
          return upFile
    }


    //Delete image from server

    async delete_image({request,response}){
        let fileName = request.input('imageName');
        this.deleteFileFromServer(fileName, false);
        return 'done';
      }
    async deleteFileFromServer({fileName ,hasFullPath=false}){
        // let fileNamee = request.input('imageName');
        if(!hasFullPath){
                filePath = public_path().fileName;
            }
            if(filePath){
                try {
                    fs.unlinkSync(filePath)
                    //file removed
                  } catch(err) {
                    console.error(err)
                  }
            }
            return;
      }

      async single_blog({request,response}){
        let blog_id = request.input('blog_id');
        return await Blog.query().with('user').where('id',blog_id).first()
      }


      async post_comment({request,response}){
        let reqData = request.all()
        await Comment.create(
            {
                user_id:reqData.user_id,
                blog_id:reqData.blog_id,
                description:reqData.description,
            }
        )
        return await Comment.query().with('user').orderBy('id','desc').first()
      }

      

      async all_comment({request,response}){
        let blog_id = request.input('blog_id');
        return await Comment.query().with('user').where('blog_id',blog_id).orderBy('id','desc').fetch()
      }

      async comment_count({request,response}){
        let blog_id = request.input('blog_id');
        return await Comment.query().where('blog_id',blog_id).getCount();
      }

      async add_wishlists({request,response}){
       
      }


   


}

module.exports = BlogController
