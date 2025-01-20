# Drone-Mission-Simulator

A backend service built with TypeScript and NestJS for managing drone missions, including user authentication, mission execution simulation, and flight log retrieval. The backend is built with TypeScript and NestJS, leveraging static typing and other benefits of TypeScript.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Dockerization](#dockerization)
- [License](#license)
- [Contributing](#contributing)
- [Author](#author)

## Features

- User authentication with JWT
- Manage multiple drones (CRUD operations).
- Create, update, delete, and retrieve missions
- Simulate mission execution, updating the drone's position along waypoints.
- Log flight data during execution, including timestamps and coordinates.
- Retrieve flight logs by unique flight ID.
- Generate PDFs for flight log data.
- API validation for inputs.
- Swagger API documentation

## Technologies Used
- TypeScript
- NestJS
- MongoDB
- JWT for authentication
- Docker for deployment
- PDF generation library (e.g., pdfkit)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/amulyavarshney/Drone-Mission-Simulator.git
    cd Drone-Mission-Simulator
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a [.env](.env) file in the root directory and add the following variables:
        ```env
        MONGODB_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        JWT_EXPIRE=30d
        ```

## Usage

1. Start the application:
    ```sh
    npm run start:dev
    ```

2. The application will be running at `http://localhost:3000`.

## API Documentation

Swagger API documentation is available at `http://localhost:3000/swagger`.

A Postman collection is also included in the repository to assist with testing the API endpoints. Import the collection into Postman to explore the available routes.

### Example API Endpoints
- **User Login:** `POST /api/auth/login`
- **Create Drone:** `POST /api/drones`
- **Retrieve Missions:** `GET /api/missions`
- **Start Mission Simulation:** `POST /api/missions/:id/start`
- **Get Flight Log by ID:** `GET /api/flight-logs/:flightId`

## Running Tests

1. Unit tests:
    ```sh
    npm run test
    ```

2. End-to-end tests:
    ```sh
    npm run test:e2e
    ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `JWT_EXPIRE`: JWT expiration time

## Dockerization
1. Build the Docker image:
   ```bash
   docker build -t drone-mission-management .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env drone-mission-management
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Feel free to submit issues or pull requests. Contributions are welcome!

## Author
Amulya Varshney - [Github](https://github.com/amulyavarshney)