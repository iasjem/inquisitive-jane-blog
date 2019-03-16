const { convertMD }  = require('../scripts/convertMD'),
    path = require('path');

const About = {
    filename: 'author-intro',
    mdFile() { 
        return convertMD(path.join(`${ __dirname }/../posts/${ this.filename }`));
    }
};

module.exports = { About };