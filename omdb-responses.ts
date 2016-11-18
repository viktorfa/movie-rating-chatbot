'use strict';

const _ = require('lodash');

import {OmdbSearchResponse, CompactMovieObject, FullMovieObject, MovieObject} from './models';
import * as messageModels from './message-models';
import {TopElementStyle} from "./message-types";

const DEFAULT_IMAGE_URL: string = 'http://cliparts.co/cliparts/8TA/b5A/8TAb5Ajqc.png';

const getSearchResponse = (searchResponse: OmdbSearchResponse): messageModels.MessageAttachment => {

    let elements: Array<messageModels.ListElement> = [];

    _.each(_.take(searchResponse.getResults(), 4), (movieObject: CompactMovieObject) => {
        elements.push(new messageModels.ListElement(
            movieObject.getTitle(),
            movieObject.getYear(),
            hasPoster(movieObject) ? movieObject.getImageUrl() : DEFAULT_IMAGE_URL,
            new messageModels.MessengerAction(getImdbUrl(movieObject)),
            [new messageModels.PostbackButton('Ratings', new messageModels.ShowMovieRatingPostbackPayload(movieObject.getImdbId()))]
        ))
    });

    return new messageModels.MessageAttachment(new messageModels.ListTemplate(elements, TopElementStyle.COMPACT));
};

const getDetailedRatingResponse = (movieObject: FullMovieObject): messageModels.MessageAttachment => {

    const elements: Array<messageModels.ListElement> = [];

    elements.push(new messageModels.ListElement(
        movieObject.getTitle(),
        getTemplateSubtitle(movieObject),
        hasPoster(movieObject) ? movieObject.getImageUrl() : DEFAULT_IMAGE_URL,
    ));

    elements.push(new messageModels.ListElement(
        `${movieObject.getImdbRating()}/10`,
        'Rating on IMDB',
        'http://actorstalkacting.com/wp-content/uploads/2012/04/IMDB-ipad.png',
        new messageModels.MessengerAction(getImdbUrl(movieObject))
    ));

    if (movieObject.getTomatoMeter() !== 'N/A') {
        elements.push(new messageModels.ListElement(
            `${movieObject.getTomatoMeter()}/100`,
            'Tomatometer on Rotten Tomatoes',
            'https://myapps.developer.ubuntu.com/site_media/appmedia/2013/10/fresh256.png',
            new messageModels.MessengerAction(movieObject.getTomatoUrl())
        ));
    }

    return new messageModels.MessageAttachment(new messageModels.ListTemplate(elements, TopElementStyle.LARGE));
};

const getImdbUrl = (movieObject: MovieObject): string => {
    return `https://www.imdb.com/title/${movieObject.getImdbId()}/`;
};

const getTemplateSubtitle = (movieObject: FullMovieObject): string => {
    let result = "";
    if (movieObject.getTomatoConsensus() !== 'N/A') {
        result = movieObject.getTomatoConsensus();
    } else if (movieObject.getDirector() !== 'N/A') {
        result += movieObject.getDirector() + ' ';
        if (movieObject.getActors() !== 'N/A') {
            result += movieObject.getActors();
        }
    } else if (movieObject.getGenre() !== 'N/A') {
        result = movieObject.getGenre();
    } else {
        result = movieObject.getYear();
    }
    return result
};

const hasPoster = (movieObject: MovieObject): boolean => {
    return movieObject.getImageUrl() !== 'N/A';
};

export {getSearchResponse, getDetailedRatingResponse};