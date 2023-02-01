//inisialisasi library
const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")

// implementation
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//create sql connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pelanggaran_siswa"
})

db.connect(error => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log("mySql Connected");
    }
})

//end point akses data siswa 
app.get("/siswa", (req,res) => {

    let sql = "select * from siswa"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                siswa : result
            }
        }
        res.json(response)
    })
})

//end point akses data siswa berdasarkan id siswa
app.get("/siswa/:id", (req,res) => {
    
    let data = {
        id_siswa : req.params.id
    }

    let sql = "select * from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                siswa : result
            }
        }
        res.json(response)
    })
})

//end point menyimpan data siswa
app.post("/siswa", (req,res) => {

    let data = {
        nis : req.body.nis,
        nama_siswa : req.body.nama_siswa,
        kelas : req.body.kelas,
        poin : req.body.poin
    }

    let sql = "insert into siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point mengubah data siswa 
app.put("/siswa", (req,res) => {

    let data = [
        {
            nis : req.body.nis,
            nama_siswa : req.body.nama_siswa,
            kelas : req.body.kelas,
            poin : req.body.poin
        },

        {
            id_siswa : req.body.id_siswa
        }
    ]

    let sql = "update siswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//end point menghapus data siswa berdasarkan id siswa
app.delete("/siswa/:id", (req,res) => {

    let data = {
        id_siswa : req.params.id
    }

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//end point akses data user
app.get("/user", (req,res) => {

    let sql = "select * from user"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                user : result
            }
        }
        res.json(response)
    })
})

//end point akses data user berdasarkan id tertentu
app.get("/user/:id", (req,res) => {
    
    let data = {
        id_user : req.params.id
    }

    let sql = "select * from user where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                count : result.length,
                user : result
            }
        }
        res.json(response)
    })
})

//end point menyimpan data user
app.post("/user", (req,res) => {

    let data = {
        nama_user : req.body.nama_user,
        username : req.body.username,
        password : req.body.password
    }

    let sql = "insert into user set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point mengubah data user 
app.put("/user", (req,res) => {

    let data = [
        {
            nama_user : req.body.nama_user,
            username : req.body.username,
            password : req.body.password
        },

        {
            id_user : req.body.id_user
        }
    ]

    let sql = "update user set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//end point menghapus data user berdasarkan id user
app.delete("/user/:id", (req,res) => {

    let data = {
        id_user : req.params.id
    }

    let sql = "delete from user where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//end point menampilkan pelanggaran
app.get("/pelanggaran", (req,res) => {

    let sql = "select * from pelanggaran"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error, message
            }
        }
        else {
            response = {
                count : result.length,
                pelanggaran : result
            }
        }
        res.json(response)
    })
})

//end point menambahkan pelanggaran
app.post("/pelanggaran", (req,res) => {

    let data = {
        nama_pelanggaran : req.body.nama_pelanggaran,
        poin : req.body.poin
    }

    let sql = "insert into pelanggaran set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }
        else {
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//end point menambahkan data pelanggaran siswa 
app.post("/pelanggaran_siswa", (req,res) => {
    
    let data = {
        id_siswa : req.body.id_siswa,
        id_user : req.body.id_user,
        waktu : moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let pelanggaran = JSON.parse(req.body.pelanggaran)

    let sql = "insert into pelanggaran_siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            res.json({message : error.message})
        }
        else {
            let lastID = result.insertId
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }

            let sql = "insert into detail_pelanggaran_siswa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message : error.message})
                }
                else {
                    res.json({message : "Data has been inserted"})
                }
            })

        }
    })

})

// end-point menampilkan data pelanggaran siswa
app.get("/pelanggaran_siswa", (req,res) => {

    let sql = "select p.id_pelanggaran_siswa, p.id_siswa,p.waktu, s.nis, s.nama_siswa, p.id_user, u.nama_user " +
     "from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa " +
     "join user u on p.id_user = u.id_user"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

// end-point untuk menampilkan detail pelanggaran
app.get("/pelanggaran_siswa/:id_pelanggaran_siswa", (req,res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    let sql = "select p.nama_pelanggaran, p.poin " + 
    "from detail_pelanggaran_siswa dps join pelanggaran p "+
    "on p.id_pelanggaran = dps.id_pelanggaran " +
    "where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                detail_pelanggaran_siswa: result
            })
        }
    })
})

// end-point untuk menghapus data pelanggaran_siswa
app.delete("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    let sql = "delete from detail_pelanggaran_siswa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } else {
            let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}
            
            let sql = "delete from pelanggaran_siswa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message})
                } else {
                    res.json({message: "Data has been deleted"})
                }
            })
        }
    })

})

app.listen(2000, ()=>{
    console.log("Run on port 2000");
})
