CREATE DATABASE TaskManagementSystem;

USE TaskManagementSystem;

CREATE TABLE Users (
	userId INT PRIMARY KEY IDENTITY(1,1),
	userName VARCHAR(20) NOT NULL,
	userEmail VARCHAR(20) NOT NULL UNIQUE
	);

CREATE TABLE TASKS(
	taskId INT PRIMARY KEY IDENTITY(1,1),
	taskName varchar(100) NOT NULL,
	description text,
	createDate date DEFAULT getDate(),
	dueDate date,
	status varchar(50),
	priority varchar(50),
	userId INT REFERENCES users(userId),
	categoryId INT REFERENCES categories(categoryId),
	); 

CREATE TABLE categories(
	categoryId INT PRIMARY KEY IDENTITY(1,1),
	categoryName varchar(50),
	userId INT REFERENCES users(userId),
	);

drop table TASKS;
drop table categorys


-- Insert Users
INSERT INTO Users (userName, userEmail) VALUES 
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

-- Insert Categories
INSERT INTO Categories (categoryName, userId) VALUES
('Work', 1),
('Personal', 1),
('Urgent', 1),
('Shopping', 2),
('Fitness', 2);

-- Insert Tasks for User 1
INSERT INTO Tasks (taskName, description, createDate, dueDate, status, priority, userId, categoryId) VALUES
('Finish report', 'Complete the monthly report', '2024-07-04', '2024-07-10', 'pending', 'high', 1, 1),
('Buy groceries', 'Purchase groceries for the week', '2024-07-04', '2024-07-05', 'pending', 'medium', 1, 2),
('Schedule meeting', 'Set up a meeting with the team', '2024-07-04', '2024-07-06', 'pending', 'high', 1, 1),
('Exercise', 'Go for a morning run', '2024-07-04', '2024-07-05', 'pending', 'low', 1, 3),
('Read book', 'Read the new novel', '2024-07-04', '2024-07-07', 'pending', 'medium', 1, 2);


select * from Users
select * from Tasks
select * from categories


select * from
Tasks t1
inner join 
categories c1
on t1.categoryId = c1.categoryId
where t1.userId = 1 and c1.categoryName = 'work'

