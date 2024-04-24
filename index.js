const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = {app}

// const { sequelize } = require("./models")

// async function main(){
//     await sequelize.sync({force: true})
// }

// main().catch(err => console.log(err))

