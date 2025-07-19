<img width="1905" height="989" alt="image" src="https://github.com/user-attachments/assets/5c155b02-13c5-43b9-9a1e-2aa12045b827" /># 🏨 WanderLust

WanderLust is a full-stack web application inspired by Airbnb, built from the ground up using the MERN stack (MongoDB, Express.js, Node.js) with EJS for server-side rendering. This project allows users to discover, list, and review unique accommodations around the world. It showcases a complete development cycle, from database design and RESTful API development to a responsive, modern user interface.

---

## ✨ Key Features

* **User Authentication:** Secure user registration, login, and logout functionality using Passport.js with session management.
* **RESTful CRUD Operations:** Full create, read, update, and delete functionality for both property listings and user reviews.
* **Cloud Image Uploads:** Seamless image uploads for listings, hosted on Cloudinary to ensure fast and reliable delivery.
* **Interactive Maps:** Integration with Mapbox API to display the geographical location of each listing on an interactive map.
* **Dynamic Frontend:** A fully responsive user interface built with Bootstrap 5, featuring:

  * A sticky navbar and filter bar for easy navigation.
  * Professionally designed forms with floating labels and client-side validation.
  * A modern, two-column layout for listing details pages.
* **Authorization & Ownership:** Robust middleware ensures that users can only edit or delete their own listings and reviews.
* **Data Validation:** Both client-side (Bootstrap) and server-side (Joi) schema validation to maintain data integrity.
* **Flash Messages:** Provides user-friendly feedback for actions like creating a listing, logging in, or encountering an error.

---

## 🛠️ Technology Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose (ODM)
* **Frontend:** EJS (Embedded JavaScript), Bootstrap 5, HTML5, CSS3
* **Authentication:** Passport.js (Local Strategy), Express Session
* **Cloud Services / APIs:**

  * **Cloudinary:** For image storage and management.
  * **Mapbox:** For interactive maps and geocoding.
* **Key Libraries:** `method-override`, `connect-flash`, `joi`, `dotenv`.

---

## 🚀 Setup and Installation

To run this project locally, follow these steps:

**1. Prerequisites:**

* Node.js and npm installed.
* MongoDB installed and running on your local machine or a MongoDB Atlas account.

**2. Clone the Repository:**

```bash
git clone https://github.com/Satishchoudhary94/WanderLust.git
cd WanderLust
```

**3. Install Dependencies:**

```bash
npm install
```

**4. Set Up Environment Variables:**
Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your own keys.

```env
# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox API Token
MAP_TOKEN=your_mapbox_token

# Express Session Secret
SECRET=a_very_strong_secret_key

# MongoDB Connection URL (for local or Atlas)
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
```

> Important: Make sure your `.env` file is listed in your `.gitignore` file to keep your secret keys private!

**5. Start the Server:**

```bash
nodemon app.js
```

The application should now be running on `http://localhost:8080`.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📢 Contact

For feedback or collaboration:

* GitHub: [Satishchoudhary94](https://github.com/Satishchoudhary94)
* LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/satishkchy/)
