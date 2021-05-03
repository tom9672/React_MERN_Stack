import bcrypt from 'bcrypt'
const users = [
    {
        name:'Admin',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true,
    },
    {
        name:'normal1',
        email:'normal1@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },
    {
        name:'normal2',
        email:'normal2@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },
]

export default users