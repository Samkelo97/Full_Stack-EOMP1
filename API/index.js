const {express, routes} = require('./controller')
const path = require('path')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ErrorHandling = require('./middleware/ErrorHandling')
const port =+process.env.PORT || 3000
//static
// app.use(express.static('./static'))
// Middleware - APplication level
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.header("Access-Control-Expose-Headers", "http://localhost:8080");
    next();
  });
  app.use(
    express.static('./static'),
    express.urlencoded({
        extended: false
    }),
    cookieParser(),
    cors(),
    routes
)
  // Handling all errors
  app.use(ErrorHandling);
  // Server
routes.get('^/$|/Full_Stack-EOMP1',(req, res)=>{
    res.sendFile(path.resolve(__dirname,
        "./static/HTML/index.html"))
})
//Handling all errors using middleware
app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
})