const express = require('express');
const router = express.Router()
const BookController = require('../controllers/book')


router.get('/books', BookController.showAll)
router.get('/books/add', BookController.showAdd)
router.get('/books/edit', BookController.showEdit)

router.post('/books/loan/:id', BookController.loan)
router.post('/books/add', BookController.create)
router.patch('/books/edit/:id', BookController.update)
router.delete('/books/delete/:id', BookController.delete)

module.exports = router