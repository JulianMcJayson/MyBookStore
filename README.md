# My Book Store Web Application
- Backend (ASPNET WebApi, Sqlite)
- Frontend (NextJS 15, TailwindCSS)

For Backend, I use router for simplicity and performance without passing controller and provider.

## Model

| Order Model  | Greta Book Model | Peter Book Model |
| ------------- | ------------- | ------------- |
| Id | Id | Id  |
| Title  | Name  | Title  |
| Author  | Author  | Author  |
| Price  | Price  | Price  |
| Store  | -  | - |

As you can see `Greta book` is different from another model, so I choose to use Peter model for universal model.

## Api Endpoint
- / `GET` : for getting order from orders databse
- / `POST` : for creating new order to orders database
- / `DELETE` : for removing order from orders database
- /greta-store `GET` : for getting grete books from external api
- /peter-store `GET` : for getting peter books from external api

## Usage

- clone this repo `git clone https://github.com/JulianMcJayson/MyBookStore.git`
  
### Backend
- nav to backend folder `cd MyBookStore/MyBookStore`
- run command
```
dotnet restore
dotnet run
```

### Frontend
- nav to frontend folder `cd my-book-store-frontend`
- run command
```
npm install
npm run dev
```
- you can access the frontend by `http://localhost:3000`
  
### Testing
- nav to testing folder `cd MyBookStore/MyBookStoreTest`
- run command
```
dotnet restore
dotnet test
```
