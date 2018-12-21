# Dynamic Multi Row Editable Tables using LWC

Quickly define an input table with columns that you can add rows to. Great if you need to capture multiple rows of input that are not necessarily mapped to an SObject

![Example Multi Edit Table](/images/DynamicTable.PNG)


## Usage

Use the web component as follows:

```
<c-multi-edit-table 
    column-list='\[{ "label" : "Name", "apiName" : "Name"} , { "label" : "Email", "apiName" : "Email" }, { "label" : "Phone", "apiName" : "Phone" }]'
    title='Attendees'>
</c-multi-edit-table>
```

`column-list` is a JSON string that will be parsed to create the columns of the table. Label will appear in the headers 