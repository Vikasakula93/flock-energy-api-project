# Flock Energy - Urja Meter API

A clean REST API wrapper built over the legacy **Urja Meter Ops** portal.

Developed a RESTful API integration service using Node.js and Express to securely connect with an energy meter operations portal. Implemented automated authentication, session management, meter search, energy consumption retrieval, and geo-location APIs. Deployed the backend on Render with production-ready configuration.

---

# Deplopyment link: https://flock-energy-api-project.onrender.com/

---

# Features

- Session based authentication with Urja portal
- Fetch smart meter list
- Search meters
- Fetch meter energy consumption history
- Fetch meter geographical location
- Clean REST API responses
- Swagger API documentation
- OpenAPI 3.0 specification

---

# Architecture

```
flock-energy-api
│
├── src
│   │
│   ├── server.js
│   ├── routes
│   │   └── meterRoutes.js
│   │
│   ├── controllers
│   │   └── meterController.js
│   │
│   └── services
│       ├── authService.js
│       └── urjaClient.js
│
├── openapi.json
├── README.md
├── PROTOCOL.md
├── REFLECTION.md
├── package.json
└── .env
```

---

# Tech Stack

## Backend

- Node.js
- Express.js

## HTTP Client

- Axios
- axios-cookiejar-support
- tough-cookie

## Documentation

- Swagger UI
- OpenAPI 3.0

---

# Installation

Clone repository:

```bash
git clone <repository-url>

cd flock-energy-api
```

Install dependencies:

```bash
npm install
```

---

# Environment Setup

Create `.env`

```
PORT=5055

URJA_URL=https://urja-ops.flockenergy.tech

URJA_USERNAME=operator@urja.local

URJA_PASSWORD=urja-ops-2026
```

---

# Running Project

Development:

```bash
npm run dev
```

Server:

```
http://localhost:5055
```

Swagger Documentation:

```
http://localhost:5055/docs
```

---

# API Endpoints

```
To get do all Api Endpoints: "https://flock-energy-api-project.onrender.com/docs"
```

# (or)

## 1. Get Meter List

Request:

```
GET /api/v1/meters?page=1
```

Example:

```
http://localhost:5055/api/v1/meters?page=1
```

Response:

```json
{
 "success":true,
 "data":{
   "total":403,
   "page":1,
   "pageSize":20
 }
}
```

---

# 2. Get Meter Energy

Request:

```
GET /api/v1/meters/{meterId}/energy
```

Example:

```
http://localhost:5055/api/v1/meters/J100000/energy
```

Response:

```json
{
 "success":true,
 "meterId":"J100000",
 "data":[
   {
    "timestamp":"25/06/2026 16:00",
    "kwh":"48472.98",
    "kvah":"52350.82",
    "voltR":"221"
   }
 ]
}
```

---

# 3. Get Meter Location

Request:

```
GET /api/v1/meters/{meterId}/geo
```

Example:

```
http://localhost:5055/api/v1/meters/J100000/geo
```

Response:

```json
{
 "success":true,
 "meterId":"J100000",
 "data":{
    "latitude":"26.938961002479868",
    "longitude":"75.83095696146852"
 }
}
```

---

# Portal Investigation Summary

The original portal uses:

```
POST /login
```

for authentication.

After successful login, the server creates:

```
__Secure-better-auth.session_token
```

cookie.

The cookie is reused for accessing protected endpoints.

Discovered internal APIs:

```
GET /portal/meters/search?q=&page=1

GET /portal/meters/{meterId}/energy

GET /portal/meters/{meterId}/geo
```

Detailed investigation is available in:

```
PROTOCOL.md
```

---

# Design Decisions

## Why API wrapper?

The existing portal already contains the required data but does not provide a developer API.

The wrapper creates a stable interface for other systems.

---

## Why Axios session client?

The portal uses cookie based authentication.

Axios with cookie jar support allows maintaining login sessions automatically.

---

## Why separate service layer?

The project separates responsibilities:

Controller:

- Handles HTTP requests
- Returns API responses

Service:

- Communicates with Urja portal
- Handles external API logic

This makes the code easier to maintain.

---

# Trade-offs

## Chosen

- Simple architecture
- Minimal dependencies
- Easy local execution

## Not implemented

- Database storage
- Background synchronization
- Advanced caching
- User management

---

# Intentional Limitations

This version does not:

- Modify meter information
- Store portal data permanently
- Replace the original portal

It only provides a clean read-only API layer.

---

# Future Improvements

With more time:

- Add Redis caching
- Add automatic session renewal
- Add request retry mechanism
- Add automated tests
- Add meter hierarchy visualization
- Add analytics dashboard

---

# Reflection

See:

```
REFLECTION.md
```

---

# API Specification

OpenAPI specification:

```
openapi.json
```

Swagger UI:

```
/docs
```

---

# Author

Vikas Akula 
