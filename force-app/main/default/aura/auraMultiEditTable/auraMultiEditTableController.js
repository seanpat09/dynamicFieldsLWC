({
    addRow : function(component, event, helper) {
        let rows = component.get("v.rows");
        rows.push({});
        component.set("v.rows", rows);
        console.log(JSON.stringify(Array.from(component.get("v.rows"))));
    },

    deleteRow : function(component, event, helper) {
        let rowIndex = event.target.parentNode.getAttribute("data-index")
        let rows = component.get("v.rows");
        rows.splice(rowIndex, 1);
        component.set("v.rows", rows);
    },

    getRows : function(component, event, helper) {
        return component.get("v.rows");
    }
})
