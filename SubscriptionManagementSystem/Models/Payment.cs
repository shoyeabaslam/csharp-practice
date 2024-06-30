using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Models
{
    internal class Payment
    {
        public int PaymentId { get; set; }
        public int UserId { get; set; }
        public int PlanId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }

        // Entity Navigation 
        public User user { get; set; } // since UserId is a foreign key
        public SubscriptionPlan plan { get; set; } // since PlanId is a foreign key
    }
}
