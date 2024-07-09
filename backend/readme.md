# Book Search API

## Overview

This project is a Node.js-based REST API for retrieving a list of books based on given search criteria. The API is developed using Express.js and uses the EJS view engine for rendering views. MySQL is used as the database, and Objection.js is used as the ORM. The project includes database migration and initial data seeding using Knex.js. The API is containerized using Docker. Jest and NYC are used for testing and code coverage.

## Features

- **Book Search**: Retrieve a list of books based on various search criteria including title, author, and genre.
- **Sorting**: Sort books by title, author, and publication date.
- **Pagination**: Paginate results with page number and size.
- **Error Handling**: Appropriate HTTP status codes and error messages for invalid requests and unexpected situations.
- **Filtering**: (Bonus) Filter books by availability (e.g., in-stock books only).
- **Book Details**: (Bonus) Include book details such as description, publication date, and ISBN in the response.

## Technologies

- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **Database**: MySQL
- **ORM**: Objection.js
- **Database Migration and Seeding**: Knex.js
- **Testing**: Jest, NYC
- **Containerization**: Docker

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- Docker
- Docker Compose (optional, for easier container orchestration)

### Installation

1. **Clone the repository**

```bash
https://github.com/aritrikdas/Clairvolex.git
cd Clairvolex/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your environment variables. Here’s an example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=booksearch
DB_PORT=3306
PORT=3000
```

4. **Run database migrations and seed data**

```bash
npx knex migrate:latest
npx knex seed:run
```

5. **Build and run the Docker container**

```bash
docker build -t book-search-api .
docker run -d -p 3000:3000 --env-file .env book-search-api
```

Alternatively, you can run locally:

6. **Start the server**

```bash
npm start
```

The API should now be running on `http://localhost:3000`.

## API Endpoints

### Retrieve a list of books

**GET /books**

Query Parameters:
- `q` (optional): Search by title (partial or full)
- `genre` (optional): Filter by genre
- `startDate` (optional): Filter by published date range start
- `endDate` (optional): Filter by published date range end
- `inStock` (optional): Filter by availability
- `sort` (optional): Sort order (title, author, publicationDate)
- `page` (optional): Page number for pagination
- `size` (optional): Page size for pagination

### Example Request

```http
GET /books?q=harry&author=rowling&genre=fantasy&sort=title&page=1&size=10
```

## Testing

Run tests using Jest:

```bash
npm test
```

Generate test coverage report using NYC:

```bash
npm run coverage
```

## Project Structure

```
book-search-api/
│
├── migrations/            # Knex migrations
├── seeds/                 # Knex seed files
├── src/
│   ├── routes/            # Express routes
│   ├── views/             # EJS views
│   ├── app.js             # Express app setup
│
├── test/                  # Jest test files
│
├── .env                   # Environment variables
├── Dockerfile             # Dockerfile for containerization
├── docker-compose.yml     # Docker Compose file (optional)
├── knexfile.js            # Knex configuration
├── package.json           # NPM dependencies and scripts
└── README.md              # Project documentation
```

## Additional Information
- **UI Application**: Build a React-based UI to interact with the API for searching books, displaying results, and viewing book details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
