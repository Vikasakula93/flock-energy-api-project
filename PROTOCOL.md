# Urja Meter Ops Protocol Discovery

## Overview

Urja Meter Ops is a legacy web portal used by electricity utility operators to view smart meter information.

The goal of this project is to build a clean REST API wrapper around the portal so other applications can consume meter data without directly using the web portal.

---

# Authentication Flow

The portal uses session-based authentication.

## Login Request

Endpoint:

```
POST /login
```

Content Type:

```
application/x-www-form-urlencoded
```

The login request sends:

- username
- password

After successful authentication, the server returns a session cookie:

```
__Secure-better-auth.session_token
```

This cookie is required for accessing protected portal endpoints.

---

# Portal Investigation

The portal was inspected using browser developer tools Network tab.

The frontend communicates with backend JSON endpoints.

The portal does not require HTML scraping because the required information is already available as JSON responses.

---

# Discovered Endpoints

## 1. Meter Search

Endpoint:

```
GET /portal/meters/search?q=&page=1
```

Purpose:

Returns available smart meters.

Example response:

```json
{
  "data": [
    {
      "meterId": "J100000",
      "serialNo": "SE33962",
      "make": "HPL",
      "phaseType": "single",
      "installStatus": "Decommissioned",
      "dtCode": "DT-001"
    }
  ],
  "total":403,
  "page":1,
  "pageSize":20
}
```

Available fields:

| Field | Description |
|---|---|
| meterId | Unique meter identifier |
| serialNo | Meter serial number |
| make | Manufacturer |
| phaseType | Single/Three phase |
| installStatus | Current installation state |
| dtCode | Distribution transformer code |

---

# 2. Meter Energy Data

Endpoint:

```
GET /portal/meters/{meterId}/energy
```

Example:

```
GET /portal/meters/J100000/energy
```

Purpose:

Returns meter consumption history.

Response contains:

| Field | Description |
|---|---|
| timestamp | Reading time |
| kwh | Energy consumption |
| kvah | Apparent energy |
| voltR | Voltage reading |

Example:

```json
{
 "timestamp":"25/06/2026 16:00",
 "kwh":"48472.98",
 "kvah":"52350.82",
 "voltR":"221"
}
```

---

# 3. Meter Geographic Location

Endpoint:

```
GET /portal/meters/{meterId}/geo
```

Example:

```
GET /portal/meters/J100000/geo
```

Purpose:

Returns geographical coordinates of a meter.

Response:

```json
{
 "latitude":"26.938961002479868",
 "longitude":"75.83095696146852"
}
```

---

# Network Observations

During investigation:

- Portal frontend loads JavaScript assets.
- API requests are made from frontend to backend.
- Responses are JSON.
- Authentication is maintained using secure session cookies.
- Meter data is paginated.

---

# API Wrapper Design

The created service works as a middle layer:

```
Client Application

        |

        ↓

Flock Energy API

        |

        ↓

Urja Meter Ops Portal
```

The client never needs to know:

- Portal URLs
- Login flow
- Session cookies
- Internal endpoints

---

# Assumptions

1. Portal credentials remain valid.
2. Only read operations are required.
3. Portal data structure remains stable.
4. The API wrapper does not modify original portal data.

---

# Future Improvements

Possible improvements:

- Automatic session refresh
- Retry handling for portal failures
- Local caching layer
- Database indexing
- Meter network hierarchy support
- Monitoring and logging