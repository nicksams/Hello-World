var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require("./product_data.js");
const qs = require('qs');
var products = data.products;
function isNonNegInt(q, return_errors = false) {
   errors = []; // assume no errors at first
   if(q == '') q =0; // handle blank inputs as if they are 0
   if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
   else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
   else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
   return return_errors ? errors : (errors.length == 0);
}


app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
 params= request.body;
   // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume quantities are valid from the start
      total_qty = 0; // need to check if something was selected so we will look if the total > 0
      for (i = 0; i < products.length; i++) {
          if (typeof params[`quantity${i}`] != 'undefined') {
              a_qty = params[`quantity${i}`];
              total_qty += a_qty; 
              if(!isNonNegInt(a_qty)) {
                  has_errors = true; // oops, invalid quantity
              }
          }
      }
      // Now respond to errors or redirect to invoice if all is ok
      if(has_errors) {
         response.redirect(`./index.html?${qs.stringify(params)}`);
      } else if(total_qty == 0) { // no quantity selections, just give a general alert
         response.redirect(`./index.html?${qs.stringify(params)}`);
      } else { // all good to go!
          response.redirect(`./order_display.html?${qs.stringify(params)}`);
      }
  }
});

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));