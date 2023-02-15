public with sharing class Order {
    @AuraEnabled(cacheable=true)
    public static List<Order> getorder() {
        return [
            SELECT Id FROM Order
        ];
    }
}