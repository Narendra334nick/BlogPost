const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mongoDbNarendra:Narendra334@cluster0-cooyo.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

var thoughtSchema = new mongoose.Schema({
    name:String,
    date:String,
    blog:String   
});

var thought = mongoose.model('thought',thoughtSchema);

app.get('/', (req, res) => {
    thought.find({},(err,BlogList)=>{
        if(err) console.log(err);
        else{
            res.send({BlogList:BlogList});
        }
    });
});

app.post('/addBlog',(req,res)=>{
    
    var newItem = new thought({
        name:req.body.name,
        date:req.body.date,
        blog:req.body.blog 
    });
    

    thought.create(newItem,function(err,BlogPost){
        if(err) console.log(err)
        else{
            console.log('1 item inserted');
        }
    })
    res.send({status:"success"});

})

// app.post('/signup',(req,res)=>{
    
//     var newItem = new BlogPost({
//         name:req.body.name,
//         password:req.body.password,
//     });
//     BlogPost.create(newItem,function(err,BlogPost){
//         if(err) console.log(err)
//         else{
//             console.log('1 item inserted');
//         }
//     })
//     res.send({status:"success"});
// });


// app.post('/login',function(req,res){

//     BlogPost.findOne({name:req.body.name},(err,document)=>{
//         if(err) console.log(err)
//         else{
//             if(document.password === req.body.password){
//                 res.send({status:"success"});
//             }else{
//                 res.send({status:"wrong password"});
//             }
//         }
//     });
// });

app.post('/updateBlog',(req,res)=>{
    thought.findOneAndUpdate(
        {name:req.body.name},
        {$set:{blog:req.body.blog}})
    .then(res=>{
        console.log("updated successfully");
    })
    .catch(err=>{
        res.json({
            err:`${err}`
        });
    });
});

app.post('/blogDelete/:id',(req,res)=>{
    const id = req.params.id;
    thought.findByIdAndRemove({_id:id},err=>{
        if(err){
             console.log(err)
        }else{
            res.send({stat:"success"})
        }
    })
    
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))