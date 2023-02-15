public with sharing class Product {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getContactList() {
        return [
            SELECT Id, Name FROM Product2
        ];
    }
}