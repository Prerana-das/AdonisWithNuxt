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

Route.get('/login', 'UserController.user')

Route.get('/logout', 'UserController.logout')



Route.post('/register', 'UserController.register')
Route.post('/login', 'ProductController.login')


Route.post('/product_add', 'ProductController.product_add')
Route.post('/delete_product', 'ProductController.delete_product')
Route.post('/update_product', 'ProductController.update_product')
Route.get('/all_product', 'ProductController.all_product')



