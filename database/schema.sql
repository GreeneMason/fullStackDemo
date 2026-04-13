-- Create database
CREATE DATABASE IF NOT EXISTS fullstack_db;
USE fullstack_db;

-- Create greetings table
CREATE TABLE IF NOT EXISTS greetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO greetings (message) VALUES ('Hello, World!');
INSERT INTO greetings (message) VALUES ('Welcome to Full Stack Development!');
INSERT INTO greetings (message) VALUES ('MySQL, Node.js, and React are working together!');
