# Path of the Mantis - Collaborative Text Editor 🦗

A real-time collaborative text editor built with Next.js, TipTap, Liveblocks, and Firebase.

## ✨ Features

- 🔄 Real-time collaboration with multiple users
- 📝 Rich text editing powered by Liveblocks Yjs
- 👥 User presence with colored cursors
- 🎨 Light/Dark theme support
- 🔐 Authentication with Clerk
- 💾 Document persistence with Firebase
- ⚡ Optimized performance with React Query

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm/yarn
- Firebase account
- Clerk account
- Liveblocks account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Liveblocks Collaboration
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCKS_PRIVATE_KEY=your_liveblocks_private_key

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CERT_URL=your_cert_url
FIREBASE_PRIVATE_KEY=your_private_key
Installation
Clone the repository
bash

Copy
git clone https://github.com/yourusername/path-of-mantis.git
cd path-of-mantis
Install dependencies
bash

Copy
npm install
# or
yarn install
Run the development server
bash

Copy
npm run dev
# or
yarn dev
🛠️ Tech Stack
Frontend Framework: Next.js
Editor: Used Liveblocks Yjs
Real-time Collaboration: Liveblocks Yjs
Authentication: Clerk
Database: Firebase
State Management: React Query
Styling: Tailwind CSS
🔑 Key Features
Real-time Collaboration: Multiple users can edit documents simultaneously
Cursor Presence: See other users' cursors in real-time
Rich Text Editing: Support for formatting, lists, and more
Authentication: Secure access with Clerk integration
Document Management: Create, edit, and delete documents
