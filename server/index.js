const express = require("express")
const app = express()
const  cors = require("cors")
require("dotenv").config()
require("./db/conn")
const  blogRouter=require("./routes/blogRoute")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs/",blogRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
