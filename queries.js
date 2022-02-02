const { request, response } = require("express");
const fetch = require("node-fetch");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');

if (!process.env.DATABASE_URL) {
    require("dotenv").config();
}

const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

const getCodes = (request, response) => {
    client.query(
      "select * from otc", [],
       (error, results) => {
           if (error) {
               response.status(500).send(errorMsg("Internal server error"));
            } else {
                response.status(200).json(results.rows);
            }
       }
    )
}     

const codeUsed = (request, response) => {

    const otc = parseInt(request.params.code)

    client.query(
      "UPDATE otc SET usage = usage - 1 WHERE otc = $1", [otc],
       (error, results) => {
           if (error) {
               response.status(500).send(errorMsg("Internal server error"));
            } if (results.rowCount === 1) {
                response.status(200).json(true);
            } else {
                response.status(400).json(false);
            }
       }
    )
}

const addCode = (request, response) => {
    console.log("hej")
    const usages = parseInt(request.params.usages);
    var current = new Date();

    bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(current.toString(), salt, (err, hash) => {
            client.query(
                "INSERT INTO otc VALUES ($1, $2)", [hash, usages],
                (error, results) => {
               if (error) {
                   console.log(hash);
                   console.log(usages);
                   response.status(500).send(false);
                } else {
                   response.status(200).send(hash);
                }
            });
        });
    });
}

module.exports = {
    getCodes,
    codeUsed,
    addCode
}
