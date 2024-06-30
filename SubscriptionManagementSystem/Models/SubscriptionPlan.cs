using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Models
{
    internal class SubscriptionPlan
    {
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public int DurationInDays { get; set; }

        public decimal Price { get; set; }
    }
}
