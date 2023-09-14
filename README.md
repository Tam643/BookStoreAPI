<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">BookStoreAPI</h3>
<p>
This is a basic REST API skeleton written on Javascript.<br>Great for building a starter web API for your front-end<br>(Vue, React, Angular, or anything that can consume an API).
</p>
  <p align="center">
    <a href="https://github.com/Tam643/BookStoreAPI/issues">Report Bug</a>
    ·
    <a href="https://github.com/Tam643/BookStoreAPI/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents
 <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>

## About the project
The BookStoreAPI project aims to offer a foundation for building a fully-fledged virtual bookstore application. By following this API, developers can easily set up book-related operations, manage orders, generate bills, and secure routes using authentication. This project showcases best practices for API design, data modeling, and user authentication in a practical context.

### Features
- Book Management:
    - Create, retrieve, update, and delete book records.
    - View details of individual books.
- User Authentication:
    - User registration with unique authentication tokens.
    - Secure login and token-based authentication for protected routes.
    - Role-Based Access Control (RBAC) is help control what different users can do within the system.
- Order Processing:
    - Create and manage customer orders.
    - View order history for users.
- Order Bill Generation:
    - Generate detailed order bills with transaction information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Expressjs-shield]][Expressjs-url]
- [![Formidable-shield]][Formidable-url]
- [![fs-extra-shield]][fs-extra-url]
- [![Joi-shield]][Joi-url]
- [![Mongoose-shield]][Mongoose-url]
- [![Argon2-shield]][Argon2-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites
Before setting up a Node.js application with Docker and MongoDB, you need to ensure that you have the necessary prerequisites in place. Below are the prerequisites for setting up this environment:

1. **Node.js and npm:**
   - **Node.js:** You should have Node.js installed on your system. You can download it from the official Node.js website: https://nodejs.org/
   - **npm (Node Package Manager):** npm is usually included with Node.js. You can verify its installation by running `npm -v` in your terminal.

2. **Docker:**
   - **Docker Desktop (for Windows and macOS):** If you are using Windows or macOS, install Docker Desktop, which includes both Docker Engine and Docker Compose. You can download it from the Docker website: https://www.docker.com/products/docker-desktop
   - **Docker Engine and Docker Compose (for Linux):** On Linux, you can install Docker Engine and Docker Compose separately. Follow the instructions for your specific Linux distribution on the Docker website: https://docs.docker.com/get-docker/

3. **MongoDB Container Image:**
   - You'll need access to the official MongoDB Docker image from Docker Hub. You can pull it using the following Docker command:
     ```
     docker pull mongo
     ```

4. **Text Editor or IDE:**
   - You should have a code editor or an integrated development environment (IDE) installed for writing Node.js applications. Popular choices include Visual Studio Code, Sublime Text, and WebStorm.

The installation steps you provided seem to be for setting up a Node.js-based BookStore API with MongoDB as the database and Docker for containerization. Here's a breakdown of the steps:

### Installation

1. **Clone the repo:**

   Clone the project repository from GitHub using the `git clone` command:

   ```sh
   git clone https://github.com/Tam643/BookStoreAPI.git
   ```

2. **Create a .env file:**

   Create a `.env` file in the project's root directory and set the following environment variables inside it:

   ```sh
   DB_URI=change_to_your_MongoDB_URI
   JWT_SECRET=change_to_your_secret
   ```

   You can manually create the `.env` file and add these variables, or you can create it using the Command Prompt:

   ```sh
   cd BookStoreAPI
   echo DB_URI=change_to_your_MongoDB_URI JWT_SECRET=change_to_your_secret > .env
   ```

   Replace `change_to_your_MongoDB_URI` with your actual MongoDB connection URI, and `change_to_your_secret` with your desired JWT secret key.

3. **Install NPM packages:**

   Install the required Node.js packages using npm:

   ```sh
   npm install
   ```

4. **Start MongoDB:**

   Make sure Docker Desktop is running, and then start a MongoDB container with the following command:

   ```sh
   docker run -d -p 0.0.0.0:27017:27017 --name mongodb mongo
   ```

   This command starts a MongoDB container and binds it to IP address `0.0.0.0` on port `27017`.

5. **Start the application:**

   Finally, start the BookStore API application:

   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

The "Usage" section in your project's README is where you can demonstrate how users can interact with your project, provide code examples, and showcase its functionality. Here's an example template for your "Usage" section:

---

## Usage

### Getting Started
Now, the BookStore API is up and running locally on your machine.

### API Endpoints

The BookStore API provides the following endpoints:

- **List All Books:**

  ```http
  GET /books
  ```

  Retrieve a list of all books in the bookstore.

- **Get a Specific Book:**

  ```http
  GET /books/{id}
  ```

  Retrieve a specific book by its ID.

- **Create a New Book:**

  ```http
  POST /books
  ```

  Create a new book in the bookstore. Requires authentication.

- **Update a Book:**

  ```http
  PUT /books/{id}
  ```

  Update an existing book by its ID. Requires authentication.

- **Delete a Book:**

  ```http
  DELETE /books/{id}
  ```

  Delete a book by its ID. Requires authentication.

For more detailed information and examples, please refer to the [API Documentation](https://github.com/Tam643/BookStoreAPI/blob/main/APIDocument.md).

### Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include your JWT token in the `Authorization` header of your requests:

```http
Authorization: Bearer your-access-token
```

### Examples

Here are some examples of how to interact with the API:

- **List all books:**

  ```bash
  curl http://localhost:3000/books
  ```

- **Create a new book (requires authentication):**

  ```bash
  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-access-token" -d '{
    "title": "New Book",
    "author": "Author Name",
    "isbn": "978-1234567890",
    "price": 19.99
  }' http://localhost:3000/books
  ```

- **Get a specific book:**

  ```bash
  curl http://localhost:3000/books/1
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- twitter: [@TumTheeradach](https://twitter.com/TumTheeradach) 

- E-mail: p.tam.theeradach@gmail.com

Project Link: [https://github.com/Tam643/BookStoreAPI](https://github.com/Tam643/BookStoreAPI)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Tam643/BookStoreAPI?style=for-the-badge
[contributors-url]: https://github.com/Tam643/BookStoreAPI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Tam643/BookStoreAPI?style=for-the-badge
[forks-url]: https://github.com/Tam643/BookStoreAPI/forks
[stars-shield]: https://img.shields.io/github/stars/Tam643/BookStoreAPI?style=for-the-badge
[stars-url]: https://github.com/Tam643/BookStoreAPI/stargazers
[issues-shield]: https://img.shields.io/github/issues-raw/Tam643/BookStoreAPI?style=for-the-badge
[issues-url]: https://github.com/Tam643/BookStoreAPI/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tum-theeradach/
[Expressjs-shield]: https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white
[Expressjs-url]: https://expressjs.com/
[Formidable-shield]: https://img.shields.io/badge/Formidable-FFA500?style=for-the-badge
[Formidable-url]: https://github.com/node-formidable/formidable
[fs-extra-shield]: https://img.shields.io/badge/fs--extra-2E86C1?style=for-the-badge&logo=nodedotjs&logoColor=white
[fs-extra-url]: https://github.com/jprichardson/node-fs-extra
[Joi-shield]: https://img.shields.io/badge/Joi-F97625?style=for-the-badge
[Joi-url]: https://joi.dev/
[Mongoose-shield]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[Argon2-shield]: https://img.shields.io/badge/Argon2-6559C7?style=for-the-badge
[Argon2-url]: https://github.com/ranisalt/node-argon2#readme
