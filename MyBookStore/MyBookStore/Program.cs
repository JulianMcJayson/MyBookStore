using Microsoft.EntityFrameworkCore;
using MyBookStore.Model;
using Newtonsoft.Json;

namespace MyBookStore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppContextDb>(options => options.UseSqlite("Data Source=bookstore.db"));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI();
            
            var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://mybookstore.free.beeceptor.com/");
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            httpClient.Timeout = TimeSpan.FromSeconds(30);
            
            // var mock = new List<Book>
            // {
            //     new Book { Title = "To Kill a Mockingbird", Author = "Harper Lee", Price = 14.99f },
            //     new Book { Title = "1984", Author = "George Orwell", Price = 12.50f },
            //     new Book { Title = "The Lord of the Rings", Author = "J.R.R. Tolkien", Price = 34.99f },
            //     new Book { Title = "The Hitchhiker's Guide to the Galaxy", Author = "Douglas Adams", Price = 11.25f },
            //     new Book { Title = "Pride and Prejudice", Author = "Jane Austen", Price = 9.99f },
            //     new Book { Title = "Dune", Author = "Frank Herbert", Price = 18.00f },
            //     new Book { Title = "Sapiens: A Brief History of Humankind", Author = "Yuval Noah Harari", Price = 22.50f },
            //     new Book { Title = "The Song of Achilles", Author = "Madeline Miller", Price = 16.75f },
            //     new Book { Title = "Atomic Habits", Author = "James Clear", Price = 20.00f },
            //     new Book { Title = "Project Hail Mary", Author = "Andy Weir", Price = 19.95f }
            // };
            
            app.MapGet("/greta-store", async (AppContextDb dbContextDb) =>
            {
                 var bookStore = new List<GretaBook>();
                 var greta = await httpClient.GetAsync("greta/books");
                 if (greta.IsSuccessStatusCode)
                 {
                     var gretaJson = await greta.Content.ReadAsStringAsync();
                     var gretaBookStore = JsonConvert.DeserializeObject<List<GretaBook>>(gretaJson);
                     var existOrders = await dbContextDb.Orders.Select(o => o.Title).ToListAsync();
                     if (gretaBookStore != null)
                     {
                         foreach (var item in gretaBookStore)
                         {
                             if (!existOrders.Contains(item.Name))
                             {
                                 bookStore.Add(item);
                             }
                         }
                     }
                
                     return Results.Ok(bookStore);
                 }
                 return Results.StatusCode(502);

                //return Results.Ok(mock.Slice(0,4));

            }).WithName("GetAllListFromGretaStore");
            
            app.MapGet("/peter-store", async (AppContextDb dbContextDb) =>
            {
                var bookStore = new List<PeterBook>();
                var peter = await httpClient.GetAsync("peter/books");
                if (peter.IsSuccessStatusCode)
                {
                    var peterJson = await peter.Content.ReadAsStringAsync();
                    var peterBookStore = JsonConvert.DeserializeObject<List<PeterBook>>(peterJson);
                    var existOrders = await dbContextDb.Orders.Select(o => o.Title).ToListAsync();
                    if (peterBookStore != null)
                    {
                        foreach (var item in peterBookStore)
                        {
                            if (!existOrders.Contains(item.Title))
                            {
                                bookStore.Add(item);
                            }
                        }
                    }
                
                    return Results.Ok(bookStore);
                }
                
                return Results.StatusCode(502);
                //return Results.Ok(mock.Slice(4,6));
                
            }).WithName("GetAllListFromPeterStore");

            app.MapGet("/", async (AppContextDb dbContextDb) =>
            {
                var orders = await dbContextDb.Orders.ToListAsync();
                return Results.Ok(orders);
            }).WithName("GetAllListFromDatabase");

            app.MapPost("/", async (Order newOrder, AppContextDb dbContextDb) =>
            {
                var existOrder = await dbContextDb.Orders.AnyAsync(o => o.Title == newOrder.Title);
                if (existOrder)
                {
                    return Results.BadRequest("Order already exists");
                }
                await dbContextDb.Orders.AddAsync(newOrder);
                await dbContextDb.SaveChangesAsync();
                return Results.StatusCode(201);
            }).WithName("PostBookToDatabase");
            
            app.MapDelete("/{id:int}",async (int id, AppContextDb dbContextDb) =>
            {
                var order = await dbContextDb.Orders.FindAsync(id);
                if (order == null)
                {
                    return Results.NotFound("Order not found");
                }
                dbContextDb.Orders.Remove(order);
                await dbContextDb.SaveChangesAsync();
                return Results.StatusCode(200);
            }).WithName("DeleteBookFromDatabase");

            app.Run();
        }
    }
}

