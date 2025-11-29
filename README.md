# Library Hub 📚

A simple and modern Library Management System where users can register, log in, browse books, borrow them, return them, and view their borrowed books.

## Features

- User registration (Sign up)
- User login / logout
- Browse all available books
- Borrow a book
- Return a borrowed book
- View currently borrowed books
- Clean and responsive UI

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Library**: MUI (Material-UI)
- **Icons**: React Icons
- **Internationalization**: react-intl
- **Mock Backend**: `json-server` (full REST API simulation from a JSON file)

## Prerequisites

- Node.js ≥ 18
- npm

## How to Run the Project

You need **two terminals** running at the same time:

### Terminal 1 – Start the mock backend (json-server)

```bash
json-server --watch src/db/db.json --port 5000
```

### Terminal 2 – Start the frontend (Vite dev server)

```bash
npm install           # only the first time
npm run dev
```
