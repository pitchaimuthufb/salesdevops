public class NumOfOrder {
    @AuraEnabled (cacheable=true)
    public static Integer getorder(){
        

        return [Select count() from Order where CreatedById=:UserInfo.getUserId()];  
    }
}