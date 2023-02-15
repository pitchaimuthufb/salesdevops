import { LightningElement, wire, track } from 'lwc';
import getorders from '@salesforce/apex/ActiveComplaints.getAssets';
import getopp from '@salesforce/apex/ActiveEnquires.getAssets';
export default class Track extends LightningElement {
    @track visible;
    @wire(getorders) wireorder;
    @wire(getopp) wireOpportunity;
    }