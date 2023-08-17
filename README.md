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
- Genre Management:
    - Create and retrieve genre records.
- User Authentication:
    - User registration with unique authentication tokens.
    - Secure login and token-based authentication for protected routes.
- Inventory Management:
    - Update the inventory of books to reflect stock changes.
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

- Node.js <b>14</b>+
- MongoDB Cloud Account - [Create a new Account](https://account.mongodb.com/account/login)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Tam643/BookStoreAPI.git
   ```
2. Create a .env file:
   Create a .env file in the project root and set the following variables:

   ```sh
   DB_URI=change_to_your_MongoDB_URI
   JWT_SECRET=change_to_your_secret
   ```

   Or you can create the .env file using Command Prompt:

   ```sh
   cd bookstoreapi & echo DB_URI=change_to_your_MongoDB_URI JWT_SECRET=change_to_your_secret > .env
   ```

3. Install NPM packages:
   ```sh
   npm install
   ```
4. Start the application:
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Setup and Environment
  - [x] Set up the development environment, including tools and dependencies.
  - [x] Initialize a project structure and version control.
- [x] Define Book Routes:
  - [x] Define API endpoints for CRUD operations on books (Create, Read, Update, Delete).
  - [x] Implement route handlers for each operation.
- [x] Create Books and Genres Model
  - [x] Design your database schema for books and genres.
  - [x] Define models using an Mongoose library.
- [x] Build Book Controller and Router:
  - [x] Create a controller that interacts with the models.
  - [x] Plug in a router to handle incoming requests and route them to the appropriate controller methods.
- [ ] Build Authentication:
  - [ ] Use jsonwebtoken library for JWT-based authentication.
  - [ ] Implement authentication middleware to secure routes.
- [ ] Define Auth Routes:
  - [ ] Create endpoints for user registration, login, and logout.
  - [ ] Implement controllers to handle these routes.
- [ ] Create Users Model and Auth Controller:
  - [ ] Design the user model to store user information.
  - [ ] Build controllers to manage user registration and authentication.
- [ ] Build EnsureLogin Middleware:
  - [ ] Develop middleware that checks if a user is authenticated before allowing access to certain routes.
- [ ] Build Inventory for a Book:
  - [ ] Extend the book model to include inventory-related information.
  - [ ] Create routes to manage inventory, such as updating stock levels.
- [ ] Build B2C Sale Systems:
  - [ ] Design and implement routes to handle customer transactions (e.g., purchasing books).
- [ ] Build Order Bill System:
  - [ ] Design the schema to store order information, including user details, items, total cost, and order status.
  - [ ] Create routes and controllers to handle order creation, retrieval, and updates.
  - [ ] Implement logic to calculate the total cost of items in an order.
  - [ ] Develop a system to track order status (pending, processing, shipped, delivered, etc.).
  - [ ] Build endpoints for users to view their order history and status.

See the [open issues][issues-url] for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

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
