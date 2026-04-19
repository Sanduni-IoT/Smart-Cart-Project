# 🛒 SmartCart – AI-Powered E-Commerce Application

## 📌 Project Description
SmartCart is a browser-based e-commerce web application that enables users to browse, search, filter, and purchase products across multiple categories such as Electronics, Stationery, and Clothing.

The project provides a smooth, interactive shopping experience with AI-powered assistance for product recommendations and queries.

---

## 🎯 Problem Definition
Traditional e-commerce websites often face usability and technical limitations:

- Page reloads reduce user experience  
- Users struggle to find relevant products quickly  
- Direct API calls expose sensitive keys  

SmartCart solves these problems by:

- Providing a dynamic, single-page shopping interface  
- Integrating an AI shopping assistant for smart recommendations  
- Using a secure backend proxy to protect API keys  

---

## 🏗️ Architecture Overview

SmartCart follows a client-server architecture:

[Browser] → /api/chat → [Express Server] → [Anthropic Claude API] → Response

- Frontend handles UI and user interactions  
- Backend securely processes AI requests  
- AI API returns intelligent responses  

---

## 💻 Technology Stack

| Layer       | Technology               | Purpose |
|------------|------------------------|--------|
| Frontend   | HTML5, CSS3, JavaScript | UI and interactivity |
| Backend    | Node.js, Express        | API handling & security |
| AI Service | Anthropic Claude API    | AI assistant responses |
| Hosting    | Vercel                  | Deployment |

---

## ⚙️ Technology Choices

- Vanilla JavaScript – Lightweight and simple  
- CSS Variables – Easy dark/light mode implementation  
- Node.js + Express – Simple backend API proxy  
- Claude AI (Haiku) – Fast and cost-efficient AI model  
- Vercel – Easy deployment with serverless support  

---

## ✨ Features

- Product search functionality  
- Category filtering  
- Sorting (price low → high / high → low)  
- Shopping cart system  
- AI shopping assistant  
- Dark / Light mode toggle  

---

## ⚙️ Setup Instructions

### Clone the repository
git clone https://github.com/your-username/SmartCart.git

### Open project folder
cd SmartCart

### Install dependencies
npm install

### Run server
node server.js

### Open in browser
http://localhost:3000

---

## 🤖 AI Usage Disclosure

### Tools Used
- Claude (Anthropic AI)  
- GitHub Copilot  

### AI Contributions
- Initial HTML/CSS layout generation  
- Backend Express server setup  
- UI structure suggestions  

### Manual Work Done
- Cart system logic (add/remove/total)  
- Product filtering & sorting logic  
- Security fixes for API handling  
- UI improvements and styling  

---

## 🔍 Reflection

AI tools helped speed up development, especially in initial coding and structure. However, manual improvements were necessary to ensure:

- Security  
- Maintainability  
- Proper functionality  

The final project is a combination of AI assistance and human refinement.

---

## 🚀 Future Improvements

- Persistent cart using localStorage or database  
- User authentication system  
- Payment integration  
- AI response streaming  
- Accessibility improvements (ARIA support)  

---

## 📁 Project Structure

SmartCart/
│── index.html  
│── styles.css  
│── script.js  
│── server.js  
│── package.json  
│── images/  

---
