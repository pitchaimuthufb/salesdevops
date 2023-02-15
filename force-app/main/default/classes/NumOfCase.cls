public class NumOfCase {
    @AuraEnabled (cacheable=true)
    public static Integer getcase(){
        

        return [Select count() from Case where CreatedById=:UserInfo.getUserId()];  
    }
}