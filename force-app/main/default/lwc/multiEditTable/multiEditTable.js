import { LightningElement, track, api } from 'lwc';

export default class MultiEditTable extends LightningElement {
    @api columnList;
    @api title
    columns;

    @track rows = [{ uuid: this.createUUID() }];

    connectedCallback() {
        let cleanedColumnList = this.columnList[0] === '\\' ? this.columnList.substring(1) : this.columnList;
        this.columns = JSON.parse(cleanedColumnList);
    }

    createUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c === 'x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    @api
    retrieveRecords() {
        let rows = Array.from( this.template.querySelectorAll("tr.inputRows") );
        let records = rows.map(row => {
            let cells = Array.from( row.querySelectorAll("c-input-table-cell") );
            return cells.reduce( (record, cell) => {
                let inputVal = cell.inputValue();
                record[inputVal.field] = inputVal.value;
                return record;
            }, {})
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