/* === REQUIRES === */

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodor = require('method-override');
const session = require('express-session');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
require('./database');
/* === SETTINGS === */

// inicialización del servidor local
app.set('port', process.env.PORT_API || 4000);
// settear la vista 'views', donde join unir directorios, y __dirname se executará desde src
app.set('views', path.join(__dirname, 'views'));
//configuración de vistas a partir de la variable 'views' donde existirá layouts y partials
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
//una vez configurado, se deja establecida el uso de la extención
app.set('view engine', '.hbs');

/* === MIDDLEWARES === */
app.use(cors());
// cuando un formulario quiera enviar datos, express los pueda entender, aunque no se aceptarán imagenes.
app.use(express.urlencoded({extended: false}));
// para trabajar con archivos json
app.use(express.json());
// acepta metodos REST de tipo PUT y DELETE
app.use(methodor('_method'));
// se coloca una clave de sesión, y además permite autenticar al usuario y almacenar sus datos temporalmente.
app.use(session({
    secret: 'refookssession',
    resave: true,
    saveUninitialized: true
})); 

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

//     next();
// });

/* === GLOBAL VARIABLES === */

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'public/uploads'),
//     filename: (req, file, callback) => {
//         callback(null, new Date().getTime() + path.extname(file.originalname));
//     }
// });

app.use(morgan('dev'));

// app.use(multer({storage}).single('image'));

/* === ROUTES === */

app.use(require('./routes/index'));

app.use('/user',require('./routes/user.route'));

app.use('/food',require('./routes/food.route'));

app.use('/post',require('./routes/post.route'));

app.use('/reaction',require('./routes/reaction.route'));

app.use('/comment',require('./routes/comment.route'));

app.use('/socialmedia',require('./routes/social.route'));

app.use('/community',require('./routes/community.route'));

app.use('/gamification',require('./routes/gamification.route'));

/* === CONFIGURATION === */

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/* === EXPORT === */

module.exports = app;