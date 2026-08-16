# 🎵 Moodify

**Mood-based music recommendation web app** — detects your facial expression via webcam and plays a song that matches your mood, in real time.

![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-JWT%20Blacklisting-DC382D?logo=redis&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Face%20Landmarker-4285F4?logo=google&logoColor=white)

🔗 **Live Demo:** (https://moodify-mwzp.vercel.app/)

---

## ✨ Features

- 🎭 **Real-time facial expression detection** using MediaPipe Face Landmarker — no camera activity until user explicitly clicks *Start Camera* and *Detect Expression*.
- 🎵 **Mood-based song recommendation** — detected expression is mapped to a mood category and matched against a curated song library.
- 🔐 **Secure authentication** — JWT-based auth with `bcrypt` password hashing and Redis-backed token blacklisting on logout.
- 🖼️ **Media handling** — profile/image uploads via ImageKit, self-hosted MP3 library for playback.
- 🎧 **Custom music player** with playback controls and live "now playing" state.

### Expression → Mood Mapping

| Expression | Mood |
|---|---|
| 😊 Happy | `happy` |
| 😢 Sad | `sad` |
| 😠 Angry | `angry` |
| 😮 Surprised | `surprised` |
| 😐 Neutral | `neutral` |

---

## 🧠 Key Technical Decisions

- **MediaPipe over face-api.js** — chosen for better accuracy and lighter runtime footprint for real-time blendshape-based expression detection.
- **Self-hosted MP3 library instead of Spotify API** — Spotify's API restricted playback/streaming for this use case, so songs are manually curated and served from ImageKit-backed storage.
- **Redis-backed JWT blacklisting** — ensures logged-out tokens are invalidated immediately instead of relying solely on expiry, closing a common auth security gap.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, SCSS, MediaPipe Face Landmarker, Axios
**Backend:** Node.js, Express.js, MongoDB + Mongoose, Redis, JWT, bcrypt, Multer, ImageKit

---

## 🔄 How It Works

```
Start Camera → Detect Expression → MediaPipe Face Landmarker
     → Expression mapped to Mood → Mood sent to Backend
     → Backend matches Mood to Song (MongoDB) → Song plays in Music Player
```

---

## 📁 Project Structure

```
Moodify/
├── Backend/
│   ├── src/
│   │   ├── config/        # DB connection
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── features/      # Expression, home, etc.
│   │   └── components/
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login an existing user |
| `GET` | `/songs` | Retrieve songs based on selected mood |

> Routes may evolve as the project grows.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ErAnushkaMathur/Moodify.git
cd Moodify
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
MONGOOSE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

In a new terminal, from the project root:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL Vite prints in your browser. Make sure the backend is running in parallel.

---

## 🗄️ Database

MongoDB (via Mongoose) stores users, songs, and mood categories. Redis handles JWT blacklisting and is configured via the same `.env` variables shown above.

---

## 🔮 Future Improvements

- [ ] Expand song library per mood category
- [ ] Add mood-history tracking per user
- [ ] Playlist support

---

## 👩‍💻 Author

**Anushka Mathur**
[GitHub](https://github.com/ErAnushkaMathur) · [LinkedIn](https://www.linkedin.com/in/anushkamathur-cs/)
