'use strict';
var _ = require('lodash');
var messageModels = require('./message-models');
var message_types_1 = require("./message-types");
var DEFAULT_IMAGE_URL = 'http://cliparts.co/cliparts/8TA/b5A/8TAb5Ajqc.png';
var getSearchResponse = function (searchResponse) {
    var elements = [];
    _.each(_.take(searchResponse.getResults(), 4), function (movieObject) {
        elements.push(new messageModels.ListElement(movieObject.getTitle(), movieObject.getYear(), hasPoster(movieObject) ? movieObject.getImageUrl() : DEFAULT_IMAGE_URL, new messageModels.MessengerAction(getImdbUrl(movieObject)), [new messageModels.PostbackButton('Ratings', new messageModels.ShowMovieRatingPostbackPayload(movieObject.getImdbId()))]));
    });
    return new messageModels.MessageAttachment(new messageModels.ListTemplate(elements, message_types_1.TopElementStyle.LARGE));
};
exports.getSearchResponse = getSearchResponse;
var getDetailedRatingResponse = function (movieObject) {
    var elements = [];
    elements.push(new messageModels.ListElement(movieObject.getTitle(), getTemplateSubtitle(movieObject), hasPoster(movieObject) ? movieObject.getImageUrl() : DEFAULT_IMAGE_URL));
    elements.push(new messageModels.ListElement(movieObject.getImdbRating() + "/10", 'Rating on IMDB', 'http://actorstalkacting.com/wp-content/uploads/2012/04/IMDB-ipad.png', new messageModels.MessengerAction(getImdbUrl(movieObject))));
    if (movieObject.getTomatoMeter() !== 'N/A') {
        elements.push(new messageModels.ListElement(movieObject.getTomatoMeter() + "/100", 'Tomatometer on Rotten Tomatoes', 'https://myapps.developer.ubuntu.com/site_media/appmedia/2013/10/fresh256.png', new messageModels.MessengerAction(movieObject.getTomatoUrl())));
    }
    return new messageModels.MessageAttachment(new messageModels.ListTemplate(elements, message_types_1.TopElementStyle.LARGE));
};
exports.getDetailedRatingResponse = getDetailedRatingResponse;
var getImdbUrl = function (movieObject) {
    return "https://www.imdb.com/title/" + movieObject.getImdbId() + "/";
};
var getTemplateSubtitle = function (movieObject) {
    var result = "";
    if (movieObject.getTomatoConsensus() !== 'N/A') {
        result = movieObject.getTomatoConsensus();
    }
    else if (movieObject.getDirector() !== 'N/A') {
        result += movieObject.getDirector() + ' ';
        if (movieObject.getActors() !== 'N/A') {
            result += movieObject.getActors();
        }
    }
    else if (movieObject.getGenre() !== 'N/A') {
        result = movieObject.getGenre();
    }
    else {
        result = movieObject.getYear();
    }
    return result;
};
var hasPoster = function (movieObject) {
    return movieObject.getImageUrl() !== 'N/A';
};
