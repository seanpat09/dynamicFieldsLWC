({
    submit : function(component, event, helper) {
        let data = [];
        data.push(Array.from(component.find("attendees").retrieveData()));
        data.push(Array.from(component.find("fees").retrieveData()));

        let action = component.get("c.submitRecords");
        action.setParams({ records : data });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                alert('Success!');
            } else {
                alert('Something went wrong...');
            }
        });

        $A.enqueueAction(action);
    }
})
