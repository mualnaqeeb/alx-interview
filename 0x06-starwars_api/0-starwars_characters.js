#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
  const getCharacterName = (url) => {
    return new Promise((resolve, reject) => {
      request(url, (err, _, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body).name);
        }
      });
    });
  };

  const filmId = process.argv[2];
  const filmURL = `${API_URL}/films/${filmId}/`;

  request(filmURL, (err, _, body) => {
    if (err) {
      console.log(err);
    } else {
      const charactersURL = JSON.parse(body).characters;
      const charactersNamePromises = charactersURL.map(getCharacterName);

      Promise.all(charactersNamePromises)
        .then(names => console.log(names.join('\n')))
        .catch(err => console.log(err));
    }
  });
}
