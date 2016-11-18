'use strict';
var request = require('request');
var _ = require('lodash');
var models_1 = require('./models');
var OMDBURL = 'http://www.omdbapi.com/';
var getOmdbSearchResponse = function (query) {
    return new Promise(function (resolve, reject) {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: { s: query },
        }, function (error, response, body) {
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
var getOmdbIdResponse = function (imdbId) {
    console.log("Looking up movie with ID: " + imdbId);
    return new Promise(function (resolve, reject) {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: { i: imdbId, tomatoes: true },
        }, function (error, response, body) {
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
