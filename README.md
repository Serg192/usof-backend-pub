# usof-backend-pub

This is a raw version of the API for the [USOF](https://github.com/Serg192/usof-front) project. The code still needs some refactoring. There will be some significant updates in the future.

---

## Endpoints

#### Auth route:

`POST /api/auth/register` <br>
`POST /api/auth/login`<br>
`POST /api/auth/password-reset`<br>
`GET  /api/auth/password-rest/:token`<br>
`POST /api/auth/password-reset/:token`<br>
`POST /api/auth/logout`<br>
`GET /api/auth/confirmation/:token`<br>
`GET /api/auth/refresh`<br>

#### Users route

`GET /api/users`<br>
`POST /api/users`<br>
`GET /api/users/:user_id`<br>
`PATCH /api/users/avatar`<br>
`GET /api/users/:user_id/posts`<br>
`POST /api/users/:user_id`<br>
`DELETE /api/users/:user_id`<br>

#### Posts route

`GET /api/posts`<br>
`GET /api/posts/:post_id`<br>
`GET /api/posts/:post_id/comments`<br>
`POST /api/posts/:post_id:comments`<br>
`GET /api/posts/:post_id/cotegories`<br>
`GET /api/posts/:post_id/like`<br>
`POST /api/posts/:post_id/like`<br>
`POST /api/posts`<br>
`POST /api/posts/:post_id`<br>
`DELETE /api/posts/:post_id`<br>
`DELETE /api/posts/:post_id/like`<br>
`POST /api/posts/:post_id/access`<br>

#### Categories route

`GET /api/categories/:category_id/posts`<br>
`GET /api/categories/search`<br>
`GET /api/categories`<br>
`GET /api/categories/:category_id`<br>
`POST /api/categories`<br>
`PATCH /api/categories/:category_id`<br>
`DELETE /api/categories/:category_id`<br>

#### Comments route

`GET /api/comments/:comment_id`<br>
`GET /api/comments/:comment_id/like`<br>
`POST /api/comments/:comment_id/like`<br>
`PATCH /api/comments/:comment_id`<br>
`DELETE /api/comments/:comment_id`<br>
`DELETE /api/comments/:comment_id/like`<br>
