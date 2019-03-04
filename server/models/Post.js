const { convertMD }  = require('../scripts/convertMD'),
    path = require('path');

const Post = [
    {
        filename: 'gulpjs-intro',
        title: 'An Awesome Treat from Gulp JS',
        overview: 'A quick introduction to Gulp JS',
        author: 'iasjem',
        image: '/img/gulp-logo.jpg',
        imageAlt: 'Gulp JS Logo',
        createdDate: new Date('2019-02-28'),
        mdFile() { 
            return convertMD(path.join(`${ __dirname }/../posts/${ this.filename }`));
        }
    }, {
        filename: 'showdownjs-intro',
        title: 'From MD to HTML using Showdown JS',
        overview: 'A quick introduction to Showdown JS',
        author: 'iasjem',
        image: '/img/showdown-logo.png',
        imageAlt: 'Showdown JS Logo',
        createdDate: new Date('2019-03-02'),
        mdFile() { 
            return convertMD(path.join(`${ __dirname }/../posts/${ this.filename }`));
        }
    }
];

module.exports = { Post };