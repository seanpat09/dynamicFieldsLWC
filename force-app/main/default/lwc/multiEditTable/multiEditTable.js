import { LightningElement, track, api } from 'lwc';

export default class MultiEditTable extends LightningElement {
    //@api columnList;
    @api title
    @track columns;
    //@track defaultoptions;
    @track rowDetails = [];
    @track rows = [{ uuid: this.createUUID() }];
    @track datevalue;


    @api
    get optionsData() {
        console.log('Get options data called');
        return this._optionsData;
    }

    set optionsData(value) {
        console.log('Set options data called = ' + value);
        this.setAttribute('optionsData', value);
        this._optionsData = value;
        this.setup();
    }

    @api
    get columnList() {
        console.log('Get column list called');
        return this._options;
    }

    set columnList(value) {
        this.setAttribute('columnList', value);
        console.log('Set Column List value = ' + value);
        this._options = value;
        this.setup();
    }
    // private
    @track _optionsData;
    @track _options;

    connectedCallback() {
        // let cleanedColumnList = this.columnList[0] === '\\' ? this.columnList.substring(1) : this.columnList;
        // this.columns = JSON.parse(cleanedColumnList);
        //console.log('Columns list = ' + JSON.stringify(this.columns));
        console.log('Connected call back called');
        this.setup();
    }

    setup(){
        console.log('Setup Executed');
        //console.log('ColumnList:::'+JSON.stringify(this.columnList));
        let cleanedColumnList = this.columnList[0] === '\\' ? this.columnList.substring(1) : this.columnList;
        this.initialOptions = cleanedColumnList;
        //console.log('Colums vale cleaned = ' + JSON.stringify(cleanedColumnList));
        this.columns = JSON.parse(cleanedColumnList);
    }

    createUUID() {
        console.log('Create UUID called');
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c === 'x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    handleDateChange(event){
        console.log('Handle data change called');
        this.datevalue = event.target.value;
    }

    @api
    getdateval(){
        console.log('Get date val called');
        return this.datevalue;
    }

    @api
    handlepicklistselect(params){
        console.log('handle picklist select called');
        console.log('Parameters'+JSON.stringify(params.detail));
        const event = new CustomEvent('handlepicklistselect', {
            // detail contains only primitives
            detail : params.detail
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);

        const inputcomp = this.template.querySelector('c-input-table-cell');
        //inputcomp.options([{"label":"Hamza", "value":"Hamza"}]);

    }

    @api
    retrieveRecords() {
        console.log('retrieve records called');
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
        console.log('remove row called');
        this.rows.splice(event.target.value, 1);
    }
    
    addRow() {
        console.log('add row called');
        console.log('New Row Adding with following values ==> ' + JSON.stringify(this.columns));
        this.rows.push({ uuid: this.createUUID() });
        this.rowDetails.push({uuid: this.createUUID(), 
                             })
    }
}