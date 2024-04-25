const { Book, Loan, Author} = require('../models')

class BookController{
    static index(req, res, next){
        Book.findAll()
        .then(books => {
            res.render('home', {books})
            res.status(200).json(books)
        })
        .catch(next)
    }

    static showEdit(req, res, next){
        const bookId = req.params.id
        if(!bookId) {
            return res.redirect('/')
        }

        Book.findByPk(req.params.id)
        .then(book => {
            res.render('editBook', {book})
        })
        .catch(next)
    }

    static create(req, res, next){
        let authorName
        const authorId = req.decoded.id
        const {title,releaseDate,genre,stock} = req.body
        Author.findByPk(authorId)
        .then(author => {
            authorName = author.name

            return Book.create({
                title,
                author: authorName,
                releaseDate,
                genre,
                stock: Number(stock),
                authorId: authorId
            })
        })
        .then(book => {
            res.status(201).json(book)
        })
        .catch(next)
    }

    static loan(req, res, next){
        Book.findByPk(req.params.id)
        .then(book => {
            if (book.stock < 1){
                throw new Error('Book is out of stock')
            }
            book.stock -= 1
            return book.save()
        })
        .then(book => {
            res.status(200).json({message: 'Book loaned successfully'})
            return Loan.create({
                bookId: req.params.id,
                memberId: req.decoded.id,
                loanedAt: new Date()
            })
        })
        .catch(next)
    }

    static update(req, res, next){
        const authorId = req.decoded.id
        const bookId = req.params.id

        Book.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Book.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

}

module.exports = BookController