const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fac-recruitment-portal-main',
    port: 3307
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`firstName`, `lastName`, `email`, `password`, `category`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password,
        req.body.category
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
})

app.post('/faculty_panel', (req, res) => {
    const sql = "INSERT INTO personaldetails (`firstName`, `middleName`, `lastName`, `nationality`, `DOB`, `gender`, `martialStatus`, `ID_Proof`, `fathersName`, `correspondanceAddress`, `permanentAddress`, `email`, `altEmail`, `Mobile`, `altMobile`, `landlineNo`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.nationality,
        req.body.DOB,
        req.body.gender,
        req.body.martialStatus,
        req.body.ID_Proof,
        req.body.fathersName,
        req.body.correspondanceAddress,
        req.body.permanentAddress,
        req.body.email,
        req.body.altEmail,
        req.body.Mobile,
        req.body.altMobile,
        req.body.landlineNo
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    });
})

app.post('/', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?" ;
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        } else {
            return res.json("Failure");
        }
    });
})

app.listen(8081, ()=>{
    console.log('listening on 8081...');
})