
const User = require("./models/user");

//Admin Bro
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpressjs = require('@admin-bro/express')
const canEditEmp = ({ currentAdmin, record }) => {
  return currentAdmin && (
    currentAdmin.role === 'admin'
  )
}


//Admin Bro
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
AdminBro.registerAdapter(AdminBroMongoose)

const AdminBroOptions = {
  resources: 
  [{
    resource: User,  
    options: {
      properties: {
        encryptedPassword: { isVisible: true },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          // 새로운 비밀번호를 해싱하는 코드를 삭제
        },
        edit: { isAccessible: canModifyUsers },
        delete: { isAccessible: canModifyUsers },
        new: { isAccessible: canModifyUsers },
      }
    }
  }],
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    try {
      console.log('Attempting to authenticate user with email:', email);
      
      const user = await User.findOne({ email });
      
      if (user) {
        console.log('User found:', user);
        
        // Note: In a production environment, use a proper password hashing library like bcrypt.
        if (password === user.passWord) {
          console.log('Password match!');
          return user;
        } else {
          console.log('Password does not match.');
        }
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  
    return false;
  },
  });

module.exports = { adminBro, router };
