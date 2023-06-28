using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace CollegeSchedule.Controllers;

[ApiController]
[Route("[controller]")]
public class CalendarEventController : ControllerBase
{
    private readonly ILogger<CalendarEventController> _logger;

    public CalendarEventController(ILogger<CalendarEventController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<CalendarEvent> Get(string date)
    {
        List<CalendarEvent> calendarEventArray = new List<CalendarEvent>();
        string dayDate = date.Remove(date.IndexOf('T'));
        
        SqliteConnection sqlConn;
        SqliteDataReader sqliteDataReader;
        SqliteCommand sqliteCmd;
        string connString = "identifier.sqlite";
        
        sqlConn = new SqliteConnection("Data Source=" + connString);

        try
        {
            string query = "SELECT * FROM CalendarEvents WHERE eventStart LIKE '%" + dayDate + "%'";
            
            sqliteCmd = new SqliteCommand(query, sqlConn);

            sqlConn.Open();
            
            sqliteDataReader = sqliteCmd.ExecuteReader();
            while (sqliteDataReader.Read())
            {
                CalendarEvent cEvent = new CalendarEvent()
                {
                    Id = sqliteDataReader.GetString(0),
                    Title = sqliteDataReader.GetString(1),
                    Start = sqliteDataReader.GetString(2),
                    End = sqliteDataReader.GetString(3),
                    AllDay = sqliteDataReader.GetBoolean(4)
                };

                calendarEventArray.Add(cEvent);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception Caught" + ex);
        }
        finally
        {
            if (sqlConn.State == ConnectionState.Open)
            {
                sqlConn.Close();
            }
        }
        
        return calendarEventArray.ToArray();    
    }

    [HttpPost]
    public bool Post(CalendarEvent calendarEvent)
    {
        bool retVal = true;
        
        SqliteConnection sqlConn;
        SqliteCommand sqliteCmd;
        string connString = "identifier.sqlite";
        
        sqlConn = new SqliteConnection("Data Source=" + connString);

        try
        {
            String query = "INSERT INTO CalendarEvents (eventId, eventTitle, eventStart, eventEnd, allDay) VALUES (@eventId, @eventTitle, @eventStart, @eventEnd, @allDay)";

            sqliteCmd = new SqliteCommand(query, sqlConn);
            
            sqliteCmd.Parameters.AddWithValue("@eventId", calendarEvent.Id);
            sqliteCmd.Parameters.AddWithValue("@eventTitle", calendarEvent.Title);
            sqliteCmd.Parameters.AddWithValue("@eventStart", calendarEvent.Start);
            sqliteCmd.Parameters.AddWithValue("@eventEnd",calendarEvent.End);
            sqliteCmd.Parameters.AddWithValue("@allDay", calendarEvent.AllDay);

            sqlConn.Open();
            
            int result = sqliteCmd.ExecuteNonQuery();

            if (result < 0)
            {
                Console.WriteLine("Error inserting data into Database!");
                retVal = false;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception Caught" + ex);
            retVal = false;
        }
        finally
        {
            if (sqlConn.State == ConnectionState.Open)
            {
                sqlConn.Close();
            }
        }

        return retVal;
    }

    [HttpDelete]
    public bool Delete(string id)
    {
        bool retVal = true;
        
        SqliteConnection sqlConn;
        SqliteCommand sqliteCmd;
        string connString = "identifier.sqlite";
        
        sqlConn = new SqliteConnection("Data Source=" + connString);

        try
        {
            String query = "DELETE FROM CalendarEvents WHERE eventId = @eventId";

            sqliteCmd = new SqliteCommand(query, sqlConn);
            
            sqliteCmd.Parameters.AddWithValue("@eventId", id);
            
            sqlConn.Open();
            
            int result = sqliteCmd.ExecuteNonQuery();

            if (result < 0)
            {
                Console.WriteLine("Error deleting record from Database!");
                retVal = false;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception Caught" + ex);
            retVal = false;
        }
        finally
        {
            if (sqlConn.State == ConnectionState.Open)
            {
                sqlConn.Close();
            }
        }

        return retVal;
    }
}