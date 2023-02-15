import { LightningElement, wire } from 'lwc';
import contactRecord from '@salesforce/apex/TestContact.getChoosenProduct';
export default class Test extends LightningElement {

    @wire(contactRecord) WiredContact;
}