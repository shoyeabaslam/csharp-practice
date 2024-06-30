## Tabel of content
1. [Library Management System](#Library_Management_System)
2. [Subscription Management System](#Subscription_Management_System)

## Library_Management_System
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

## Subscription_Management_System
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
