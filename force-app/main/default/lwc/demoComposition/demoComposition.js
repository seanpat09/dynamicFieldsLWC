import { LightningElement } from 'lwc';
import submitRecords from '@salesforce/apex/MultiEditTableController.submitRecords';

export default class DemoComposition extends LightningElement {
    submit() {
        let tables = Array.from( this.template.querySelectorAll("c-multi-edit-table") );
        let allRecords = tables.map(table => table.retrieveRecords());
        submitRecords({ records: allRecords })
            .then(() => {
                alert('Success!');
            })
            .catch(() => {
                alert('Something went wrong...');
            })
    }
}