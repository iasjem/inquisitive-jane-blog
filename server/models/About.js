const { convertMD }  = require('../scripts/convertMD'),
    path = require('path');

const About = {
    filename: 'author-intro',
    title: 'About Inquisitive Jane',
    overview: 'About the author',
    author: 'iasjem',
    createdDate: new Date('2019-03-03'),
    mdFile() { 
        return convertMD(path.join(`${ __dirname }/../posts/${ this.filename }`));
    }
};

module.exports = { About };