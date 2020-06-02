import { Component, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { AccessionService } from 'src/app/shared/services/accession.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { DataSource } from 'src/app/shared/entities/accession.model';
import { Router } from '@angular/router';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
    selector: 'kusunoki2-accession-bulk-create',
    templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html',
    styleUrls: ['../../../../shared/components/bulk-create/bulk-create.component.scss']
})
export class AccessionBulkCreateComponent {
    entityType = 'accession';
    entityTypePlural = 'accessions';
    exampleFileUrl = 'assets/upload_examples/accessions.xlsx';
    fieldConfiguration = [
        {
            name: 'INSTCODE', description: ['FAO WIEWS code of the institute where the accession is maintained.',
                'The codes consist of the 3-letter ISO 3166 country code of the country where the institute is located plus a number (e.g. COL001).',
                'The current set of institute codes is available from http://www.fao.org/wiews.',
                'For those institutes not yet having an FAO Code, or for those with ‘obsolete’ codes',
                'see ‘Common formatting rules (v)’.'], mandatory: true
        },
        {
            name: 'ACCENUMB', description: ['This is the unique identifier for accessions within a genebank,',
                'and is assigned when a sample is entered into the genebank collection '], mandatory: true
        },
        { name: 'IS_SAVE_DUPLICATE', description: ['True/False if the accession is a safe duplicate'], mandatory: false },
        { name: 'CONSTATUS', description: ['Conservation status: is_active/is_base/is_archive/is_historic/is_secundary/is_active_and_base'],
          mandatory: false },
        { name: 'IN_NUCLEAR_COLLECTION',
            description: ['True/False : The accession is part of a core collection'],
          mandatory: false},
        { name: 'IS_AVAILABLE', description: ['T/F: Is this accession available to give seeds?'], mandatory: false },
        {
            name: 'COLLNUMB', description: ['Original identifier assigned by the collector(s) of the sample,',
                'normally composed of the name or initials  of  the  collector(s)  followed  by  a  number  (e.g.  ‘FM9909’).',
                'This  identifier  is  essential  for  identifying duplicates held in different collections.'], mandatory: false
        },
        {
            name: 'COLLCODE', description: ['FAO WIEWS code of the institute collecting the sample.',
                'If the holding institute has collected the material, the collecting institute code (COLLCODE) should be the same as the holding institute code (INSTCODE).',
                'Follows INSTCODE standard. Multiple values are separated by a semicolon without space.'], mandatory: false
        },
        { name: 'GENUS', description: ['Genus name for taxon. Initial uppercase letter required.'], mandatory: true },
        { name: 'SPECIES', description: ['Specific epithet portion of the scientific name in lowercase letters'], mandatory: false },
        { name: 'SPAUTHOR', description: ['Provide the authority for the species name.'], mandatory: false },
        {
            name: 'SUBTAXA', description: ['Subtaxon can be used to store any additional taxonomic identifier.',
                'The following abbreviations are allowed:',
                '‘subsp.’ (for subspecies); ‘convar.’ (for convariety); ‘var.’ (for variety); ‘f.’ (for form); ‘Group’ (for ‘cultivar group’).'],
            mandatory: false
        },
        { name: 'SUBTAUTHOR', description: ['Provide the subtaxon authority at the most detailed taxonomic level.'], mandatory: false },
        { name: 'CROPNAME', description: ['Common name of the crop. Example: "malting barley", "macadamia, "maïs".'], mandatory: false },
        {
            name: 'ACCENAME', description: ['Either a registered or other designation given to the material received,',
                'other than the donor’s accession number (23) or collecting  number.',
                'First letter uppercase. Multiple names are separated by a semicolon without space.',
                'Example: Accession name: Bogatyr;Symphony;Emma.'], mandatory: false
        },
        {
            name: 'ACQDATE', description: ['Date on which the accession entered the collection where YYYY is the year,',
                'MM is the month and DD is the day.',
                'Missing data (MM or DD) should be indicated with hyphens'], mandatory: true
        },
        {
            name: 'ORIGCTY', description: ['3-letter  ISO  3166-1  code  of  thecountry  in  which  the  sample  was  originally  collected  (e.g.  landrace,   crop   wild   relative,   farmers’   variety),   bred   or   selected   (breeding   lines,   GMOs,   segregating populations, hybrids, modern cultivars, etc.)']
            , mandatory: false
        },
        {
            name: 'COLLSITE',
            description: ['Location information below the country level that describes where the accession was collected,',
                'preferable  in  English.',
                'The format of the fields is: A list of descriptor and value separated by ";"',
                'Each of the descriptor: value are separated by ":"',
                'The allowed descriptors are: state, province, island, municipality, other, site'],
            mandatory: false
        },
        {
            name: 'LATITUDE', description: ['Latitude  expressed  in  decimal  degrees.',
                'Positive  values  are  North  of  the  Equator;  negative  values are South of the Equator',
                'e.g. -44.6975'], mandatory: false
        },
        {
            name: 'LONGITUDE', description: ['Longitude  expressed  in  decimal  degrees.',
                'Positive  values  are  East  of  the  Greenwich  Meridian;  negative values are West of the Greenwich Meridian',
                '(e.g. +120.9123).'], mandatory: false
        },
        {
            name: 'COORDUNCERT', description: ['Uncertainty associated with the coordinates in metres.',
                'Leave the value empty if the uncertainty is unknown.'], mandatory: false
        },
        {
            name: 'COORDDATUM',
            description: ['The  geodetic  datum  or  spatial  reference  system  upon  which  the  coordinates  given',
                'in  decimal  latitude  and  decimal  longitude  are  based  (e.g.  WGS84,  ETRS89,  NAD83).',
                'The  GPS  uses  the  WGS84 datum'], mandatory: false
        },
        {
            name: 'GEOREFMETH', description: ['The  georeferencing  method  used  (GPS,  determined  from  map,  gazetteer,  or  estimated  using  software).',
                'Leave the value empty if georeferencing method is not known.'], mandatory: false
        },
        {
            name: 'ELEVATION',
            description: ['Elevation of collecting site expressed in metres above sea level. Negative values are allowed.'],
            mandatory: false
        },
        {
            name: 'COLLDATE', description: ['Collecting date of the sample, where YYYY is the year, MM is the month and DD is the day.',
                'Missing data (MM or DD) should be indicated with hyphens'], mandatory: false
        },
        {
            name: 'BREDCODE', description: ['FAO WIEWS code of the institute that has bred the material.',
                'If the holding institute has bred the material, the breeding institute code (BREDCODE) should be the same as the holding institute code (INSTCODE).',
                'Follows INSTCODE standard. Multiple values are separated by a semicolon without space'], mandatory: false
        },

        {
            name: 'SAMPSTAT',
            description: ['The coding scheme proposed can be used at 3 different levels of detail:',
                'either by using the general codes (in boldface) such as 100, 200, 300, 400,',
                'or by using the more specific codes such as 110, 120, etc.',
                '100  Wild',
                '  110  Natural',
                '  120 Semi-natural/wild',
                '  130 Semi-natural/sown',
                '200 Weedy',
                '300) Traditional cultivar/landrace',
                '400) Breeding/research material',
                '  410) Breeder\'s line',
                '  411) Synthetic population',
                '  412) Hybrid',
                '  413) Founder stock/base population',
                '  414) Inbred line (parent of hybrid cultivar)',
                '  415) Segregating population',
                '  416) Clonal selection',
                '  420) Genetic stock',
                '  421) Mutant (e.g. induced/insertion mutants, tilling populations)',
                '  422) Cytogenetic stocks (e.g. chromosome addition/substitution, aneuploids,amphiploids)',
                '  423) Other genetic stocks (e.g. mapping populations)',
                '500) Advanced or improved cultivar (conventional breeding methods)',
                '600) GMO (by genetic engineering)',
                '999) Other (Elaborate in REMARKS field)'],
            mandatory: false
        },
        {
            name: 'ANCEST',
            description: ["'Information about either pedigree or other description of ancestral information (e.g. parent variety in case of mutant or selection).'",
                "For example a pedigree 'Hanna/7*Atlas//Turk/8*Atlas' or a description 'mutation found in Hanna',",
                "'selection from Irene' or 'cross involving amongst others Hanna and Irene'.', mandatory: true}"],
            mandatory: false
        },
        {
            name: 'COLLSRC', description:
                ['The coding scheme proposed can be used at 2 different levels of detail:',
                    'either by using the general codes (in boldface) such as 10, 20, 30, 40, etc.,',
                    'or by using the more specific codes, such as 11, 12, etc.',
                    '10) Wild habitat',
                    '11) Forest or woodland',
                    '12) Shrubland',
                    '13) Grassland',
                    '14) Desert or tundra',
                    '15) Aquatic habitat',
                    '20) Farm or cultivated habitat',
                    '21) Field',
                    '22) Orchard',
                    '23) Backyard, kitchen or home garden (urban, peri-urban or rural)',
                    '24) Fallow land',
                    '25) Pasture',
                    '26) Farm store',
                    '27) Threshing floor',
                    '28) Park',
                    '30) Market or shop',
                    '40) Institute, Experimental station, Research organization, Genebank',
                    '50) Seed company',
                    '60) Weedy, disturbed or ruderal habitat',
                    '61) Roadside',
                    '62) Field margin',
                    '99) Other (Elaborate in REMARKS field)'
                ],
            mandatory: false
        },
        {
            name: 'DONORCODE', description: ['FAO WIEWS code of the donor institute. Follows INSTCODE standard.'],
            mandatory: false
        },
        {
            name: 'DONORNUMB', description: ['Identifier assigned to an accession by the donor. Follows ACCENUMB standard.'],
            mandatory: false
        },
        {
            name: 'OTHERNUMB', description: ['Any other identifiers known to exist in other collections for this accession.',
                'Use the following format: INSTCODE:ACCENUMB;INSTCODE:identifier;...',
                'INSTCODE and identifier are separated by a colon without space.',
                'Pairs of INSTCODE and identifier are separated by a semicolon without space.',
                'When the institute is not known, the identifier should be preceded by a colon.'], mandatory: false
        },
        {
            name: 'DUPLSITE', description: ['FAO WIEWS code of the institute(s) where a safety duplicate of the accession is maintained.',
                'Multiple values are separated by a semicolon without space. Follows INSTCODE standard.'],
            mandatory: false
        },
        {
            name: 'STORAGE', description: ['Type of germplasm storage',
                'If germplasm is maintained under different types of storage, multiple choices are allowed, separated by a semicolon (e.g.  20;30).',
                '(Refer  to  FAO/IPGRI  Genebank  Standards  1994  fordetails on storage type.)',
                '10) Seed collection',
                '11) Short term',
                '12) Medium term',
                '13) Long term',
                '20) Field collection',
                '30) In vitro collection',
                '40) Cryopreserved collection',
                '50) DNA collection',
                '99) Other (elaborate in REMARKS field)'
            ], mandatory: false
        },
        {
            name: 'MLSSTAT', description: ['MLS status of the accession',
                'The status of an accession with regards to the Multilateral System (MLS) of the International Treaty on Plant Genetic Resources for Food and Agriculture.',
                'Leave the value empty if the status is not known',
                '0 - No (not included)',
                '1 - Yes (included)'
            ], mandatory: false
        },
        {
            name: 'REMARKS', description: ['The remarks field is used to add notes or to elaborate on descriptors with value 99 or 999 (= Other).',
                'Prefix remarks with the field name they refer to and a colon (:) without space (e.g. COLLSRC:riverside).',
                'Distinct remarks referring to different fields are separated by semicolons without space'],
            mandatory: false
        },
    ];

    @ViewChild('file') file;
    appConfig: AppConfig;
    errors: String[];
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;
    icon = false;

    constructor(private accessionService: AccessionService,
        private appConfigService: AppConfigService,
        private statusService: StatusService,
        private router: Router) {
        this.appConfig = this.appConfigService.appConfig;
    }

    toogle_button() {
        this.icon = !this.icon;
    }

    onFileAdded() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        this.uploadedFile = this.file.nativeElement.files[0];
        const dataSource = new DataSource();
        dataSource.code = this.appConfig.defaultDataSource.code;
        dataSource.kind = this.appConfig.defaultDataSource.kind;

        this.accessionService.bulkCreate(dataSource, this.uploadedFile)
            .subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        // calculate the progress percentage
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        // pass the percentage into the progress-stream
                    } else if (event instanceof HttpResponse) {
                        this.processing = false;
                        this.uploadSuccessful = true;
                        const task_id = event.body.task_id;
                        this.statusService.info('Task sendend. Redirecting to task result page');
                        this.router.navigate(['/', AppUrls.tasks, task_id]);
                    }
                },
                (errors) => {
                    this.processing = false;
                    this.uploadSuccessful = false;
                    if (errors.error.length > 0) {
                        this.errors = errors.error.map(item => {
                            if (item.detail !== undefined) {

                                return item.detail;
                            } else {
                                return item;
                            }
                        });
                    } else {
                        this.errors = errors.error.detail;
                    }
                    this.statusService.error('Check the errors');
                }
            );
    }
    rePaintDialog() {
        this.uploadTried = false;
        this.uploadSuccessful = undefined;
    }
}
