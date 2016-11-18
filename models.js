'use strict';
class OmdbSearchResponse {
    constructor(jsonResponse) {
        this.originalObject = JSON.parse(jsonResponse);
        if (this.originalObject.Search) {
            this.results = this.originalObject.Search.map(originalMovieObject => new CompactMovieObject(originalMovieObject));
        }
        else {
            this.results = [];
        }
    }
    isValid() {
        return this.originalObject.Response = 'True' && this.originalObject.Search && this.originalObject.Search.length > 0;
    }
    length() {
        return this.results.length;
    }
    getResults() {
        return this.results;
    }
}
exports.OmdbSearchResponse = OmdbSearchResponse;
class FullMovieObject {
    constructor(originalObject) {
        this.originalObject = originalObject;
    }
    isValid() {
        return this.originalObject.Response === 'True';
    }
    getImdbId() {
        return this.originalObject.imdbID;
    }
    getTitle() {
        return this.originalObject.Title;
    }
    getYear() {
        return this.originalObject.Year;
    }
    getImageUrl() {
        return this.originalObject.Poster;
    }
    getTomatoConsensus() {
        return this.originalObject.tomatoConsensus;
    }
    getImdbRating() {
        return this.originalObject.imdbRating;
    }
    getTomatoMeter() {
        return this.originalObject.tomatoMeter;
    }
    getTomatoUrl() {
        return this.originalObject.tomatoURL;
    }
    getDirector() {
        return this.originalObject.Director;
    }
    getActors() {
        return this.originalObject.Actors;
    }
    getGenre() {
        return this.originalObject.Genre;
    }
}
exports.FullMovieObject = FullMovieObject;
class CompactMovieObject {
    constructor(originalObject) {
        this.originalObject = originalObject;
    }
    getImdbId() {
        return this.originalObject.imdbID;
    }
    getTitle() {
        return this.originalObject.Title;
    }
    getYear() {
        return this.originalObject.Year;
    }
    getImageUrl() {
        return this.originalObject.Poster;
    }
}
exports.CompactMovieObject = CompactMovieObject;
