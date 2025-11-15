-- Harit Bharat Expo Database Setup for MySQL/MariaDB

-- Create database
CREATE DATABASE IF NOT EXISTS harit_bharat_expo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE harit_bharat_expo;

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_registered_at (registered_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create SMTP configuration table
CREATE TABLE IF NOT EXISTS smtp_config (
    id INT PRIMARY KEY DEFAULT 1,
    host VARCHAR(255) NOT NULL DEFAULT 'smtp.gmail.com',
    port INT NOT NULL DEFAULT 587,
    secure BOOLEAN DEFAULT FALSE,
    auth_user VARCHAR(255),
    auth_pass VARCHAR(255),
    `from` VARCHAR(255) NOT NULL DEFAULT 'noreply@haritbharatexpo.com',
    recipients TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default SMTP config
INSERT INTO smtp_config (id, host, port, secure, `from`) 
VALUES (1, 'smtp.gmail.com', 587, FALSE, 'noreply@haritbharatexpo.com')
ON DUPLICATE KEY UPDATE id=id;
