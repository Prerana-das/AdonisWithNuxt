'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Route.get('/login', 'UserController.user')
Route.get('/myuser', 'UserController.getUser')



//User
Route.get('/logout', 'UserController.logout')
Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')

//Product
Route.post('/product_add', 'ProductController.product_add')
Route.post('/delete_product', 'ProductController.delete_product')
Route.post('/update_product', 'ProductController.update_product')
Route.get('/all_product', 'ProductController.all_product')

//Blog
Route.post('/blog_add', 'BlogController.blog_add')
Route.get('/all_blog', 'BlogController.all_blog')

//Image
Route.post('/upload', 'BlogController.upload')
Route.post('/delete_image', 'BlogController.delete_image')

//Single Blog
Route.get('/single_blog', 'BlogController.single_blog')

//Comment
Route.post('/post_comment', 'BlogController.post_comment')
Route.get('/all_comment', 'BlogController.all_comment')
Route.get('/comment_count', 'BlogController.comment_count')

//Like
Route.post('/add_wishlists', 'BlogController.add_wishlists')

//New
Route.get('/getAllUser', 'UserController.getAllUser')

//chat
Route.get('/chatWithLastPerson/:id', 'ChatController.chatWithLastPerson')
Route.post('/addChat', 'ChatController.addChat')












