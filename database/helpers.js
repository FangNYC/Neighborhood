const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '3.16.43.119',
  database: 'neighborhood',
  port: 5432,
})

const getListingPG = (id, cb) => {

  pool.connect((err, client, done) => {
    if (err) throw err
    
    client.query('select * from listings l full outer join neighborhoods n on l."neighbId" = n.id where l.id = $1', [id], (err, data) => {
      done()
      
      if (err) {
        console.log(err.stack)
      } else {
        cb(data)
      }
    })
  })
  
}

const getLandmarks = (cb) => {

  pool.connect((err, client, done) => {
    if (err) throw err
    
    client.query('select * from landmarks', (err, data) => {
      done()
      if (err) {
        console.log(err.stack)
      } else {
        cb(data)
      }
    })
  })
  
}

module.exports.getListingPG = getListingPG;
module.exports.getLandmarks = getLandmarks;
