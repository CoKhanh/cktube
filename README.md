# YouTube Video Sharing App

This app allows users to register, log in, and share their favorite YouTube videos with others in a simple, interactive way. Key features include:

1. **User Registration and Login**: Users can easily create an account or log in to start sharing and viewing videos.
2. **Video Sharing**: Registered users can share YouTube videos by providing a URL, making them visible to the community.
3. **Viewing Shared Videos**: Users can see a list of videos shared by others, making it easy to discover new content.
4. **Real-time Notifications**: When a new video is shared, all logged-in users will receive a real-time notification, including the video title and the name of the user who shared it.

This project is designed to create a smooth and engaging experience for sharing and discovering YouTube content.

Here’s the updated **Prerequisites** section with the new tool included:

# Prerequisites

To set up and run this project locally, you'll need to have the following software and tools installed:

- **Convex DB**: A real-time backend platform. You can create and configure your own database and get the connection configuration, or use the pre-configured database provided in this project. Visit the official site for setup instructions: [Convex DB](https://www.convex.dev/).
- **YouTube v3 API**: You can create and configure your own API key or use the pre-configured key provided in this project. For setup instructions, visit the official guide: [YouTube API Key Setup](https://blog.hubspot.com/website/how-to-get-youtube-api-key).
- **Node.js**: Ensure you have Node.js installed, specifically version `18.20.4` or later. You can download it [here](https://nodejs.org/).
- **NPM**: Node's package manager, version `10.7.0` or later. It comes bundled with Node.js, but you can verify the version by running `npm -v`.
- **Visual Studio Code**: A code editor for working with the project files. Download the latest version [here](https://code.visualstudio.com/).

Make sure these tools are correctly installed before proceeding with the project setup.

# Installation & Configuration

Follow the steps below to install and configure the project on your local machine:

1. **Clone the project repository**:
   - Using HTTPS:  
     ```bash
     git clone https://github.com/CoKhanh/remitano.git
     ```
   - Using SSH:  
     ```bash
     git clone git@github.com:CoKhanh/remitano.git
     ```

2. **Navigate to the project directory**:  
   ```bash
   cd /your/path/to/repo
   ```

3. **Verify Node.js and NPM versions**:  
   Ensure that you are using Node.js version `18.20.4` or later and NPM version `10.7.0` or later by running:  
   ```bash
   node -v
   npm -v
   ```

4. **Install dependencies**:  
   Install all required packages using Yarn:  
   ```bash
   yarn install
   ```

5. **Configure Convex DB and YouTube API key**:  
   - Set up your `.env` file with the necessary configurations for Convex DB and your YouTube API key.
   - You can either use the pre-configured Convex DB provided in the project or set up your own Convex DB instance.

# Database Setup

If you are using your own Convex DB, follow the steps below to set up the database with sample data:

1. **Create your Convex DB**:  
   First, create your own Convex DB by following the instructions on the [Convex DB website](https://www.convex.dev/). After creating the database, retrieve your connection configuration.

2. **Set up your connection**:  
   Add your Convex DB connection configuration to the `.env` file in the project.

3. **Import sample data**:  
   Once you have your database ready and connected, run the following commands to create sample tables and import sample data:

   ```bash
   npx convex import --table users ./convex/users.jsonl # Default password for sample user: password
   npx convex import --table videos ./convex/videos.jsonl
   ```

This will set up the initial structure and populate your database with sample data for notifications, users, and videos.

# Running the Application

To run the application locally and test it, follow these steps:

1. **Run the application locally**:  
   Start the development server by running:  
   ```bash
   yarn dev
   ```
   Then open your browser and navigate to `http://localhost:3000/`.

2. **Run tests**:  
   To execute the test suite, use the following command:  
   ```bash
   yarn test
   ```

3. **Run tests in watch mode**:  
   For continuous testing while developing, use the following command:  
   ```bash
   yarn test:watch
   ```

This will help you to run the app locally and continuously ensure that all tests are passing.

Sure! Here's the updated **Usage** section with the highlighted text:

# Usage

To use this app, follow these steps:

1. Go to [YouTube.com](https://www.youtube.com/), select a video you like, and **copy its URL from the search bar**. The URL should look like this (for example):
   ```
   https://www.youtube.com/watch?v=3bfWAwv1H7Y
   ```

2. Paste the copied URL into the "Share" text field at the bottom of the app.

3. Click the "Share" button to submit the video and share it with other users.

This allows you to easily share your favorite YouTube videos with the community.

# Troubleshooting

1. **API not working (cannot connect to the database)**
   Two things to check:
   - Verify that the **Database config** in the `.env` file is correctly set up.
   - Ensure that you have started the Convex development server by running:
     ```bash
     npx convex dev
     ```

2. **YouTube API error (code 400: "API key not valid. Please pass a valid API key")**:
   - Double-check your YouTube API key and ensure it is correctly added to your `.env` file.

3. **Cannot install dependencies using `npm install`**:
   - Use `yarn install` instead, and verify that your **Node** and **NPM** versions meet the required versions for this project.