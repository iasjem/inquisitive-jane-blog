# From MD to HTML using Showdown JS

![Showdown JS logo](/img/showdown-logo.png)

[Showdown JS](http://showdownjs.com/) is a free Markdown to HTML converter library based on the original works of [John Gruber](https://en.wikipedia.org/wiki/John_Gruber), the creator of [Markdown](https://daringfireball.net/projects/markdown/). There are a lot of libraries that does the same job but Showdown does it the simplest! To show what I mean, we are going to start with a [Glitch starter project](https://glitch.com/edit/#!/awesome-showdown-starter?path=package.json:10:26). We are going to convert a Markdown file into an HTML.


## Tools to use

We are going to install showdown with `npm install` and have the following dependencies in our `package.json` file:

```json
"dependencies": {
    "express": "^4.16.4",
    "pretty": "^2.0.0",
    "showdown": "^1.9.0"
  }
```

Perfect! Let's start coding right away. After creating an MD file named `intro.md` with some  `# Hello World! 😄` inside of it, let's create an `app.js` in which we can run NodeJS with.


## Quick Tutorial

```javascript
const app = require('express')(), 
    fs = require('fs'),
    prettify = require('pretty'),
    showdown  = require('showdown');
```

Before we get to the good stuff, we need to identify what each dependency does to our app:

- `express` - This one starts our app and renders the HTML file we are going to create after converting `intro.md` to `index.html`
- `fs` - We need this to get the content of the `intro.md` into our code so, that we can use for conversion later
- `pretty` - As per [documentation](https://www.npmjs.com/package/pretty), the purpose is to beautify or in our case, prettify the converted HTML into a more readable one
- `showdown` - This is the toolkit we need to achieve our goal mentioned above

Let's dive in! Open the `app.js` file to start with coding. We start with assigning a new `Converter()` function:

```javascript
const converter = new showdown.Converter();
```

The function we created is used to set and get options in order for us to meet our goal and also, customize the default behavior set in Showdown. Let's set some options for our heading inside of `intro.md`.There are opther options listen in [Showdown's Github Repository](https://github.com/showdownjs/showdown):

```javascript
converter.setOption('noHeaderId', 'true');
converter.setOption('requireSpaceBeforeHeadingText', 'true');
converter.setOption('completeHTMLDocument', 'true');

converter.getOptions();  
```
We can also set a preset or flavor to set the options correctly. In this project, we are just going to set it to GFM (Github Flavored Markdown):

```javascript
showdown.setFlavor('github');
```
Let's do the magic! 

```javascript
const html = (mdFile) => {
  try { 
    // Try reading the mdFile
    const md = fs.readFileSync(mdFile, 'utf-8');
    // Return me as a beautiful HTML
    return prettify(converter.makeHtml(md));    
  } catch(e) {
    // If everything fails, I don't exist.
    return 'Page does not exist!';
  }
};

app.get('/', function(request, response) {
  // Create or overwrite me as index.html 
  fs.writeFileSync('./index.html', html('intro.md'));
  // Send me to the server please
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
```

It should work now. If you encountered any error, you can always check out our [finished project](https://glitch.com/edit/#!/awesome-showdown-done?path=app.js:22:3) and refer to it for code comparison.


## Issue with Glitch Editor

Unfortunately because of some connection issues with Glitch (could be a bug), a simple `refresh` command in our terminal will not fix this issue right away. 

Just reload page for the Glitch editor. You should be able to see `index.html` being generated automatically for you.


## Conclusion

Markdown is such a great tool especially for blogging project documentations. I used Showdown JS for creating this blog and as a developer and writer, it absolutely does the job for me since I don't have to force myself into writing with:

- HTML tags (I can't imagine myself creating every blog post with HTML directly) 
- JSON objects (It's a lot easier than HTML but I'd rather create a workaround that will automate things for me. Parsing to JSON from a file might work but it's much easier if it's in a different format like Markdown).

There are a lot of tools and [guides](https://www.markdownguide.org/getting-started) for Markdown. Github also provides tools to create static web page using Markdown through [Jekyll](https://github.com/jekyll/jekyll). 

Everyday in our community of developers, we learn something new. It's all up to us now.

As always, Happy Coding! 😄👍