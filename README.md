# 📚 DeerBooks – Full Stack Online Bookstore

DeerBooks is a modern full-stack online bookstore where users can browse books, manage wishlists and carts, place orders, make payments, and track deliveries.

This project is built as a real-world production-style application, covering complete e-commerce workflows from authentication to payment and order tracking.

---

## 🚀 Features

### Authentication

- User signup & login
- Email verification using OTP
- Password reset with OTP
- Secure JWT authentication using HTTP-only cookies

### Books

- Add, update, delete books
- Categories & tags
- Search, filter, sort & pagination
- Featured, bestseller, rare editions

### Wishlist

- Add/remove books
- View saved collection

### Cart

- Add/update/remove items
- Quantity management
- Clear cart

### Orders

- Create order from cart
- Order history
- Order tracking timeline

### Payments

- Razorpay integration
- Payment verification

### Reviews & Ratings

- Reviews allowed only after purchase
- Ratings system
- Review validation

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Context API
- lucide-react
- react-toastify

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
- Razorpay

---

## 🧱 System Architecture

Client (React)  
→ REST APIs  
→ Server (Node + Express)  
→ MongoDB Database

---

## 🧩 Backend Architecture

The backend follows a layered architecture:

Routes → Controllers → Models → Database

### Backend Folder Structure

server/
├── controllers/  
├── models/  
├── routes/  
├── middleware/  
├── utils/  
├── config/  
└── index.js

---

## 🎨 Frontend Architecture

The frontend follows a component-based architecture:

Pages → Components → Context → API Services

### Frontend Folder Structure

client/
├── pages/  
├── components/  
├── context/  
├── utils/  
└── App.jsx

---

## 🗃 Database Architecture (MongoDB)

### Core Collections

- users
- books
- carts
- wishlists
- orders
- reviews

---

## 🔐 Authentication Architecture

JWT-based authentication using HTTP-only cookies.

### Flow

Login  
→ Generate JWT  
→ Set Cookie  
→ Middleware verifies JWT  
→ req.user populated

### Security

- Passwords hashed using bcrypt
- Tokens stored in httpOnly cookies
- Protected routes via middleware

---

## 💳 Payment Architecture (Razorpay)

### Flow

Frontend  
→ Create Order API  
→ Razorpay Checkout  
→ Payment Success  
→ Backend Verification  
→ Update Order Status

Supports:

- Online payments

---

## 📦 Order & Tracking Architecture

Order lifecycle:

Pending → Paid → Shipped → Delivered

Tracking uses:

- placedAt
- expectedDeliveryDate
- deliveredAt
- order.status

---

## 🔁 API Flow Example

### Create Order from Cart

Client  
→ POST /api/order/create  
→ Auth Middleware  
→ Validate Cart  
→ Check Stock  
→ Create Order  
→ Reduce Inventory  
→ Clear Cart  
→ Return Response

---

## ⚙️ Environment Variables

Create a .env file in the server directory:

PORT=9000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret  
NODE_ENV=development

GMAIL_HOST=your_email_host  
GMAIL_USER=your_email  
GMAIL_PASS=your_email_pass

RAZORPAY_API_KEY=your_key  
RAZORPAY_SECRET_KEY=your_secret

---

## ▶️ Getting Started

### Backend

cd server  
npm install  
npm run start

### Frontend

cd client  
npm install  
npm run dev

---

## 🎯 Project Status

Version: v1.0  
Status: MVP Completed

All core features are implemented and fully functional.

---

## 🧠 Key Learnings

- REST API design
- JWT authentication with cookies
- Payment gateway integration
- MongoDB schema modeling
- Frontend-backend integration
- Production error handling
- Real-world e-commerce flows

---

## 🚧 Future Enhancements

- Admin dashboard
- Invoice PDF generation
- Order cancellation & returns
- Recommendation system
- Advanced search (Elasticsearch)
- WebSockets for live tracking
- Mobile application

---

## ⭐ Final Note

I build this project as a real product, not just for learning.

It demonstrates:

- Clean backend architecture
- Modern frontend design
- Secure authentication
- Payment integration
- End-to-end e-commerce workflows

This project represents the ability to build a complete full-stack application from scratch.
