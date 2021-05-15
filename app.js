const express = require("express");
var request = require("request");
const app= express()

const port =process.env.PORT||5000;

app.get("/",(req,res)=>(res.send("test")))

app.get('/vaccine', (req,res )=> {
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;
    var dist = req.query.distr;
    request(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id="+dist+"&date="+today,
        function(error, response, body){
            if(!error &&response.statusCode == 200){
                
                var parseBody= JSON.parse(body);
                
                
                
                
                if (parseBody.centers==""){

                   var availability= null;
                }
                else{
                    
                    var availability = parseBody.centers;
                    
                    
                    
                    
                }
                res.send({availability});
                
                
               

                
                    
                
                

                
                

               
                   
                    
                
                
            };
        }
    );


}) ;

if(process.env.NODE_ENV==="production"){
    app.use(express.static("vaccine-frontend/build"));
}

app.listen(port, ()=> console.log(`connected to port ${port}`));