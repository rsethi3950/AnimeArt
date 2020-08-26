var express= require('express');
const bodyParser= require('body-parser');
var fs= require('fs');
var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var ejs= require('ejs');
var multer= require('multer');
var app = express();
app.set('view engine','ejs');
var upload    = require('./upload');
app.use(bodyParser.json());
app.use(multer({dest:'./uploads/'}).single('photo'));
app.use(express.static("./"));//middleware for static files, not for ejs files
// establish mongo connection

const url= "mongodb+srv://Riya:fPAeiJWCVe7FkUIT@cluster0.sizlk.mongodb.net/app?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true });
var photoSchema = new Schema({ 
	path: String,
	title: String,
	category: String,
	caption: String
 });
var Photo = mongoose.model('Photos',photoSchema);
app.get('/',function(req,res){
	Photo.find({}, ['path','title','category','caption'], {sort:{ _id: -1} }, function(err, photos) {
     if(err) throw err;
     res.render('index', { photolist : photos });   
});	
})

app.get('/upload',function(req,res){
	res.sendFile('dashboard.html', { root : __dirname});
})
app.post('/upload',function(req,res){
 //this is to send something to req.
 const title =(req.body.title);
 const category =(req.body.category);
 const caption =(req.body.caption);
upload(req, res,(error) => {
      if(error){
         res.redirect('/?msg=3');
      }else{
        if(req.file == undefined){
          
          res.redirect('/?msg=2');
        }else{
        
              // Create new record in mongoDB
             
            var fullPath = "uploads/"+req.file.filename;
            var document = {
              path:     fullPath, 
              caption:  caption,
              category: category,
              title: title,
            };
          var photo = new Photo(document); 
          photo.save(function(error){
            if(error){ 
              throw error;
            } 
            res.redirect('/?msg=1');
            console.log('successful');
            console.log(document);
         });
      }
    }
  });

});

let port = process.env.PORT;
if(port==null || port ==""){
    port=3000;
}
app.listen(port,()=>{
    console.log("server running");
});

