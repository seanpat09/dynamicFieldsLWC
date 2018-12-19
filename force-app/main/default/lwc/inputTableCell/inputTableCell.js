import { LightningElement, api } from 'lwc';

export default class InputTableCell extends LightningElement {
    @api record;
    @api field;

    value;
    label;
    connectedCallback() {
        this.value = this.record[this.field];
        this.label = this.field;
    }

    handleInputChange(event) {
        this.value = event.target.value; 
    }

    @api
    inputValue() {
        return { value : this.value, field: this.field };
    }
}