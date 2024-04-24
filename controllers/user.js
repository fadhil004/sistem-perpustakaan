const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

const { Member, Author } = require('../models')

class UserController{
    static createMember(req, res, next) {
        const { name, email, password} = req.body
        Member.create({
            name,
            email,
            password
        })
        .then(Member => {
            res.status(201).json({user: Member})
        })
        .catch(next)
    }

    static createAuthor(req, res, next) {
        const { name, email, password} = req.body
        Author.create({
            name,
            email,
            password
        })
        .then(Author => {
            res.status(201).json({user: Author})
        })
        .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        
        const memberPromise = Member.findOne({
            where: {
                email,
            }
        })
        .then(member => {
            if (comparePassword(password, member.password)){
                let payload = {
                    id: member.id,
                    email: member.email
                }
                let token = generateToken(payload)
                return { id: member.id, email: member.email, token };
            }
            return null 
        }) 
        
        const authorPromise = Author.findOne({
            where: {
                email,
            }
        })
        .then(author => {
            if (comparePassword(password, author.password)){
                let payload = {
                    id: author.id,
                    email: author.email
                }
                let token = generateToken(payload)
                return { id: author.id, email: author.email, token };
            }
            return null 
        })
        
        Promise.all([memberPromise, authorPromise])
          .then(([memberResult, authorResult]) => {
            if (memberResult) {
              res.status(200).json(memberResult);
            } else if (authorResult) {
              res.status(200).json(authorResult);
            } else {
              res.status(401).json({ message: 'Invalid email/password' });
            }
          })
          .catch(next);
    }
}

module.exports = UserController