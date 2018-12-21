import { createElement } from 'lwc';
import MultiEditTable from 'c/multiEditTable';

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('Multi Edit Tables', () => {
    it('should display passed in title and columns', () => {
        const element = createElement('c-multi-edit-table', { is: MultiEditTable });
        const expectedTitle = 'My Title';
        const columnList = '\\[{ "label" : "Fee Name", "apiName" : "FeeName" }, { "label" : "Amount", "apiName" : "Amount" }]';
        element.title = expectedTitle;
        element.columnList = columnList;
        document.body.appendChild(element);
        
        const header = element.shadowRoot.querySelector('h1');
        expect(header.textContent).toBe(expectedTitle);
    });
});