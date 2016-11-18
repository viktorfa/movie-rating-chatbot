'use strict';


export interface MovieObject {
    getImdbId(): string;

    getTitle(): string;

    getYear(): string;

    getImageUrl(): string;
}

export class OmdbSearchResponse {
    originalObject: any;
    results: Array<CompactMovieObject>;

    constructor(jsonResponse: string) {
        this.originalObject = JSON.parse(jsonResponse);
        if (this.originalObject.Search) {
            this.results = this.originalObject.Search.map(originalMovieObject => new CompactMovieObject(originalMovieObject));
        } else {
            this.results = [];
        }
    }

    isValid(): boolean {
        return this.originalObject.Response = 'True' && this.originalObject.Search && this.originalObject.Search.length > 0;
    }

    length(): number {
        return this.results.length;
    }

    getResults(): Array<CompactMovieObject> {
        return this.results;
    }
}

export class FullMovieObject implements MovieObject {
    originalObject: any;

    constructor(originalObject: any) {
        this.originalObject = originalObject;
    }

    isValid(): boolean {
        return this.originalObject.Response === 'True';
    }

    getImdbId(): string {
        return this.originalObject.imdbID;
    }

    getTitle(): string {
        return this.originalObject.Title;
    }

    getYear(): string {
        return this.originalObject.Year;
    }

    getImageUrl(): string {
        return this.originalObject.Poster;
    }

    getTomatoConsensus(): string {
        return this.originalObject.tomatoConsensus;
    }

    getImdbRating(): string {
        return this.originalObject.imdbRating;
    }

    getTomatoMeter(): string {
        return this.originalObject.tomatoMeter;
    }

    getTomatoUrl(): string {
        return this.originalObject.tomatoURL;
    }

    getDirector(): string {
        return this.originalObject.Director;
    }

    getActors(): string {
        return this.originalObject.Actors;
    }

    getGenre(): string {
        return this.originalObject.Genre;
    }

}

export class CompactMovieObject implements MovieObject {
    originalObject: any;

    constructor(originalObject: any) {
        this.originalObject = originalObject;
    }

    getImdbId(): string {
        return this.originalObject.imdbID;
    }

    getTitle(): string {
        return this.originalObject.Title;
    }

    getYear(): string {
        return this.originalObject.Year;
    }

    getImageUrl(): string {
        return this.originalObject.Poster;
    }
}
