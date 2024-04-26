const { Book, Author, sequelize} = require('../models')



class BookController{
    static index(req, res, next){
        Book.findAll()
        .then(books => {
            res.render('home', {books})
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
        const {title,releaseDate,genre,stock,author} = req.body
        Book.create({
            title,
            author,
            releaseDate,
            genre,
            stock: Number(stock),
        })
        .then(author => {
            res.redirect('/')
        })
        .catch(next)
    }

    static loan(req, res, next){
        const memberId = 1; // Ganti dengan req.decoded.id jika sudah ada
        const bookId = req.params.id;
    
        // Periksa apakah pengguna sudah pernah meminjam buku ini sebelumnya
        sequelize.models.Loan.findOne({
            where: {
                BookId: bookId,
                MemberId: memberId
            }
        })
        .then(existingLoan => {
            if(existingLoan) {
                return res.status(400).json({ message: 'You have already borrowed this book' });
            } else {
                Book.findByPk(bookId)
                .then(book => {
                    if (book.stock < 1){
                        return res.status(400).json({ message: 'Book is out of stock' });
                    }
                    book.stock -= 1;
                    return book.save();
                })
                .then(book => {
                    sequelize.models.Loan.create({
                        BookId: book.id,
                        MemberId: memberId
                    })
                    .then(loan => {
                        res.status(200).json({ message: 'Book loaned successfully' });
                    })
                    .catch(next);
                })
                .catch(next);
            }
        })
        .catch(next);
    }
    

    static update(req, res, next){
        const updatedProduct = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            releaseDate: new Date(req.body.releaseDate),
            stock: Number(req.body.stock)
        }
        Book.update(updatedProduct, {
            where: {
                id: req.params.id
            },
        })
        .then(books => {
            res.redirect('/')
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
            res.redirect('/')
        })
        .catch(next)
    }

}

module.exports = BookController