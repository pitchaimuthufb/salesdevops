public with sharing class ActiveComplaintsHomePageRecords {
    @AuraEnabled (cacheable=true)
    public static List<Opportunity> getAssets(){
        return [SELECT Id, Name, CreatedDate FROM Opportunity  ORDER BY CreatedDate DESC LIMIT 4];        
    }
}