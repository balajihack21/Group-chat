# Group Chat App

This is a group chat application built with Express, Node.js, and MySQL.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Real-time group chat
- User authentication
- Persistent message storage in a MySQL database

## Requirements
- HTML
- Css
- JWT authentication
- Node.js
- Express js
- MySQL 

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/group-chat-app.git
2.Navigate to the project directory:
cd group-chat-app
3.Install dependencies:
npm install
## Configuration
Create a .env file in the root directory.
Add the following configurations to the .env file:
PORT=3000
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=group_chat
## Database Setup
Create a MySQL database with the name specified in the .env file (group_chat by default).
Run the SQL script provided in database.sql to set up the necessary tables.
## Usage
Start the server:
npm start
Visit http://localhost:4000 in your web browser.

## Contributing
Feel free to contribute to the project. If you have any suggestions or find any issues, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.


Remember to replace placeholders like `Balaji`, `group-chat-app`, and customize the configuration variables according to your specific setup. Additionally, provide more details or sections as needed for your application.
