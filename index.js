const express = require('express')
const app = express();
var cors = require('cors')
const {
    Pool
} = require('pg')

app.use(express.json())
app.use(cors())


const pool = new Pool({
    connectionString: 'postgres://etwkztfg:VXWgP_QRBIEt1LazYCwV5wsziN7cKrKe@jelani.db.elephantsql.com/etwkztfg'
})
app.get('/', async (req, res) => {
    try {
        //SELECT * FROM users WHERE user_name ILIKE $1',[`a%`]
        let filter = req.url.split('=')
        if (filter[1]) {
            let test = filter[1].split(',')
            const client = await pool.connect();
           if(test[0] == 1){
            const {
                rows
            } = await client.query('SELECT * FROM users WHERE user_name ILIKE $1', [`${test[1]}%`])
            client.release()
            res.send(rows)
           }
           if(test[0] == 2){
            const {
                rows
            } = await client.query('SELECT * FROM users WHERE user_name ILIKE $1', [`%${test[1]}`])
            client.release()
            res.send(rows)
           }
           if(test[0] == 3){
            const {
                rows
            } = await client.query('SELECT * FROM users WHERE user_name ILIKE $1', [`%${test[1]}%`])
            client.release()
            res.send(rows)
           }
        } else {
            const client = await pool.connect();
            const {
                rows
            } = await client.query('SELECT * FROM users')
            client.release()
            res.send(rows)
        }
    } catch (err) {
        console.log(err);
    }
})
app.listen(process.env.PORT || 9000)