# Car seed data

Use `cars.seed.json` to populate your database before switching the frontend from mock data to `/api/v1/cars`.

## Files

| File | Purpose |
|------|---------|
| `cars.seed.json` | 12 cars — full DB-ready documents |
| `host-users.seed.json` | 6 host users to create first (optional) |

## Field mapping (DB → frontend)

| Database field | Frontend field |
|----------------|----------------|
| `_id` | `id` |
| `title` | `name` |
| `totalReviews` | `reviewCount` |
| `isFeatured` | `featured` |
| `isAvailable` | `available` |
| `hostId` + populated user | `owner` |
| `location.coordinates` | `location.lng`, `location.lat` |

## Steps

### 1. Seed host users

Register 6 users via API (or insert manually) with `role: host` / `isHost: true`:

- Rajesh Kumar — Delhi
- Priya Sharma — Mumbai
- Amit Patel — Bangalore
- Sneha Reddy — Delhi
- Vikram Singh — Mumbai
- Kavita Nair — Bangalore

Copy each user's `_id` from MongoDB.

### 2. Replace hostId placeholders

In `cars.seed.json`, replace:

| Placeholder | Host |
|-------------|------|
| `HOST_RAJESH` | Rajesh Kumar `_id` |
| `HOST_PRIYA` | Priya Sharma `_id` |
| `HOST_AMIT` | Amit Patel `_id` |
| `HOST_SNEHA` | Sneha Reddy `_id` |
| `HOST_VIKRAM` | Vikram Singh `_id` |
| `HOST_KAVITA` | Kavita Nair `_id` |

### 3. Import into MongoDB

```bash
# Extract cars array only (remove _readme), save as cars-only.json, then:
mongoimport --uri="mongodb://localhost:27017/carrental" --collection=cars --file=cars-only.json --jsonArray
```

Or use a Node seed script:

```javascript
const cars = require('./cars.seed.json').cars;
// map hostId placeholders → real ObjectIds, then Car.insertMany(cars)
```

### 4. API query examples (after cars module is live)

```
GET /api/v1/cars
GET /api/v1/cars?featured=true
GET /api/v1/cars?city=Delhi
GET /api/v1/cars?brand=BMW
GET /api/v1/cars?category=Luxury
GET /api/v1/cars?transmission=Automatic
GET /api/v1/cars?fuelType=Petrol
GET /api/v1/cars?priceMin=1000&priceMax=5000
GET /api/v1/cars/popular
GET /api/v1/cars/:id
```

## Categories in seed data

| Category | Count |
|----------|-------|
| Luxury | 4 |
| SUV | 4 |
| Sedan | 1 |
| Hatchback | 1 |
| Van | 1 |
| Sports | 1 |

## Cities covered

Delhi, Mumbai, Bangalore, Jaipur, Hyderabad, Ahmedabad

## Notes

- `location.coordinates` = `[longitude, latitude]` (GeoJSON)
- `registrationNumber` values are sample only — use valid format for your region
- `status`: `active` | `inactive` | `pending_approval`
- Images are Unsplash URLs — replace with your CDN URLs in production
