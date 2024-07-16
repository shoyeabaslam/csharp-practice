    using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class TaskDbContext:DbContext
    {

        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.UserId);
            modelBuilder.Entity<UserTask>().HasKey(ut => ut.TaskId);
            modelBuilder.Entity<Category>().HasKey(c => c.CategoryId);
             
            modelBuilder.Entity<Category>()
                .HasOne(c => c.User)
                .WithMany(u => u.Categories)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<UserTask>()
               .HasOne(ut => ut.User)
               .WithMany(u => u.UserTasks)
               .HasForeignKey(ut => ut.UserId)
               .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<UserTask>()
                .HasOne(ut => ut.Category)
                .WithMany(u => u.UserTasks)
                .HasForeignKey(ut => ut.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull);


            // Seed data
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, UserName = "Alice", UserEmail = "alice@example.com", UserPassword = "password123" },
                new User { UserId = 2, UserName = "Bob", UserEmail = "bob@example.com", UserPassword = "password456" }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, UserId = 1, CategoryName = "Work" },
                new Category { CategoryId = 2, UserId = 1, CategoryName = "Personal" },
                new Category { CategoryId = 3, UserId = 2, CategoryName = "Fitness" }
            );

            modelBuilder.Entity<UserTask>().HasData(
                new UserTask { TaskId = 1, TaskName = "Complete project", TaskDescription = "Finish the project by the end of the month", UserId = 1, CategoryId = 1, DueDate = DateTime.Now.AddDays(10), Status = "In Progress", Priority = "High" },
                new UserTask { TaskId = 2, TaskName = "Buy groceries", TaskDescription = "Buy milk, eggs, and bread", UserId = 1, CategoryId = 2, DueDate = DateTime.Now.AddDays(2), Status = "Not Started", Priority = "Medium" },
                new UserTask { TaskId = 3, TaskName = "Morning run", TaskDescription = "Run 5km in the morning", UserId = 2, CategoryId = 3, DueDate = DateTime.Now.AddDays(1), Status = "Completed", Priority = "Low" }
            );

        }
    }
}
