import { LightningElement, track, api } from 'lwc';

export default class MultiEditTable extends LightningElement {
    @api columnList;
    columns;

    @track rows = [{ uuid: this.createUUID() }];

    connectedCallback() {
        debugger;
        this.columns = JSON.parse(this.columnList.substring(1));
    }

    createUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c == 'x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    @api
    retrieveRecords() {
        var records = [];
        Array.from( this.template.querySelectorAll("tr.inputRows") ).forEach(row => {
            var record = {};
            Array.from( row.querySelectorAll("c-input-table-cell") ).forEach(cell => {
                var inputVal = cell.inputValue();
                record[inputVal.field] = inputVal.value;
            });
            records.push(record);
        })

        return records;
    }

    removeRow(event) {
        this.rows.splice(event.target.value, 1);
    }
    
    addRow() {
        this.rows.push({ uuid: this.createUUID() });
    }
}