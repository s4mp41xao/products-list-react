# Product List React Application 📦

This is the frontend for a modern Product Management application, built with **React** and **Vite**. It provides a clean and responsive user interface to interact with a product database, allowing users to view, create, update, and delete products.

The application is designed to consume a separate backend API built with NestJS.

**Live Demo URL**: [https://products-list-react-inky.vercel.app/](https://products-list-react-inky.vercel.app/)

---

## ✨ Features

- **List Products**: Fetches and displays a list of all available products from the API.
- **Responsive Design**: A clean and modern UI that works on all screen sizes.
- **API Integration**: Uses Axios to communicate with the backend API for all data operations.
- **Environment-Based Configuration**: API URL is configured via environment variables, making it easy to switch between development and production.
- **Ready for Deployment**: Optimized for deployment on platforms like Vercel.

---

## 🛠️ Technologies Used

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A next-generation frontend tooling that provides a faster and leaner development experience.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript for building robust applications.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for making requests to the backend.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[React Icons](https://react-icons.github.io/react-icons/)**: A library for including popular icons in your React projects.

---

## 📂 Project Structure

The project follows a standard Vite + React project structure:
```
/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable React components (e.g., ProductCard, Modal)
│   ├── services/         # API communication layer (e.g., api.ts with Axios)
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
└── vite.config.ts        # Vite configuration
```
---

## 🔗 Backend API

This frontend application depends on a separate backend API for all data operations.

The backend is a **NestJS CRUD API** that handles product management, connecting to a **MongoDB** database. For more detailed information about its architecture, endpoints, and how to run it locally, please refer to its repository.

➡️ **Backend Repository**: [https://github.com/s4mp41xao/nestcrud](https://github.com/s4mp41xao/nestcrud)

---

## ⚙️ Environment Variables

To run this project locally, you need to create a `.env` file in the root directory. You can copy the `.env.example` file:

```bash
cp .env.example .env
```

Then, fill in the required variables:

- `VITE_API_URL`: The base URL of the backend API. For local development, this will likely be `http://localhost:3000`. For production, it will be the URL of your deployed backend (e.g., `https://nestcrud.vercel.app`).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation and Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/products-list-react.git
    cd products-list-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file as described in the section above and set `VITE_API_URL`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## ☁️ Deployment

This project is configured for easy deployment on **Vercel**.

To deploy, simply connect your GitHub repository to a new Vercel project. Vercel will automatically detect that it's a Vite project and configure the build settings.

**Important**: Remember to set the `VITE_API_URL` environment variable in your Vercel project settings to point to your deployed backend API URL.
