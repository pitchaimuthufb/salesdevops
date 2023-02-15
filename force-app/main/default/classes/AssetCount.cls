public with sharing class AssetCount {
    @AuraEnabled (cacheable=true)
    public static List<Asset> getAsset(){
        return [SELECT Id, Number_Of_Asset__c FROM Asset LIMIT 1];        
    }
}