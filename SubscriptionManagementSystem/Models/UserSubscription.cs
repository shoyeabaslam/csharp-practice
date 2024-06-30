using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Models
{
    internal class UserSubscription
    {
        [Key]
        public int SubscriptionId {  get; set; }
        public int UserId { get; set; }
        public int PlanId {  get; set; }   
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean IsActive { get; set; }
    }
}
