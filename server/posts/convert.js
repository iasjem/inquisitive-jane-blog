const fs = require('fs'),
    pretty = require('pretty'),
    showdown  = require('showdown');

const converter = new showdown.Converter();

showdown.setFlavor('github');

converter.setOption('noHeaderId', 'true');
converter.setOption('ghCodeBlocks', 'true');
converter.setOption('tables', 'true');
converter.setOption('tasklists', 'true');
converter.setOption('simpleLineBreaks', 'true');
converter.setOption('requireSpaceBeforeHeadingText', 'true');
converter.setOption('underline', 'true');
converter.setOption('emoji', 'true');   

converter.getOptions();  

const html = (post) => {
  try {
    const md = fs.readFileSync(`${ post }.md`, 'utf-8');
    return pretty(converter.makeHtml(md));    
  } catch(e) {
    return 'Post does not exist!';
  }
};

exports.module = { html }