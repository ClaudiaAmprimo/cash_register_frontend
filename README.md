# Amenitiz Shop (Frontend)

This project is the frontend for Amenitiz Shop, a shopping cart application that allows users to view products, add them to the cart, and see applied discounts and total prices. The backend is built in Ruby on Rails, while the frontend uses React with Vite for fast development.

## Features

- Product List: Displays products with images and prices.

- Shopping Cart: Users can add and remove products, and see quantity and prices.

- Discount Application: Discounts are dynamically applied based on product-specific rules.

- Persistent Cart: The cart is stored in cookies, allowing users to retain items even after closing the tab.


# Installation
To install and run this project locally, follow these steps:

1. Clone the repository:

  ```
  git clone https://github.com/ClaudiaAmprimo/cash_register_frontend.git
  cd cash_register_frontend
  ```

2. Verify Node.js and npm versions:

  ```
  node -v
  npm -v
  ```

If not installed, visit [Node.js ](https://nodejs.org/en) official website to install them.

3. Install project dependencies (Vite will be set up automatically):

  ```
  npm install
  ```

# Usage
To start the development server with Vite:

  ```
  npm run dev
  ```

The server will run at http://localhost:5173 by default.

# Folder Structure

  - Components: Contains reusable UI components like Header, Cart, ProductList, and Banner.

  - Context: Manages the global state of the cart using CartContext.

  - Hooks: Custom hooks like useCart and useProducts handle API calls and manage state.

  - Pages: Main views such as Home and CartPage.

# API Integration
The frontend integrates with the backend to manage products and cart items:

GET /products: Fetches the list of products.

POST /carts/add_product: Adds a product to the cart.

DELETE /carts/remove_product: Removes a specific product from the cart.

Ensure that the backend is running on http://localhost:3000 to avoid CORS issues.

# Testing
This project uses Jest for testing components and hooks. To run tests, use:

  ```
  npm test
  ```

# Important Notes

Persistent Cart: The cart is stored in cookies, allowing the items to persist even if the browser tab is closed and reopened.

CSS and Responsive Design: Custom styles are applied for a responsive cart view that adjusts for smaller screens.

### Note:
In a production setup, it is best practice to store environment-specific variables, like the backend URL, in a .env file. However, for simplicity in this exercise, the backend URL is hardcoded directly into the code.
