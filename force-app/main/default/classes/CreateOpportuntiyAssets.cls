public with sharing class CreateOpportuntiyAssets {
    @AuraEnabled
    public static Opportunity_Assets__c createOpportunityAssets(Opportunity_Assets__c OppAssets) {
        system.debug('Opp'+OppAssets);
        insert OppAssets;
        return OppAssets;
    }
}
