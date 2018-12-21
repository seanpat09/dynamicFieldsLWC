import { createElement } from 'lwc';
import MultiEditTable from 'c/multiEditTable';

var element;
var expectedTitle;
var columnList;

beforeEach(() => {
    element = createElement('c-multi-edit-table', { is: MultiEditTable });
    expectedTitle = 'My Title';
    columnList = '\\[{ "label" : "Fee Name", "apiName" : "FeeName" }, { "label" : "Amount", "apiName" : "Amount" }]';
    element.title = expectedTitle;
    element.columnList = columnList;
});

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('Multi Edit Tables Initialization', () => {
    it('should display the passed in title and columns', () => {
        document.body.appendChild(element);
        
        const header = element.shadowRoot.querySelector('h1');
        expect(header.textContent).toBe(expectedTitle);

        const columns = element.shadowRoot.querySelectorAll('th');
        expect(columns.length).toBe(2);

        let allColumnNames = Array.from(columns).reduce((columnNames, column) => {
            return columnNames.add(column.textContent);
        }, new Set())

        expect(allColumnNames.has('Fee Name')).toBe(true)
        expect(allColumnNames.has('Amount')).toBe(true)
    });

    it('should parse unescaped columnList string correctly', () => {
        element.columnList = '[{ "label" : "Fee Name", "apiName" : "FeeName" }]';
        document.body.appendChild(element);
        const column = element.shadowRoot.querySelector('th');

        expect(column.textContent).toBe("Fee Name");
    });

    it('should create an initial row with an input in each column', () => {
        document.body.appendChild(element);

        const rows = element.shadowRoot.querySelectorAll('tbody tr');
        expect(rows.length).toBe(1);

        const columns = element.shadowRoot.querySelectorAll('tbody tr td');
        expect(columns.length).toBe(3);

        const inputs = element.shadowRoot.querySelectorAll('tbody tr td c-input-table-cell');
        expect(inputs.length).toBe(2);

        const deleteButton = element.shadowRoot.querySelector('tbody tr td lightning-button');
        expect(deleteButton.label).toBe('Delete Row');

        const addRowButton = element.shadowRoot.querySelector('tfoot tr td lightning-button');
        expect(addRowButton.label).toBe('Add Row');
    });
});

describe('Multi Edit Tables Interaction', () =>{
    it('should add more rows', () => {
        document.body.appendChild(element);

        const addRowButton = element.shadowRoot.querySelector('tfoot tr td lightning-button');

        const clickEvent = new MouseEvent('click');
        addRowButton.dispatchEvent(clickEvent);

        // Use a promise to wait for asynchronous changes to the DOM
        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll('tbody tr');
            expect(rows.length).toBe(2);
        });
    });

    it('should remove rows', () => {
        document.body.appendChild(element);

        const deleteButton = element.shadowRoot.querySelector('tbody tr td lightning-button');
        const clickEvent = new MouseEvent('click');
        deleteButton.dispatchEvent(clickEvent);

        return Promise.resolve().then(() => {
            const rows = element.shadowRoot.querySelectorAll('tbody tr');
            expect(rows.length).toBe(0);
        });
    });
});