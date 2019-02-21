# Dynamic Multi Row Editable Tables using LWC

Quickly define an input table with columns that you can add rows to. Great if you need to capture multiple rows of input that are not necessarily mapped to an SObject

![Example Multi Edit Table](/images/DynamicTable.PNG)

## Installation in a Scratch Org

See https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components to get set up with LWC.

Clone this repository and open in Visual Studio Code

### Authorize a Dev Hub
* In Visual Studio Code, press `Command` + `Shift` + `P` on macOS or `Ctrl` + `Shift` + `P` on Windows or Linux.
* Type `sfdx`.
* Select `SFDX: Authorize a Dev Hub`
* Log in with credentials for your Developer Org with Dev Hub enabled
* Click Allow.
* After you authenticate in the browser, the CLI remembers your Dev Hub credentials and you should a success message in the Output window in VS Code

### Create a Default Scratch Org
* In Visual Studio Code, press `Command` + `Shift` + `P` on macOS or `Ctrl` + `Shift` + `P` on Windows or Linux.
* Type `sfdx`.
* Select `SFDX: Create a Default Scratch Org....`
* Press Enter to accept the default `project-scratch-def.json`
* Press Enter to accept the default scratch org alias
* Press Enter to accept the default 7 days scratch org duration
* Be patient, creating a scratch org can take a minute. A success message will appear in Output window in Visual Studio Code once complete with a message like `Successfully created scratch org...`

### Push Source to Scratch Org
* In Visual Studio Code, press `Command` + `Shift` + `P` on macOS or `Ctrl` + `Shift` + `P` on Windows or Linux.
* Type `sfdx`.
* Select `SFDX: Push Source to Default Scratch Org`
* Since is this is the first time your pushing your source code to your scratch org, this may take a minute. When complete, you'll see the results in the Output window in Visual Studio Code.
* This is the same command you'll use to push any changes you make your source code. This command does a diff and only pushes code that has actually changed, so subsequent pushes will be faster than the initial one.

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
