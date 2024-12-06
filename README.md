# 🛠️ QuickStock API - Backend

**QuickStock API** is a robust backend built with **Node.js** and **Express.js** to manage stock data, handle authentication, and perform CRUD operations. The API integrates seamlessly with the frontend application to manage products, sales, purchases, firms, and brands, while ensuring secure user authentication and providing real-time data access.

## 🌟 Project Purpose

QuickStock API provides the backend services to support the **QuickStock** stock management application. This API enables users to interact with stock data, authenticate their sessions, and perform CRUD operations efficiently. It serves as the core service that powers the frontend features like product management, sales, and stock tracking.

## 🎬 Outcome

![QuickStock API](https://github.com/user-attachments/assets/7c7ccc0c-564b-4025-a090-212e50fb5158)

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment for building the server-side application.
- **Express.js**: Web framework for Node.js, providing routing, middleware, and handling requests.
- **JWT (JSON Web Tokens)**: For user authentication, ensuring secure login and token-based session management.
- **MongoDB & Mongoose**: Database management using MongoDB with Mongoose for data modeling and management.
- **Swagger UI**: Provides interactive API documentation for easy exploration of the API endpoints.
- **ReDoc**: Alternative API documentation viewer for better usability and clarity.
- **CORS**: Configured to handle cross-origin requests, allowing the frontend to communicate with the backend securely.
- **Bcryptjs**: Used for hashing and comparing passwords, ensuring secure user authentication.
- **dotenv**: For managing environment variables, including sensitive data like database credentials and JWT secrets.
- **Axios**: For making HTTP requests to interact with external services if needed.
- **Helmet**: Adds security headers to the API responses, improving the overall security of the application.
- **Rate-Limiter**: Prevents abuse and enhances security by limiting the number of requests a user can make.

## ⚙️ Features

- **🛠️ CRUD Operations**: Create, Read, Update, and Delete products, brands, firms, sales, and purchases.
- **🔒 Authentication**: Secure login system with JWT tokens for authentication and session management.
- **🔄 CORS Configuration**: CORS middleware ensures that requests from different origins (like the frontend) are handled safely.
- **💾 MongoDB Integration**: Data is stored and managed in MongoDB, ensuring scalability and reliability.
- **📊 Real-time Data**: Provides real-time data access for the frontend application to show up-to-date information.
- **📜 API Documentation**:
  - **Swagger UI**: [Swagger UI - QuickStock API Documentation](https://quickstock-api.onrender.com/documents/swagger/)
  - **ReDoc**: [ReDoc - QuickStock API Documentation](https://quickstock-api.onrender.com/documents/redoc/)

## 🚦 Authentication Flow

- **User Registration & Login**: Users can register and log in with secure authentication via JWT.
- **Token Management**: JWT tokens are used for managing user sessions, and tokens are sent in request headers for authentication.
- **Protected Routes**: Some API routes are protected, requiring valid JWT tokens to access resources like updating or deleting records.

## 📦 Stock Management

- **Product, Brand, Firm Management**: Manage and manipulate data for products, brands, and firms with CRUD operations.
- **Sales & Purchases**: View and manage sales and purchase records to track stock movement.

## 🚀 Deployment

The API is deployed on **Render** and is accessible via the following URL:

[Live Demo - QuickStock API](https://quickstock-api.onrender.com/)

## 📚 API Documentation (Swagger & ReDoc)

You can explore the API using the following documentation tools:

- **Swagger UI**: [Swagger UI - QuickStock API Documentation](https://quickstock-api.onrender.com/documents/swagger/)
- **ReDoc**: [ReDoc - QuickStock API Documentation](https://quickstock-api.onrender.com/documents/redoc/)

## 📦 At the End of This Project, You Will Learn:

- Building a **Node.js** backend API with **Express.js**.
- Handling **authentication** with JWT for secure user sessions.
- Using **MongoDB** and **Mongoose** for data storage and management.
- Documenting the API with **Swagger UI** and **ReDoc**.
- Handling **CORS** to enable cross-origin communication.

<p align="center">🚀 Happy Coding with QuickStock API! 🚀</p>
