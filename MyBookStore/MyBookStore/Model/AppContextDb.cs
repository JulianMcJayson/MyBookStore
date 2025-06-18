
using Microsoft.EntityFrameworkCore;

namespace MyBookStore.Model
{
    public class AppContextDb(DbContextOptions<AppContextDb> options) : DbContext(options)
    {
        public DbSet<Order> Orders { get; set; }
    }
}

