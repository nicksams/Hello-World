var Ficus =[ 
    {
        "brand" : "Ficus Tienke",
        "price" : 75,
        "image" : "images/ficustienke.jpg",
        "desc"  : "Native to Southeastern Asia, Ficus Tineke can grow up to 100’ tall in its natural habitat but indoors stays at a more manageable 1-8’.",
    },
    {
        "brand" : "Ficus Bonsai",
        "price" : 50.50,
        "image" : "images/ficusbonsai.jpg",
        "desc"  : "Native to Southeastern Asia, Ficus Tineke can grow up to 100’ tall in its natural habitat but indoors stays at a more manageable 1-8’.",
    }, 
    {
        "brand" : "Ficus Emerald",
        "price" : 20.75,
        "image" : "images/ficusemerald.jpg",
        "desc"  : "Native to Southeastern Asia, Ficus Tineke can grow up to 100’ tall in its natural habitat but indoors stays at a more manageable 1-8’.",
    },
    {
        "brand" : "Ficus Ruby",
        "price" : 30,
        "image" : "images/ficusruby.jpg",
        "desc"  : "Native to Southeastern Asia, Ficus Tineke can grow up to 100’ tall in its natural habitat but indoors stays at a more manageable 1-8’.",
    }
    ]
var Monstera =[
    {
        "brand" : "Monstera Deliciosa",
        "price" : 40.50,
        "image" : "images/monsteradeliciosa.jpg",
        "desc"  : "A tropical favorite for most indoor garden enthusiasts, the monstera is best known for its split leaves that become increasingly more unique with age.",
    },
    {
        "brand" : "Monstera Cheese",
        "price" : 75.50,
        "image" : "images/monsteracheese.jpg",
        "desc"  : "A tropical favorite for most indoor garden enthusiasts, the monstera is best known for its split leaves that become increasingly more unique with age.",
    },
    {
        "brand" : "Monstera Large",
        "price" : 30.50,
        "image" : "images/monsteralarge.jpg",
        "desc"  : "A tropical favorite for most indoor garden enthusiasts, the monstera is best known for its split leaves that become increasingly more unique with age.",
    },
    {
        "brand" : "Monstera Minimia",
        "price" : 25.50,
        "image" : "images/monsteramini.jpg",
        "desc"  : "A tropical favorite for most indoor garden enthusiasts, the monstera is best known for its split leaves that become increasingly more unique with age.",
    }
]
var Terrain =[
    {
        "brand" : "Terrain Prayer",
        "price" : 70.25,
        "image" : "images/terrainprayer.jpg",
        "desc"  : "Watch for tiny light purple flowers on thin stalks in the summer time. Arrives without a pot so you can place it in your favorite from home.",
    },
    {
        "brand" : "Terrain Lemon",
        "price" : 10.25,
        "image" : "images/terrainlemon.jpg",
        "desc"  : "Watch for tiny light purple flowers on thin stalks in the summer time. Arrives without a pot so you can place it in your favorite from home.",
    },
    {
        "brand" : "Terrain Silver",
        "price" : 35.25,
        "image" : "images/terrainsilver.jpg",
        "desc"  : "Watch for tiny light purple flowers on thin stalks in the summer time. Arrives without a pot so you can place it in your favorite from home.",
    },
    {
        "brand" : "Terrain Stripe",
        "price" : 76.25,
        "image" : "images/terrainstripe.jpg",
        "desc"  : "Watch for tiny light purple flowers on thin stalks in the summer time. Arrives without a pot so you can place it in your favorite from home.",
    }
]
    
var Pothos=[
    {
        "brand" : "Pothos Brasil",
        "price" : 70.75,
        "image" : "images/pothosbrasil.jpg",
        "desc"  : "This cascading beauty prefers to sit on a ledge or hang from the ceiling so its long, leafy tendrils can be fully appreciated,very low maintenance",
    },
    {
        "brand" : "Pothos Marble",
        "price" : 25.75,
        "image" : "images/pothosmarble.jpg",
        "desc"  : "This cascading beauty prefers to sit on a ledge or hang from the ceiling so its long, leafy tendrils can be fully appreciated,very low maintenance",
    },
    {
        "brand" : "Pothos Large",
        "price" : 35.75,
        "image" : "images/pothoslarge.jpg",
        "desc"  : "This cascading beauty prefers to sit on a ledge or hang from the ceiling so its long, leafy tendrils can be fully appreciated,very low maintenance",
    },
    {
        "brand" : "Pothos Small",
        "price" : 100,
        "image" : "images/pothossmall.jpg",
        "desc"  : "This cascading beauty prefers to sit on a ledge or hang from the ceiling so its long, leafy tendrils can be fully appreciated,very low maintenance",
        },
]
    var products = {
    "Ficus":Ficus,
    "Monstera":Monstera,
    "Terrain":Terrain,
    "Pothos":Pothos
    };
    if(typeof module != 'undefined') {
        module.exports.products = products;
      }