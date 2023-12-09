let express = require("express")
let mongoose = require('mongoose')
let cors = require('cors')
let path = require('path')


//const { MONGO_URI } = require("./keys");


//const api = require('./backend/routes')

mongoose.connect("mongodb+srv://sreehari:htJdrHzjzwGrAAjT@cluster0.0ihbv.mongodb.net/TA?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
});
//mong username
//sreehari
//passowrd
//FzQmPIo3tMlNtNOS
//mongodb+srv://sreehari:bdcgBHyjdPVuz58S@cluster0.0ihbv.mongodb.net/LMS?retryWrites=true&w=majority

const app = express();
app.use(express.json())
app.use(cors());


app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/api/users', require("./routes/student_route"))
app.use('/api/courses', require("./routes/course_route")) 
app.use('/api/applications', require("./routes/application_route"))
app.use('/api/messages', require("./routes/message_route"))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))  

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))

    })
}


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});