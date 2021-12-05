
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <span><i class="{{icon}} {{class}}" (click)="onClick($event)"></i></span>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params;
  icon: string;
  class: string;

  agInit(params): void {
    this.params = params;
    this.icon = this.params.icon || null;
    this.class = this.params.class || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(this.params);

    }
  }
}