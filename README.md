# 🌐 User Management System

## 📋 Project Description
This project is a comprehensive **User Management System** designed to streamline user-related operations, with an emphasis on efficiency and scalability. Built with modern web technologies, it includes features for secure user registration, authentication, profile management, and more. The project stack utilizes:

- **Framework:** [Next.js](https://nextjs.org/) for a server-side rendered, SEO-friendly frontend.
- **Language:** [TypeScript](https://www.typescriptlang.org/) to ensure code quality and readability.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for responsive and customizable design.
- **API Handling:** [tRPC](https://trpc.io/) for type-safe, end-to-end data flow between the frontend and backend.
- **Database:** [PostgreSQL](https://www.postgresql.org/) for reliable, robust data management.
- **ORM:** [Prisma](https://www.prisma.io/) to simplify database operations with an intuitive data modeling approach.
- **Containerization:** [Docker](https://www.docker.com/) for streamlined development and deployment.

## 📐 Project Approach

For this project, I opted for a **bottom-up approach**:
1. **Database Setup**: Initiated with designing and configuring the database schema to establish a solid data foundation.
2. **Backend Development**: Built and tested the backend, ensuring all API endpoints are functional and secure.
3. **Frontend Integration**: Developed the frontend UI to provide an intuitive user experience, connecting it seamlessly to the backend.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- Docker

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/victorschimmell.github.io
   ```
2. **Install Dependencies**
   ```bash
   cd user-management
   npm install
   ```
3. **Set Up Environment Variables**
  Duplicate the .env.example file and rename it to .env. Update the environment variables as needed.
4. **Run the application**
  Start the docker container:
  ```bash
  docker-compose up -d
  ```
  Launch the development server:
  ```bash
  npm run dev
  ```

##🛠️ Testing & Development Workflow
- **Database Migrations:** Use Prisma to handle schema migrations.
- **API Testing:** Leverage tRPC’s built-in type-safety to streamline backend testing.
- **Frontend Styling:** Utilize Tailwind's utility classes for a responsive UI.
