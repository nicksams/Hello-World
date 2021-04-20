var express = require('express');
var app = express();
var myParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + 'to path ' +request.path + 'with query' +JSON.stringify(request.query));
    next();
});

app.get('/test.html', function (request, response, next) {
    response.send('I got a request for /test');
});


app.post('/display_purchase', function (request, response, next) {
    user_data = {'username':'itm352','password':'grader'};
    post_data = request.body;
    if(post_data['quantity_textbox']){
       the_qty = post_data['quantity_textbox']
        if(isNonNegInt){
            response.redirect('./login.html?' + queryString.stringify(request.query));
            return;
        } else {
            if(user.data['username'] == post_data['username']){
            response.send('Hey! ${the_qty} is not a valid quantity!');
        }
    }
}else{
    response.redirect('./login.html?' + queryString.stringify(request.query));
}
});

app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here

function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q == '') q =0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}