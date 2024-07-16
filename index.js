import express from "express";
import bodyParser from "body-parser";
const app=express();
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
const port=3000;
app.listen(port,()=>{
    console.log(`server started at ${port}`);
});
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/create",(req,res)=>{
    res.render("create-post.ejs");
});
let dateofpost=[];
let bodyofpost=[];
app.post("/view",(req,res)=>{
    if(req.body["post1"]){
    if(bodyofpost.length===0||bodyofpost[bodyofpost.length-1]!==req.body["post1"]){
        const d=new Date();
        dateofpost.push(d);
    bodyofpost.push(req.body["post1"]);
    res.render("view.ejs",{
        comment:bodyofpost,
        date:dateofpost,
    });
}
else{
    res.render("view.ejs",{
        comment:bodyofpost,
        date:dateofpost,
    });
}
}
else{ 
    var del_idx=req.body["name"];
    var sec_idx=1;
    dateofpost.splice(del_idx,sec_idx);
    bodyofpost.splice(del_idx,sec_idx);
    if(bodyofpost.length==0){
        res.render("view.ejs");
    }
    res.render("view.ejs",{
        comment:bodyofpost,
        date:dateofpost,
    });
}
});
app.get("/view",(req,res)=>{
    if(bodyofpost.length>0){
    res.render("view.ejs",{
        comment:bodyofpost,
        date:dateofpost,
    });
}
else{
    res.render("view.ejs");
}
});
app.post("/create",(req,res)=>{
    var del_idx=req.body["name1"];
    var sec_idx=1;
    var temp=bodyofpost[del_idx];
    dateofpost.splice(del_idx,sec_idx);
    bodyofpost.splice(del_idx,sec_idx);
    res.render("create-post.ejs",{
        reqbody:temp,
    });
});


