# usof-backend-pub

This is a raw version of the API for the [USOF](https://github.com/Serg192/usof-front) project. The code still needs some refactoring. There will be some significant updates in the future.

---

## Endpoints

#### Auth route:

`POST /api/auth/register`
`POST /api/auth/login`
`POST /api/auth/password-reset`
`GET  /api/auth/password-rest/:token`
`POST /api/auth/password-reset/:token`
`POST /api/auth/logout`
`GET /api/auth/confirmation/:token`
`GET /api/auth/refresh`

#### Users route

`GET /api/users`
`POST /api/users`
`GET /api/users/:user_id`
`PATCH /api/users/avatar`
`GET /api/users/:user_id/posts`
`POST /api/users/:user_id`
`DELETE /api/users/:user_id`

#### Posts route

`GET /api/posts`
`GET /api/posts/:post_id`
`GET /api/posts/:post_id/comments`
`POST /api/posts/:post_id:comments`
`GET /api/posts/:post_id/cotegories`
`GET /api/posts/:post_id/like`
`POST /api/posts/:post_id/like`
`POST /api/posts`
`POST /api/posts/:post_id`
`DELETE /api/posts/:post_id`
`DELETE /api/posts/:post_id/like`
`POST /api/posts/:post_id/access`

#### Categories route

`GET /api/categories/:category_id/posts`
`GET /api/categories/search`
`GET /api/categories`
`GET /api/categories/:category_id`
`POST /api/categories`
`PATCH /api/categories/:category_id`
`DELETE /api/categories/:category_id`

#### Comments route

`GET /api/comments/:comment_id`
`GET /api/comments/:comment_id/like`
`POST /api/comments/:comment_id/like`
`PATCH /api/comments/:comment_id`
`DELETE /api/comments/:comment_id`
`DELETE /api/comments/:comment_id/like`
