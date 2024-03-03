# NITFLEX

Don't know what to watch? NITFLEX is here to help you!  
Find the best movies and series to watch on this shining new platform.  
Create your account and manage your favorite movies and series.

## Installation
1. Clone the repository
```bash
git clone https://github.com/ouidkling/nitflex.git
```
2. Install the dependencies
```npm
npm install
```
3. Create a `.env` file in `./server` based on the provided `.env.example` file in the same directory
4. Run the docker-compose file in the root directory
```bash
docker compose --env-file ./server/.env up -d
```
5. Run your server
```npm
npm start
```
6. Access http://localhost:3000/documentation to see all the routes available
7. Enjoy !

## Features
### For users
- Create an account
- Log in
- Consult movies
- Manage favorite movies list

### For admins
- Manage users
- Manage movies
- Export movies to CSV

## Technologies
NITFLEX is built with a robust stack of technologies ensuring a seamless user experience:

Backend: Node.js with Hapi framework for scalable and secure API development.
Containerization: Docker for consistent development, delivery, and deployment.
Authentication: JWT for secure access control.
Email Service: NodeMailer for user email verification and notifications.
Database: MySQL for reliable data storage.
Messaging: RabbitMQ for efficient communication between different parts of the application.
- Node.js
- Hapi
- Docker
- JWT
- NodeMailer
- MySQL
- RabbitMQ

## Credits

Movie data provided by [The Movie Database API](https://www.themoviedb.org/)  
**Created by [Ouidkling](https://youtu.be/xvFZjo5PgG0?si=YCTWLjM8gJcAGQkU)**
