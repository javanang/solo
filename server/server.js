const express = require('express');
const app = express();
const port = 3000;
const dashboardRouter = require('./routes/dashboard.js');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js');
const productsRouter = require('./routes/products.js')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('home page')
});

app.use('/products', productsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);



//error handling and 404
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    console.log('ERROR: ', err);
    const errorStatus = err.status || 500;
    return res.status(errorStatus).send(res.locals.message);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

//may need to module.export for bundling