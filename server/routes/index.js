const express = require('express'),
    router = express.Router(),
    { About } = require('../models/About'),
    { Post } = require('../models/Post');

router.get('/', (req, res) => res.render('index.hbs', { content: Post }));
router.get('/about', (req, res) => res.render('about.hbs', { content: About.mdFile() }));
router.get('/posts/:id', (req, res) => {
    const existingPost = Post.filter((post) => req.params.id === post.filename)[0];
    if (!existingPost) return res.status(400).render('404.hbs');
    res.render('post.hbs', { content: existingPost.mdFile() });
});
router.get('*', (req, res) => res.status(400).render('404.hbs'));

module.exports = router;