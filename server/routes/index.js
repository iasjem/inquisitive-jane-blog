const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => res.render('index.hbs'));
router.get('/about', (req, res) => res.render('about.hbs'));
router.get('/posts/:id', (req, res) => res.render('post.hbs'));
router.get('*', (req, res) => res.status(400).render('404.hbs'));

module.exports = router;