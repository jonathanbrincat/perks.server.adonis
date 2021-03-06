'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

Route.group(() => {
  Route.on('/register').render('user.register')
    Route.post('/register', 'UserController.create').validator('CreateUser')

  Route.on('/login').render('user.login')
    Route.post('/login', 'UserController.login').validator('LoginUser')

  Route.get('/logout', 'UserController.logout')

  Route.get('/', 'PageController.index').as('page.index')
})

/*
* Search
**/
Route.post('/search', 'SearchController.index').as('search')

/*
* Like - temp
**/
Route.get('/posts/:id/like', 'LikeController.setLike').as('posts.like')

/*
* Save / Favourites / Watch
**/
Route.get('/posts/saved', 'SavedController.index').as('saved.index')
Route.post('/posts/:id/saved', 'SavedController.store').as('saved.store')
Route.delete('/posts/:id/saved', 'SavedController.destroy').as('saved.destroy')

/*
* Entry
**/
Route.group(() => {
  // Route.get('create', 'EntryController.create').as('entry.create')
  // Route.post('store', 'EntryController.store').as('entry.store')
  Route.delete(':id', 'EntryController.destroy').as('entry.destroy')
}).prefix('/entry/')
/*Route.get('/posts/:id/entry/create', 'EntryController.create').as('entry.create')
Route.post('/posts/:id/entry', 'EntryController.store').as('entry.store')*/

/*
* Resource
**/
Route.group(() => {
  // Route.get('create', 'ResourceController.create').as('resource.create')
  // Route.post('store', 'ResourceController.store').as('resource.store')
  Route.delete(':id', 'ResourceController.destroy').as('resource.destroy')
}).prefix('/resource/')
/*Route.get('/posts/:id/entry/:eid/resource/create', 'ResourceController.create').as('resource.create')
Route.post('/posts/:id/entry/:eid/resource', 'ResourceController.store').as('resource.store')*/

/*
* Draft
**/
Route.group(() => {
  // Route.get('create', 'DraftController.create').as('draft.create')
  Route.post('store', 'DraftController.store').as('draft.store')
  // Route.delete(':id', 'DraftController.destroy').as('draft.destroy')
}).prefix('/draft/')

Route.get('/post/create/draft', 'DraftController.create').as('posts.create.draft')

/*
* Post
**/
/*Route.resource('posts', 'PostController')*/

Route.group(() => {
  Route.get('', 'PostController.index').as('posts.index')

  Route.get('create', 'PostController.create').as('posts.create')
  Route.post('', 'PostController.store').as('posts.store')

  Route.get(':id/edit', 'PostController.edit').as('posts.edit')
  Route.put(':id', 'PostController.update').as('posts.update')

  Route.delete(':id', 'PostController.destroy').as('posts.destroy')

  Route.get(':id', 'PostController.show').as('posts.show')

  Route.get(':id/entry/:eid/resource/create', 'ResourceController.create').as('resource.create')
  Route.post(':id/entry/:eid/resource', 'ResourceController.store').as('resource.store')

  Route.get(':id/entry/create', 'EntryController.create').as('entry.create')
  Route.post(':id/entry', 'EntryController.store').as('entry.store')
}).prefix('/posts/')

/*
* Tags
**/
Route.get('/tags/:id', 'TagController.index').as('tags.index')
Route.get('/tags', 'TagController.index2').as('tags.index2')
Route.post('/tags', 'TagController.index2').as('tags.index2')

/*
* Dashboard
**/
Route.group(() => {
  Route.get('', 'DashboardController.index').as('dashboard.index')
}).prefix('/dashboard/').middleware(["auth"])  //.auth() // DEVNOTE: you can chain and add middleware. in this instance calling auth will restrict access to these routes

/*
* Profile
**/
Route.group(() => {
  Route.get('', 'ProfileController.index').as('profile.index')

  Route.put('/name', 'ProfileController.updateName').as('profile.update.name')
  Route.put('/address', 'ProfileController.updateAddress').as('profile.update.address')
}).prefix('/profile/').middleware(["auth"])

/*
* Chat
**/
Route.group(() => {
  Route.get('', 'ChatController.index').as('chat.index')
}).prefix('/chat/').middleware(["auth"])

/*
* Guide
**/
Route.group(() => {
  Route.get('', 'GuideController.index').as('guides.index')
  Route.get(':id', 'GuideController.show').as('guides.show')
}).prefix('/guides/')
