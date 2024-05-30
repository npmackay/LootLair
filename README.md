# LootLair

LootLair is a marketplace application where users can post and purchase items related to various games. The application provides a user-friendly interface for browsing items, posting new items, and managing user profiles.


## Getting Started

To get started with the project, clone the repository and install the dependencies using `npm install`. Then, you can run the frontend using `npm run frontend` and the backend using `npm run backend`.

You can create you own data using the marketplace feature on use the included test data functions will fill the database with test data.
For more details, please refer to the individual files and components.


## Tech Stack

LootLair is built using a combination of popular and powerful libraries and frameworks. Here's a brief overview of the main technologies used:

### Frontend

- `React`: A JavaScript library for building user interfaces. It allows us to create reusable UI components. The application's components such as HeaderNavBar, CreatePostingModal, and ItemPostingTable are built using React.
- `React Router`: A collection of navigational components that compose declaratively with your application. It's used in main.jsx to manage the different pages of the application like the Homepage, Marketplace, and ProfilePage.
- `Material-UI`: A popular React UI framework with a set of reusable components. It's used throughout the application for consistent and responsive UI.
- `React Toastify`: Used to add notifications to the application.

### Backend

- `Express`: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's used in server.js to manage server-side logic.
- `SQLite`: A C library that provides a lightweight disk-based database. It allows interacting with the database using a nonstandard variant of the SQL query language. It's used in tableCreation.js and marketPlaceQueries.js to manage the application's data.
- `bcrypt` is a popular password hashing function that is commonly used for securely storing passwords.
  It provides a way to hash passwords using a salt and a cost factor, making it resistant to brute-force attacks.
- `morgan` : is a middleware for Node.js/Express applications that logs HTTP requests.
  It provides a simple and customizable logging format, allowing you to track and analyze incoming requests.
- `multer`: A middleware for handling multipart/form-data, primarily used for uploading files in Node.js applications. It provides an easy way to handle file uploads, including handling file size limits, file type validation, and storing files on the server.

### Development

- `Vite`: A build tool that aims to provide a faster and leaner development experience for modern web projects. It's used for building the project as specified in the package.json file.
- `ESLint`: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. It's used to maintain code quality.
- `Nodemon`: A utility that will monitor for any changes in your source and automatically restart your server. It's used for improving the development experience.
- `Validator`: A powerful npm package that provides a set of validation functions for validating various types of data, such as strings, numbers, emails, URLs, and more. It's commonly used in web applications to ensure that user input meets specific criteria and is valid before processing or storing it.

