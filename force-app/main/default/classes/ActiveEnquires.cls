public with sharing class ActiveEnquires {
    @AuraEnabled (cacheable=true)
    public static List<Opportunity> getAssets(){
        return [SELECT Id, Name, CreatedDate  FROM Opportunity];        
    }
}