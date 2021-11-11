/*  */

const app = require('./app');

/* === SERVER IS LISTENNING  === */

app.listen(app.get('port'), () => { 
    console.log('Server on port', app.get('port'));
});
