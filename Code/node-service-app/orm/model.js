const Sequelize = require('sequelize');
var sequelize = require('./connection');

var user = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  role: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}

);

var employees = sequelize.define('employees', {
  employee_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  manager: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wfm_manager: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  lockstatus: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  experience: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  profile_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}


);


var skills = sequelize.define('skills', {
  skillid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}
);

var skillMap = sequelize.define('skillmap', {
  employee_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  skillid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}

);

var softLock = sequelize.define('softlock', {
  employee_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  manager: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  reqdate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  status: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  lastupdated: {
    type: Sequelize.DATE,
    allowNull: true
  },
  lockid: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  requestmessage: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  wfmremark: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  managerstatus: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  mgrstatuscommand: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  mgrlastupdate: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}
);

user.sync({ force: false }).then(() => {

  console.log("User table Synched!!!");
});

employees.sync({ force: false }).then(() => {

  console.log("Employee table Synched!!!");
});


skills.sync({ force: false }).then(() => {

  console.log("Skills table Synched!!!");
});

skillMap.sync({ force: false }).then(() => {

  console.log("SkillMap table Synched!!!");
});

softLock.sync({ force: false }).then(() => {

  console.log("SoftLock table Synched!!!");
});

module.exports = {
  user: user,
  employees: employees,
  skills: skills,
  skillMap: skillMap,
  softLock: softLock
};