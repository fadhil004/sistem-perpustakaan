const express = require('express');
const router = express.Router()
const BookController = require('../controllers/book')
const UserController = require('../controllers/user');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');



router.post('/register', UserController.createMember)
router.post('/register/author', UserController.createAuthor)
router.post('/login', UserController.login)

router.get('/login', (req,res) => {
    res.render('login')
})
router.get('/register', (req,res) => {
    res.render('register')
})
router.get('/register/author', (req,res) => {
    res.render('register-author')
})


router.get('/', BookController.index)
router.get('/books/add', (req,res) => {
    res.render('createBook')
})
router.post('/books/loan/:id', BookController.loan)
router.get('/books/edit/:id', BookController.showEdit)
router.post('/books/add', BookController.create)
router.post('/books/edit/:id', BookController.update)
router.get('/books/delete/:id', BookController.delete)

module.exports = router