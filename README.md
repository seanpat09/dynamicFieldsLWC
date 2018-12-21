# Dynamic Multi Row Editable Tables using LWC

Quickly define an input table with columns that you can add rows to. Great if you need to capture multiple rows of input that are not necessarily mapped to an SObject

![Example Multi Edit Table](/images/DynamicTable.PNG)

## Installation

LWC is not GA yet, but is available in pre-release orgs. See https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components to get set up with LWC.

Then upload this app to your org using SFDX. If you need to use the Metadata API, you can convert this app using `sfdx force:source:convert -r force-app`, but I haven't tried deploying this using ANT yet.

## Usage

Use the web component as follows:

```
<c-multi-edit-table 
    column-list='\[{ "label" : "Name", "apiName" : "Name"} , { "label" : "Email", "apiName" : "Email" }, { "label" : "Phone", "apiName" : "Phone" }]'
    title='Attendees'>
</c-multi-edit-table>
```

`column-list` is a JSON string that will be parsed to create the columns of the table. Label will appear in the header of table and apiName will be used for the keys of the object when fetching data from the table

`title` is used as the title of the table

use the web component method `retrieveRecords()` to get a list of objects built from the inputs of the table. Order is not preserved. Your implementation will need to handle sending this data to your Apex controller. See demoComposition for an example.

## Running tests

First install node modules. Run `npm install` at the base of your app. Once that is complete run `npm run test:unit`. There are a few issues with `lwc-jest` and Windows, I was only able to get the tests working in Windows Subsystem for Linux (WSL) 