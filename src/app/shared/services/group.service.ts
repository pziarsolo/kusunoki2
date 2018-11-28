import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ApiUrls } from './apiUrls';
import { Group } from '../entities/group.model';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    endPointUrl: string = ApiUrls.groups;

    constructor(private readonly http: HttpClient) { }

    list(): Observable<Group[]> {
        return this.http.get<Group[]>(this.endPointUrl);
    }
    retrieve(groupname: string): Observable<Group> {
        return this.http.get<Group>(this.composeDetailUrl(groupname));
    }
    update(groupname: string, group: Group): Observable<Group> {
        return this.http.patch<Group>(this.composeDetailUrl(groupname), group);
    }
    delete(groupname: string) {
        return this.http.delete(this.composeDetailUrl(groupname));
    }
    create(group: Group) {
        return this.http.post(this.endPointUrl, group);
    }
    private composeDetailUrl(groupname): string {
        return `${this.endPointUrl}${groupname}/`;
    }
    groupExists(username: string): Observable<Boolean> {
        return this.retrieve(username)
            .pipe(
                map(groupExist => (groupExist ? true : false)),
                catchError(() => of(false))
            );
    }
}
