({
    updateObject : function(component, event, helper) {
        let record = component.get("v.record");
        let field = component.get("v.field");
        let value = component.get("v.value");
        console.log(JSON.stringify(record))
        record[field] = value;
        component.set("v.record", record);
    }
})
