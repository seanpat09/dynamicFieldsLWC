import { LightningElement, track } from 'lwc';
import submitRecords from '@salesforce/apex/MultiEditTableController.submitRecords';

export default class MultiEditTable extends LightningElement {
    columns = [
        { label : 'Name', apiName : 'Name' },
        { label : 'Custom 1', apiName : 'Custom1__c' },
        { label : 'Custom 2', apiName : 'Custom2__c' }
    ];

    @track rows = [{ uuid: this.createUUID() }];

    createUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c == 'x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    submit() {
        var records = [];
        Array.from( this.template.querySelectorAll("tr.inputRows") ).forEach(row => {
            var record = {};
            Array.from( row.querySelectorAll("c-input-table-cell") ).forEach(cell => {
                var inputVal = cell.inputValue();
                record[inputVal.field] = inputVal.value;
            });
            records.push(record);
        })

        submitRecords({ records: records })
            .then(() => {
                alert('Success!');
            })
            .catch(() => {
                alert('Something went wrong...');;
            })
    }

    removeRow(event) {
        this.rows.splice(event.target.value, 1);
    }
    
    addRow() {
        this.rows.push({ uuid: this.createUUID() });
    }
}