# 🛠️ Bike Servicing Management API

## 🎯 Objective

The Bike Servicing Management API is a backend system designed for bike servicing centers to efficiently manage **customers**, **bikes**, and **service records**. It supports full CRUD operations and includes special endpoints for assigning and completing service jobs.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

---

## 🧱 Database Schema

The application uses Prisma ORM with UUIDs as the primary keys for all tables.

### 1. `Customer` Table

| Field      | Type     | Description               |
| ---------- | -------- | ------------------------- |
| customerId | UUID     | Unique identifier         |
| name       | String   | Full name of the customer |
| email      | String   | Unique email              |
| phone      | String   | Contact number            |
| createdAt  | DateTime | Timestamp when created    |

---

### 2. `Bike` Table

| Field      | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| bikeId     | UUID   | Unique identifier                |
| brand      | String | Bike brand (e.g., Honda, Yamaha) |
| model      | String | Bike model                       |
| year       | Int    | Manufacturing year               |
| customerId | UUID   | Foreign key referencing Customer |

---

### 3. `ServiceRecord` Table

| Field          | Type     | Description                              |
| -------------- | -------- | ---------------------------------------- |
| serviceId      | UUID     | Unique identifier for the record         |
| bikeId         | UUID     | Foreign key to the `Bike` table          |
| serviceDate    | DateTime | Date the service started                 |
| completionDate | DateTime | Nullable. Date the service completed     |
| description    | String   | Details of the service                   |
| status         | String   | One of: `pending`, `in-progress`, `done` |

---

## 📦 API Features & Endpoints

### 🔹 Customer Management

- **POST** `/api/customers/create-customer` - Create a new customer
- **GET** `/api/customers` - Retrieve all customers
- **GET** `/api/customers/:customerId` - Get customer by ID
- **PUT** `/api/customers/:customerId` - Update a customer
- **DELETE** `/api/customers/:customerId` - Delete a customer

---

### 🔹 Bike Management

- **POST** `/api/bikes/add-bike` - Add a new bike
- **GET** `/api/bikes` - Retrieve all bikes
- **GET** `/api/bikes/:bikeId` - Get bike by ID

---

### 🔹 Service Management

- **POST** `/api/services/create-service` - Create a service record
- **GET** `/api/services` - Get all service records
- **GET** `/api/services/:serviceId` - Get service by ID
- **PUT** `/api/services/update-status/:serviceId` - Update service status.
- **GET** `/api/services/status/:status` - Have status = "pending" or "in-progress"

---
