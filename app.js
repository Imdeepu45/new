const Express=require("express");
    var  bodyparser=require('body-parser');
    const mongoose=require('mongoose');
    const Request=require('request');


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
        res.render("login");
        
    });
    
    app.post('/',(req,res)=> {


            console.log(req,body);

            var student=new studentModel(req,body);
            var result=student.save(error,data);
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

    app.get('/getdatas',(req,res)=>{


        result=studentModel.find((error,data)=>{
            if(error){
                throw error;
            }
                else{
                    res.send(data);
                }
        });
    });

    const getdataApi="http://localhost:3000/getdatas";


    app.get('/view',(req,res)=>{
        Request(getdataApi,(error,Response,body)=>{
            var data=JSON.parse(body);



            console.log(data);
            res.render('view',{'data':data});
        });
        
    });
    



    app.listen(process.env.PORT || 3000,()=>{
        console.log("Server running on port::3000...");
    });




