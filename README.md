## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Register

```
  POST/api/v1/auth/register
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

## VD:

```
{
    "username":"Hoang Ha 2",
    "email":"HoangHa2@gmail.com",
    "password":"Nam12345@"
}
```

## Kết quả:

```
{
    "newUser": {
        "id": 5,
        "username": "Hoang Ha 2",
        "password": "$2b$10$WzoB2Qu3qKNNPpRGUQLuWefKhOTe7wnnNjI5WYsTzhzfS2cRkQrn2",
        "email": "HoangHa2@gmail.com",
        "role": "User",
        "phone": null,
        "avatar": null,
        "createAt": "2024-06-20T05:41:53.825Z",
        "updateAt": "2024-06-20T05:41:53.825Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxODg2MjExMywiZXhwIjoxNzE5NDY2OTEzfQ.5uul9t6sFSoZBZxQALmT81I_UzAXWthAMpC3YQ2oUfM"
}

```

## Error: 400 Bad Request

```
{
    "message": "User already exists!",
    "error": "Bad Request",
    "statusCode": 400
}
```

```
{
    "message": [
        "password must match /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/ regular expression"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

```
{
"message": [
"email must be an email",
"email should not be empty"
],
"error": "Bad Request",
"statusCode": 400
}

```

### Login

```
POST/api/v1/auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

## VD:

```
{
    "username":"Thu Hang",
    "email":"thuhang1234@gmail.com",
    "password":"Hang1234@"
}
```

## Kết quả:

```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODg2MTg2NCwiZXhwIjoxNzE5NDY2NjY0fQ.0u8MFeTMqvKYZ1VuJ7AqyhHPPRPTUtM9Cn7f4awAIwQ"
}
```

## Error:

```
{
    "message": "User not found",
    "error": "Not Found",
    "statusCode": 404
}
```

```
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

### Get Profile

```
GET/api/v1/auth/profile
```

## VD:

`Headers.Authorization`: Bearer
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODg2MTg2NCwiZXhwIjoxNzE5NDY2NjY0fQ.0u8MFeTMqvKYZ1VuJ7AqyhHPPRPTUtM9Cn7f4awAIwQ

## Kết quả:

```
{
    "id": 1,
    "username": "Thu Hang",
    "password": "$2b$10$pPzx6./9Ez3PzdzbqaMmT.mUvmC3xhCyNj6a3R9Fc4BLVo1KkOqSe",
    "email": "thuhang1234@gmail.com",
    "role": "Leader",
    "phone": null,
    "avatar": null,
    "createAt": "2024-02-28T17:58:46.710Z",
    "updateAt": "2024-02-28T17:59:40.224Z"
}
```

## Error :

```
{
    "message": "Unauthorized",
    "statusCode": 401
}

```

### Create User

```
POST/api/v1/users
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your name     |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

## VD:

```
{
    "username":"Phuong Ngan Nguyen",
    "email":"PhuongNgan@gmail.com",
    "password":"Pngan1234@"
}
```

## Kết quả:

```
{
    "id": 6,
    "username": "Phuong Ngan Nguyen",
    "password": "$2b$10$Jtlvxf0ZfT4n0tdkpclUk.RcUcWaxeenwStevLgLdiXfUy0IlZ/FC",
    "email": "PhuongNgan@gmail.com",
    "role": "User",
    "phone": null,
    "avatar": null,
    "createAt": "2024-06-20T06:03:17.183Z",
    "updateAt": "2024-06-20T06:03:17.183Z"
}
```

## Error:

```:
{
    "message": "User already exists!",
    "error": "Bad Request",
    "statusCode": 400
}
```

```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

```
{
    "message": [
        "email must be an email",
        "email should not be empty",
        "password must match /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/ regular expression",
        "password must be a string",
        "password should not be empty"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### Get User

```
GET/api/v1/users/{id}
```

## VD:

```
GET/api/v1/users/1
```

## Kết quả:

```{
    "id": 1,
    "username": "Thu Hang",
    "password": "$2b$10$pPzx6./9Ez3PzdzbqaMmT.mUvmC3xhCyNj6a3R9Fc4BLVo1KkOqSe",
    "email": "thuhang1234@gmail.com",
    "role": "Leader",
    "phone": null,
    "avatar": null,
    "createAt": "2024-02-28T17:58:46.710Z",
    "updateAt": "2024-02-28T17:59:40.224Z"
}
```

## Error:

```:
{
    "message": "User not found!",
    "error": "Not Found",
    "statusCode": 404
}
```

### Get All User

```
POST/api/v1/users?page= &limit=
```

## VD:

```
GET/api/v1/users?page=1&limit=10
```

## Kết quả:

```
{
    "users": [
        {
            "id": 1,
            "username": "Thu Hang",
            "password": "$2b$10$pPzx6./9Ez3PzdzbqaMmT.mUvmC3xhCyNj6a3R9Fc4BLVo1KkOqSe",
            "email": "thuhang1234@gmail.com",
            "role": "Leader",
            "phone": null,
            "avatar": null,
            "createAt": "2024-02-28T17:58:46.710Z",
            "updateAt": "2024-02-28T17:59:40.224Z"
        },
        {
            "id": 2,
            "username": "Hoang Nam",
            "password": "$2b$10$pCGFc71BmoCvl8WWpdsqQe55hEzY09mbcuF8OoqaUuVCyFod.r3O6",
            "email": "HoangNam1234@gmail.com",
            "role": "User",
            "phone": null,
            "avatar": null,
            "createAt": "2024-03-21T08:22:14.345Z",
            "updateAt": "2024-03-21T08:22:14.345Z"
        },
        {
            "id": 3,
            "username": "Phuong Ngan",
            "password": "$2b$10$.1O/c4hblwfx7etddR1YDuwdacICfUTpcxy.dKuGnUXZGvmysXeU6",
            "email": "PhuongNgan1234@gmail.com",
            "role": "User",
            "phone": null,
            "avatar": null,
            "createAt": "2024-03-21T08:23:03.546Z",
            "updateAt": "2024-03-21T08:23:03.546Z"
        },
    ],
    "total": 6,
    "page": "1",
    "pages": 1,
    "limit": 10
}
```

## Error:

```:
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

### Update User

```
PATCH/api/v1/users/{id}
```

## VD:

```
{
    "role":"Leader"
}
```

## Kết quả:

```
{
    "id": 1,
    "username": "Thu Hang",
    "password": "$2b$10$pPzx6./9Ez3PzdzbqaMmT.mUvmC3xhCyNj6a3R9Fc4BLVo1KkOqSe",
    "email": "thuhang1234@gmail.com",
    "role": "Leader",
    "phone": null,
    "avatar": null,
    "createAt": "2024-02-28T17:58:46.710Z",
    "updateAt": "2024-06-20T06:21:07.649Z"
}
```

## Error:

```:
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

```
{
    "message": "User not found!",
    "error": "Not Found",
    "statusCode": 404
}
```

```
{
    "message": [
        "email must be an email",
        "password must match /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/ regular expression"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### Delete User

```
DELETE/api/v1/users/{id}

```

## VD:

```
DELETE/api/v1/users/3
```

## Kết quả:

```
{
    "id": 3,
    "username": "Phuong Ngan",
    "password": "$2b$10$.1O/c4hblwfx7etddR1YDuwdacICfUTpcxy.dKuGnUXZGvmysXeU6",
    "email": "PhuongNgan1234@gmail.com",
    "role": "User",
    "phone": null,
    "avatar": null,
    "createAt": "2024-03-21T08:23:03.546Z",
    "updateAt": "2024-03-21T08:23:03.546Z"
}
```

## Error:

```:
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

```
{
    "message": "User not found!",
    "error": "Not Found",
    "statusCode": 404
}
```
