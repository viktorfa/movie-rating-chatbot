'use strict';
var OmdbSearchResponse = (function () {
    function OmdbSearchResponse(jsonResponse) {
        this.originalObject = JSON.parse(jsonResponse);
        if (this.originalObject.Search) {
            this.results = this.originalObject.Search.map(function (originalMovieObject) { return new CompactMovieObject(originalMovieObject); });
        }
        else {
            this.results = [];
        }
    }
    OmdbSearchResponse.prototype.isValid = function () {
        return this.originalObject.Response = 'True' && this.originalObject.Search && this.originalObject.Search.length > 0;
    };
    OmdbSearchResponse.prototype.length = function () {
        return this.results.length;
    };
    OmdbSearchResponse.prototype.getResults = function () {
        return this.results;
    };
    return OmdbSearchResponse;
}());
exports.OmdbSearchResponse = OmdbSearchResponse;
var FullMovieObject = (function () {
    function FullMovieObject(originalObject) {
        this.originalObject = originalObject;
    }
    FullMovieObject.prototype.isValid = function () {
        return this.originalObject.Response === 'True';
    };
    FullMovieObject.prototype.getImdbId = function () {
        return this.originalObject.imdbID;
    };
    FullMovieObject.prototype.getTitle = function () {
        return this.originalObject.Title;
    };
    FullMovieObject.prototype.getYear = function () {
        return this.originalObject.Year;
    };
    FullMovieObject.prototype.getImageUrl = function () {
        return this.originalObject.Poster;
    };
    FullMovieObject.prototype.getTomatoConsensus = function () {
        return this.originalObject.tomatoConsensus;
    };
    FullMovieObject.prototype.getImdbRating = function () {
        return this.originalObject.imdbRating;
    };
    FullMovieObject.prototype.getTomatoMeter = function () {
        return this.originalObject.tomatoMeter;
    };
    FullMovieObject.prototype.getTomatoUrl = function () {
        return this.originalObject.tomatoURL;
    };
    FullMovieObject.prototype.getDirector = function () {
        return this.originalObject.Director;
    };
    FullMovieObject.prototype.getActors = function () {
        return this.originalObject.Actors;
    };
    FullMovieObject.prototype.getGenre = function () {
        return this.originalObject.Genre;
    };
    return FullMovieObject;
}());
exports.FullMovieObject = FullMovieObject;
var CompactMovieObject = (function () {
    function CompactMovieObject(originalObject) {
        this.originalObject = originalObject;
    }
    CompactMovieObject.prototype.getImdbId = function () {
        return this.originalObject.imdbID;
    };
    CompactMovieObject.prototype.getTitle = function () {
        return this.originalObject.Title;
    };
    CompactMovieObject.prototype.getYear = function () {
        return this.originalObject.Year;
    };
    CompactMovieObject.prototype.getImageUrl = function () {
        return this.originalObject.Poster;
    };
    return CompactMovieObject;
}());
exports.CompactMovieObject = CompactMovieObject;
