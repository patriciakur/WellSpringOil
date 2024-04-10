const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000;

app.use(cors()); //Enables Cross-Origin Resource Sharing, allowing resources to be requested from a different domain
app.use(express.json()); // to support JSON-
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-

//configures Express middleware to serve static files (such as HTML, CSS, images, etc.) from a directory named public

app.use(express.static(__dirname + '/public')); 

// Start at indexed.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

// CLient Registration backend
const registerRouter = require( './routes/register' )
app.use("/register", registerRouter);

// Login backend
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// const fuelForm = require('./routes/fuelForm');
// app.use('/api', fuelForm);

const fuelForm = require('./routes/fuelForm');
app.use('/submitQuote', fuelForm); //corrected to right path

// Form History backend
const formHist= require('./routes/formHistoryPull')
app.use('/formHistory', formHist);

const resetPw = require('./routes/resetPassword')
app.use('/resetPwd', resetPw)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))


