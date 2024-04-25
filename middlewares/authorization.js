const Book = require('../models').Book

const authorization = (req, res ,next) => {
    try {
        const authorId = req.decoded.id
        const bookId = req.params.id

        Book.findByPk(bookId)
        .then(book => {
            if (book.userId === authorId){
                next()
            } else {
                next({status: 403,message: 'Access forbidden'})
            }
        })
    } catch (error) {
        next({status: 403, message: 'Access forbidden'})
    }
}

module.exports = { authorization }