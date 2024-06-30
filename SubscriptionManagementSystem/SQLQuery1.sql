CREATE DATABASE SubscriptionManagementSystem;
USE SubscriptionManagementSystem

CREATE TABLE SubscriptionPlans (
	PlanId INT PRIMARY KEY IDENTITY,
	PlanName VARCHAR(20) NOT NULL,
	DurationInDays INT NOT NULL,
	Price DECIMAL(10,2) NOT NULL
);

CREATE TABLE Users(
	UserId INT PRIMARY KEY IDENTITY,
	UserName VARCHAR(20) NOT NULL,
	UserPassword VARCHAR(20) NOT NULL
);

-- Payments table
CREATE TABLE Payments (
    PaymentId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    PlanId INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (PlanId) REFERENCES SubscriptionPlans(PlanId)
);

-- UserSubscriptions table
CREATE TABLE UserSubscriptions (
    SubscriptionId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    PlanId INT NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (PlanId) REFERENCES SubscriptionPlans(PlanId)
);


INSERT INTO SubscriptionPlans(PlanName,DurationInDays,Price) 
VALUES('BASIC PLAN',1,199),('INTERMEDIATE PLAN',2,299),('PREMIUM PLAN',3,399);

SELECT * FROM SubscriptionPlans
SELECT * FROM Users
SELECT * FROM Payments
SELECT * FROM UserSubscriptions

UPDATE UserSubscriptions
SET EndDate = '2024-06-30'
WHERE SubscriptionId = 2









EXEC sp_rename 'SubscriptionPlans.Pirce', 'Price', 'COLUMN';


TRUNCATE TABLE USERSUBSCRIPTIONS -- TO CLEAR THE SUBSCRIPTION RECORDS
TRUNCATE TABLE PAYMENTS -- TO CLEAR THE PAYMENTS RECORDS

DROP TABLE Users
DROP TABLE SubscriptionPlans
DROP TABLE Payments
DROP TABLE UserSubscriptions
