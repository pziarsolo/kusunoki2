import { Metadata } from './metadata.model';
import { Moment } from 'moment';
import * as moment from 'moment';

export class Accession {
    data: AccessionData;
    metadata: Metadata;
    constructor(object?: Accession) {
        if (object) {
            this.data = new AccessionData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new AccessionData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}

export class AccessionData {
    instituteCode: string;
    germplasmNumber: string;
    is_available: boolean;
    conservation_status: string;
    countries: string[];
    genera: string[];
    passports: Passport[];

    constructor(object?: AccessionData) {
        console.log(object);
        if (object) {
            this.instituteCode = object.instituteCode;
            this.germplasmNumber = object.germplasmNumber;
            this.is_available = object.is_available;
            this.conservation_status = object.conservation_status;
            this.countries = object.countries;
            this.genera = object.genera;
            this.passports = object.passports.map(item => new Passport(item));
        } else {
            this.instituteCode = undefined;
            this.germplasmNumber = undefined;
            this.is_available = undefined;
            this.conservation_status = undefined;
            this.countries = undefined;
            this.genera = undefined;
            this.passports = [];
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.instituteCode) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (this.germplasmNumber) {
            apiDoc['germplasmNumber'] = this.germplasmNumber;
        }
        if (this.is_available) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (this.conservation_status) {
            apiDoc['conservation_status'] = this.conservation_status;
        }
        if (this.countries) {
            apiDoc['countries'] = this.countries;
        }
        if (this.genera) {
            apiDoc['genera'] = this.genera;
        }
        if (this.passports) {
            apiDoc['passports'] = this.passports.map(item => item.getApiDocument());
        }
        return apiDoc;
    }
}

export class Passport {
    version: string;
    taxonomy: Taxonomy;
    dataSource: DataSource;
    otherNumbers: AccessionId[];
    germplasmName: string;
    collectionSite: GeoLocation;
    commonCropName: string;
    germplasmNumber: AccessionId;
    collectionNumber: AccessionId;
    donor: AccessionId;
    collectionSource: string;
    biologicalStatus: string;
    acquisitionDate: Moment;
    collectionDate: Moment;
    ancestry: string;
    remarks: any;
    mlsStatus: string;

    constructor(object?) {
        if (object) {
            this.version = object.version;
            this.taxonomy = new Taxonomy(object.taxonomy);
            this.dataSource = new DataSource(object.dataSource);
            this.otherNumbers = object.otherNumbers.map(item => new AccessionId(item));
            this.germplasmName = object.germplasmName;
            this.collectionSite = new GeoLocation(object.collectionSite);
            this.commonCropName = object.commonCropName;
            this.germplasmNumber = new AccessionId(object.germplasmNumber);
            this.collectionNumber = new AccessionId(object.collectionNumber);
            this.donor = new AccessionId(object.donor);
            this.collectionSource = object.collectionSource;
            this.biologicalStatus = object.biologicalStatusOfSample;
            this.acquisitionDate = parseMCPDate(object.acquisitionDate);
            this.collectionDate = parseMCPDate(object.collectionDate);
            this.ancestry = object.ancestry;
            this.remarks = object.remarks;
            this.mlsStatus = object.mlsStatus;
        } else {
            this.version = '1.0';
            this.taxonomy = new Taxonomy();
            this.dataSource = new DataSource();
            this.otherNumbers = [];
            this.germplasmName = undefined;
            this.collectionSite = new GeoLocation();
            this.commonCropName = undefined;
            this.germplasmNumber = new AccessionId();
            this.collectionNumber = new AccessionId();
            this.donor = new AccessionId();
            this.collectionSource = undefined;
            this.biologicalStatus = undefined;
            this.acquisitionDate = undefined;
            this.collectionDate = undefined;
            this.ancestry = undefined;
            this.remarks = undefined;
            this.mlsStatus = undefined;
        }
    }
    getApiDocument() {
        const apiData = {'version': this.version};
        if (this.germplasmNumber) {
            apiData['germplasmNumber'] = this.germplasmNumber.getApiDocument();
        }
        if (this.collectionNumber) {
            apiData['collectionNumber'] = this.collectionNumber.getApiDocument();
        }
        if (this.donor) {
            apiData['donor'] = this.donor.getApiDocument();
        }
        if (this.taxonomy) {
            apiData['taxonomy'] = this.taxonomy.getApiDocument();
        }
        if (this.otherNumbers) {
            apiData['otherNumbers'] = this.otherNumbers.map(item => item.getApiDocument());
        }
        if (this.dataSource) {
                apiData['dataSource'] = this.dataSource.getApiDocument();
        }
        if (this.germplasmName) {
            apiData['germplasmName'] = this.germplasmName;
        }
        if (this.collectionSite) {
            apiData['collectionSite'] = this.collectionSite.getApiDocument();
        }
        if (this.commonCropName) {
            apiData['commonCropName'] = this.commonCropName;
        }
        if (this.collectionSource) {
            apiData['collectionSource'] = this.collectionSource;
        }
        if (this.biologicalStatus) {
            apiData['biologicalStatus'] = this.biologicalStatus;
        }
        if (this.acquisitionDate) {
            apiData['acquisitionDate'] = this.acquisitionDate.format('YYYYMMDD');
        }
        if (this.collectionDate) {
            apiData['collectionDate'] = this.collectionDate.format('YYYYMMDD');
        }
        if (this.ancestry) {
            apiData['ancestry'] = this.ancestry;
        }
        if (this.remarks) {
            apiData['remarks'] = this.remarks;
        }
        if (this.mlsStatus) {
            apiData['mlsStatus'] = this.mlsStatus;
        }
        return apiData;
    }
}

function parseMCPDate(strdate?: string): Moment {
    if (!strdate) {
        return undefined;
    }
    let year: string;
    let month: string;
    let day: String;

    year = strdate.substring(0, 4);
    month = strdate.substring(4, 6);
    day = strdate.substring(6);

    if (month === '--') {
        month = '01';
    }

    if (day === '--') {
        day = '01';
    }

    return moment(year + month + day);
}

function pad(num, size) {
    const s = '000000000' + num;
    return s.substr(s.length - size);
}

export class Taxon {
    name: string;
    rank: string;
    author: string;

    constructor(object?) {
        if (object) {
            this.name = object.name;
            this.rank = object.rank;
            this.author = object.author;
        } else {
            this.name = undefined;
            this.rank = undefined;
            this.author = undefined;
        }
    }

    get isEmpty() {
        return name === undefined  ? false : true;
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.name) {
            apiDoc['name'] = this.name;
        }
        if (this.rank) {
            apiDoc['rank'] = this.rank;
        }
        if (this.author) {
            apiDoc['author'] = this.author;
        }
        return apiDoc;
    }
}


export class Taxonomy {
    family: Taxon;
    genus: Taxon;
    species: Taxon;
    subspecies: Taxon;
    variety: Taxon;
    convarietas: Taxon;
    group: Taxon;
    forma: Taxon;
    ncbi_taxon: string;

    constructor(object?) {
        if (object) {
            if (object.ncbi_taxon) {
                this.ncbi_taxon = object.ncbi_taxon;
            }
            if (object.family) {
                this.family = new Taxon(object.family);
            }
            if (object.genus) {
                this.genus = new Taxon(object.genus);
            }
            if (object.species) {
                this.species = new Taxon(object.species);
            }
            if (object.subspecies) {
                this.subspecies = new Taxon(object.subspecies);
            }
            if (object.variety) {
                this.variety = new Taxon(object.variety);
            }
            if (object.convarietas) {
                this.convarietas = new Taxon(object.convarietas);
            }
            if (object.group) {
                this.group = new Taxon(object.group);
            }
            if (object.forma) {
                this.forma = new Taxon(object.forma);
            }
        } else {
            this.ncbi_taxon = undefined;
            this.family = new Taxon();
            this.genus = new Taxon();
            this.species = new Taxon();
            this.subspecies = new Taxon();
            this.variety = new Taxon();
            this.convarietas = new Taxon();
            this.group = new Taxon();
            this.forma = new Taxon();
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.family && !this.family.isEmpty) {
            apiDoc['family'] = this.family.getApiDocument();
        }
        if (this.genus && !this.genus.isEmpty) {
            apiDoc['genus'] = this.genus.getApiDocument();
        }
        if (this.species && !this.species.isEmpty) {
            apiDoc['species'] = this.species.getApiDocument();
        }
        if (this.subspecies && !this.subspecies.isEmpty) {
            apiDoc['subspecies'] = this.subspecies.getApiDocument();
        }
        if (this.variety && !this.variety.isEmpty) {
            apiDoc['variety'] = this.variety.getApiDocument();
        }
        if (this.convarietas && !this.convarietas.isEmpty) {
            apiDoc['convarietas'] = this.convarietas.getApiDocument();
        }
        if (this.group && !this.group.isEmpty) {
            apiDoc['group'] = this.group.getApiDocument();
        }
        if (this.forma && !this.forma.isEmpty) {
            apiDoc['forma'] = this.forma.getApiDocument();
        }
        return apiDoc;
    }
}

export class AccessionId {
    instituteCode: string;
    germplasmNumber: string;
    fieldNumber: string;
    url: string;
    pui: string;

    constructor(object?) {
        if (object) {
            this.instituteCode = object.instituteCode;
            this.germplasmNumber = object.germplasmNumber;
            this.fieldNumber = object.field_number;
            this.url = object.url;
            this.pui = object.pui;
        } else {
            this.instituteCode = undefined;
            this.germplasmNumber = undefined;
            this.fieldNumber = undefined;
            this.url = undefined;
            this.pui = undefined;
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.germplasmNumber) {
            apiDoc['germplasmNumber'] = this.germplasmNumber;
        }
        if (this.instituteCode) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (this.fieldNumber) {
            apiDoc['fieldCollectionNumber'] = this.fieldNumber;
        }
        if (this.url) {
            apiDoc['germplasmURL'] = this.url;
        }
        if (this.pui) {
            apiDoc['germplasmPUI'] = this.pui;
        }
        return apiDoc;
    }
}

export class GeoLocation {
    country: string;
    state: string;
    province: string;
    municipality: string;
    island: string;
    other: string;
    site: string;
    latitude: number;
    longitude: number;
    altitude: number;
    coordUncertainty: string;
    georeferencingMethod: string;
    coordenatesSpatialReference: string;

    constructor(object?) {
        if (object) {
            this.country = object.countryOfOriginCode;
            this.state = object.state;
            this.province = object.province;
            this.municipality = object.municipality;
            this.island = object.island;
            this.other = object.other;
            this.site = object.site;
            this.latitude = object.latitude;
            this.longitude = object.longitude;
            this.altitude = object.altitude;
            this.coordUncertainty = object.coordUncertainty;
            this.georeferencingMethod = object.georeferencingMethod;
            this.coordenatesSpatialReference = object.coordenatesSpatialReference;
        } else {
            this.country = undefined;
            this.state = undefined;
            this.province = undefined;
            this.municipality = undefined;
            this.island = undefined;
            this.other = undefined;
            this.site = undefined;
            this.latitude = undefined;
            this.longitude = undefined;
            this.altitude = undefined;
            this.coordUncertainty = undefined;
            this.georeferencingMethod = undefined;
            this.coordenatesSpatialReference = undefined;
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.country) {
            apiDoc['countryOfOriginCode'] = this.country;
        }
        if (this.state) {
            apiDoc['state'] = this.state;
        }
        if (this.province) {
            apiDoc['province'] = this.province;
        }
        if (this.municipality) {
            apiDoc['municipality'] = this.municipality;
        }
        if (this.island) {
            apiDoc['island'] = this.island;
        }
        if (this.other) {
            apiDoc['other'] = this.other;
        }
        if (this.site) {
            apiDoc['site'] = this.site;
        }
        if (this.latitude) {
            apiDoc['latitude'] = this.latitude;
        }
        if (this.longitude) {
            apiDoc['longitude'] = this.longitude;
        }
        if (this.coordUncertainty) {
            apiDoc['coordUncertainty'] = this.coordUncertainty;
        }
        if (this.georeferencingMethod) {
            apiDoc['georeferencingMethod'] = this.georeferencingMethod;
        }
        if (this.coordenatesSpatialReference) {
            apiDoc['coordenatesSpatialReference'] = this.coordenatesSpatialReference;
        }
        return apiDoc;
    }
}

export class DataSource {
    code: string;
    kind: string;
    retrieval_date: Moment;

    constructor(object?) {
        if (object) {
            this.code = object.code;
            this.kind = object.kind;
            this.retrieval_date = moment(object.retrieval_date, 'YYYY-MM-DD');
        } else {
            this.code = undefined;
            this.kind = undefined;
            this.retrieval_date = undefined;
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.code) {
            apiDoc['code'] = this.code;
        }
        if (this.kind) {
            apiDoc['kind'] = this.kind;
        }
        if (this.retrieval_date) {
            apiDoc['retrieval_date'] = this.retrieval_date.format('YYYY-MM-DD');
        }
        return apiDoc;
    }

}
