const express = require("express");
const Joi = require("joi");
const app = express();
const validateBook = require("./validate");
app.use(express.json());

const books = [ 
    {id: 1, name:'The Way of Kings'},
    {id: 2, name:'The Name of the Wind'},
    {id: 3, name:'The Final Empire'},
    {id: 4, name:'The Hero of Ages'}
]

app.get("/", (req, res) => {
  res.send("Welcome")
});
app.get("/api/books", (req, res) => {
    res.send(books);
});

app.post("/api/books", (req, res) => {
    const {error} = validateBook(req.body)
    if(error) {
     return   res.status(400).send(result.error.details[0].message);
    }

    // if(!req.body.name){
    //     res.status(400).send("Name is required");
    //     return;
    // }
    // if(req.body.name.length < 3){
    //     res.status(400).send("Name should be at least 3 characters");
    //     return;
    // }
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);
});

app.get("/api/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send("Book not found")
    }
    res.send(book);
});

app.put("/api/books/:id", (req, res) => {
    // kitobni bazadan izlab topish
    //agarda kitob mavjud bolmasa, 404 qaytarish
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send("Book not found")
    }
    
    // agarda kitob mavjud bolsa sorovni validatsiya qilish
    //agarda sorov validatsiyadan otmasa 400 qaytarish
   
      const {error} = validateBook(req.body)
    if(error) {
     return   res.status(400).send(result.error.details[0].message);
    }
    //kitobni yangilash
    book.name = req.body.name;
    // kitobni qaytarish
    res.send(book); 
});
app.delete("/api/books/:id", (req, res) => {
    //kitobni idsi boyicha izlab top 
    // topilmasa 404 qaytarish
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send("Book not found")
    }
    //agar topilsa uni o'chirib tashimiz
    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);
    //topilgan kitobni qaytarish
    res.send(book);
})

 

app.get("/api/:year/:month", (req, res) => {
    res.send(req.params)
});

const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`Server is running on port ${port}`)});
