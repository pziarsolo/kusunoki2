import { Component, OnInit, Input } from '@angular/core';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'kusunoki2-inline-edit-list',
  templateUrl: './inline-edit-list.component.html',
  styleUrls: ['./inline-edit-list.component.scss']
})
export class InlineEditListComponent extends InlineEditComponent {
    itemToAdd: string;
    @Input() sortable: boolean;

    setInitialValue() {
        this.initialValue = this.value.slice();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.value, event.previousIndex, event.currentIndex);
    }

    deleteItem(index) {
        this.value.splice(index, 1);
    }

    addItem(value) {
        if (value) {
            this.value = this.value.concat(value);
            this.itemToAdd = undefined;
        }
    }

}
