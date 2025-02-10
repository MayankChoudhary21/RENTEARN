# RENTEARN
A HTML CSS and JavaScript designed application using Express.js as the backend, node.js as the run-time environment and MongoDB as the database.
# Glimpse of our creation 
![image](https://github.com/user-attachments/assets/517bf266-5834-498c-9ce1-20550affb1b0)
![image](https://github.com/user-attachments/assets/8fd998f2-4a50-4057-840c-e780f401455c)
![image](https://github.com/user-attachments/assets/40ae3722-8de8-491d-841b-66d8bc628a35)

# Command to run the Code:
- nodemon app.js
# Wanderlust - Express & MongoDB Web App

## Description
Wanderlust is a web application built using **Node.js, Express, and MongoDB**. It allows users to manage travel listings and reviews. The application integrates **EJS for templating**, **Mongoose for database interactions**, and **Express middleware** for enhanced functionality.

## Features
- **MongoDB Connection**: Connects to a local MongoDB instance at `mongodb://127.0.0.1:27017/wanderlust`.
- **Express Middleware**: Uses `express-session`, `connect-flash`, `method-override`, and `express.static` for enhanced routing and request handling.
- **Templating with EJS**: Uses `ejs-mate` as the view engine for dynamic HTML rendering.
- **Flash Messages**: Displays success and error messages using `connect-flash`.
- **Routes Handling**: Includes routes for `listings` and `reviews`.
- **Error Handling**: Uses custom middleware for handling errors.

## Installation
### Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your system.

### Steps to Set Up
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start MongoDB**:
   ```sh
   mongod
   ```

4. **Run the application**:
   ```sh
   node app.js
   ```
   or using **nodemon** (if installed):
   ```sh
   nodemon app.js
   ```

5. **Access the application** in the browser:
   ```sh
   http://localhost:8080/
   ```

## Project Structure
```
/project-root
|-- models/         # Mongoose models
|-- public/         # Static files (CSS, JS, images)
|-- views/          # EJS templates
|-- utils/          # Utility functions
|-- app.js          # Main application file
|-- Schema.js       # Mongoose schema definitions
|-- listing.js      # Listing route handlers
|-- review.js       # Review route handlers
```

## Middleware Used
- `express-session`: Session management
- `connect-flash`: Flash messages
- `method-override`: Enables PUT and DELETE requests
- `mongoose`: MongoDB ODM for Node.js
- `ejs-mate`: Layouts for EJS templates

## Error Handling
The app includes an error-handling middleware that catches all unhandled routes and server errors.

## Contribution
Feel free to contribute! Fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

## Collaborators:
Abhisek Anjana and Mayank Choudhary





