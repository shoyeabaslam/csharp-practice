
using SubscriptionManagementSystem.Models;
using SubscriptionManagementSystem.Services;

SubscriptionPlan plan1 = new SubscriptionPlan() { PlanId=1,PlanName= "BASIC PLAN",DurationInDays= 1,Price= 199 };
User user1 = new User() {UserId = 1,UserName = "sofee daniyal", UserPassword = "1234"};
Payment payment1 = new Payment() { PlanId=1,UserId=1,Amount=199,PaymentDate= DateTime.Now};


SubscriptionManager manager = SubscriptionManager.Instance;

// making subscription for user1 with payment1 and plan1

//manager.SubscribeUser(user1, plan1, payment1);

//List<SubscriptionPlan> plans = manager.GetSubscriptionPlans();
//foreach(var plan in plans)
//{
//    Console.WriteLine($"{plan.PlanId}\t\t {plan.PlanName}\t\t {plan.Price}\t\t{plan.DurationInDays}");
//}


// Print The Subscription of the user

var userSubscription = manager.GetUserSubscription(user1);
Console.WriteLine($"ID = {userSubscription.SubscriptionId}\n IsActive = {userSubscription.IsActive}");
