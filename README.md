# Amazon Price Tracker
This is a simple React application that tracks the price of a specific product on Amazon and sends an email notification when the price drops below a certain threshold.

### Features
- Tracks the price of a specific product on Amazon.
- Sends an email notification when the price drops below a certain threshold.
- Updates the price every hour.

### Technologies Used
- **React:** A JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **JSDOM:** A JavaScript implementation of the Web standards, for use in Node.js.
- **Nodemailer:** A module for sending emails from a Node.js application.
- **Gmail SMTP server:** A service for sending emails using Gmail credentials.

### Installation
1. Clone the repository: **`git clone https://github.com/yourusername/amazon-price-tracker.git`**
2. Navigate into the project directory: **`cd amazon-price-tracker`**
3. Install the dependencies: **`npm install`**
   - Create a **`.env`** file in the root directory of the project.
   - Add your Gmail credentials: **`EMAIL=your-email@gmail.com and PASSWORD=your-password`**
4. Start the application: **`npm start`**

### Usage
The application will start tracking the price of the product specified in the checkPrice function. In this case, it's tracking the price of the "Bose SoundLink Wireless Around-Ear Headphones".
When the price drops below 20000, an email will be sent to the recipient specified in the sendMail function.


