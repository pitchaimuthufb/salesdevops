public with sharing class LastOpportunityRecord {
    @AuraEnabled (cacheable=true)
    public static ID getLastOpportunityRecord() {
        List<Opportunity> conList = [SELECT Id FROM Opportunity  ORDER BY CreatedDate DESC LIMIT 1];        
     
        list<Opportunity> contwo = new list<Opportunity>();
        ID id;
        for(Opportunity con : conList)
        {
            System.Debug(con);
            id=con.Id;
            System.Debug(id);
            contwo.add(con);
            
        }
       
          return id;  
    }
}