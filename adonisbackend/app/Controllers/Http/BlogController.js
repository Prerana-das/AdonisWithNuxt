'use strict'
const Blog = use('App/Models/Blog')
const User = use('App/Models/User')
const Wishlist = use('App/Models/Wishlist')
const Comment = use('App/Models/Comment')
const ImportantVideo = use('App/Models/ImportantVideo')
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
        return await Blog.query()
                          .with('user')
                          .withCount('totalLike', (builder) => {
                            builder.where('isTrue', 1)
                          })
                          .orderBy('id','desc')
                          .paginate(page,7)
    }

    async all_blog({request,response}){
        let page = request.input('page');
        return await Blog.query()
                          .with('user')
                          .withCount('totalLike', (builder) => {
                            builder.where('isTrue', 1)
                          })
                          .orderBy('id','desc')
                          .paginate(page,7)
      }

    async all_video({request,response}){
        let page = request.input('page');
        return await ImportantVideo.query()
                          .orderBy('id','desc')
                          .paginate(page,7)
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
        if(fileName){
              try {
                fs.unlink("./public/uploads/"+fileName, (err) => {
                    if (err) {
                        console.log("failed to delete local image:"+err);
                    } else {
                        console.log('successfully deleted local image');                    
                    }
                  });
                 
                } catch(err) {
                  return response.status(204).json()
                }
          }
          return response.status(200).json()            
      }

      async single_blog({request,response}){
        let blog_id = request.input('blog_id');
        let user_id = request.input('user_id');
        return await Blog.query()
                    .with('user')
                    .withCount('totalLike', (builder) => {
                        builder.where('blog_id', blog_id)
                               .where('isTrue', 1)
                    })
                    .with('wishlist', (builder) => {
                      builder.where('user_id', user_id)
                    })
                    .where('id',blog_id)
                    .first()
        }


       //Comment
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
        return await Comment.query()
          .with('user')
          .where('blog_id',blog_id)
          .orderBy('id','desc')
          .fetch()
      }

      async comment_count({request,response}){
        let blog_id = request.input('blog_id');
        return await Comment.query().where('blog_id',blog_id).getCount();
      }

      //Like
      async add_wishlists({request,response}){
        let data = request.all()
        if(data){
          let check = await Wishlist.query().where('blog_id',data.blog_id)
          .where('user_id',data.user_id)
          .update({
            isTrue:data.isTrue,
          })
          if(check){
            return check;
          }
          else{
           let createdata= await Wishlist.create(
              {
                  user_id:data.user_id,
                  blog_id:data.blog_id,
                  isTrue:1,
              })

              return response.status(201).json(createdata) 
          }
        }
      }


}

module.exports = BlogController
