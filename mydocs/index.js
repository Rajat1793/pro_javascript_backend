const express = require("express")

const app = express()

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const fileUpload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())

let courses = [
    {
        id: "1",
        name: "React",
        price: 199
    },
    {
        id: "2",
        name: "Go",
        price: 299
    },
    {
        id: "3",
        name: "Rust",
        price: 399
    }
]
app.get("/", (req, res) =>{
    res.send("<h1>Hello from Server!!!</h1>")
})

app.get("/api/v1/home", (req, res) =>{
    res.send("<h1>Hello from Home Page!!!</h1>")
})

app.get("/api/v1/object", (req, res) =>{
    res.send({id: "4", name: "Python", price: 0 })
})

app.get("/api/v1/courses", (req, res) =>{
    res.send(courses)
})

app.get("/api/v1/mycourses/:courseId", (req, res) =>{
    // res.send(req.params.courseId)
    const myCourse = courses.find((course) => course.id === req.params.courseId)
    res.send(myCourse)
})

app.post("/api/v1/addCourse", (req, res) =>{
    console.log(req.body);
    courses.push(req.body);
    res.send(true)
})

app.get("/api/v1/coursequery", (req, res) =>{
    let location = req.query.location
    let device = req.query.device
    res.send(location, device)
})

app.post("/api/v1/courseupload", (req, res) =>{
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"
    file.mv(path, (err) =>{
        res.send(true)
    })
})

app.listen(4000, ()=> console.log("Server is running on 4000"))