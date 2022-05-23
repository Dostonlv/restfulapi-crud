const Joi = require("joi");
function validateBook(book){
    const bookSchema = Joi.object({
        name: Joi.string().required().min(3)
      })
     return bookSchema.validate(book);   
}

module.exports = validateBook;