# Project Name: Full-Stack Hall Booking Application

## Description:
A full-stack booking management application built using Spring Boot, React, and PostgreSQL. The backend handles API requests, while the React frontend provides a user-friendly interface for creating, editing, and managing bookings.

## Prerequisites:
- JDK 8 or above
- Node.js & npm
- PostgreSQL (installed and running)
- Spring Boot (for backend development)

## How to Build & Run:

### database Query (Open - pg Admin 4):
1. Create Database named as "Hall_booking":
2. Create Table in that database:
   
CREATE SEQUENCE IF NOT EXISTS bookings_id_seq;


CREATE TABLE IF NOT EXISTS public.bookings
(
    id integer NOT NULL DEFAULT nextval('bookings_id_seq'::regclass),
    applicant_name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    mobile text COLLATE pg_catalog."default",
    start_date date,
    end_date date,
    rent numeric,
    additional_charges numeric,
    hall text COLLATE pg_catalog."default",
    booking_type text COLLATE pg_catalog."default",
    time_slot text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    application_no text COLLATE pg_catalog."default",
    remark text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bookings
    OWNER to postgres;

select * from bookings;

### Backend (Spring Boot):
1. Clone the repository:
2. Navigate to the backend folder:
3. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   or directlt debug the Application
4. Ensure the PostgreSQL database is running and configured with necessary tables.

### Frontend (React):
1. Navigate to the frontend folder:
2. Install dependencies:
   ```bash
   npx create-react-app hall-booking-frontend
   npm install axios

   ```
3. Run the React development server:
   ```bash
   npm start
   ```

### Database Configuration:
- Database: PostgreSQL
- Tables: like `bookings`
- Ensure PostgreSQL is running and accessible.

## Deployment:
- Backend runs on port 8080.
- Frontend is served statically using the React build command.

## Screenshots:
- Provide any relevant screenshots of the application.
- Booking lists: ![image](https://github.com/user-attachments/assets/f74eaf61-1d6c-498a-aa8b-282b2b8c0eec)
- Adding new Booking: ![image](https://github.com/user-attachments/assets/74ed7524-2ba9-4ef5-bba9-c3c6086bb59d)

  
## Loom Video link:
(Open it in a loom.com): https://www.loom.com/share/de7bbe3acde64bf4922848161ef60844?sid=ba7dc5fb-9799-44c2-8a4f-e558c7ef972c


