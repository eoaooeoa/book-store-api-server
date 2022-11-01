## - API Documents

[사용자 API](https://documenter.getpostman.com/view/23953353/2s8YRjpDhy)  
[카테고리 API](https://documenter.getpostman.com/view/23953353/2s8YRgqEmv)  
[상품 API](https://documenter.getpostman.com/view/23953353/2s8YRiMa3h)

## - 기술 스택

LANGUAGES: JavaScript  
BACK-END: Node.js, express, MongoDB

- Express
- Mongodb, Mongoose
- cors
- etc.

## - REST API 설계

API CRUD(Create, Read, Update, Delete)

e.g. User(사용자) API

### Create
- Method: POST
- Path: /users

### Read
- Method: GET
- Path
  - /users (사용자 목록 조회)
  - /users/:userId (특정 사용자 조회)

### Update
- Method: PUT (or PATCH)
- Path: /users/:userId

### Delete
- Method: DELETE
- Path: /users/:userId