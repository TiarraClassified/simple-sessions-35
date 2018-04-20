const express = require('express')
    , session = require('express-session')

const app = express();

app.use(express.json())
// setting up sessions as middlware
// each user who interacts with our server will get a unique session just for them
// this adds a 'session' property to the req object
// we can access the current user's session on the request object as: req.session 
// this is true for any middleware and any endpoint
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}))

// custom top level middleware
app.use(function(req, res, next) {
    // check to see if cart property exists on session object
    if (req.session.cart) {
        // it cart exists, then move on the the endpoint below
        next()
    } else {
        // cart does not exists yet, so we create it here on the session object
        req.session.cart = [];
        // the move on to the endpoint below
        next()
    }
})

app.post('/api/cart', function(req, res) {
    // add the new item to the cart array that is on req.session object
    req.session.cart.push(req.body.item)
    res.status(200).send(req.session.cart)
})



const PORT = 3001
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))