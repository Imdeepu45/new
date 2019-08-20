const Express=require("express");
    var  bodyparser=require('body-parser');
    const mongoose=require('mongoose');

    var app=new Express();

    app.set('view engine','ejs');

   app.use(Express.static(__dirname+"/public"));
   app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended:true}));

    const studentModel=mongoose.model("studentdetails",
    
    {
        Name:String,
        Rollno:String,
        admissionNo:String,
        College:String
    }
    );

    mongoose.connect("mongodb://localhost:27017/collegedb");




   
    app.get('/',(req,res)=> {
        res.render('login');
        console.log(name)
    });
    
    app.post('/login',(req,res)=> {

            console.log(req,body);

            var student=new studentModel(req,body);
            var result=student.save();
            res.send(result);



       //var name=req.body.name;
       //var Rollno=req.body.rollno;
       //var admissionNo=req.body.admissionNo;
       //var college=req.body.college;
       //console.log("Name:"+name);
       //console.log("Rollno:"+rollno);
       //console.log("AdmissionNo:"+admissionno);
       //console.log("College:"+college);
    });


    
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server running on port::3000...");
    });




