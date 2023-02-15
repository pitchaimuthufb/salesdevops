import { LightningElement, api, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/AccountController.getAssets';
import getAsset from '@salesforce/apex/AssetCount.getAsset';
import assets1 from '@salesforce/resourceUrl/Assets1';
let i=0;

export default class Assets extends LightningElement {
      /** Id of record to display. */
      @api recordId; //this captures AccountId which is passed from Parent Component
      @track error;   //this holds errors
  
      @track items = []; //this holds the array for records with value & label
  
      @track value = '';  //this displays selected value of combo box
      @track selectedLabel;
      assetsimage1 = assets1;
      /* Load Contacts based on AccountId from Controller */
      @wire(getContacts) wiredAsset;
    //   @wire(getContacts)
    //   wiredContacts({ error, data }) {
    //       if (data) {
    //           for(i=0; i<data.length; i++) {
    //               console.log('id=' + data[i].Id);
    //               this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
    //           }                
    //           this.error = undefined;
    //       } else if (error) {
    //           this.error = error;
    //           this.contacts = undefined;
    //       }
    //   }
     
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