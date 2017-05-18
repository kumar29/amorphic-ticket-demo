import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ZipLookupService {
    constructor (private http: Http) {}

    getDetails(zip) {
        return this.http.get('http://ziptasticapi.com/' + zip)
            .map((res:Response) => res.json());
    }

}