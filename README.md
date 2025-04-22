# Lendly System

**Lendly** is a minimalist backend application for managing informal loans. Built with **Node.js**, **Fastify**, **Drizzle ORM**, and **Zod**, it is designed to provide practical and efficient control over personal lending, particularly in family or informal contexts where traditional tracking methods (like notebooks or spreadsheets) are prone to errors.

## 1. About this project

This system was born out of a personal need to manage loans made by myself and my mother. We previously used notebooks to record amounts lent, amounts to be received, dates, and client names — a method that often led to confusion and forgetfulness.

Lendly aims to offer a simple, routine-friendly tool while also serving as a learning opportunity for backend development.

Feel free to use this project as a learning base or to adapt it for your own needs. Feedback is always welcome!

- **Email**: [mateuscelestinofreacker@gmail.com](mailto:mateuscelestinofreacker@gmail.com)
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/mateus-nelito)

## 2. Getting started

To start using the Lendly System API, follow the instructions below.

### Prerequisites

Before installing the project, ensure the following is available in your environment:

- **Node.js** (version 22.14.0 or higher)

### Installation

Follow the steps below to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mateusnelito/lendly-web-api.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd lendly-web-api
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Set up the environment**:

   - Create a `.env` file in the root of the project using the `.env.example` file as a template. Make sure that the environment variables are correctly set.

5. **Run the database migrations**:

   ```bash
   npm run db:migrate
   ```

6. **Seed the database with initial data**:

   ```bash
   npm run db:seed
   ```

7. **View the database**:

   - You can use any database manager of your choice to access the database. If you don’t have one installed, you can run the following command to open Drizzle Studio:

   ```bash
   npm run db:studio
   ```

   After running the command, Drizzle Studio should automatically open in the browser. If it doesn't, you can **Ctrl+click** on the link to open it or copy and paste the link into your browser’s address bar. To stop the service and server, press **Ctrl + C** in the terminal.

8. **Start the server**:

   ```bash
   npm run start
   ```

Once the installation steps are complete, the API will be running at the default URL `http://localhost:3000`, unless the port has been changed. You can then start making calls to the defined endpoints.

## 3. API Documentation

- **Overview**: This project uses Swagger for API documentation. You can access the interactive documentation by visiting the [Swagger UI](http://localhost:3000/swagger).

- **Main Endpoints**:
    - **Clients**
        - `POST /clients`: Create a new client.
        - `GET /clients/:id`: Retrieve client information.

    - **Loans**
        - `POST /loans`: Create a new loan for a client.
        - `GET /loans/:id`: Retrieve loan details.

    - **Payments**
        - `POST /payments`: Create a payment for a loan.
        - `GET /payments/:id`: Retrieve payment details.

## 4. Database

The system uses **Drizzle ORM** and **PostgreSQL**. Here's a summary of the main entities:


### Entity Descriptions

- **Users**: Registered users of the system. Stores basic account information including name, email, and hashed password.
- **Clients**: People who receive loans. Each client is associated with a single user and may receive multiple loans.
- **Loans**: Represents a loan given to a client, storing amount lent, due date, interest (optional), notes, and current status.
- **Payments**: One-time payment for a loan (in the MVP). Each payment marks the loan as paid and includes the date and amount. Soft-deletion supported.

![Database Diagram](./assets/database-diagram.svg)

## 5. Handling Monetary Values

To ensure precision and avoid truncation errors, the `balance` and `amount` values are stored as integers, representing the smallest unit of the currency. Thus, a value of 1,000 in any currency is stored as `100000` (i.e., 1,000 cents).

### Displaying Values

When consuming these values on the front-end or displaying them in a more readable format, the cents need to be converted to the main currency unit. To do this, divide the value by 100 and format it with two decimal places.

### Example in JavaScript

```javascript
// Value in cents
const balanceInCents = 100000; // Represents 1,000 (e.g., 1,000 kwanzas)

// Function to format the value in Kwanza
function formatCurrency(cents) {
  const kwanzas = cents / 100;
  return `Kz ${kwanzas.toFixed(2)}`; // Returns the formatted value with two decimal places
}

// Displaying the formatted balance
console.log(`Balance: ${formatCurrency(balanceInCents)}`); // Balance: Kz 1000.00

// To send values to the backend, convert to cents
const amountInKwanza = 75.25; // 75.25 kwanzas
const amountInCents = Math.round(amountInKwanza * 100); // Convert to cents
console.log(`Amount to be sent: ${amountInCents} cents`); // Amount to be sent: 7525 cents
```

## 6.  Roadmap / Next Steps

1. **Loan Expiry Notifications**
   - Automatically notify users of loans nearing their due dates.

2. **Support for Installments**
   - Allow loans to be repaid via multiple payments.
   - Automatically calculate outstanding balance.

3. **Email Verification & Password Recovery**
   - Email confirmation during sign-up.
   - Password reset via email token.

4. **Enhanced Payment Tracking**
   - Add status tracking to payments (e.g., pending, confirmed).
   - Enable audit trails and activity logging.

5. **Currency Flexibility**
   - Add support for multiple currencies.
   - Users may define their preferred default currency.

6. **Automated Testing**
   - Unit and integration tests using **Jest**.

## 7. Contribution

The project is open to contributions! Feel free to send as many Pull Requests (PRs) as you like. I’d be happy to review and accept your contributions! If you have any questions about the project or suggestions for improvements, don’t hesitate to contact me.

- **Email**: mateuscelestinofreacker@gmail.com
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/mateus-nelito)

Thanks for your help and interest!

## 8. License

This project is licensed under the [MIT License](LICENSE).
