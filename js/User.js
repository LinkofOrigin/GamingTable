'use strict';

const INITIATOR = 1;
const RECEIVER = 2;

class User {
    constructor() {
        if (window.location.hash.includes('initiator')) {
            this.type = INITIATOR;
        }
        else {
            this.type = RECEIVER;
        }
    }
    
    
}

var user_data = new User();