Scentinel — Frontend (React Native)

Scentinel is a mobile app built with React Native + Expo designed to help fragrance enthusiasts manage and rotate their perfume collection effectively. It recommends scents based on usage, weather, and occasion — making sure every fragrance in your collection gets attention.

Features: - View full perfume collection with scent profile details

- Plan weekly rotation to avoid overusing favorite scents
- Add logs for usage with notes, compliments, and events
- Smart suggestions based on weather, time, and event location _(in progress)_

Tech Stack

- React Native + Expo Router — mobile frontend framework
- Axios\*\* — for API communication with backend
- JavaScript / JSX
- Connected to a custom Node.js + PostgreSQL backend

Getting Started

1. Install Dependencies (npm install)
2. Configure API Base URL
   Update constants/config.js with your backend’s local IP (or deployed URL): export const BASE_URL = 'http://<your-local-ip>:3000';
   Replace <your-local-ip> with your machine’s IPv4 (e.g., 192.168.100.9)

Run the App: npx expo start
Scan the QR code using Expo Go on your iPhone.

scentinel-frontend/
├── app/ # Expo Router pages
├── components/ # Reusable UI components
├── constants/ # Config and constants (e.g., BASE_URL)
├── services/ # API layer (Axios instance)
├── styles/ # Global style definitions
├── assets/ # Static images or icons
├── App.js # Entry point (default ignored by Expo Router)

Status
Currently in development
Weekly planner & weather API integration coming soon

Author
John Ross M. Rivera
Aspiring Backend Developer | BSIT Graduate
Bulacan, Philippines
