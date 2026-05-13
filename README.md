📦 # Pending Status of Distribution
A Next.js application deployed on Vercel that fetches and displays ration card distribution data from the Chhattisgarh AePDS system.
This project helps users check the pending status of distribution for April, May, and June.
🚀 Features
API Integration: Connects to the official AePDS endpoint (epos.cg.gov.in) to retrieve beneficiary transaction details.

Custom API Route: Implements /api/getPortData for secure serverless data fetching.

React Hook: Includes a reusable usePortData hook with built‑in error and loading states.

Error Handling: Gracefully manages timeouts, invalid inputs, and remote API failures.

Deployment: Hosted on Vercel for fast, serverless execution and easy scalability.


⚙️ Tech Stack
Frontend: React + Next.js

Backend: Next.js API routes (serverless functions)

Deployment: Vercel

Data Source: Chhattisgarh AePDS (SRC_Trans_Int endpoint)

📊 Usage
Enter a valid ration card ID (rc_id).

The app queries AePDS for the given month/year.

Displays:

FPS ID

Member name

Pending distribution status

🛠 Installation
Clone the repo and install dependencies:

bash
git clone https://github.com/vijaysinha/pendingDistributionVercel.git
cd pendingDistributionVercel
npm install
Run locally:

bash
npm run dev
Deploy on Vercel:

bash
vercel
📂 Project Structure
Code
/pages/api/getPortData.js   → API route for fetching AePDS data
/hooks/usePortData.js       → Custom React hook for data fetching
/pages/index.js             → Main UI page
🔒 Notes
The AePDS server may be slow or restricted; connection timeouts are possible.

Always use the domain (epos.cg.gov.in) instead of raw IPs for SSL compatibility.

Add timeout handling in API routes to prevent hanging requests.

🌐 Live Demo
👉 View on Vercel (pendingdistributionvercel.vercel.app in Bing)

(Replace with your actual Vercel deployment URL)
