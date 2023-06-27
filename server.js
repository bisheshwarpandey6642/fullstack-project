const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

const User = require('./User')
const Data = require('./Data')


// setup session middlewares
app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized : false
}))

// setup/ready the passport js
app.use(passport.initialize())
app.use(passport.session())

/// convert the object to string for logged in user
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//conver the retrived object from database(string) ------ object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (err){
        done(err)
    }
})


//// login part
passport.use(new LocalStrategy(
    async(username, password, done) => {
        try{
            const user = await User.findOne({username});
            if(!user){
                return done(null, false, {message: "User not found"})
            }
            const passwordMatch = await
            bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return done(null, false, {message: "password is wrong"})
            }
            return done(null, user)
        }catch (err){
            return done(err)
        }
    }
))



// Authentication -- middleware

const isAuthenticated = (req, res, next) => {
    if( req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
};


const isAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        return next();
    }
    res.status(403).send('Access denied')
}


app.get('/', (req, res) => {
    res.send('Welcome to Home page')
})


app.get('/register', (req, res) => {
    res.send('Please Register')
})

app.get('/login', (req, res) => {
    res.send('Please Login')
})



//salt -- 10 + password - encrypt
const saltRound = 10

app.post('/register', async (req, res) => {
    const {username, password, role} = req.body

    try{
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = new User({username, password:hashedPassword, role})
        await user.save()
        res.redirect('/login')
    }catch(error){
console.error("Error registering user:", error);
res.status(500).send("error registering user")
    }

})



// login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: "/login"
}))

app.get('/logout', (req, res) => {
    req.logout((err) =>{
        if(err){
            console.log("error logging out")
        }
        res.redirect('/')
    })
})



app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to dashboard')
})


app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.send("Admin Dashboard")
})



app.post('/save', isAuthenticated, async (req, res) => {
    const {username} = req.user
    const { newData } =  req.body

    try{

        const data = new Data({username, newData})
        await data.save()
        res.json({message:"data created fot the user"})



    }catch(err){
        res.json({message:"Data is not saved"})

    }
})




// database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.error('Error --->', err);
});


//create server
app.listen(8080, () => {
    console.group("Server is up and running")
})



