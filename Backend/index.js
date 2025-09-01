const express=require('express');
const methodOverride = require('method-override');
const app=express();
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));// for HTML forms to support PUT and DELETE
const path=require('path');//for views
app.set('views',path.join(__dirname,'views')); //for views
app.set('view engine','ejs');// for ejs
app.use(express.static(path.join(__dirname,'public')));//for static files and public folder
const {v4:uuidv4} =require('uuid');//for unique ids

const port=3000;
let posts=[
  {
    id:uuidv4(),
    username: 'JohnDoe',
    content: 'This is my first post!'
  },
  {
    id:uuidv4(),
    username: 'JaneDoe',
    content: 'This is my second post!'
  },
  {
    id:uuidv4(),
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
  let id=uuidv4();
  posts.push({ id, username, content });
  res.redirect('/posts');
})
app.get('/posts/:id',(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  res.render('show', { post });
})
app.patch('/posts/:id',(req,res)=>{
  let {id}=req.params;
  let newContent=req.body.content;
  let post=posts.find((p)=>id===p.id);
  post.content=newContent;
  console.log(`Post with id ${id} updated`);
  res.redirect('/posts');
})
app.get('/posts/:id/edit',(req,res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>id===p.id);
  res.render('edit', { post });
} )
app.delete('/posts/:id',(req,res)=>{
  let {id}=req.params;
  posts=posts.filter((p)=>p.id!==id);
  console.log(`Post with id ${id} deleted`);
  res.redirect('/posts');
})
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});