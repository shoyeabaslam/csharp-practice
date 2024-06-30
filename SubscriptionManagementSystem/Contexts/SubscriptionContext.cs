using Microsoft.EntityFrameworkCore;
using SubscriptionManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubscriptionManagementSystem.Contexts
{
    internal class SubscriptionContext : DbContext
    {
        private const string _connectionString = "Server=localhost;Database=SubscriptionManagementSystem;Trusted_Connection=True;TrustServerCertificate=True;";
        public DbSet<User> Users { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }


        /*
         This method ensures that keys are mapped or not as we have foreign key constraints in Payment.cs
         We make sure that SubscriptionPlan and User has primary key or not using the below method.
         Or you can also you [key] attribute above the fileds of the id in the models class to avoid below
         method.         
         */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the SubscriptionPlan entity
            modelBuilder.Entity<SubscriptionPlan>()
                .HasKey(sp => sp.PlanId); // Ensure primary key is defined
            modelBuilder.Entity<User>()
                .HasKey(u => u.UserId);
            // Additional configurations can go here
        }

    }
}
