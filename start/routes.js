'use strict'

/*
|-------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('public.index')
Route.on('/forgot-password').render('auth.forgot-password')

Route.on('/register').render('auth.register')
Route.post('register', 'AuthController.register').validator('Register')

Route.on('/login').render('auth.login')
Route.post('login', 'AuthController.login').validator('Login')

Route.get('/logout', async ({ auth, response }) => {
  await auth.logout()
  return response.redirect('/')
})

Route.group(() => {
  Route.get('/status', async () => {
    return { status: true }
  })
}).prefix('api')

Route.post('reset-password', 'AuthController.resetPassword').validator('ForgotPassword')

Route.group(() => {
  Route.any('*', ({ view }) => view.render('admin.dashboard'))
}).prefix('manage')
