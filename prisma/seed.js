const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const priceData = [
    {
        id : 1,
        bookId : 1,
        price : 500,
        createdAt : new Date(),
        
    },
    {
        id : 2,
        bookId : 2,
        price : 600 ,
        createdAt : new Date(),
        
    },
    {
        id : 3,
        bookId : 3,
        price : 700 ,
        createdAt : new Date(),
        
    },
    {
        id : 4,
        bookId : 4,
        price : 800 ,
        createdAt : new Date(),
        
    },
    {
        id : 5,
        bookId : 5,
        price : 900 ,
        createdAt : new Date(),
        
    },
]

const categoryData = [
    {
        id : 1 ,
        enTitle : 'Computer',
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id : 2 ,
        enTitle : 'Science',
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id : 3 ,
        enTitle : 'Productivity',
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id : 4 ,
        enTitle : 'Cooking',
        createdAt : new Date(),
        updatedAt : new Date(),
    },
    {
        id : 5 ,
        enTitle : 'Novel',
        createdAt : new Date(),
        updatedAt : new Date(),
    },
]

const bookData = [
    {
        id : 1,
        enTitle : "Book1",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 1,
        enDescription : "Book1 Naja"
    },
    {
        id : 2,
        enTitle : "Book2",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 2,
        enDescription : "Book2 Naja"
    },
    {
        id : 3,
        enTitle : "Book3",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 3,
        enDescription : "Book3 Naja"
    },
    {
        id : 4,
        enTitle : "Book4",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 4,
        enDescription : "Book4 Naja"
    },
    {
        id : 5,
        enTitle : "Book5",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 5,
        enDescription : "Book5 Naja"
    },
    {
        id : 6,
        enTitle : "Book6",
        createdAt : new Date(),
        updatedAt : new Date(),
        categoryId : 1,
        enDescription : "Book6 Naja"
    },
]

const generateData = async () => {
   
    await prisma.category.createMany({
      data: categoryData,
    });
    await prisma.book.createMany({
      data: bookData,
    });
    await prisma.price.createMany({
        data: priceData,
      });
  };
  
  generateData();
  