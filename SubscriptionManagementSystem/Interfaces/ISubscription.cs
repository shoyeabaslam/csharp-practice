using SubscriptionManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Interfaces
{
    internal interface ISubscription
    {
        // Adding User
        void AddUser(User user);

        //update existing subscription plan
       
        // to get the perticular plan details
        SubscriptionPlan? GetSubscriptionPlan(SubscriptionPlan plan);
        
        // to get all the plans
        List<SubscriptionPlan> GetSubscriptionPlans(); 
        void SubscribeUser(User user,SubscriptionPlan plan,Payment payment);

        UserSubscription GetUserSubscription(User user);

    }
}
