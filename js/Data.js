'use strict';

const INITIATOR = 1;
const RECEIVER = 2;

class Data {
    constructor() {
        if (window.location.hash.includes('initiator')) {
            this.userType = INITIATOR;
        }
        else {
            this.userType = RECEIVER;
        }
    }
    
    get getUserType() {
        return this.userType;
    } 
    
    
    
}

var user_data = new Data();