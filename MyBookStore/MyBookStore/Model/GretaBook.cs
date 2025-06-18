namespace MyBookStore.Model;

public class GretaBook
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Author { get; set; }
    public required float Price { get; set; }
}

public class PeterBook
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required float Price { get; set; }
}

