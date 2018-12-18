// import { Component, EventEmitter, Input, OnInit, Output,
//          ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
// import { AccessionId } from 'src/app/shared/entities/accession.model';




// @Component({
//     selector: 'kusunoki2-other-numbers',
//     templateUrl: './other-numbers.component.html',
//     styleUrls: ['./other-numbers.component.scss'],
// })
// export class OtherNumbersComponent implements OnInit, AfterViewChecked {
//     childrenComponents: OtherNumberComponent[];

//     @ViewChildren(OtherNumberComponent)
//     inline_children: QueryList<OtherNumberComponent>;

//     @Input() otherNumbers: AccessionId[];
//     @Input() editMode: boolean;
//     @Input() createMode: boolean;
//     @Output() validationStateEvent = new EventEmitter<any>();

//     form_valid_status = {};
//     initialValue: AccessionId[];

//     ngOnInit() {
//         this.initialValue = this.otherNumbers;
//     }

//     ngAfterViewChecked() {
//         this.children_components = this.inline_children.toArray();
//     }

//     all_children_are_valid() {
//         return  Object.keys(this.form_valid_status)
//                     .map(k => this.form_valid_status[k])
//                     .every(v => v);
//     }

//     on_successful_validation(event) {}

//     _check_form_valid(event) {
//         const are_all_valid = this.all_children_are_valid();
//         if (are_all_valid && event !== undefined) {
//             this.on_successful_validation(event);
//         }
//         this.validation_state_event.emit({[this.model_name]: are_all_valid});
//     }

//     check_form_valid(event) {
//         Object.assign(this.form_valid_status, event);
//         this._check_form_valid(event);
//     }

//     _getFormDataIfValid() {
//         if (this.all_children_are_valid()) {
//             const valid_form_data = [];
//             for (const component of this.children_components) {
//                 const value = component.getFormDataIfValid();
//                 valid_form_data.push(value);
//                 if (value !== undefined) {
//                     // valid_form_data[component.config.name] = component.getFormDataIfValid();
//                 }
//             }
//             return valid_form_data;
//         }
//     }

//     getFormDataIfValid() {
//         const data = this._getFormDataIfValid();
//         const items = [];
//         for (let item of data) {
//             if (this.output_data_type !== undefined) {
//                 item = new this.output_data_type(item);
//             }
//             items.push(item);
//         }
//         return items;
//     }

//     formReset() {
//         this.input_form_data = this.initial_value;
//         this.edit_mode = false;
//     }

//     addInputWidget() {
//         this.input_form_data.push(new AccessionId());
//     }

//     removeInputWidget(index) {
//         this.input_form_data.splice(index, 1);
//         delete this.form_valid_status[index];
//         this._check_form_valid(undefined);

//     }
// }
