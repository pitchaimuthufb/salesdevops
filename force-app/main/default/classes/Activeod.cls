public with sharing class Activeod {
    @AuraEnabled (cacheable=true)
    public static List<Order> getAssets(){
        return [SELECT OrderNumber, Id FROM Order];        
    }
}