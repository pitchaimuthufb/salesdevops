public with sharing class CreateChosenProduct {
    @AuraEnabled
    public static Choose__c createChosenProduct(Choose__c ChosenProduct) {
       
        insert ChosenProduct;
        
        return ChosenProduct;

    }
}