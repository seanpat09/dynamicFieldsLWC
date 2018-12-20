import { createElement } from 'lwc';

import InputTableCell from 'c/inputTableCell';

var element;
var lwcInput;

beforeEach(() => {
    element = createElement('c-input-table-cell', { is: InputTableCell });
    element.record = { 'Name' : 'Test Name'};
    element.field = 'Name';
    document.body.appendChild(element);

    lwcInput = element.shadowRoot.querySelector('lightning-input');
});

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
});

describe('Input table cell', () => {
    it('displays an input field', () => {
        expect(lwcInput.value).toBe('Test Name');
    });

    it('returns inputted values', () => {
        const expectedName = 'Updated Name'
        lwcInput.value = expectedName;
        const typeEvent = new Event('change');
        lwcInput.dispatchEvent(typeEvent);

        const inputValue = element.inputValue();
        expect(inputValue.value).toBe(expectedName);
        expect(inputValue.field).toBe('Name');
    })
});