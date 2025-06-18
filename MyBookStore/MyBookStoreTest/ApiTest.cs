using System.Data.Common;
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyBookStore;
using MyBookStore.Model;
using Newtonsoft.Json;

namespace MyBookStoreTest
{
    public class ApiTest : IClassFixture<MyApiFactory>
    {
        private readonly HttpClient client;

        public ApiTest(MyApiFactory apiFactory)
        {
            client = apiFactory.CreateClient();
        }

        [Fact]
        public async Task PostRouteTest()
        {
            var newOrder = new Order{Id = 1, Title = "test", Price = 1, Store = 0};
            var response = await client.PostAsJsonAsync("/", newOrder);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }
        
        [Fact]
        public async Task PostRouteErrorTest()
        {
            var newOrder = new Order{Id = 1, Title = "test", Price = 1, Store = 0};
            var error = await client.PostAsJsonAsync("/", newOrder);
            Assert.Equal(HttpStatusCode.BadRequest, error.StatusCode);
        }
        
        [Fact]
        public async Task GetRouteTest()
        {
            var newOrder = new Order{Id = 1, Title = "test", Price = 1, Store = 0};
            await client.PostAsJsonAsync("/", newOrder);
            var response = await client.GetAsync("/");
            var json = await response.Content.ReadAsStringAsync();
            var orders = JsonConvert.DeserializeObject<List<Order>>(json);
            Assert.Equal(newOrder.Title, orders?[0].Title);
        }
        
        [Fact]
        public async Task GetRouteErrorTest()
        {
            var newOrder = new Order{Id = 1, Title = "test", Price = 1, Store = 0};
            await client.DeleteAsync($"/{newOrder.Id}");
            var response = await client.GetAsync("/");
            var json = await response.Content.ReadAsStringAsync();
            var orders = JsonConvert.DeserializeObject<List<Order>>(json);
            Assert.Empty(orders);
        }
        
        [Fact]
        public async Task GetGretaStoreRouteTest()
        {
            var response = await client.GetAsync("/greta-store");
            var json = await response.Content.ReadAsStringAsync();
            var orders = JsonConvert.DeserializeObject<List<Order>>(json);
            Assert.NotEmpty(orders);
            Assert.Equal(5, orders.Count);
        }
        
        [Fact]
        public async Task GetPeterStoreRouteTest()
        {
            var response = await client.GetAsync("/peter-store");
            var json = await response.Content.ReadAsStringAsync();
            var orders = JsonConvert.DeserializeObject<List<Order>>(json);
            Assert.NotEmpty(orders);
            Assert.Equal(5, orders.Count);
        }
    }

    public class MyApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        private DbConnection connection = null!;

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var dbContextDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<AppContextDb>));
                if (dbContextDescriptor != null)
                {
                    services.Remove(dbContextDescriptor);
                }
                
                var dbConnectionDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbConnection));
                if (dbConnectionDescriptor != null)
                {
                    services.Remove(dbConnectionDescriptor);
                }
                
                connection = new SqliteConnection("DataSource=shared;Mode=Memory;Cache=Shared");
                connection.Open();
                
                services.AddDbContext<AppContextDb>(options =>
                {
                    options.UseSqlite(connection);
                });
            });

            builder.UseEnvironment("Development");
        }
        
        public async Task InitializeAsync()
        {
            using var scope = Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppContextDb>();
            await context.Database.EnsureCreatedAsync();
        }
        
        public new async Task DisposeAsync()
        {
            await connection.DisposeAsync();
            await base.DisposeAsync();
        }
    }
}

