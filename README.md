# 🎓 Yope - LMS SaaS Platform  

Yope is a modern Learning Management System (LMS) SaaS application built from scratch using **Next.js**, **Supabase**, and **Stripe**. It features AI voice tutoring, user authentication, subscriptions, and real-time learning capabilities.  

🌟 Create, teach, and interact with AI-powered tutors while delivering seamless educational experiences to users.  


<img width="1738" height="912" alt="Screenshot 2025-07-19 073917" src="https://github.com/user-attachments/assets/95be4e5d-5cd6-4deb-a115-b4ed1a85df3f" />

---

## 🚀 Features  

✅ **AI Voice Tutors** – Engage with AI agents powered by **Vapi**, capable of multilingual, natural-sounding voice conversations.  
✅ **Authentication** – Secure sign-up, sign-in (Google OAuth & more) via **Clerk**.  
✅ **Subscriptions & Billing** – Manage plans, upgrades, and payments using **Stripe**.   
✅ **Responsive UI** – Built with **Tailwind CSS** and **shadcn/ui** for a sleek, cross-device experience.  
✅ **Database Integration** – Real-time storage and APIs with **Supabase**.  
✅ **Search & Filters** – Quickly find tutors with robust filtering and search functionality.  
✅ **Error Monitoring** – Integrated **Sentry** for real-time bug tracking.  
✅ **Type-Safe Development** – Built with **TypeScript** and validated using **Zod**.  
✅ **Reusable Components** – Modular, scalable, and production-ready code architecture.  

---

## ⚙️ Tech Stack  

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui, TypeScript  
- **Backend**: Supabase (PostgreSQL), Vapi (Voice AI)  
- **Auth & Billing**: Clerk (Authentication), Stripe (Payments)  
- **Monitoring**: Sentry  
- **Validation**: Zod  

---

## 🛠 Quick Start  

### 📋 Prerequisites  

Make sure you have these installed:  
- [Node.js](https://nodejs.org/) (v18+)  
- [Git](https://git-scm.com/)  
- [npm](https://www.npmjs.com/)  

### 📥 Clone the Repository  

```bash
git clone https://github.com/<your-username>/yope.git
cd yope

## 📦 Install Dependencies
bash
Copy
Edit
npm install
🔑 Set Up Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
# Sentry
SENTRY_AUTH_TOKEN=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
👉 Replace placeholder values with your credentials from:

Supabase

Clerk

Sentry

Vapi

▶️ Run the Development Server
bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.
