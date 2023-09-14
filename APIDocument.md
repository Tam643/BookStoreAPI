# Bookstore API Documentation

This API allows you to manage a collection of books in a bookstore.

## Base URL

All endpoints are relative to the base URL:

```
http://localhost:3000
```


## Authentication

Most of the endpoints in these APIs require authentication using a Bearer token. Include the token in the `"Authorization"` header with the format: `"Bearer your-access-token."`


## Auth API

### Endpoints

#### User Authentication (Login):

- **URL :** `/auth/signin`
- **Method :** `POST `
- **Description :** Generates and returns an access token,
  which the user can use for subsequent authorized requests.
- **Request:**
  - **Content-Type:** `application/json`
  - **Body:**
    - `"email"` (String, required)
    - `"password"` (String, required)
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    { "success": true, "token": "JWT_Token" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "Invalid credentials" }
    ```

#### User Registration (Sign-Up):

- **URL :** `/auth/register`
- **Method :** `POST `
- **Description :** Create an account by providing registration information, including a email and password.
- **Request:**
  - **Content-Type:** `application/json`
  - **Body:**
    - `"email"` (String, required)
    - `"password"` (String, required)
    - `"confirmpassword"` (String, required)
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    { "success": true, "message": "Create new account successfuly" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
  - **Status Code:** 409 Conflict
  - **Body:**
    ```json
    { "success": false, "message": "Email already exists" }
    ```


## Books API
### Endpoints
#### Search All Books

- **URL :** `/books`
- **Method :** `GET`
- **Description :** Retrieve a list of all books in the bookstore.
- **Query Parameters (Optional) :**
  - `"title"` (String) - The title of the book to retrieve.
  - `"author"` (String) - The author of the book to retrieve.
  - `"isbn"` (Integer) - The unique ISBN of the book number to retrieve.
  - `"genres"` (String) - The genres of the book to retrieve.
  - `"publisher"` (String) - The publisher of the book to retrieve.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : [
        {
          "_id": "(ObjectID)",
          "image": {
            "filename": "(String)",
            "data": "(Binary)",
            "type": "(String)"
          },
          "title": "(String)",
          "author": "(String)",
          "genres": [ "(String)", "(String)" ],
          "prices": [
            {
              "_id": "(OjectID)",
              "price": "(Float 2 digit)",
              "type": "(String)"
            }
          ],
          "description": "(String)",
          "publisher": "(String)"
        },
      ]
    }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Get a Specific Book

- **URL:** `/books/{id}`
- **Method:** `GET`
- **Description:** Retrieve a specific book by its ID.
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the book to retrieve.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : {
          "_id": "(ObjectID)",
          "image": {
            "filename": "(String)",
            "data": "(Binary)",
            "type": "(String)"
          },
          "title": "(String)",
          "author": "(String)",
          "genres": [ "(String)", "(String)" ],
          "prices": [
            {
              "_id": "(ObjectID)",
              "price": "(Float 2 digit)",
              "type": "(String)"
            }
          ],
          "description": "(String)",
          "publisher": "(String)"
      },
    }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Add a New Book (Authenticated)

- **URL:** `/books`
- **Method:** `POST`
- **Description:** Add a new book to the bookstore.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
  - `Employee role`
- **Request:**

  - **Content-Type:** `multipart/form-data`
  - **Body:**
    - `"title"` (String, required) - The title of the book.
    - `"image"` (File, required) - The book cover image file (e.g., JPEG, PNG).
    - `"author"` (String, required) - The author of the book.
    - `"description"` (String, required) - The description of the book.
    - `"genres"` (Array, required) - The genres of the book. ( _example: [ "Romance", "Darma" ]_ )
    - `"prices"` (Array, required) - The prices of the book. ( _example: [ { price: 123.50, type: "E-book" } ]_ )
    - `"ISBN"` (String, required) - The ISBN of the book.
    - `"publisher"` (String, required) - The publisher of the book.

- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    { "success": true, "message": "Create new book successfuly" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
    _or_
    ```json
    {
      "success": false,
      "message": "The request data is invalid.  File should be image only"
    }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```

#### Updated a Specific Book (Authenticated)

- **URL:** `/books/{id}`
- **Method:** `PUT`
- **Description:** Update a specific book to the bookstore.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
  - `Employee role`
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the book to Updated.
- **Request:**
  - **Content-Type:** `multipart/form-data`
  - **Body:** _Min one property_
    - `"title"` (String) - The title of the book.
    - `"image"` (File) - The book cover image file (e.g., JPEG, PNG).
    - `"author"` (String) - The author of the book.
    - `"description"` (String) - The description of the book.
    - `"genres"` (Array) - The genres of the book. ( _example: [ "Romance", "Darma" ]_ )
    - `"prices"` (Array) - The prices of the book. ( _example: [ { price: 123.50, type: "E-book" } ]_ )
    - `"ISBN"` (String) - The ISBN of the book.
    - `"publisher"` (String) - The publisher of the book.

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    { "success": true, "message": "The book was successfully updated" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
    - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Deleted a Specific Book (Authenticated)
- **URL:** `/books/{id}`
- **Method:** `DELETE`
- **Description:** Delete a specific book by its ID.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
  - `Employee role`
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the book to deleteed.
- **Response:**
  - **Status Code:** 204 No Content
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```


## Users API
### Endpoints
#### Search All Users (Authenticated)

- **URL :** `/users`
- **Method :** `GET`
- **Description :** Retrieve a list of all users in the bookstore.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
- **Query Parameters (Optional) :**
  - `"_id"` (String) - The object id of the user to retrieve.
  - `"email"` (String) - The email of the user to retrieve.
  - `"address"` (Object) - The addres object of the user number to retrieve. 
  _Example :_
    ```json
    address :{
      "recipientname": "(String)",
      "houseNumber": "(String)",
      "village": "(String)",
      "lane": "(String)",
      "road": "(String)",
      "subdistrict": "(String)",
      "district": "(String)",
      "province": "(String)",
      "postalCode": "(String)",
    }
    ```
  - `"role"` (String) - The role of the user to retrieve.
  _Example: ["Manager","Employee","Customer"]_
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : [
        {
          "_id": "(ObjectID)",
          "email": "(String)",
          "role": "(String)",
          "createAt": "(Timestamp)",
        },
      ]
    }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Get a Specific User (Authenticated)

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieve a specific user by its ID.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
- **Request:**
  - **Content-Type:** `application/json`
  - **Body:** _Min one property_
    - `"id"` (String) - The id of the book. **(Only manager role authorzation)**

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : {
          "_id": "(ObjectID)",
          "email": "(String)",
          "role": "(String)",
          "address": "(Object)",
          "createAt": "(Timestamp)",
      },
    }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Updated a Specific User (Authenticated)
- **URL:** `/users`
- **Method:** `PUT`
- **Description:** Update a specific user to the bookstore.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
  - `Employee role`
  - `Customer role`
- **Request:**
  - **Content-Type:** `application/json`
  - **Body:** _Min one property_
    - `{id}` (String) - The unique ID of the user to Updated. **(Only manager role authorzation)**
    - `{role}` (String) - The role of the user to Updated. **(Only manager role authorzation)**
    - `{address}` (Object) - The address of the user to Updated.
    - `{password}` (String) - The password of the user to Updated. 
    - `{confirmpassword}` (String) - Confirm the accuracy of the password before updated. 

- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    { "success": true, "message": "The user was successfully updated" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Deleted a Specific User (Authenticated)
- **URL:** `/users/{id}`
- **Method:** `DELETE`
- **Description:** Delete a specific user by its id.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the user to deleteed.
- **Response:**
  - **Status Code:** 204 No Content
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```
    
## Bills API
### Endpoints
#### Search All Bills

- **URL :** `/bills`
- **Method :** `GET`
- **Description :** Retrieve a list of all bills in the bookstore.
- **Query Parameters (Optional) :**
  - `"status"` (String) - The status of the bill to retrieve. **(Only manager role and employee role authorzation)**
    _Example: "pending" or "completed" or "cancled"_ 
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    _Example: `Authorization: Bearer your-access-token`_
- **Authorization:**
  - `Manager role`
  - `Employee role`
  - `Customer role`
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : [
        {
          "_id": "(ObjectID"),
          "totleAmount": "(Float)",
          "status": "(String)",
          "createdAt": "(Timestamp)",
          "updatedAt": "(Timestamp)"
        },
      ]
    }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Get a Specific Bill

- **URL:** `/bills/{id}`
- **Method:** `GET`
- **Description:** Retrieve a specific bill by its ID.
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the bill to retrieve.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    _Example: `Authorization: Bearer your-access-token`_
- **Authorization:**
  - `Manager role`
  - `Employee role`
  - `Customer role`
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success" : true,
      "data" : {
          "_id" : "(ObjectID)",
          "user": {
            "address": {
              "recipientname": "(String)",
              "houseNumber": "(String)",
              "village": "(String)",
              "lane": "(String)",
              "road": "(String)",
              "subdistrict": "(String)",
              "district": "(String)",
              "province": "(String)",
              "postalCode": "(String)"
            },
            "email": "(String)",
            "role": "(String)",
            "id": "(ObjectID)"
          },
          "items":[{
              "price": {
                "type": "(String)",
                "price": "(Float)"
              },
              "book": {
                "_id": "(ObjectID)",
                "title": "(String)"
              },
              "amount": "(Float)",
              "_id": "(ObjectID)"
            }]
      },
    }
    ```
    - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Add a New Bill (Authenticated)
  - **URL:** `/bills`
  - **Method:** `POST`
  - **Description:** Add a new bill to the bookstore.
  - **Authentication**:
    - Include an `Authorization` header with a Bearer token in the request.
      ( _Example: `Authorization: Bearer your-access-token`_ )
  - **Authorization:**
  - `Customer role`
  - **Request:**
    - **Content-Type:** `application/json`
    - **Body:**
      ```json
        items:[
          {
            "book": "(ObjectID)",
            "price": {
              "type": "(String)",
              "price":"(Float)"
            },
            "amount": "(Integer)"
          }
        ]
      ```

  - **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    { "success": true, "message": "Create new book successfuly" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
  - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
     _or_
    ```json
    { "success": false, "message": "Please update your address" }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```

#### Updated a Specific Book (Authenticated)

- **URL:** `/bills/{id}`
- **Method:** `PUT`
- **Description:** Update a specific bill to the bookstore.
- **Authentication**:
  - Include an `Authorization` header with a Bearer token in the request.
    ( _Example: `Authorization: Bearer your-access-token`_ )
- **Authorization:**
  - `Manager role`
  - `Employee role`
  - `Customer role`
- **URL Parameters:**
  - `{id}` (String) - The unique ID of the bill to Updated.
- **Request: (Optional)**
  - **Content-Type:** `application/json`
  - **Body:**
    - `"status"` (String) - The status of the bill.
      _Example: ["pending","cancled","completed"]_
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    { "success": true, "message": "Update a bill successfuly" }
    ```
  - **Status Code:** 400 Bad Request
  - **Body:**
    ```json
    { "success": false, "message": "The request data is invalid." }
    ```
    - **Status Code:** 401 Unauthorized
  - **Body:**
    ```json
    { "success": false, "message": "No token provided." }
    ```
  - **Status Code:** 403 Forbidden
  - **Body:**
    ```json
    { "success": false, "message": "Failed to authenticate token." }
    ```
    _or_
    ```json
    { "success": false, "message": "Insufficient permissions." }
    ```
  - **Status Code:** 404 Not Found
  - **Body:**
    ```json
    { "success": false, "message": "The requested resource was not found." }
    ```



## Error Handling

- **Status Code:** 400 Bad Request
  - Returned when the request is malformed or missing required parameters. This status code indicates that the server could not understand the request due to client error (e.g., syntax error, missing data).
- **Status Code:** 401 Unauthorized
  - Returned when the request lacks valid authentication credentials (e.g., missing or invalid access token). It indicates that the client must authenticate itself to access the resource.
- **Status Code:** 403 Forbidden
  - Returned when the client is authenticated but does not have permission to access the requested resource. This status code indicates that the server understands the request but refuses to fulfill it due to authorization issues.
- **Status Code:** 404 Not Found
  - Returned when the requested resource (e.g., a book) is not found on the server. It indicates that the server could not locate the requested resource.
- **Status Code:** 500 Internal Server Error
  - Returned when the server encounters an unexpected error or exception while processing the request. It is a generic status code indicating a server-side problem, and the client typically cannot take any specific action to resolve it.


## Examples

### cURL Example

#### List All Books

```bash
curl -X GET http://localhost:3000/books
```

#### Get a Specific Book

```bash
curl -X GET http://localhost:3000/books/1
```

#### Add a New Book

```bash
curl --location --max-time 10000 "localhost:3000/book" \
--form "image=@\"path/img/imagefile.jpg\"" \
--form "title=\"book test\"" \
--form "author=\"author test\"" \
--form "description=\"description test\"" \
--form "isbn=\"1234567890\"" \
--form "genres=\"[\\\"genre 1\\\",\\\"genre 2\\\"]\"" \
--form "publisher=\"publisher test\"" \
--form "prices=\"[{type:\\\"price1\\\",price:123.23},{type:\\\"price2\\\",price:234.25}]\""
```
