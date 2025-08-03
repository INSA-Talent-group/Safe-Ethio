# 🇪🇹 Safe Ethiopia

**Safe Ethiopia** is a mobile and backend-powered safety platform built using **React Native** and **Django** to improve personal and public safety across Ethiopia. It offers emergency alerts, real-time tracking, incident reporting, and communication with loved ones and security personnel — all in one powerful, accessible app.

---

## 🧩 Project Synopsis

Safe Ethiopia aims to reduce emergency response delays and enhance safety awareness across the country through real-time alerts, community-driven incident reporting, and automatic notifications to emergency contacts. It especially targets vulnerable groups such as children, women, and travelers.

## 🚀 Implementation

### Frontend (React Native)

- **React Native + TypeScript**: Building the mobile interface.
- **Push Notifications**: Real-time alerts using Expo and Firebase Cloud Messaging.
- **Geo-fencing & Map Integration**: Google Maps and region tracking.
- **Voice Recognition**: SOS via voice keywords.
- **Offline Storage**: AsyncStorage for caching data offline.

### Backend (Django)

- **Django REST Framework**: API for incident reporting, notifications, user management.
- **WebSocket (Django Channels)**: For real-time location tracking and live updates.
- **Twilio API**: For sending SMS alerts to emergency contacts.
- **GeoDjango**: For spatial queries and geofencing logic.
- **PostgreSQL**: For data storage.

---

## ✅ Achieved Outcomes

- [x] One-tap SOS alert system with location.
- [x] Real-time user journey tracking.
- [x] Incident reporting with image and voice note support.
- [x] Push & SMS alerts integration.
- [x] Basic danger zone alert system using geo-fencing.

---

## 🚨 Key Features

- **One-Tap SOS Button**: Instantly notify emergency contacts and nearby authorities.
- **Live Location Sharing**: Share your journey in real time.
- **Danger Zone Alerts**: Notifies you when entering high-risk areas.
- **Emergency Contact List**: Manage trusted people to notify.
- **Incident Reporting**: Report incidents directly to security workers.
- **Voice-Activated SOS**: Trigger alerts via spoken keywords.
- **Community Danger Feed**: View local alerts from other users.
- **Offline Reporting**: Save reports and sync later.
- **Geo-Fenced Notifications**: Set safe/unsafe zones and auto-notify upon crossing.

---

## 🛠️ Tech Stack

- **Frontend**: React Native, TypeScript
- **Backend**: Django, Django REST Framework, Django Channels
- **Database**: PostgreSQL
- **APIs**: Google Maps, Twilio, WebSockets
- **Authentication**: Firebase Auth / Django AllAuth

---

## 📦 Installation

### Frontend (React Native)

```bash
git clone https://github.com/INSA-Talent-group/safe-ethiopia.git
cd safe-ethiopia/frontend
npm install
npx react-native run-android # or run-ios
```

### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🐳 Docker Deployment

### 1. Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3"

services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: safeethiopia
      POSTGRES_PASSWORD: safepass
      POSTGRES_DB: safedb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db

volumes:
  postgres_data:
```

Then run:

```bash
docker-compose up --build
```

---

## 🔒 Privacy & Security

- End-to-end encrypted data transfers.
- Location sharing is user-controlled.
- Anonymous reporting available.
- SMS only sent to verified contacts.

---

## 🌍 Roadmap

- [ ] Voice-activated emergency commands
- [ ] Public beta launch
- [ ] Multi-language support (Amharic, Afaan Oromo, Tigrigna)
- [ ] Admin dashboard for security forces
- [ ] Expand danger zone system with AI/ML

---

## 📸 Screenshots

_(To be added after UI implementation)_

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

- **Project Lead**: Alehegne Geta and Daniel Kebede
- **GitHub**: [@Maxd646](https://github.com/Maxd646)
- **GitHub**: [@Alehegne](https://github.com/Alehegne)

---

> **Safe Ethiopia** — Because every second counts in an emergency.  
> Let’s make safety accessible for all Ethiopians.
