const { Pool } = require('pg');

const PG_URI = 'postgres://ypuidnip:suKXNDv79Mo2XAgcjTFDjZctCNjn73WR@salt.db.elephantsql.com/ypuidnip';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };