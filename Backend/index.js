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
    id:"1a",
    username: 'JohnDoe',
    content: 'This is my first post!'
  },
  {
    id:"1b",
    username: 'JaneDoe',
    content: 'This is my second post!'
  },
  {
    id:"1c",
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
app.get('/posts/:id',(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  res.render('show', { post });
})
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})