# ShopHub - Modern E-Commerce Showcase

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS. This project demonstrates best practices in React development, including component architecture, state management, and responsive design.


## Features

- 🛍️ **Product Browsing**: Browse through a catalog of products with filtering and sorting capabilities
- 🔍 **Search Functionality**: Search for products by name or category
- 📱 **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- 🎨 **Modern UI**: Clean, modern interface with smooth animations and transitions
- 🛒 **Shopping Cart**: Add products to cart and proceed to checkout
- 💰 **Price Formatting**: Prices displayed in Indian Rupees (₹)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shop-hub.git
   cd shop-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx     # Application header with navigation
│   ├── ProductCard.tsx # Card component for displaying products
│   ├── ProductFilters.tsx # Filter and sort controls
│   └── ErrorDisplay.tsx # Error handling component
├── pages/              # Page components
│   ├── Home.tsx       # Home page with product listing
│   └── ProductDetail.tsx # Product detail page
├── services/           # API and service functions
│   └── api.ts         # API calls and data fetching
├── types/              # TypeScript type definitions
│   └── product.ts     # Product interface and types
├── hooks/              # Custom React hooks
│   └── useProducts.ts # Hook for fetching and managing products
├── utils/              # Utility functions
│   └── helpers.ts     # Helper functions
└── App.tsx             # Main application component
```

## Data Fetching Strategy

The application uses a custom hook (`useProducts`) to manage data fetching and state. This approach provides several benefits:

1. **Separation of Concerns**: Data fetching logic is separated from UI components
2. **Reusability**: The hook can be reused across different components
3. **Error Handling**: Centralized error handling for API requests
4. **Loading States**: Consistent loading state management
5. **Caching**: Products are cached to reduce unnecessary API calls

The application fetches data from a RESTful API using the `fetch` API. In a production environment, this would be replaced with a real API endpoint.

## Styling Method

This project uses **Tailwind CSS** for styling, which offers several advantages:

1. **Utility-First Approach**: Rapidly build custom designs without leaving your HTML
2. **Responsive Design**: Built-in responsive utilities for all screen sizes
3. **Dark Mode**: Native dark mode support
4. **Customization**: Easily extend the default theme with custom colors, fonts, etc.
5. **Performance**: Only includes the CSS you use in your production build


## Deployment

The application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

```bash
# Build the application
npm run build
# or
yarn build
```

## Live Demo

[View Live Demo](https://shophub-theta.vercel.app/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Product data provided by [FakeStoreAPI](https://fakestoreapi.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components inspired by modern e-commerce platforms
