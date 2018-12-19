public with sharing class MultiEditTableController {
    @AuraEnabled
    public static void submitRecords(List<List<Map<String,String>>> records) {
        system.debug(records);
    }
}
