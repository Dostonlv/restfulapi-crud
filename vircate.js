const Joi = require("joi");
function validateCategories(categories){
   const categoriesSchema = Joi.object({
        category: Joi.string().required().min(3)
   });
    return categoriesSchema.validate(categories);
};
module.exports = validateCategories;