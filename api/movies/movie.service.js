/* get the database configuration */
const db = require('../../config/database');
module.exports = {

  /* create movies */
  createMovie: (body, callback) => {
    db.query(`insert into movies (popularity,director,genre,imdb_score,name) values(?,?,?,?,?)`, [
      body.popularity,
      body.director,
      body.genre,
      body.imdb_score,
      body.name,
    ], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    })
  },
  /* update movies */
  updateMovie: (body, callback) => {
    db.query(`UPDATE movies SET popularity=?,director=?,genre=?,imdb_score=?,name=? WHERE id=${body.id}`, [
      body.popularity,
      body.director,
      body.genre,
      body.imdb_score,
      body.name,
    ], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    })
  },

  /* get movies */
  readMovie: (filters, callback) => {
    let getFilters = " ";
    if (filters && Object.keys(filters).length > 0) {
      /* get data by id */
      if (filters['getType'] == 'id' && filters['searchText'] && filters['searchText']!="" ) {
        getFilters += ` AND id = ${filters['searchText']} `;
      }

      /* genre search */
      if (filters['getType'] == 'genre' && filters['searchText'] && filters['searchText']!="" ) {
        getFilters += ` AND genre LIKE  '%${filters['searchText']}%' `;
      }
      /* name search */
      if (filters['getType'] == 'name' && filters['searchText'] && filters['searchText']!="" ) {
        getFilters += ` AND name LIKE  '%${filters['searchText']}%' `;
      }
    }
    db.query(`SELECT id,popularity,director,genre,imdb_score,name from movies  WHERE 1=1 ${getFilters} ORDER BY id ASC` , (error, data) => {
      if (error) {
        return callback(error);
      }
      return callback(null, data)
    })
  },
  deleteMovie: (data, callback) => {
    db.query(`DELETE FROM movies WHERE id=${data.id}`, (error, data) => {
      if (error) {
        return callback(error);
      }
      return callback(null, data)
    })
  }

}