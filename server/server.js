let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let routes = require('./routes/index');
let bookings = require('./routes/bookings');

let app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

//Templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
app.use('/', routes);
app.use('/api', bookings);