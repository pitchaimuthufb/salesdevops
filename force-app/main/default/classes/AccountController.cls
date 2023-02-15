public with sharing class AccountController{
    
    @AuraEnabled (cacheable=true)
    public static List<Asset> getAssets(){
        return [SELECT Id, Name, Product_Family__c, Division__c, Commissioning_Date__c, Image__c, Warranty__c FROM Asset];        
    }
}