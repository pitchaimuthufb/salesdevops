public with sharing class GetChosenProductRecord {
    @AuraEnabled (cacheable=true)
    public static List<Choose__c> getChoosenProduct(){
        return [SELECT Id, Name FROM Choose__c];        
    }
}