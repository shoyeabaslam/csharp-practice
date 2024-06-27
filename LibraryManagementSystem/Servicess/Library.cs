using LibraryManagementSystem.DataAccess;
using LibraryManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.Servicess
{
    internal class Library
    {
        private readonly LibraryDataAccess _libraryDataAccess;
        public Library(string connectionString)
        {
            _libraryDataAccess = new LibraryDataAccess(connectionString);
        }

        public void AddBook(Book book)
        {
            _libraryDataAccess.AddBook(book);
        }

        public void AddMember(Member member)
        {
            _libraryDataAccess.AddMember(member);
        }

        public void BorrowBook(int MemberId, int bookId)
        {
            _libraryDataAccess.BorrwoBook(MemberId, bookId);
        }


        public void ReturnBook(int MemberId, int bookId)
        {
            _libraryDataAccess.ReturnBook(MemberId, bookId);
        }

        public void GetBooks()
        {
            DataTable books = _libraryDataAccess.GetBooks();
            foreach(DataRow row in books.Rows)
            {
                Console.WriteLine($"ID= {row[0]}, Title = {row[1]}, Author = {row[2]}, Quantity = {row[3]}");
            }
        }
    }
}
