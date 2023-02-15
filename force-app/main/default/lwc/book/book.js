import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import getAssets from '@salesforce/apex/AccountController.getAssets';
import getChosenProduct from '@salesforce/apex/GetChosenProductRecord.getChoosenProduct';

import getContactRecord from '@salesforce/apex/AccountId.getContactRecord';
import getAsset from '@salesforce/apex/AssetCount.getAsset';
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import StageName_FIELD from '@salesforce/schema/Opportunity.StageName';
import CloseDate_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import AccountId_FIELD from '@salesforce/schema/Opportunity.AccountId';
import createOpp from '@salesforce/apex/createOpp.createOpportunity';
import AccountIdOppAsset_FIELD from '@salesforce/schema/Opportunity_Assets__c.Account__c';
import OpportunityIdOppAsset_FIELD from '@salesforce/schema/Opportunity_Assets__c.Opportunity__c';
import AssertIdOppAsset_FIELD from '@salesforce/schema/Opportunity_Assets__c.Asset__c';
import createOppAssets from '@salesforce/apex/CreateOpportuntiyAssets.createOpportunityAssets';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createChosenProduct from '@salesforce/apex/CreateChosenProduct.createChosenProduct';
import ChosenProduct_Account_FIELD from '@salesforce/schema/Choose__c.Account__c';
import ChosenProduct_Name_FIELD from '@salesforce/schema/Choose__c.Name';
import ChosenProduct_Discription_FIELD from '@salesforce/schema/Choose__c.Description__c';
import ChosenProduct_Opportunity_FIELD from '@salesforce/schema/Choose__c.Opportunity__c';
import ChosenProduct_Quantity_FIELD from '@salesforce/schema/Choose__c.Quantity__c';

import cart from '@salesforce/resourceUrl/Cart';
import getLastOpportunityRecord from '@salesforce/apex/LastOpportunityRecord.getLastOpportunityRecord';
let i=0;

export default class Book extends LightningElement {
         textFieldValue;
         @api recordId; 
         @api accrecordid;
         @track error;   
         @track showLabel; 
         @track LastOpportunityid;  
         @track items = []; 
         @track item = []; 
         @track spareName = '';
           spareDescription;
           spareQuantity;
           serviceName;
           ServiceDescription;
           ServiceQuantity;
        AccountIdFromApex;
        @track i ='0';
        @track Assetsid;
         @track value = '';  
         @track ChosenProduct = '';
         @track selectedLabel;
         cartimage = cart;
         @track visible;
         @track unvisible;
         @track today;	
         @track name = NAME_FIELD;
         @track StageName= StageName_FIELD;
         @track CloseDate= CloseDate_FIELD;
         @track AccountId= AccountId_FIELD;
         @track AssertId = AssertIdOppAsset_FIELD;
         @track OpportunityId = OpportunityIdOppAsset_FIELD;
         @track AccountIdOpportunityAssert = AccountIdOppAsset_FIELD;
        @track ChodenProductName = ChosenProduct_Name_FIELD;
        @track ChosenProductDiscription = ChosenProduct_Discription_FIELD;
        @track ChodenProductQuantity = ChosenProduct_Quantity_FIELD;
        @track ChodenProductAccount = ChosenProduct_Account_FIELD;
        @track ChodenProductOpportunity = ChosenProduct_Opportunity_FIELD;
         currentoppid;
         rec = {
            Name : this.name,
            StageName : this.StageName,
            CloseDate : this.CloseDate,
             AccountId : this.AccountId
        }
    
        oppAsert = {
            Account__c : this.AccountIdOpportunityAssert,
            Opportunity__c : this.OpportunityId,
            Asset__c: this.AssertId
        }

        ChosenProduct = {
            Name : this.ChodenProductName,
            Account__c : this.ChodenProductAccount,
            Opportunity__c : this.ChodenProductOpportunity,
            Quantity__c : this.ChosenProduct_Quantity_FIELD,

            Description__c : this.ChosenProductDiscription
        }
       
        
          
          @wire(getContactRecord) wireAccountId({ error, data }) {
            if (data) {
              
              this.AccountIdFromApex = data;
            } else if (error) {
              console.log(error);
            }
          }
          
          @wire(createOpp) 
allConstants ({error, data}) {
    if (data) {
        this.LastOpportunityid = data.Oppid;
    } else {
        this.error = error;
    }
} 
  
         @wire(getAsset) wiredAsset;
         @wire(getAssets)
         wiredAssets({ error, data }) {
             if (data) {
                 for(i=0; i<data.length; i++) {
                     console.log('id=' + data[i].Id);
                     this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
                 }                
                 this.error = undefined;
             } else if (error) {
                 this.error = error;
                 this.Assets = undefined;
             }
         }
         @wire(getChosenProduct)
         wiredChosenProduct({ error, data }) {
             if (data) {
                 for(i=0; i<data.length; i++) {
                     console.log('id=' + data[i].Id);
                     this.item = [...this.item ,{ChosenProduct: data[i].Id , label: data[i].Name}];                                   
                 }                
                 this.error = undefined;
             } else if (error) {
                 this.error = error;
                 this.Choose__c = undefined;
             }
         }
        spareNameText(event){
            this.textFieldValue = event.target.value;
        }
        spareDiscritionText(event){
            this.spareDescription = event.target.value;
        }
        spareQuantityText(event){
            this.spareQuantity = event.target.value;
        }
        ServiceNameText(event){
            this.serviceName = event.target.value;
        }
        ServiceDiscritionText(event){
            this.ServiceDescription = event.target.value;
        }
        ServiceQuantityText(event){
            this.ServiceQuantity = event.target.value;
        }
         get statusOptions() {
            
             return this.items;
         }
         get statusOption() {
            
            return this.item;
        }
         spareName(event){
            this.spareName = event.target.value;
         }
         handleChange(event) {
            this.selectedLabel = event.target.options.find(opt => opt.value === event.detail.value).label;
     
       
         }
         spareButtonClick(){
                  
            this.i = '1';
                this.rec.Name = 'Service';
                  this.today = new Date();
            
            this.rec.StageName = 'Closed Won';
            this.rec.CloseDate = this.today;
            
                console.log('Account id');
            console.log(this.showLabel);
           
            this.rec.AccountId = this.AccountIdFromApex;
          
           
            createOpp({ Opp: this.rec })
            .then(result => {
                //this.message = result;

                this.LastOpportunityid = result.Id;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.StageName = '';
                    this.rec.CloseDate = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                console.log('before enter to the wire opportnity id',this.LastOpportunityid);
                console.log(JSON.stringify(result));
                console.log("result", this.message);
               
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
         }
        
        //  @wire(getLastOpportunityRecord) wireOpportunityLastRecordId({ error, data }) {
        //     if (data) {
              
        //       this.LastOpportunityid = data;
        //       console.log('ofter enter to the wire opportnity id',this.LastOpportunityid);
        //     } else if (error) {
        //       console.log(error);
        //     }
        //   }
         serviceButtonClick()
         {
            this.i = '2';
         }
         
       
         handleClick() {
             this.oppAsert.Account__c = this.AccountIdFromApex;
            this.oppAsert.Asset__c = this.Assetsid;
            this.oppAsert.Opportunity__c =this.LastOpportunityid;
            console.log('Opportunity object Detailes');
           console.log(this.oppAsert.Account__c);
           console.log(this.oppAsert.Asset__c);
           console.log(this.oppAsert.Opportunity__c);
            
           createOppAssets({ OppAssets: this.oppAsert})
           .then(result => {
               this.message = result;
               this.error = undefined;
               if(this.message !== undefined) {
                   this.oppAsert.Account__c = '';
                   this.oppAsert.Asset__c = '';
                   this.oppAsert.Opportunity__c = '';
                   this.dispatchEvent(
                       new ShowToastEvent({
                           title: 'Success',
                           message: 'Account created',
                           variant: 'success',
                       }),
                   );
               }
               
               console.log(JSON.stringify(result));
               console.log("result", this.message);
           })
           .catch(error => {
               this.message = undefined;
               this.error = error;
               this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Error creating record',
                       message: error.body.message,
                       variant: 'error',
                   }),
               );
               console.log("error", JSON.stringify(this.error));
           });
           if(this.i === '1')
           {
            this.ChosenProduct.Name = this.textFieldValue;
            this.ChosenProduct.Account__c = this.AccountIdFromApex;
            this.ChosenProduct.Description__c = this.spareDescription;
           }
           else if(this.i === '2')
           {
            this.ChosenProduct.Name = this.textFieldValue;
            this.ChosenProduct.Account__c = this.AccountIdFromApex;
            this.ChosenProduct.Description__c = this.spareDescription;
           }
           
           this.ChosenProduct.Opportunity__c = this.LastOpportunityid;
           this.ChosenProduct.Quantity__c = this.spareQuantity;
            createChosenProduct({ ChosenProduct: this.ChosenProduct })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.ChodenProductName = '';
                    this.ChodenProductAccount = '';
                   this.ChodenProductOpportunity = '';
		this.ChosenProduct_Quantity_FIELD = '';
		this.ChosenProductDiscription = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
               
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating ChosenProductord',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
            }
           
            handleClickk(event) {  
                this.unvisible = true;
                this.visible = true;
                
            }
 }
