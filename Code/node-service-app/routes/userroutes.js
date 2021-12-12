var express = require("express")
var route = express.Router();
var sequelize = require('../orm/connection');
var model = require('../orm/model')
const jwt = require("jsonwebtoken");
const { employees } = require("../orm/model");

route.post("/signin", async function (request, response) {
   const { username, password } = request.body
   try {
      const user = await model.user.findOne({ where: { username: username } })
      let result = user.dataValues

      if (result.password === password) {
         response.json(
            {
               username: username,
               usertype: result.role,
               token: jwt.sign({ username: username, password: password }, "node-app-22")
            }
         )
      }
      else
         response.status(401).send("Username or Password incorrect")
   }
   catch (e) {
      console.log(e)
      response.status(500)
   }

})


route.get("/getEmployeesForManager", async function (request, response) {
   console.log(request.query.name)
   const managerName = request.query.name
   try {
      //const employeeList = await model.employees.findAll({where:{manager:managerName,lockstatus:'not_requested'}})
      sequelize.query(`SELECT skillmap.employee_id,employees.name,employees.status,employees.manager,
      employees.wfm_manager,employees.email,employees.lockstatus,
      employees.experience,(select name from profile where profile_id=employees.profile_id) as profile_id,
      GROUP_CONCAT(skills.name) AS SkillSet FROM skillmap  
      LEFT JOIN skills ON skillmap.skillid = skills.skillid join employees on employees.employee_id=skillmap.employee_id 
      where employees.manager='${managerName}' and employees.lockstatus='not_requested'
      GROUP BY skillmap.employee_id ORDER BY skillmap.employee_id;`,
         { type: sequelize.QueryTypes.SELECT }
      ).then(function (EmployeesForManager) {
         response.send(EmployeesForManager)
      })
   }
   catch (e) {
      response.status(500)
   }

})



route.get("/getEmployeesForWfmMember", async function (request, response) {
   const wfm_member = request.query.name;
   try {
      //const EmployeesForWfmMember = await model.employees.findAll({ where: { wfm_manager: wfm_member, lockstatus: 'request_waiting' } });
      //response.send(EmployeesForWfmMember)
      sequelize.query(`select e.employee_id,e.name,e.status,e.manager,e.email,e.experience,
         (select name from profile where profile_id=e.profile_id) 
         as profile_id,e.wfm_manager,e.lockstatus,s.managerstatus
         from employees as e join softlock as s on e.employee_id=s.employee_id 
         where e.wfm_manager='${wfm_member}' and e.lockstatus='request_waiting' 
         and s.managerstatus='awaiting_confirmation' and s.status='waiting'`,
         { type: sequelize.QueryTypes.SELECT }
      ).then(function (EmployeesForWfmMember) {
         response.json(EmployeesForWfmMember)
      })
   }
   catch (e) {
      response.status(500)
   }
})

route.get("/getEmployeesFromSoftLock", async function (request, response) {
   const employee_id = request.query.id
   try {
      //const EmployeesForWfmMember = await model.softLock.findAll({where:{employee_id:employee_id,status:'waiting'}});
      sequelize.query(`select * from softlock where employee_id=${employee_id} and status='waiting' and 
         managerstatus='awaiting_confirmation'`,
         { type: sequelize.QueryTypes.SELECT }
      ).then(function (EmployeesForWfmMember) {
         response.json(EmployeesForWfmMember)
      })
   }
   catch (e) {
      response.status(500)
   }
})

route.post("/updateReqStatus", async function (req, res) {
   try {
      // const empRes= await model.softLock.update({status: 'waiting'}, {where: { employee_id: 1017 } })
      const employee_id = req.query.id
      const status = Object.keys(req.body)[0];
      if (status == 'Approve') {
         sequelize.query(` UPDATE softlock
         SET status = 'approved',managerstatus='accepted'
         WHERE employee_id = ${employee_id};`,
            { type: sequelize.QueryTypes.UPDATE }
         )
      }
      else {
         sequelize.query(` UPDATE softlock
         SET status = 'approved',managerstatus='rejected'
         WHERE employee_id = ${employee_id};`,
            { type: sequelize.QueryTypes.UPDATE }
         )
      }
      sequelize.query(` UPDATE employees
      SET lockstatus = 'locked'
      WHERE employee_id = ${employee_id};`,
         { type: sequelize.QueryTypes.UPDATE }
      )
   }
   catch (e) {
      res.status(500)
   }

})

route.post("/insertReqMessage", async function (req, res) {
   try {
      const employee_id = req.body.id;
      const manager = req.body.manager;
      const requestmessage = req.body.reqMessage;

      sequelize.query(` INSERT INTO softlock
      (employee_id,manager,reqdate,status,lastupdated,requestmessage,managerstatus) values
      (${employee_id},'${manager}',CURDATE(),'waiting',CURDATE(),'${requestmessage}','awaiting_confirmation');`,
         { type: sequelize.QueryTypes.INSERT }
      )
      sequelize.query(` UPDATE employees
      SET lockstatus = 'request_waiting'
      WHERE employee_id = ${employee_id};`,
         { type: sequelize.QueryTypes.UPDATE }
      )
   }
   catch (e) {
      res.status(500)
   }
})

module.exports = route