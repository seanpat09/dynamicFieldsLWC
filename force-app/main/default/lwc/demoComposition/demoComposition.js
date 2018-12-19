import { LightningElement } from 'lwc';
import submitRecords from '@salesforce/apex/MultiEditTableController.submitRecords';

export default class DemoComposition extends LightningElement {
    submit() {
        var allRecords = [];
        Array.from( this.template.querySelectorAll("c-multi-edit-table") ).forEach(table => {
            var tableRecords = table.retrieveRecords();
            allRecords.push(tableRecords);
        })
        submitRecords({ records: allRecords })
            .then(() => {
                alert('Success!');
            })
            .catch(() => {
                alert('Something went wrong...');;
            })
    }
}