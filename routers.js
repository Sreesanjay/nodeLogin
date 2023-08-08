const express = require('express');
const router = express.Router();
let users=[
    {
        id:"usr1",
        name:"Sanjay",
        email:"sanjay@gmail.com",
        password:"1234"
    },
    {
        id:"usr2",
        name:"Amar",
        email:"amar@gmail.com",
        password:"12345"
    },
    {
        id:"usr3",
        name:"Shuhaib",
        email:"shuhaib@gmail.com",
        password:"12346"
    }
]
const verifyLogin=(req,res,next) => {
    if(req.session.user?.logedIn){
      next();
    }
    else{
      res.redirect('/login')
    }
  }
router.get('/', verifyLogin,(req, res) => {
    let user=users.find((x)=>x.id===req.session.user.id)
    console.log(user)
    res.render('body/home',{user:user})
})
router.get('/login',(req, res) => {
    console.log("log in got")
    if(req.session.user?.logedIn){
        res.redirect('/')
    }
    else{
    res.render('body/login',{err:req.session.err})
    delete req.session.err;
    }
})
router.post('/login-form',(req, res) => {
    let {email, password} = req.body;
     let user= users.find((x)=>{
        return email===x.email && password===x.password;
     })
     if(user){
        req.session.user={
            id: user.id,
            logedIn:true
        }
        res.redirect('/')
     }
     else{
        req.session.err={
            message: 'User or password not matched !'
        }
        res.redirect('/login')
     }
})

router.get('/logout',verifyLogin,(req,res)=>{
    console.log(req)
    req.session.destroy();
    res.redirect('/login')
})
module.exports=router;