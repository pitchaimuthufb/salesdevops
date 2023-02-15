public with sharing class TestContact{
    @AuraEnabled (cacheable=true)
    public static List<Contact> getChoosenProduct(){
        return [SELECT Id, Name FROM Contact];        
    }
}