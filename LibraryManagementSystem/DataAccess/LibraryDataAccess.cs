using LibraryManagementSystem.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementSystem.DataAccess
{
    internal class LibraryDataAccess
    {
        private string _connectionString;
        public LibraryDataAccess(string connectionString)
        {
            _connectionString = connectionString;
        }

        // inserting
        public void AddBook(Book book)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "INSERT INTO BOOKS (TITLE,AUTHOR,QUANTITY) VALUES(@TITLE,@AUTHOR,@QUANTITY)";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@TITLE", book.Title);
                cmd.Parameters.AddWithValue("@AUTHOR", book.Author);
                cmd.Parameters.AddWithValue("@QUANTITY", book.Quantity);
                try
                {
                    cmd.ExecuteNonQuery();
                    Console.WriteLine("Book added sucessfully");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

            }
        }

        // inserting
        public void AddMember(Member member)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "INSERT INTO MEMBERS (MEMBERNAME) VALUES(@MEMBERNAME)";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@MEMBERNAME", member.Name);
                try
                {
                    cmd.ExecuteNonQuery();
                    Console.WriteLine("Member added sucessfully");
                }catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }

            }
        }

        // updating and inserting
        public void BorrwoBook(int memberId,int bookId)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "UPDATE BOOKS SET QUANTITY = QUANTITY - 1 WHERE BOOKID = @BOOKID AND QUANTITY > 0";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@BOOKID", bookId);
                try
                {
                    int rowAffected = cmd.ExecuteNonQuery();
                    if(rowAffected > 0)
                    {
                        string insertQuery = "INSERT INTO TRANSACTIONS (BOOKID, MEMBERID) VALUES (@BOOKID, @MEMBERID)";
                        SqlCommand insertCommand = new SqlCommand(insertQuery, connection);
                        insertCommand.Parameters.AddWithValue("@BOOKID", bookId);
                        insertCommand.Parameters.AddWithValue("@MEMBERID", memberId);
                        insertCommand.ExecuteNonQuery();
                        Console.WriteLine("Book borrowed");
                    }
                    else
                    {
                        throw new Exception("Quantity of book is zero");
                    }
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        // updating and deleting
        public void ReturnBook(int bookId,int memberId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "UPDATE BOOKS SET QUANTITY = QUANTITY + 1 WHERE BOOKID = @BOOKID;" +
                    "DELETE FROM TRANSACTIONS WHERE BOOKID=@BOOKID AND MEMBERID=@MEMBERID";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@BOOKID", bookId);
                cmd.Parameters.AddWithValue("@MEMBERID", memberId);
                try
                {
                    cmd.ExecuteNonQuery();
                    Console.WriteLine("Book returned");
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }

        //selecting
        public DataTable GetBooks()
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var adapter = new SqlDataAdapter("SELECT * FROM Books", connection);
                var booksTable = new DataTable();
                adapter.Fill(booksTable);
                return booksTable;
            }
        }

    }
}
