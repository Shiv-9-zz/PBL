<p align="center">
  <img src="public/favicon.ico" alt="NexusX Logo" width="80" height="80">
  <h1 align="center">NexusX</h1>
  <p align="center">A decentralized, borderless, and peer-to-peer crypto marketplace.</p>
</p>

## 🚀 Live Demo

**https://nexusx-marketplace.vercel.app**

## 📖 Overview

NexusX is a modern e-commerce platform built for the Web3 era. It allows users to buy and sell products directly using cryptocurrencies (ETH, BTC, SOL, USDC, BNB) with trustless smart contract escrows, instant settlements via Layer 2 networks, and zero counterparty risk.

## ✨ Features

* **Dual Dashboards**: Dedicated experiences for Buyers (Marketplace) and Sellers (Analytics, Orders, Listings).
* **Multi-Currency Support**: Real-time simulated price conversions for multiple crypto assets.
* **Trustless Escrow**: Simulated smart contract checkout flow with wallet connection states.
* **Layer 2 Focus**: Dedicated analytics page comparing gas fees, TPS, and finality across major L2 rollups (Arbitrum, Optimism, zkSync, etc.).
* **Responsive Design**: Built with Tailwind CSS and Radix UI primitives for a sleek, dark-themed, glassmorphic UI.
* **Client-Side Routing**: Handled seamlessly via React Router.

## 🛠️ Tech Stack

* **Framework**: Vite + React (TypeScript)
* **Styling**: Tailwind CSS + `tailwindcss-animate`
* **Components**: shadcn/ui (Radix UI)
* **Icons**: Lucide React
* **Charts**: Recharts
* **Routing**: React Router DOM
* **State Management**: React Context API (`CartContext`)
* **Deployment**: Vercel

## 📁 Key Files & Recent Changes

* **`src/pages/Index.tsx`**: Landing page with hero section, live ticker, and feature highlights.
* **`src/pages/Marketplace.tsx`**: Main product grid with search functionality, category filters, and sorting.
* **`src/pages/ProductDetail.tsx`**: Single product view featuring a simulated Web3 checkout modal with wallet selection and transaction broadcasting states.
* **`src/pages/Cart.tsx`**: Shopping cart with dynamic crypto price updates and single-signature checkout simulation.
* **`src/pages/SellerDashboard.tsx`**: Analytics dashboard for sellers showing revenue, active listings, and recent orders.
* **`src/pages/CryptoRates.tsx`**: Detailed comparison page for Layer 2 networks with interactive charts (Recharts).
* **`src/context/CartContext.tsx`**: Global state management for shopping cart operations.
* **`vercel.json`**: Added configuration to support SPA routing on Vercel deployments (prevents 404 errors on page refresh).

## 🚀 Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adityasx69/NexusX.git
   cd NexusX
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   *(Note: The project uses standard lockfiles but you can also use `bun install` or `pnpm install`)*

3. **Start the dev server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

## 🌐 Deployment Details

The project is configured for seamless deployment on Vercel.
The `vercel.json` file uses rewrites to route all paths to `index.html`, ensuring React Router handles all client-side navigation correctly.

```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

## 👨‍💻 Authors

* **Shiv Pratap Suryavanshi**
  GitHub: https://github.com/Shiv-9-zz

* **Aditya Saraswat**
  GitHub: https://github.com/adityasx69/NexusX

## 📜 License

MIT
