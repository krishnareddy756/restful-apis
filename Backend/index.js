const express=require('express');
const app=express();
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
const path=require('path');//for views
app.set('views',path.join(__dirname,'views')); //for views
app.set('view engine','ejs');// for ejs
app.use(express.static(path.join(__dirname,'public')));//for static files and public folder

const port=3000;
let posts=[
  {
    username: 'JohnDoe',
    content: 'This is my first post!'
  },
  {
    username: 'JaneDoe',
    content: 'This is my second post!'
  },
  {
    username: 'AliceWonder',
    content: 'This is my third post!'
  }
];
app.get('/posts',(req,res)=>{
  res.render('index',{posts});
})
app.get('/posts/new',(req,res)=>{
  res.render('new');
})
app.post('/posts',(req,res)=>{
  let { username, content } = req.body;
  posts.push({ username, content });
  res.redirect('/posts');
})
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})