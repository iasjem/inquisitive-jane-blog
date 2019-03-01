const express = require('express'),
    path = require('path'),
    hbs = require('hbs'),
    moment = require('moment');

const app = express(),
    PORT = process.env.PORT || 3000;

app.set('view engine', hbs);
app.set('views', path.join(`${ __dirname }/server/views`));

app.use(express.static(path.join(`${ __dirname }/public`)));
app.use(express.static(path.join(`${ __dirname }/public/vendors`)))
app.use(require('./server/routes'));

hbs.registerPartials(path.join(`${ __dirname }/server/views/partials`));
hbs.registerHelper('copyrightYear', () => new moment().format('YYYY'));

app.listen(PORT, () => console.log('Server is up!'));