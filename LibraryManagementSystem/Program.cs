
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Servicess;

var connectionString = "Server=localhost;Database=LIBRARYMANAGEMENT;Trusted_Connection=True;TrustServerCertificate=True;";

Library library = new Library(connectionString);

Book book1 = new Book() { Title = "book 1", Author = "author 1", Quantity = 1 };
Book book2 = new Book() { Title = "book 2", Author = "author 2", Quantity = 1 };
Book book3 = new Book() { Title = "book 3", Author = "author 3", Quantity = 2 };

//library.AddBook(book1);
//library.AddBook(book2);
//library.AddBook(book3);

Member m1 = new Member() { Name = "M1" };
Member m2 = new Member() { Name = "M2" };

//library.AddMember(m1);
//library.AddMember(m2);

//library.BorrowBook(1, 1);

//library.ReturnBook(1, 1);

library.GetBooks();




