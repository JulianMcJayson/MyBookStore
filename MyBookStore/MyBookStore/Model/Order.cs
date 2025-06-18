namespace MyBookStore.Model;

public class Order
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required float Price { get; set; }
    public required int Store { get; set; }
}