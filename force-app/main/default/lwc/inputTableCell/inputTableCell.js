import { LightningElement, api, track, wire } from 'lwc';

export default class InputTableCell extends LightningElement {
    @api record;
    //@api options; 
    @api inputfield;
    @api type;
    @api field;
    @track ifield;
    @track label;
    @track uuid;
    @track showcombo = false;
    @track showtextarea = false;
    @track showinputbox = false;
    @track combooptions;
    @track value;

    // Get Set for Options

    @api
    get optionsData() {
        console.log('Get options data');
        return this._optionsData;
    }

    set optionsData(value) {
        console.log('Set options data');
        this.setAttribute('optionsData', value);
        this._optionsData = value;
        this.setup();
    }

    @api
    get options() {
        console.log('Get options');
        return this._options;
    }

    set options(value) {
        console.log('Set options');
        this.setAttribute('options', value);
        this._options = value;
        this.setup();
    }

    // private
    @track _optionsData;
    @track _options;

    // Get Set for Options End

    // Get Set for Value
    @api
    get valueData() {
        console('Get value data');
        return this._optionsData;
    }

    set valueData(value) {
        console('Set value data');
        this.setAttribute('valueData', value);
        this._valueData = value;
        this.setup();
    }

    @api
    get inputval() {
        console.log('Get input val');
        return this._options;
    }

    set inputval(value) {
        console.log('Set input val')
        this.setAttribute('inputval', value);
        this._value = value;
        this.setup();
    }

    // private
    @track _valueData;
    @track _value;

    // Get Set for Value End

    connectedCallback() {
        console.log('connected call back');
        this.setup();
    }

    setup(){
        console.log('Setup called');
        //this.value = this.record[this.field];
        this.combooptions = this.options;
        this.label = this.field;
        this.ifield = this.field;
        //this.uuid = this.record.uuid;
        //this.value = this.inputval;
        /*console.log('Record::'+ JSON.stringify(this.record));
        console.log('Record ID::'+ JSON.stringify(this.record.uuid));
        console.log('Field::'+ JSON.stringify(this.field));
        console.log('Type '+ this.type);
        console.log('Options '+ JSON.stringify(this.options));*/

        if(this.type =="combobox"){
            this.showcombo = true;
            this.showtextarea = false;
            this.showinputbox = false;
        } else if(this.type == "textarea"){
            this.showtextarea = true;
            this.showcombo = false;
            this.showinputbox = false;
        } else {
            this.showinputbox = true;
            this.showtextarea = false;
            this.showcombo = false;
        }
    }

    handleInputChange(event) {
        console.log('Handle input change called');
        this.value = event.target.value; 
    }

    handleOptionsChange(event) {
        console.log('Handle options change called = ' + event.target.value);
        //console.log('Handle options change event = ' + JSON.stringify(event));
        this.value = event.target.value;
        this.picklistselect(event.target.value,event.target.name);
        
        
        //this.picklistselect(event.target.value,event.target.name,event.target.attributes.getNamedItem('data-recordid').value);
    }

    @api id;
    picklistselect(recid,object,uid) {
        console.log('Picklist select called');
        const event = new CustomEvent('picklistselect', {
            // detail contains only primitives
            detail : [{"id": recid , "type": object}]
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }

    @api
    inputValue() {
        console.log('Input value called');
        return { value : this.value, field: this.field };
    }
}