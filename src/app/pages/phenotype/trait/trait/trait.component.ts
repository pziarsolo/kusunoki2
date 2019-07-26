import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChildren, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Trait } from 'src/app/shared/entities/trait.model';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { AppUrls } from '../../../appUrls';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'kusunoki2-trait',
  templateUrl: './trait.component.html',
  styleUrls: ['./trait.component.scss']
})
export class TraitComponent implements OnChanges {
    @Input() editMode: boolean;
    @Input() createMode: boolean;
    @Input() name: string;
    @Output() traitCreated = new EventEmitter<Trait>();
    @Output() traitDeleted = new EventEmitter<any>();
    @Output() traitNotFound = new EventEmitter<any>();
    trait: Trait;
    errorMsg: string;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;

    @ViewChildren(InlineEditComponent) inlineForms;
    config = {
        name: {is_required: true, is_editable: false, name: 'name'},
        description: {is_required: true, is_editable: true, name: 'description'},
        ontology: {is_required: false, is_editable: true, name: 'ontology'},
        ontology_id: {is_required: false, is_editable: true, name: 'ontology_id'}
    };

    constructor(private traitService: TraitService,
                private statusService: StatusService,
                private dialog: MatDialog) { }

    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }
    // ngOnInit() {
    //     if (this.createMode === true && this.name === undefined) {
    //         this.makeAllFieldEditable();
    //     }
    // }
    ngOnChanges(changes: SimpleChanges): void {
        if ('createMode' in changes && this.createMode) {
            this.trait = new Trait();
            this.makeAllFieldEditable();
        }
        if ('name' in changes && this.name !== undefined && !this.createMode) {
            this.traitService.retrieve(this.name)
                .subscribe(
                    (trait: Trait) => this.trait = trait,
                    (error) => {
                        if (error.status === 404) {
                            this.traitNotFound.emit(true);
                        }
                        this.statusService.info('Trait not Found');
                    });
        }
    }

    checkAllInputAreValid() {
        return  Object.keys(this.inputsValidStatuses)
                    .map(k => this.inputsValidStatuses[k])
                    .every(v => v);
    }

    checkFormValid(event) {
        Object.assign(this.inputsValidStatuses, event);
        this.allInputAreValid = this.checkAllInputAreValid();
    }

    getFormValidData() {
        const formValidData = {};
        this.inlineForms.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        return formValidData;
    }
    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const trait = new Trait();
            trait.name = formValidData['name'];
            trait.description = formValidData['description'];
            trait.ontology = formValidData['ontology'];
            trait.ontology_id = formValidData['ontology_id'];
            return trait;
        }
    }
    createTrait() {
        const trait = this.getModelFromFormValidData();
        if (trait) {
            this.traitService.create(trait)
                .subscribe(
                    (createdTrait: Trait) => this.traitCreated.emit(createdTrait));

        }
    }
    updateTrait() {
        const trait = this.getModelFromFormValidData();
        if (trait) {
            this.traitService.update(this.name, trait)
                .subscribe((updatedTrait: Trait) => {
                    this.statusService.info('Update Successful');
                    this.trait = updatedTrait;
                });
        }
    }
    deleteTrait() {

        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'Trait',
                   description: `Trait: ${this.trait.name}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.traitService.delete(this.name)
                    .subscribe(() => {
                        this.statusService.info('Trait Deleted');
                        this.traitDeleted.emit();
                        },
                        error => {
                            this.statusService.error(`Could not delete observation variable: ${error.error.detail}`);
                            console.log(error);
                        }
                    );
            }
        });
    }
}
