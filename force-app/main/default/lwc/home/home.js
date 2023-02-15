import { LightningElement, api, wire } from 'lwc';

import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';
export default class home extends LightningElement {
   @api recordId;
   value = recordId;
   @wire(getRecord, {recordId: '$recordId', feilds: ['Product2.Name']})
   record;
  
   get option(){
    return this.record.data.fields.Name.value;
    console.log(this.record.data.fields.Name.value);
    Console.log("Amrith");
   }
}