const express = require("express");
const bodyParser = require("body-parser");
const http =require("https");
const request = require("request");

const app = express();

app.use(express.static("sources"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname +"/signup.html");
})


app.post("/", function(req,res)
{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    

                       
    const url = "https://us11.api.mailchimp.com/3.0/lists/76f0ee8f78/members";
    const data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstname,
            LNAME: lastname
        }
    }

    const options = {
        method: "POST",
        auth: "Nasr:13375df3df096bda3b656ab56a04c28f-us11",
        headers: {
            "Content-Type": "application/json"
        }
    };

    const reqq = http.request(url, options, function (response) {


        response.on("data", function (data) {
        });

        if(response.statusCode === 200)
            res.sendFile(__dirname +"/success.html");
        else
            res.sendFile(__dirname +"/failure.html");
    });


    reqq.on("error", function (error) {
        console.error("Error:", error);
    });


    reqq.write(JSON.stringify(data));
    reqq.end();  
})


app.post("/failure",function(req,res)
{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000);


//7cd6b3e5d2acc0363cee311ed21f9ee4-us11
//76f0ee8f78