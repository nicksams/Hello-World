//Allows us to load in the cart page , reference from professor
app.get("/cart.html", function (request, response) {
    var cartfile = `<script> var cart = ${JSON.stringify(request.session)}</script>`;
    cartfile += fs.readFileSync('./public/cart.html', 'utf-8'); // add it onto the cart page which is in public
    response.send(cartfile);
  
  });

  //copied from Port Display_and_mail_invoice_example from the ITM352 Fall 2020 cyber duck server. Copied lines 229-274.
app.get("/checkout", function (request, response) {
    var user_email = request.query.email; // email address in querystring
  // Generate HTML invoice string
    var invoice_str = `<h1 style= "color:pink;text-align:center;">Thank you for your order ${user_email}!</h1><table style= "color:pink; align: center;margin: auto;"><th>Quantity</th><th>Item</th>`;
    var cart = request.session[request.params.ptype];
    for(product_type in products) {
      for(var i=0; i<products[product_type].length; i++) {
        var str = '{}'; 
        if( typeof cart != 'undefined') {
          str = JSON.stringify(cart);
        }
      }
  }