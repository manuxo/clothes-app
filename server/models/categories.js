//Dependencies
const mysql = require('mysql');


//Settings
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'db_clothes'
});

//Exports Repository

let categoryRepo = {};

categoryRepo.findAll = (callback) => {
    if(con){
        let sql = 'SELECT * FROM categories';
        con.query(sql, (err,rows) => {
            if(err)
                throw err;
            else
                callback(rows);
        });
    }
};

categoryRepo.findById = (id, callback) => {
    if(con){
        let sql = `SELECT * FROM categories WHERE id=${mysql.escape(id)} LIMIT 1`;
        con.query(sql, (err,rows) => {
            if(err)
                throw err;
            else
                callback(rows[0]);
        });
    }
};

module.exports = categoryRepo;
