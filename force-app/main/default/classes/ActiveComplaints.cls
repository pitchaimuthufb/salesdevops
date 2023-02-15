public with sharing class ActiveComplaints {
  
        @AuraEnabled (cacheable=true)
    public static List<Case> getAssets(){
        return [SELECT CaseNumber, Id, CreatedDate FROM Case];        
    }

}