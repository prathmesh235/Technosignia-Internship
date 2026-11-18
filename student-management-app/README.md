# Student Management Application

A full-stack mini project: a **React** frontend talking to a **Spring Boot** REST API backed by a relational database. Users can view, add, update, delete and search students.

## Features
- View all students in a table, with search by name, email or course
- Add a student, with validation on both client and server
- Edit an existing student
- Delete a student, with a confirmation prompt
- Clear errors for invalid input (400), duplicate email (409) and missing student (404)

## Tech stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, plain CSS, Fetch API |
| Backend | Java 21, Spring Boot 3.3, Spring Web, Spring Data JPA, Bean Validation |
| Database | H2 in-memory (default), MySQL (optional profile) |
| API testing | Postman |

## Project structure
```
student-management-app/
├── backend/     Spring Boot REST API (controller, service, repository, model, exception, config)
└── frontend/    React app (api.js, App.jsx, components/)
```

## Getting started

### Prerequisites
- Java 17+ (tested with 21) and Maven 3.8+
- Node.js 18+ and npm

### 1. Run the backend
```bash
cd backend
mvn spring-boot:run
```
The API starts at `http://localhost:8080`. Three sample students are added on first start.

**Using MySQL instead (optional):**
1. Create the database: `CREATE DATABASE studentdb;`
2. Set your username and password in `backend/src/main/resources/application-mysql.properties`
3. Run: `mvn spring-boot:run -Dspring-boot.run.profiles=mysql`

### 2. Run the frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## API reference
Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description | Success | Errors |
|---|---|---|---|---|
| GET | `/students` | List all students | 200 | |
| GET | `/students/{id}` | Get one student | 200 | 404 |
| POST | `/students` | Create a student | 201 | 400, 409 |
| PUT | `/students/{id}` | Update a student | 200 | 400, 404, 409 |
| DELETE | `/students/{id}` | Delete a student | 204 | 404 |

**Request body (POST / PUT)**
```json
{
  "name": "Ravi Patil",
  "email": "ravi.patil@example.com",
  "age": 21,
  "course": "Computer Science"
}
```

**Validation rules:** `name` required (max 100), `email` required, valid and unique, `age` required (1 to 120), `course` optional (max 100).

## Possible improvements
- Pagination and sorting
- Spring Security with login
- Docker Compose for backend, frontend and MySQL

## Author
Prathmesh Panmand, Day 20 Foundation Mini Project
![App screenshot](screenshot.png)
