'use strict';

const request = require('request');
const _ = require('lodash');

import {OmdbSearchResponse, FullMovieObject} from './models';

const OMDBURL: string = 'http://www.omdbapi.com/';

const getOmdbSearchResponse = (query): Promise<OmdbSearchResponse> => {
    return new Promise((resolve, reject) => {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: {s: query},
        }, (error, response, body) => {
            if (error) {
                console.log('Error sending messages: ', error);
                reject(error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
                reject(response.body.error);
            } else {
                resolve(new OmdbSearchResponse(response.body));
            }
        })
    })
};

const getOmdbIdResponse = (imdbId): Promise<FullMovieObject> => {
    console.log(`Looking up movie with ID: ${imdbId}`);
    return new Promise((resolve, reject) => {
        request({
            url: OMDBURL,
            method: 'GET',
            qs: {i: imdbId, tomatoes: true},
        }, (error, response, body) => {
            if (error) {
                console.log('Error sending messages: ', error);
                reject(error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
                reject(response.body.error);
            } else {
                resolve(new FullMovieObject(JSON.parse(response.body)));
            }
        })
    })
};

export {getOmdbSearchResponse, getOmdbIdResponse}