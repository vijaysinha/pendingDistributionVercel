# 📦 Pending Status of Distribution

A Next.js application deployed on **Vercel** that fetches and displays ration card distribution data from the **Chhattisgarh AePDS system**.  
This project helps users check the **pending status of distribution** for April, May, and June.

---

## 🚀 Features
- **API Integration**: Connects to the official AePDS endpoint (`epos.cg.gov.in`) to retrieve beneficiary transaction details.
- **Custom API Route**: Implements `/api/getPortData` for secure serverless data fetching.
- **React Hook**: Includes a reusable `usePortData` hook with built‑in error and loading states.
- **Error Handling**: Gracefully manages timeouts, invalid inputs, and remote API failures.
- **Deployment**: Hosted on Vercel for fast, serverless execution and easy scalability.

---

## ⚙️ Tech Stack
- **Frontend**: React + Next.js  
- **Backend**: Next.js API routes (serverless functions)  
- **Deployment**: Vercel  
- **Data Source**: Chhattisgarh AePDS (`SRC_Trans_Int` endpoint)

---

## 📊 Usage
1. Enter a valid **ration card ID (`rc_id`)**.  
2. The app queries AePDS for the given month/year.  
3. Displays:
   - **FPS ID**  
   - **Member name**  
   - **Pending distribution status**

---

## 🛠 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/vijaysinha/pendingDistributionVercel.git
cd pendingDistributionVercel
npm install
