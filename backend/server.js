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

app.post('/academic', (req, res) => {
    const sql = "INSERT INTO education (`phd_university`, `phd_department`, `phd_supervisor`, `phd_yoj`, `phd_doThesis`, `phd_doAward`, `phd_title`, `pg_degree`, `pg_university`, `pg_branch`, `pg_yoj`, `pg_yoc`, `pg_duration`, `pg_percentage`, `pg_divison`, `ug_degree`, `ug_university`, `ug_branch`, `ug_yoj`, `ug_yoc`, `ug_duration`, `ug_percentage`, `ug_divison`, `hsc_school`, `hsc_yop`, `hsc_percentage`, `hsc_divison`, `ssc_school`, `ssc_yop`, `ssc_percentage`, `ssc_divison`) VALUES (?)";
    const values = [
        req.body.phd_university,
        req.body.phd_department,
        req.body.phd_supervisor,
        req.body.phd_yoj,
        req.body.phd_doThesis,
        req.body.phd_doAward,
        req.body.phd_title,
        req.body.pg_degree,
        req.body.pg_university,
        req.body.pg_branch,
        req.body.pg_yoj,
        req.body.pg_yoc,
        req.body.pg_duration,
        req.body.pg_percentage,
        req.body.pg_divison,
        req.body.ug_degree,
        req.body.ug_university,
        req.body.ug_branch,
        req.body.ug_yoj,
        req.body.ug_yoc,
        req.body.ug_duration,
        req.body.ug_percentage,
        req.body.ug_divison,
        req.body.hsc_school,
        req.body.hsc_yop,
        req.body.hsc_percentage,
        req.body.hsc_divison,
        req.body.ssc_school,
        req.body.ssc_yop,
        req.body.ssc_percentage,
        req.body.ssc_divison
    ]
    const sql1 = "INSERT INTO addeducation (`degree`, `university`, `branch`, `yoj`, `yoc`, `duration`, `percentage`, `divison`) VALUES (?)";
    const values1 = [
        req.body.degree,
        req.body.university,
        req.body.branch,
        req.body.yoj,
        req.body.yoc,
        req.body.duration,
        req.body.percentage,
        req.body.divison
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        db.query(sql1, [values1], (err, data) => {
            if(err){
                return res.json("Error");
            }
            return res.json(data);
        });
    });
})

app.post('/professional', (req, res) => {
    const sql = "INSERT INTO professionalsociety (`name`, `membership`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.membership
    ]
    const sql1 = "INSERT INTO professionaltraining (`pttype`, `ptorganization`, `ptyear`, `ptduration`) VALUES (?)";
    const values1 = [
        req.body.pttype,
        req.body.ptorganization,
        req.body.ptyear,
        req.body.ptduration
    ]
    const sql2 = "INSERT INTO project (`sp_agency`, `sp_title`, `sp_amount`, `sp_period`, `sp_role`, `sp_status`, `cp_agency`, `cp_title`, `cp_amount`, `cp_period`, `cp_role`, `cp_status`) VALUES (?)";
    const values2 = [
        req.body.sp_agency,
        req.body.sp_title,
        req.body.sp_amount,
        req.body.sp_period,
        req.body.sp_role,
        req.body.sp_status,
        req.body.cp_agency,
        req.body.cp_title,
        req.body.cp_amount,
        req.body.cp_period,
        req.body.cp_role,
        req.body.cp_status
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        } else {
            db.query(sql1, [values1], (err, data) => {
                if(err){
                    return res.json("Error");
                } else {
                    db.query(sql2, [values2], (err, data) => {
                        if(err){
                            return res.json("Error");
                        } else {
                            return res.json(data);
                        }
                    })
                }
            })
        }
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