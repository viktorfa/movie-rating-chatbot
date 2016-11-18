'use strict';
const request = require('request');
const _ = require('lodash');
const models_1 = require('./models');
const OMDBURL = 'http://www.omdbapi.com/';
const getOmdbSearchResponse = (query) => {
    return new Promise((resolve, reject) => {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: { s: query },
        }, (error, response, body) => {
            if (error) {
                console.log('Error sending messages: ', error);
                reject(error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
                reject(response.body.error);
            }
            else {
                resolve(new models_1.OmdbSearchResponse(response.body));
            }
        });
    });
};
exports.getOmdbSearchResponse = getOmdbSearchResponse;
const getOmdbIdResponse = (imdbId) => {
    console.log(`Looking up movie with ID: ${imdbId}`);
    return new Promise((resolve, reject) => {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: { i: imdbId, tomatoes: true },
        }, (error, response, body) => {
            if (error) {
                console.log('Error sending messages: ', error);
                reject(error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
                reject(response.body.error);
            }
            else {
                resolve(new models_1.FullMovieObject(JSON.parse(response.body)));
            }
        });
    });
};
exports.getOmdbIdResponse = getOmdbIdResponse;
