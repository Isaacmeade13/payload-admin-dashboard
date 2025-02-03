# event-cage

This project is a Payload CMS application deployed on Vercel. It provides a flexible and scalable platform for managing events and related content.

## Features

* **Headless CMS:** Manage your content through a powerful and intuitive interface.
* **Vercel Integration:** Seamless deployment and scaling on Vercel's serverless infrastructure.
* **Postgres Database:** Utilizes PostgreSQL for robust and reliable data storage, either through Vercel Postgres or a locally managed instance.
* **Vercel Blob Storage:**  Stores media files efficiently using Vercel's blob storage.
* **Email Integration:** Supports sending emails via Nodemailer, allowing for notifications and other communication features.
* **Rich Text Editing:** Powered by Lexical, providing a modern and flexible rich text editing experience.
* **React Frontend:** Built with Next.js for a performant and dynamic user interface.
* **Tailwind CSS:** Styled with Tailwind CSS for a modern and customizable design.


## Getting Started

### Prerequisites

* **Node.js:** Make sure you have Node.js (version specified in `package.json` - `^18.20.2 || >=20.9.0`) installed.
* **Vercel CLI (Recommended):** For easy deployment, install the Vercel CLI (`npm install -g vercel`).


### Installation

1. Clone the repository: `git clone https://github.com/your-username/event-cage.git` (Replace `your-username` with your GitHub username or the repository URL)
2. Navigate to the project directory: `cd event-cage`
3. Install dependencies: `npm install`

### Environment Variables

Set the following environment variables in your Vercel project settings or locally using a `.env` file:

* **`ENVIRONMENT`**: Specifies the deployment environment.  `vercel` for production deployments on Vercel, `localPg` for local development with a locally managed PostgreSQL instance.
* **`PAYLOAD_SECRET`**: A secret key used for security. **Important:** This should be a strong, randomly generated string.
* **`EMAIL`**: The email address used for sending emails.
* **`EMAIL_TOKEN`**:  The token/password for the email account.
* **`POSTGRES_URL`**: The connection string for your PostgreSQL database. Required when `ENVIRONMENT=localPg`. This should follow the format: `postgres://user:password@host:port/database`.  When `ENVIRONMENT=vercel`, this will be automatically provided by Vercel Postgres.
* **`BLOB_READ_WRITE_TOKEN`**: Token for accessing Vercel Blob storage. Required when using Vercel Blob Storage.


### Development

1. Run the development server: `npm run dev`
2. Open your browser and navigate to `http://localhost:3000` to access the Payload admin panel.
3. After making changes to your Payload collections, run generate:types to update your types:

```bash
npm run generate:types
```

**Access the admin panel:**

Once the server is running, you can access the Payload admin panel at the URL specified in your configuration (usually `http://localhost:3000/admin`).

### Deployment (Vercel)

1. Connect your Vercel account: `vercel login`
2. Link your project to a Vercel project: `vercel link`
3. Deploy: `vercel deploy`


### Migrations

After making changes to your Payload collections, run migrations to update your database schema:

```bash
npm run migrate
```

### Other Scripts

* **`npm run build`**: Builds the production application.
* **`npm run start`**: Starts the production server.
* **`npm run generate:types`**: Generates TypeScript types for your Payload collections.
* **`npm run generate:importmap`**: Generates an import map for optimized module loading.
* **`npm run lint`**: Runs ESLint to check for code style issues.


## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.

