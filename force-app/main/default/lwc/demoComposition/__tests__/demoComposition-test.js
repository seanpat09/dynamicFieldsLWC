import { createElement } from 'lwc';
import DemoComposition from 'c/demoComposition';

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('Demo Composition', () => {
    it('display multi edit tables', () => {
        const element = createElement('c-demo-composition', { is: DemoComposition });
        document.body.appendChild(element);
        const multiEditTables = element.shadowRoot.querySelectorAll('c-multi-edit-table');
        expect(multiEditTables.length).toBe(2);
    });
});