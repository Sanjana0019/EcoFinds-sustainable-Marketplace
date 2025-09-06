
# 🌱 EcoFinds – Sustainable Second-Hand Marketplace

EcoFinds is a **web-based prototype** built for the *Odoo x NMIT Hackathon ’25*.  
It promotes **sustainable consumption** by enabling users to buy and sell pre-owned goods, reducing waste, and extending product lifecycles.

### 🔑 Authentication  
![Home Page](./assets/home page.png)
---

## 🚀 Features  

- 🔑 **User Authentication**  
  - Register with username, email, password  
  - Login & logout  
  - Session saved in local storage  

- 👤 **Profile Dashboard**  
  - View username & email  
  - Edit and update user profile  

- 📦 **Product Listings (CRUD)**  
  - Add product with title, category, description, price, image placeholder  
  - Edit or delete your own listings  
  - My Listings page to manage products  

- 🔍 **Browse & Search**  
  - Home feed with all products  
  - Search bar to find products by keyword  
  - Filter products by category  

- 🛒 **Cart**  
  - Add items to cart from product detail page  
  - Increase/decrease quantity  
  - Remove from cart  
  - Checkout to move items into purchase history  

- 📜 **Purchase History**  
  - View all previously purchased products  

- 📱 **Responsive UI**  
  - Works seamlessly on desktop & mobile  
  - Modern, card-based design  

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite  
- **Styling:** TailwindCSS / CSS (from Figma export)  
- **UI Components:** Radix UI  
- **State Management:** React Hooks (useState, useEffect)  
- **Mock Backend:** Local state + LocalStorage (can be extended to Node/Firebase/Mongo)  


🔮 Future Improvements

Real backend integration (Node.js + MongoDB or Firebase)
Actual image upload (Cloudinary/Firebase storage) instead of placeholders
User-to-user chat for negotiation
Payment gateway integration
Notifications for new listings

---

⚡ Getting Started
1. Clone the Repo
git clone <your-repo-url>
cd EcoFinds

2. Install Dependencies
npm install

3. Run Dev Server
  npm run dev

👉 Open the link shown (e.g., http://localhost:5173/) in your browser.
