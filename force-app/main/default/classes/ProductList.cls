public with sharing class ProductList {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getContactList() {
        return [
            SELECT Id, Name FROM Product2
        ];
    }
}