const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors')
const helmet = require('helmet')
const {check, validationResult} = require('express-validator');
const {pool} = require('./config')

// Setup postgresql connection


// Setup express server

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})
app.use(bodyParser.json({extended:false}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
// app.use(cors())

// Routing
// Query DB
app.post("/query",
  [
      check('begin', 'Enter a valid begin date.')
        .not()
        .isEmpty(),
      check('end', 'Enter a valid end date.')
        .not()
        .isEmpty(),

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const { begin, end } = req.body;
        query = `SELECT DATE_TRUNC('hour', date) AS hour,
          sum(value) AS consumption
          FROM consumption
          WHERE date BETWEEN '${begin}' AND '${end}'
          GROUP BY 1`
        const query_response = await pool.query(query);
        // console.log(query_response.rows[0]);
        res.json({rows: query_response.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{msg: err.message}]);
    }
  }
)

app.get("/:id/:value", async (req, res) => {
    const { id, value } = req.params;
    date = Date.now()/1000
    const values = [id, value, date]
    const query = 'INSERT INTO consumption(sensor_id, value, date) VALUES($1, $2, to_timestamp($3)) RETURNING *'
    try {
        const query_response = await pool.query(query, values);
        // console.log(query_response.rows[0]);
        res.json({rows: query_response.rows});
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{msg: err.message}]);
    }
  }
)

// Start server

const PORT = process.env.PORT || 8081

const server = app.listen(PORT, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Api listening at htpp://%s:%s', host, port);
  })
