import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Accession } from '../entities/accession.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnDestroy{
    accessions = new BehaviorSubject([]);

    private cardId = 'AccessionsForPetition';

    constructor() {
        this.start();
        this.accessions.next(this.getAccessionsFromStorage());
    }
    private start(): void {
        window.addEventListener('storage', this.storageEventListener.bind(this));
        // window.onstorage(this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea === localStorage) {
            this.accessions.next(this.getAccessionsFromStorage());
        }
    }

    private stop(): void {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
        this.accessions.complete();
    }

    ngOnDestroy() {
        this.stop();
    }
    private getAccessionsFromStorage() {
        const stringifyArray = localStorage.getItem(this.cardId);
        let accessionArray: object[];
        if (stringifyArray) {
            accessionArray = JSON.parse(stringifyArray);
        } else {
            accessionArray = [];
            this.setAccessionsInStorage(accessionArray);
        }
        return accessionArray;
    }

    private setAccessionsInStorage(accessions) {
        localStorage.setItem(this.cardId, JSON.stringify(accessions));
        this.accessions.next(accessions);
    }

    addAccession(accession: Accession) {
        const acc = {instituteCode: accession.data.instituteCode,
                     germplasmNumber: accession.data.germplasmNumber};
        const accessions = this.getAccessionsFromStorage();
        try {
            if (indexOf(accession, accessions) === -1) {
                accessions.push(acc);
            }
        } finally {
            this.setAccessionsInStorage(accessions);
        }
    }

    removeAccessionFromCart(accession) {
        const accessions = this.getAccessionsFromStorage();
        const fakeAccession = {'data': accession};
        const index = indexOf(fakeAccession, accessions);

        if (index === -1 ) {
            console.log('accession not in shopping cart');
            return undefined;
        }
        accessions.splice(index, 1);
        this.setAccessionsInStorage(accessions);
    }
    removeAllFromCart() {
        this.setAccessionsInStorage([]);
    }

    accessionInCart(accession): boolean {
        const accessions = this.getAccessionsFromStorage();
        return Boolean(indexOf(accession, accessions));
    }

}

function indexOf(obj, list: object[]): number {
    let counter = 0;
    for (const item of list) {
        if (item['instituteCode'] === obj.data.instituteCode &&
            item['germplasmNumber'] === obj.data.germplasmNumber) {
            return counter;
        }
        counter += 1;
    }
    return -1;
}
