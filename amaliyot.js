const express = require("express");
const validateCategories = require('./vircate')
const app = express();
app.use(express.json());

const categories = [
    { id:1, category: 'Dasturlash' },
    { id:2, category: 'Tarmoqlar' },
    { id:3, category: "ma'lumot xavfsizligi" },
    { id:4, category: "DevOps" },
    { id:5, category: "Database" }
]

app.get("/", (req,res) => {
    res.send("Virtual Dars")
});

app.get('/virtualdars/categories', (req,res) => {res.send(categories)});

// get method
app.get('/virtualdars/categories/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send("Category not found");
    res.send(category);
});

//post method

app.post('/virtualdars/categories', (req,res)=>{
    const {error} = validateCategories(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = {
        id: categories.length + 1,
        category: req.body.category
    }
});

//put method
app.put('/virtualdars/categories:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send("Category not found");

    // return error
    const {error} = validateCategories(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // update category
    category.category = req.body.category;

    // return category
     res.send(category);
});

 app.delete('/virtualdars/categories:id',(req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if(!category) return res.status(404).send("Category not found");

    // search index
    const index = categories.indexOf(category);
    // delete category
    categories.splice(index, 1);
    // return category
    res.send(category);
})


const port = process.env.PORT || 8000;

app.listen(port, () => {console.log(`Server is running on port ${port}`)});