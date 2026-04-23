<div align="center">

# ░▒▓█ STOCKFINDER █▓▒░
### ⟦ Real-Time Local Inventory • Smart Price Negotiation ⟧

</div>

<br/>

> **Transforming modern retail** — checking local shelves from home and bringing the traditional bargaining culture to e-commerce.

<br/>

---

</div>

## 📌 The Problem

Modern shoppers face two major disconnects between physical retail and online shopping: **blind local trips** and **rigid online pricing.**

| Pain Point | Impact |
|---|---|
| 🚫 Blind Store Visits | Consumers make wasted trips to stores only to find desired items sold out or not yet restocked. |
| 💰 Rigid E-Commerce Pricing | Shoppers feel they overpay online without the ability to negotiate like in traditional retail. |
| 📦 No Bulk Discount Tools | Difficult to request better rates for multiple items directly from the seller. |
| ⏳ Inflexible Inventory Clearing | Sellers have no mechanism to accept alternate pricing for older or near-expiry stock. |

Traditional e-commerce is static and physical retail is disconnected. **RetailBridge brings them together.**

---

## 💡 The Solution

**RetailBridge** is a hybrid commerce platform that provides **real-time local shelf inventory tracking** alongside a **dynamic negotiation engine**. 

Instead of blind trips and fixed prices, shoppers can verify stock before leaving home and negotiate deals just like in a physical market.

```
Verify Local Stock  →  Propose Price/Bulk Request  →  Seller Approves  →  Purchase/Pickup
```

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

**🧭 Consumer Features**
- 📍 Real-time nearby store inventory check
- 💬 Live price negotiation & bargaining engine
- 📦 Request bulk discounts for multiple items
- 🏷️ Propose alternate pricing for older stock
- 🔔 Notifications for restocks & counter-offers

</td>
<td width="50%">

**📊 Seller Operations**
- 🖥️ Dashboard for live inventory sync
- 🤝 Offer management (Accept/Reject/Counter)
- 📈 Analytics on user price proposals
- 🔄 Automated clearance for near-expiry goods
- 📱 Mobile-friendly seller portal

</td>
</tr>
</table>

---

## 🎨 Figma Design

Our UI/UX is carefully crafted to make complex negotiations feel simple and intuitive. 

- [🔗 **View Figma Prototype**](https://www.figma.com/proto/5Ce0QiBRrj80LYsEOEOh88/Untitled?page-id=0%3A1&node-id=113-6513&viewport=5534%2C-4024%2C0.85&t=v7u1hf8P5eK8hNoQ-1&scaling=contain&content-scaling=fixed&starting-point-node-id=113%3A6513&show-proto-sidebar=1)
- **Core Flows included in design:**
  - Local store discovery & inventory check
  - The "Make an Offer" / Negotiation interface
  - Seller dashboard for managing proposals

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        RetailBridge System                      │
├────────────┬────────────┬──────────────┬───────────┬────────────┤
│  Shopper   │  Mobile /  │  Backend API │Inventory &│  Seller    │
│  Request   │  Web App   │  (Node.js /  │Negotiation│  Dashboard │
│            │            │  Express)    │  Engine   │            │
└────────────┴────────────┴──────────────┴───────────┴────────────┘
                                  │
              ┌───────────────────┼──────────────────┐
              │                   │                  │
         ┌────▼─────┐        ┌─────▼──────┐    ┌──────▼──────┐
         │ MongoDB  │        │ Inventory  │    │ Real-time   │
         │ Firebase │        │ Sync API   │    │ WebSockets  │
         └──────────┘        └────────────┘    └─────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML · CSS · JavaScript · React.js · Tailwind CSS |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB · Redis (for rapid inventory caching) |
| **Design** | Figma |

---

## 📂 Project Structure

```
RetailBridge/
│
├── 📁 frontend/          # React UI — shopper & seller interfaces
│   ├── src/
│   │   ├── components/   # Reusable UI components (Buttons, Modals)
│   │   ├── features/     # Feature-based modules (Bargaining, Inventory)
│   │   ├── pages/        # Route-level views
│   │   └── assets/       # Icons, images, fonts
│
├── 📁 backend/           # Express.js server & REST APIs
│   ├── routes/           # API route handlers
│   ├── controllers/      # Business logic (Offers, Stock updates)
│   ├── models/           # Database schemas
│   ├── sockets/          # WebSocket event handlers for bargaining
│   └── middleware/       # Auth, logging, error handling
│
├── 📁 database/          # MongoDB schemas & seed data
│
├── 📁 design/            # Exported Figma assets and brand guidelines
│
├── 📁 docs/              # Architecture diagrams, API docs
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com/) v9+
- [MongoDB](https://www.mongodb.com/)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/TajaparaDhruva/stockFinder.git
cd stockFinder
```

**2. Install dependencies**
```bash
npm run install:all # Assumes a root script that installs both front/backend
```

**3. Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**4. Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to access the app.

---

## 🎯 Roadmap

- [x] Project scaffolding & architecture design
- [x] UI/UX Wireframing & Figma prototyping
- [ ] Real-time local inventory sync database modeling
- [ ] Core e-commerce browsing & search functionality
- [ ] **Phase 1 Core:** Real-time negotiation & bargaining engine via WebSockets
- [ ] Bulk discount request workflow
- [ ] Seller dashboard for inventory & offer management
- [ ] Automated rules for near-expiry item pricing
- [ ] Mobile app development (React Native)

---


<div align="center">

**Built to connect local retail and empower online shoppers.**

<br/>

*Bridging the gap between real-world stock and dynamic digital pricing.*

</div>
