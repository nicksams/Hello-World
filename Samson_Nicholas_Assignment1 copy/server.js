var express = require('express'); // requires this as we are allowing express to run the server
var app = express();
var myParser = require("body-parser");
var data = require("./product_data.js");//imports the data from our data to the data variable
const qs = require('qs'); // requires this because we are converting our products quantity object into a string aaray
var products = data.products; //assigns the product data to check if values are undefined we assigned this also in our js.
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
      // Now respond to errors or redirect to invoice if all is ok
      if(has_errors) {
         response.redirect(`./index.html?${qs.stringify(params)}`); // instead of displauing the error this will now send you back to the index page
      } else if(total_qty == 0) { // no quantity selections, just give a general alert
         response.redirect(`./index.html?${qs.stringify(params)}`);// instead of displauing the error this will now send you back to the index page
      } else { // all good to go!
          response.redirect(`./order_display.html?${qs.stringify(params)}`); // finally if everything works properly it will redirect to the order_display page
      }
  }
});

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));// sets express to listen on port 8080