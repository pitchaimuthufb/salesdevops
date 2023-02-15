/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { LightningElement, api, wire, track } from 'lwc';

import getContacts from '@salesforce/apex/AccountController.getAssets';
import getAsset from '@salesforce/apex/AssetCount.getAsset';
import getOpportunity from '@salesforce/apex/NumOfOpportunity.getOpportunity';
import getcase from '@salesforce/apex/NumOfCase.getcase';
import getorder from '@salesforce/apex/NumOfOrder.getorder';
import ActiveComplaints from '@salesforce/apex/ActiveComplaintsHomePageRecords.getAssets';
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

let i=0;

export default class DisplayContact extends LightningElement {
     /** Id of record to display. */
    @api recordId; //this captures AccountId which is passed from Parent Component
    @track error;   //this holds errors

    @track items = []; //this holds the array for records with value & label

    @track value = '';  //this displays selected value of combo box
    @track selectedLabel;
    
    /* Load Contacts based on AccountId from Controller */
    @wire(getAsset) wiredAsset;

    @wire(getOpportunity) wiredopp;
    @wire(getcase) wiredcase;
    @wire(getorder) wiredorder;
  
    @wire(getContacts)
    wiredContacts({ error, data }) {
       
        if (data) {
            for(i=0; i<data.length; i++) {
                console.log('id=' + data[i].Id);
                this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
            }                
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
    @wire(ActiveComplaints) WiredActiveComplaints;
    //getter property from statusOptions which return the items array
    get statusOptions() {
        console.log(this.items);
        console.log("Comei");
        return this.items;
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        this.selectedLabel = event.target.options.find(opt => opt.value === event.detail.value).label;
        const selectedOption = event.detail.value;
        console.log('selectedOption=' + selectedOption);

        //This is for event propagation
        
        const filterChangeEvent = new CustomEvent('filterchange', {
            detail: { selectedOption },
           
        });

        
        // Fire the custom event
        this.dispatchEvent(filterChangeEvent);
    }
    // textVisible(event){
    //     this.areDetailsVisible = true;
    // }
  
}