# EvoltSoft Charging Station Management

A full-stack web application for managing EV charging stations, built with **Node.js**, **Express**, **MongoDB**, and **Vue.js**.

---

## 🌐 Live Demo

- **Frontend:** [https://evoltsoft-frontend.onrender.com](https://evoltsoft-frontend.onrender.com)
- **Backend:** [https://evoltsoft-backend-0f4n.onrender.com](https://evoltsoft-backend-0f4n.onrender.com)

---

## 🚀 Features

### User Authentication
- **Sign Up / Login** with JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes for station management

### Charging Station Management
- **Add, Edit, Delete, and List** charging stations
- Fields: Name, Latitude, Longitude, Status (Active/Inactive), Power Output (kW), Connector Type
- Real-time updates: stations appear instantly after add/edit/delete

### Filtering & Search
- Filter stations by status, power output, and connector type

### Map Integration
- Interactive map (OpenStreetMap/Leaflet) showing all stations
- Clickable markers with station details

### Modern UI
- Responsive, dark-themed interface
- Animated transitions for forms and modals

---

## 🏗️ Project Structure

```
backend/
  server.js
  models/
  routes/
  middleware/
  .env
frontend/
  src/
    pages/
      Auth.vue
      Stations.vue
    components/
      StationList.vue
      StationForm.vue
      StationFilters.vue
      MapView.vue
    main.js
    router.js
```

---

## ⚙️ Deployment

### Backend (Node.js + Express + MongoDB)
- Hosted on Render: [https://evoltsoft-backend-0f4n.onrender.com](https://evoltsoft-backend-0f4n.onrender.com)
- Environment variables set in `.env`:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
- Install dependencies:
  ```sh
  npm install
  ```
- Start server:
  ```sh
  npm run dev
  ```

### Frontend (Vue.js)
- Hosted on Render: [https://evoltsoft-frontend.onrender.com](https://evoltsoft-frontend.onrender.com)
- Axios base URL set to backend URL in `main.js`
- Install dependencies:
  ```sh
  npm install
  ```
- Start dev server:
  ```sh
  npm run dev
  ```

---

## 🔒 API Endpoints

### Auth
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT

### Stations (Protected)
- `GET /stations` — List all stations
- `POST /stations` — Add a new station
- `PUT /stations/:id` — Update a station
- `DELETE /stations/:id` — Delete a station

---

## 📝 Usage

1. **Sign up** for a new account or log in.
2. **Add** new charging stations using the form.
3. **Filter** stations using the filter panel.
4. **View** all stations on the map and click markers for details.
5. **Edit** or **delete** stations as needed.

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js, Axios, Vue Router, Leaflet (OpenStreetMap)
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, CORS

---

**Made with ❤️ for EvoltSoft**
