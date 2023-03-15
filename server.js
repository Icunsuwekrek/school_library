/** load library express */
const express = require(`express`)
/** create object that instances of express */
const app = express()
/** define port of server */
const PORT = 8000
/** load library cors */
const cors = require(`cors`)
/** open CORS policy */
app.use(cors())
/** define all routes */
const memberRoute = require(`./routes/member.route`)
const adminRoute = require(`./routes/admin.route`)
const bookRoute = require(`./routes/book.route`)
const borrowRoute = require(`./routes/borrow.route`)
const auth = require(`./routes/auth.route`)

/** define prefix for each route */
app.use(`/member`, memberRoute)
app.use(`/admin`,adminRoute)
app.use(`/book`, bookRoute)
app.use(`/borrow`, borrowRoute)
app.use(`/auth`, auth)

/** route to access uploaded file */
app.use(express.static(__dirname))

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of School's Library runs on port
    ${PORT}`)
    })