# 🌿 EcoNudge Home Planner

EcoNudge Home Planner is an interactive web app designed to help users plan, track, and improve their eco-friendly habits. It offers sustainability nudges, rewards, reports, and goal tracking through a modern, intuitive interface built with **React + Vite**.

---

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- React Router DOM (for routing)
- Recharts (for data visualization)
- Tailwind CSS (for styling)
- Context API (for global state management)

**Backend**
- Flask (API by Amos)

---

## 🧩 Project Structure

```

eco-nudge-frontend/
│
├── src/
│   ├── api/
│   │   └── api.js                  # Handles API calls to Flask backend
│   │
│   ├── context/
│   │   ├── AppContext.jsx          # Context for global state
│   │   └── AppProvider.jsx         # Context provider wrapper
│   │
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── Sidebar.jsx             # Optional sidebar
│   │   ├── Footer.jsx              # Footer section
│   │   ├── NudgeCard.jsx           # Displays eco tips
│   │   ├── RewardBadge.jsx         # Shows earned rewards
│   │   └── ChartCard.jsx           # Displays visual reports
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx           # Overview of eco activity
│   │   ├── Planner.jsx             # Manage eco goals
│   │   ├── Reports.jsx             # Sustainability reports
│   │   ├── Settings.jsx            # User preferences
│   │   └── Rewards.jsx             # Track rewards
│   │
│   ├── App.jsx                     # Main layout and routing
│   ├── router.jsx                  # Route definitions
│   ├── main.jsx                    # React entry point
│   └── styles.css                  # Global styles
│
├── package.json
├── vite.config.js
└── README.md

````

---

## 👩‍💻 Contributors

| Name | Role | Description |
|------|------|--------------|
| **Amos** | Backend Developer | Flask API integration, routes, and data endpoints |
| **Melisa Mary** | Frontend Developer | React UI, context, and page design |
| **James** | Integration Engineer | Connects frontend with backend and deployment setup |

---

## ⚙️ Setup Instructions (Ubuntu)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/BandaTheSecond/EcoNudge-Home-Planner.git
cd EcoNudge-Home-Planner
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

App will start on:

```
http://localhost:5173/
```

---

## 🌿 Branch Workflow

We use **feature branches** for clean collaboration.

### Create and Push to Your Branch

```bash
# Create new branch
git checkout -b Melisa

# Stage and commit changes
git add .
git commit -m "Add frontend setup and components for Eco-Nudge"

# Push to GitHub
git push origin Melisa
```

> 💡 Each contributor should work on their own branch (e.g., `Amos`, `James`, `Melisa`) before merging into `main`.

---

## 📊 Features

✅ Clean, responsive UI
✅ Interactive eco-nudge cards
✅ Goal planner for sustainable actions
✅ Reward badges for progress tracking
✅ Reports with visual insights (Recharts)
✅ Context API for global state management

---

## 🧠 Future Improvements

* Add authentication (login/signup)
* Offline mode with local storage
* Dark/light theme toggle
* Integration with environmental APIs (CO₂ tracking)

