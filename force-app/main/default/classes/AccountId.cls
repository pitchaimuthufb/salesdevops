public with sharing class AccountId {
     @AuraEnabled (cacheable=true)
    public static ID getContactRecord(){
		
     List<Contact> conList = [Select Id, AccountId from Contact where Email=:UserInfo.getUserEmail()];  
        list<contact> contwo = new list<contact>();
        ID id;
        for(Contact con : conList)
        {
            System.Debug(con);
            id=con.AccountId;
            System.Debug(id);
            contwo.add(con);
            
        }
       
          return id;   
	       
    }
}