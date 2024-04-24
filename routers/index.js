const express = require('express');
const router = express.Router()
const BookController = require('../controllers/book')
const UserController = require('../controllers/user')

router.post('/register', UserController.createMember)
router.post('/register/author', UserController.createAuthor)
router.post('/login', UserController.login)

router.get('/books', BookController.showAll)
router.get('/books/add', BookController.showAdd)
router.get('/books/edit', BookController.showEdit)

router.post('/books/add', BookController.create)
router.post('/books/loan/:id', BookController.loan)
router.patch('/books/edit/:id', BookController.update)
router.delete('/books/delete/:id', BookController.delete)

module.exports = router