public class NumOfOpportunity {
    @AuraEnabled (cacheable=true)
    public static Integer getOpportunity(){
        

        return [Select count() from Opportunity where CreatedById=:UserInfo.getUserId()];  
    }
}