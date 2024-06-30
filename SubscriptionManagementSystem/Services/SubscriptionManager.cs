using SubscriptionManagementSystem.Contexts;
using SubscriptionManagementSystem.Interfaces;
using SubscriptionManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Services
{
    internal class SubscriptionManager : ISubscription
    {
        private static SubscriptionManager? _manager = null;

        private SubscriptionManager()
        {
        }

        public static SubscriptionManager Instance
        {
            get
            {
                return _manager ?? (_manager = new SubscriptionManager());
            }
        }



        public void AddUser(User user)
        {
            using (var context = new SubscriptionContext())
            {
                try
                {
                    context.Users.Add(user);
                    context.SaveChanges();
                    Console.WriteLine("User Succesfully Added");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"User error: {ex.Message}");
                }
            }
        }

        public SubscriptionPlan? GetSubscriptionPlan(SubscriptionPlan plan)
        {
            using (var context = new SubscriptionContext())
            {
                try
                {
                    return context.SubscriptionPlans.First((p) => p.PlanId == plan.PlanId);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error In fetching plan: {ex.Message}");
                    return null;
                }
            }
        }

        public List<SubscriptionPlan> GetSubscriptionPlans()
        {
            using (var context = new SubscriptionContext())
            {
                try
                {
                    return context.SubscriptionPlans.ToList();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error In fetching plans: {ex.Message}");
                    return new List<SubscriptionPlan>();
                }
            }
        }

        public void SubscribeUser(User user, SubscriptionPlan plan, Payment payment)
        {
            using (var context = new SubscriptionContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        context.Payments.Add(payment);
                        context.SaveChanges();

                        try
                        {
                            var userSubscription = new UserSubscription()
                            {
                                UserId = user.UserId,
                                PlanId = plan.PlanId,
                                StartDate = payment.PaymentDate,
                                EndDate = payment.PaymentDate.AddDays(plan.DurationInDays),
                                IsActive = true
                            };
                            context.UserSubscriptions.Add(userSubscription);
                            context.SaveChanges();
                            Console.WriteLine("Subscription is successfully made");

                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error In Payment: {ex.Message}");
                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error In Subscribing User: {ex.Message}");
                    }
                }
            }
        }


        public UserSubscription GetUserSubscription(User user)
        {
            using (var context = new SubscriptionContext())
            {
                var subscription = context.UserSubscriptions
                                    .Where(u => u.UserId == user.UserId)
                                    .OrderByDescending(u => u.SubscriptionId)
                                    .FirstOrDefault();

                if (subscription != null)
                {
                    TimeSpan timeLeft = subscription.EndDate.Date - DateTime.Now.Date;
                    int daysLeft = (int) timeLeft.TotalDays;
                    Console.WriteLine($"Time Left = {daysLeft}");

                    if(daysLeft <= 0)
                    {
                        Console.WriteLine("Subscription has expired.");
                        subscription.IsActive = false;
                        context.SaveChanges();
                    }
                    return subscription;
                }
                else
                {
                    Console.WriteLine("Subscription not found.");
                    return new UserSubscription();
                }
            }
        }

    }
}
