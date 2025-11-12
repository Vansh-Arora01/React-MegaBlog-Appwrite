# ReaWrite (e.g., MegaBlog)

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![CKEditor 5](https://img.shields.io/badge/CKEditor_5-000000?logo=ckeditor&logoColor=white)](https://ckeditor.com/)
[![Vercel Deployment](https://img.shields.io/badge/deployment-Vercel-black?logo=vercel)](https://react-mega-blog-appwrite.vercel.app)

A dynamic, full-stack blog platform built with React and Appwrite. This project features a complete CMS with user authentication, rich-text editing, and role-based content management.

The primary focus of this project is on **robust architecture and functionality**. It demonstrates a scalable frontend using **Redux Toolkit** for state management, secure backend integration with **Appwrite**, and a clean separation of concerns.

### ✨ [Live Demo](https://react-mega-blog-appwrite.vercel.app)

---

## 📸 Screenshots

*(This section is crucial! Even if simple, show the functionality.)*

| Homepage | Post Editor (CKEditor) |
| :---: | :---: |
| 

[Image of Homepage]
 |  |
| **Login Page** | **Single Post View** |
| 

[Image of Login Page]
 |  |

---

## 🎯 Project Goals & Key Learnings

This project was an architectural deep dive. The main goals were:
* **Implement a "Backend-as-a-Service":** To build a full-stack application from scratch using **Appwrite**, handling its database, authentication, and storage services.
* **Master Global State:** To use **Redux Toolkit** for managing user authentication status and posts across the entire application.
* **Secure Protected Routes:** To create a robust routing system with `react-router-dom` that protects routes based on authentication state (using the `<AuthLayout />` component).
* **Integrate Third-Party Services:** To successfully implement the **CKEditor 5** rich text editor and handle its data flow, including image uploads.
* **Focus on Function-Over-Form:** The UI is intentionally clean and functional, built with TailwindCSS, to serve as a solid foundation for the application's complex logic.

---

## 🚀 Features

* **User Authentication:** Secure user Sign Up and Login using Appwrite Auth.
* **Protected Routes:** Key routes (`/add-post`, `/all-posts`) are protected.
* **Full CRUD Operations:** Users can Create, Read, Update, and Delete blog posts.
* **Authorization:** Users can **only** edit or delete posts they have created.
* **Rich Text Editor:** Uses **CKEditor 5** for a modern writing experience.
* **Automatic Slug Generation:** Post titles are automatically converted into unique, URL-friendly slugs.
* **State Management:** Uses **Redux Toolkit** for efficient global state.
* **Form Handling:** Leverages **React Hook Form** for performant and easy-to-manage forms.
* **Responsive Design:** Fully responsive UI built mobile-first with **TailwindCSS**.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, React Router v7, TailwindCSS |
| **State Management** | Redux Toolkit |
| **Backend** | Appwrite (Backend-as-a-Service) |
| **Appwrite Services** | Auth, Databases, Storage |
| **Form Handling** | React Hook Form |
| **Text Editor** | CKEditor 5, html-react-parser |
| **Deployment** | Vercel |

---


## ⚙️ Getting Started

To run this project locally, follow these steps.

### Prerequisites

* Node.js (v18 or higher)
* An active **Appwrite** account

### 1. Appwrite Backend Setup

(See original README for detailed Appwrite setup: create collections, attributes, and storage bucket)

### 2. Local Frontend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vansh-Arora01/React-MegaBlog-Appwrite.git
    cd React-MegaBlog-Appwrite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Create a file named `.env` in the root of your project and add your Appwrite credentials.

    ```env
    # VITE variables MUST start with VITE_
    VITE_APPWRITE_URL="[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)"
    VITE_APPWRITE_PROJECT_ID="your-project-id"
    VITE_APPWRITE_DATABASE_ID="your-database-id"
    VITE_APPWRITE_COLLECTION_ID="your-collection-id"
    VITE_APPWRITE_BUCKET_ID="your-storage-bucket-id"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🚀 Deployment

This project is deployed on **Vercel**. The deployment process is continuous, triggering a new build with every `git push` to the `main` branch.

**Vercel Configuration:**
* **Framework Preset:** Vite
* **Environment Variables:** The same `VITE_` variables from the `.env` file must be added to the Vercel project's "Environment Variables" settings.

---

## 💡 Future Improvements

This project provides a solid foundation. Future enhancements could include:
* **UI/UX Overhaul:** Implementing a custom design or a component library like Shadcn UI or Material-UI.
* **User Profiles:** A dedicated page where users can see all their own posts.
* **Comments:** Adding a "comments" feature to each post.
* **Pagination:** Implementing pagination on the "All Posts" page for better performance.
* **Search Functionality:** Adding a search bar to find posts by title.

---

## **👨‍💻 Author**

- **VANSH ARORA**
- 🎓 B.Tech CSE |Prefinal-Student | Aspiring Software Engineer
- 🔗 [LinkedIn](https://www.linkedin.com/in/vansh-arora01)
 