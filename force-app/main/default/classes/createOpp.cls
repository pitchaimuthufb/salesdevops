public with sharing class createOpp {
    @AuraEnabled
    
    public static Opportunity createOpportunity(Opportunity Opp, ID Oppid) {

        insert Opp;
        system.debug('Opp'+Opp);
        Oppid = Opp.Id;
        return Opp;
    }
}