var express = require('express'); // requires this as we are allowing express to run the server
var app = express();
var myParser = require("body-parser");// installs and requires the body parser module
var queryString = require('query-string');
var data = require("./product_data.js");//imports the data from our data to the data variable
const qs = require('qs'); // requires this because we are converting our products quantity object into a string aaray we need this because we are saving this ti a quantity string to save as we process login
var products = data.products; //assigns the product data to check if values are undefined we assigned this also in our js.
var filename = 'user_data.json'; //loads the file named user_data.json and the contents of this said file. 
var fs = require('fs'); // loads the file system package
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//play with cookies 
app.get('/set_cookie', function(req,res,next){
//console.log(req.cookies);
let my_name = 'Nicholas Samson';
//res.cookie('my_name',my_name, {expire: -5000});
res.clearCookie('my_name');
res.send(`Cookie for ${my_name} sent`)
next();
});

//Use with cookies 
app.get('/use_cookie', function(req,res,next){
    //console.log(req.cookies);
    if(typeof req.cookies["my_name"] != 'undefined'){
        res.send(`Hello ${req.cookies["my_name"]}!`)
    } else{
        res.send("I dont't know you!");
    }
    next();
    });

//from Lab 14,Screencast 4/13/2021.
if (fs.existsSync(filename)) {//checks that there is a given path to that exists in our file system, if there is one execute below
    var data = fs.statSync(filename)// asynchronously returns information from the file we are requesting
    data = fs.readFileSync(filename, 'utf-8');//reads and returns the file and conent
    var user_data = JSON.parse(data);//finally parses the data into our system
} else { 
    console.log(`${user_data} dose not exist!`)//do this if the there is no file we are refering to
    exit();//finally exits the application
}

function isNonNegInt(q, return_errors = false) {
   errors = []; // assume no errors at first
   if(q == '') q =0; // handle blank inputs as if they are 0
   if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
   else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
   else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
   return return_errors ? errors : (errors.length == 0);
}

//we must change everything that had params get and params has because we do not have anything to get and has from because the server is processing this information therefor we have to request the body of the homepage that we assigned to params and formulate our invoice from there.
app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) { // this is the function that if we recieve a request from the home page we will run this as a response
 params= request.body; //on this line we are setting the body of our form that we previously set in our home page to the params.
   // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (typeof params['purchase_submit'] != 'undefined') { // if the params which is the body of our home page, if there is soemthing that is not undefined then run the code below, purchase submit was set from the button on our homepage. 
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // need to check if something was selected so we will look if the total > 0
      for (i = 0; i < products.length; i++) {
          if (typeof params[`quantity${i}`] != 'undefined') { // if the quantites that we have put in are not not undefined then run the code below.
              a_qty = params[`quantity${i}`]; // sets the values of quantity to a_qty
              total_qty += a_qty; 
              if(!isNonNegInt(a_qty)) {
                  has_errors = true; // oops, invalid quantity
              }
          }
      }
      if(typeof params["purchase_submit"]){
      // Now respond to errors or redirect to invoice if all is ok
      if(has_errors) {
         response.redirect(`./index.html?${qs.stringify(params)}`); // instead of displauing the error this will now send you back to the index page
      } else if(total_qty == 0) { // no quantity selections, just give a general alert
         response.redirect(`./index.html?${qs.stringify(params)}`);// instead of displauing the error this will now send you back to the index page
      } else { // all good to go!
          response.redirect(`./login.html?${qs.stringify(params)}`); // finally if everything works properly it will redirect to the order_display page
      }
    }
  }
});

//From Lab 14 and 4/15/2021 Screencast
//Process Login
app.post("/process_login", function (request, response) {
    console.log(request);
    var loginError = [];//sets up a array to hold errors so we can refer back to them
    var ClientUsername = request.body.username.toLowerCase(); //searches the username against all the usernames we have in lowercase
    if (typeof user_data[ClientUsername] != 'undefined') {//checks to see if the username is matching in our database, if he is not undefined he is in our database then it returns the object and then tries to match the password next
        if (user_data[ClientUsername].password == request.body.password) {//next checks the samething as before but then checks if the password is now matching in our database
            request.query.username = ClientUsername;
            request.query.name = user_data[request.query.username].name
            response.redirect('./order_display.html?' + queryString.stringify(request.query));//sending them to the invoice page because they logged in sucessfully, we have to send them with the querystring or else the quantitys that we put in the order_page would not load otherwise 
            return;
        } else {//if user or password were incorrect calls to login error and displays error message in console 
            request.query.username= ClientUsername;//sets the username to what the user inpuy
            request.query.name= user_data[ClientUsername].name;//makes sure the unernameinput is the same 
            request.query.loginError=loginError.join(';');
        }
    } else {
        loginError.push = ('Invalid Username'); //if the username is not valid/does not exist in our database than the login moves here and pushes the error that there is not a valid username because they are not in our database
        request.query.loginError=loginError.join(';');
    }
    response.redirect('./login.html?' + queryString.stringify(request.query));//redirects you back to the login page if you have an error
});





//Process Registration
app.post("/process_register", function (request, response) {
    let POST = request.body;//requests the body of the registration page
    var errors = [];//sets up the array to store errors like before
    if (/^[A-Za-z]+$/.test(POST['name'])) {// tests the name against the alphabet of A-Z and a-z and if there are only letters and no numbers than the name is valid
    }else{
        errors.push('Please only use Letters!');
    }
    if ((/.{3,10}/ .test(POST['username'])) && (/^[a-zA-Z0-9]*$/.test(POST['username']))) {//runs a check to see if the username is between 4-10 characters and valid characters.
    }else{
        errors.push('Minimum 4, Max 10');
    }
    var reguser = POST['username'].toLowerCase(); //checks the username accross all the usernames in the server
    if (typeof user_data[reguser] != 'undefined') { 
        errors.push('Username taken');
    }  
    if (POST['password'].length < 6) {//if the password is less that 6 reqire the password to be at least 6
        errors.push('Min 6');
    }
    if (POST['password'] == POST['repeat_password']) { // checks the password agaisnt itself to make sure that it is matching 
    }else{
        errors.push('Please Fix: Passwords do not match');
    }


    //From Lab 14, Screencast 4/15/2021
    //finally register if you have no errors
    if (errors.length == 0) {
        var username = POST["username"];//sets the username so we can refer back to the user during the validation step
        user_data[username] = {};//sets up the object for the user to input their credentials
        user_data[username].name = username;//Post username = usernamedata_username
        user_data[username].password = POST['password'];//Post password = userdata_password
        user_data[username].email = POST['email'];//same as above
        data = JSON.stringify(user_data);// converts the data back to json beccause we need to save it to the json user data file.
        fs.writeFileSync(filename, data, "utf-8");// finally writes the data back
        response.redirect('./order_display.html?' + queryString.stringify(request.query));//redirects back to the order_display page with the querystring just like the login post but rather the register.
    }

    else {
        if (errors.length > 0) {//checks if there are any errors from above
            request.query.errors = errors.join(';'); // if there are errors load them
            response.redirect('./register.html?' + qs.stringify(request.query));//redisplay errors and redirect back to the registration page
        }
        
    }
});
app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));// sets express to listen on port 8080