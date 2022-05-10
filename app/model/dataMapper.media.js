const client = require("./dataClient");

const mediaDataMapper = {
  async getLibrary(userid, library){
    // Renvoie toutes les reviews d'un user, pour une library (book/movie...) donnée
    const query = {
      text: `SELECT * FROM review JOIN media ON review.mediaid = media.id JOIN mediatype ON media.mediaType = mediatype.id WHERE review.userid = $1 AND mediatype.mediatypename = $2`,
      values: [userid, library],
    };
    const mediaList = await client.query(query);
    return mediaList;
  },

  async getBestRated(library){
    // renvoie les notes moyennes pour toutes les oeuvres (parmis toutes nos reviews) de la library (book/movie...) sélectionnée.
    // Renvoie les 10 premiers résultats. Triés pas 'Note Moyenne', décroissantes
    const query = {
      text: `
            SELECT media.title, AVG(note) AS note_moyenne FROM review 
              JOIN media ON review.mediaid = media.id
              JOIN mediatype ON media.mediaType = mediatype.id
              WHERE mediatype.mediatypename = $1
              GROUP BY media.title
              ORDER BY note_moyenne DESC
              LIMIT 10;
            `,
            values: [library],
    };
    const mediaList = await client.query(query);
    return mediaList;
  },



};

module.exports = mediaDataMapper;

