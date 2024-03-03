# NITFLEX

## Introduction
Welcome to NITFLEX, the ultimate destination for movie and series enthusiasts!  
Struggling to find your next binge-watch or movie night pick? NITFLEX has got you covered. Dive into a vast selection of films and TV shows and tailor your watchlist to your heart's content.  
Get started today and revolutionize the way you discover and enjoy content.

## Key Features
- **User Experience**: Easy account creation and login to keep track of your entertainment preferences.
- **Discover & Explore**: Browse through an extensive catalog of movies and series.
- **Personalized Watchlist**: Manage and curate your favorite movies and series, all in one place.
- **Exclusive Admin Access**: Administrators have the power to manage users, update the movie library, and export movie lists to CSV.

## Getting Started
Follow these steps to set up NITFLEX on your local machine for development and testing purposes.

### Prerequisites
- Git
- Node.js
- Docker

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/ouidkling/nitflex.git
   ```

2. **Install Dependencies**  
   Navigate to the project's root directory and run:
   ```bash
   npm install
   ```

3. **Environment Setup**  
   Create a `.env` file in the `./server` directory using the provided `.env.example` as a template.

4. **Docker Setup**  
   From the root directory, initialize the Docker containers:
   ```bash
   docker compose --env-file ./server/.env up -d
   ```
5. **Launch the Server**
   ```bash
   npm start
   ```

6. **Explore the API**  
   Access [http://localhost:3000/documentation](http://localhost:3000/documentation) to view all available routes.

7. **Enjoy!**  
   Dive into NITFLEX and start discovering your next favorite movie or series.

## Technologies
NITFLEX is built with a robust stack of technologies ensuring a seamless user experience:
- **Backend**: Node.js with Hapi framework for scalable and secure API development.
- **Containerization**: Docker for consistent development, delivery, and deployment.
- **Authentication**: JWT for secure access control.
- **Email Service**: NodeMailer for user email verification and notifications.
- **Database**: MySQL for reliable data storage.
- **Messaging**: RabbitMQ for efficient communication between different parts of the application.

## Credits
Movie data sourced from [The Movie Database API](https://www.themoviedb.org/).

## Contribution
Your contributions are welcome! If you have suggestions to improve NITFLEX, please fork the repo and create a pull request or open an issue with your ideas.

**Created by [Ouidkling](https://youtu.be/xvFZjo5PgG0?si=YCTWLjM8gJcAGQkU)**
