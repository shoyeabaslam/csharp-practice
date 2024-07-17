## Tabel of content
1. [Library Management System](#Library_Management_System)
2. [Subscription Management System](#Subscription_Management_System)
3. [Task Management System](#Task_Management_System)
   
# Library_Management_System
### Project Structure
```
| DataAccess
|   |__LibraryDataAcess.c
| Models
|   |__ Book.cs
|   |__ Member.cs
|Services
|   |__ Library.cs
| Program.cs 

```

# Subscription_Management_System
You can schedule the job in SQL if you want to auto-update the expiry date. At the assigned time daily the script runs and updates the table record where expiry-date <= 0.
### Architechture Overview
1. Presentation Layer: Console Application
2. Business Logic Layer: Services and Managers (e.g., SubscriptionManager)
3. Data Access Layer: Entity Framework Core for database interactions
4. Database: SQL Server

#### Project Structure

```
| Contexts
|    |__ SubscriptionContext.cs
| Interfaces
|    |__ ISubscription.cs
| Models
|    |__ Payment.cs
|    |__ SubscriptionPlan.cs
|    |__ User.cs
|    |__ UserSubscription.cs
| Services
|    |__ SubscriptionManager.cs
| Program.cs
```
![Capture](https://github.com/shoyeabaslam/csharp-practice/assets/118368907/595caa6b-4d35-4a59-8ead-199418870640)


# Task_Management_System

## Overview
The Task Management System is a web application designed to help users manage their tasks efficiently. Users can create, update, delete, and track their tasks across different categories and priorities.

## Features
- **User Authentication**: Secure login and registration.
- **Task Management**: Create, update, delete, and view tasks.
- **Category Management**: Categorize tasks into Work, Personal, Fitness, Habit, and more.
- **Priority Levels**: Assign priorities to tasks (e.g., Priority 1, Priority 2, Priority 3).
- **Status Tracking**: Track the status of tasks (e.g., Pending, Success).
- **Date Management**: Set due dates for tasks and track them.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used
- **Frontend**: React, Tailwind CSS, React Icons
- **Backend**: ASP.NET Core, Entity Framework
- **State Management**: Recoil
- **Database**: SQL Server
- **API**: RESTful API
- **Other**: Toast notifications, Axios for API requests

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```
### For any doubts related to Entity Framework and Entity Relations in C# visit my blog
1. [Enitity Framework setup in ASP.NET](https://shoyeab.hashnode.dev/setting-up-an-aspnet-core-application-with-entity-framework-a-beginners-guide)
2. [Enitity Relations in C#](https://shoyeab.hashnode.dev/understanding-entity-relationships-in-c-a-comprehensive-guide)
   
## Demo
![111](https://github.com/user-attachments/assets/640d4196-0074-4905-bebc-1a5a8c2825d9)
![222](https://github.com/user-attachments/assets/3e3f7868-916b-4ef7-9d0c-2de51b94f9be)
![333](https://github.com/user-attachments/assets/30e1b834-21c3-41bf-8b33-08aaf20e1a3d)


## Contribution
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you want to change.
