const express = require('express');
const router = express.Router();
let users=[
    {
        id:"usr1",
        name:"Sanjay",
        email:"sanjay@gmail.com",
        password:"1234",
        blogs:[
            {
                title:"Embracing Change: Navigating Life's Transitions",
                body:"In a world filled with constant digital distractions, cultivating mindfulness has become more crucial than ever. Mindfulness allows us to be fully present, fostering a deeper connection with ourselves and the world around us."
             },
             {
                title:" Exploring Remote Work: Benefits and Challenges",
                body:"The rise of remote work has transformed the way we approach our professional lives. While the flexibility and autonomy it offers are enticing, remote work also comes with its own set of challenges. Balancing work and personal life, maintaining effective communication, and combating feelings of isolation are all aspects to consider."
             },
             {
                title:"The Power of Small Habits for Personal Growth",
                body: "It's often said that success is the result of small, consistent actions. Building positive habits can pave the way for personal growth and achievement. Whether it's dedicating 10 minutes a day to learning a new skill or taking a daily walk, these small steps accumulate over time, leading to significant transformations. "
             },
             {
                title:" Rediscovering the Joy of Reading in the Digital Age",
                body: "In an era dominated by screens and digital content, the simple pleasure of reading a physical book has taken a backseat. However, the benefits of reading go beyond the words on the page. It stimulates our imagination, enhances vocabulary, and provides an escape from the fast-paced digital world."
             }
         ]
    },
    {
        id:"usr2",
        name:"Amar",
        email:"amar@gmail.com",
        password:"12345",
        blogs:[
            {
                title:"The Art of Mindfulness in a Digital World",
                body:"In a world filled with constant digital distractions, cultivating mindfulness has become more crucial than ever. Mindfulness allows us to be fully present, fostering a deeper connection with ourselves and the world around us."
             },
             {
                title:" Exploring Remote Work: Benefits and Challenges",
                body:"The rise of remote work has transformed the way we approach our professional lives. While the flexibility and autonomy it offers are enticing, remote work also comes with its own set of challenges. Balancing work and personal life, maintaining effective communication, and combating feelings of isolation are all aspects to consider."
             },
             {
                title:"The Power of Small Habits for Personal Growth",
                body: "It's often said that success is the result of small, consistent actions. Building positive habits can pave the way for personal growth and achievement. Whether it's dedicating 10 minutes a day to learning a new skill or taking a daily walk, these small steps accumulate over time, leading to significant transformations. "
             },
             {
                title:" Rediscovering the Joy of Reading in the Digital Age",
                body: "In an era dominated by screens and digital content, the simple pleasure of reading a physical book has taken a backseat. However, the benefits of reading go beyond the words on the page. It stimulates our imagination, enhances vocabulary, and provides an escape from the fast-paced digital world."
             }
         ]
    },
    {
        id:"usr3",
        name:"Shuhaib",
        email:"shuhaib@gmail.com",
        password:"12346",
        blogs:[
            {
                title:"The Art of Mindfulness in a Digital World",
                body:"In a world filled with constant digital distractions, cultivating mindfulness has become more crucial than ever. Mindfulness allows us to be fully present, fostering a deeper connection with ourselves and the world around us."
             },
             {
                title:" Exploring Remote Work: Benefits and Challenges",
                body:"The rise of remote work has transformed the way we approach our professional lives. While the flexibility and autonomy it offers are enticing, remote work also comes with its own set of challenges. Balancing work and personal life, maintaining effective communication, and combating feelings of isolation are all aspects to consider."
             },
             {
                title:"The Power of Small Habits for Personal Growth",
                body: "It's often said that success is the result of small, consistent actions. Building positive habits can pave the way for personal growth and achievement. Whether it's dedicating 10 minutes a day to learning a new skill or taking a daily walk, these small steps accumulate over time, leading to significant transformations. "
             },
             {
                title:" Rediscovering the Joy of Reading in the Digital Age",
                body: "In an era dominated by screens and digital content, the simple pleasure of reading a physical book has taken a backseat. However, the benefits of reading go beyond the words on the page. It stimulates our imagination, enhances vocabulary, and provides an escape from the fast-paced digital world."
             }
         ]
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
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    let user=users.find((x)=>x.id===req.session.user.id)
    res.render('body/home',{user:user})
})
router.get('/login',(req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
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
    console.log("log out")
    req.session.destroy();
    res.redirect('/login')
})
module.exports=router;