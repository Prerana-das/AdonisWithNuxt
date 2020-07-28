'use strict'
const Blog = use('App/Models/Blog')
const User = use('App/Models/User')
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
        return await Blog.query().orderBy('id','desc').paginate(page,7)
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


    // public function deleteImage(Request $request){
    //     $fileName = $request->imageName; 
    //     $this->deleteFileFromServer($fileName, false);
    //     return 'done';
    // }
    // public function deleteFileFromServer($fileName, $hasFullPath = false){
    //     if(!$hasFullPath){
    //         $filePath = public_path().$fileName;
    //     }
    //     if(file_exists($filePath)){
    //         @unlink($filePath);
    //     }
    //     return;
    // }


}

module.exports = BlogController
