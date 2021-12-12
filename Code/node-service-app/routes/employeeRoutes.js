var express=require("express")
var route = express.Router();
var model = require('../orm/model')


route.get("/getEmployees",async function(request,response){
    const {managerName}="rohit"
try{
   const employeeList = await model.user.findAll({where:{managerName:managerName}})
   let result = employeeList.dataValues
   console.log(result)
}
catch(e)
{
   console.log(e)
        response.status(500)
}

})

module.exports=  route