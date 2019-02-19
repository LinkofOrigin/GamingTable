'use strict';

/*

In separate browsers/windows, go to the local HTML file.
 1) For one of them, add `#1` to the URL. This will be the initiator.
 2) Copy/paste the data on the initiator's page to the box in the other browser (the receiver) and 'submit'.
 3) Copy/paste the receiver's new data that shows into the initiator's box and 'submit'.
 4) Now the browsers should be connected.

To send data, simply type "p.send('my message')" into the console. You should see it
appear in the other browser as well.

Resource: 
https://github.com/feross/simple-peer

 */


let peer;
function setupSimplePeerEvents(peer) {
    peer.on('error', function (err) {
        console.log('error', err);
    });

    peer.on('signal', function (data) {
        console.log('SIGNAL', JSON.stringify(data));
        document.querySelector('#outgoing').value = JSON.stringify(data);
    });

    document.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        peer.signal(JSON.parse(document.querySelector('#incoming').value));
    });

    peer.on('connect', function () {
        console.log('CONNECT');
        peer.send('We are connected!' + Math.random());
    });

    peer.on('data', function (data) {
        console.log('data: ' + data);
    });
}

function initSimplePeer(isInitiator) {
    peer = new SimplePeer({initiator: isInitiator, trickle: false});
    setupSimplePeerEvents(peer);
}

function userTypeSelected() {
    
}

// Setup click handlers for the host/join buttons
const initiatorButton = document.querySelector('.js-initiator');
initiatorButton.addEventListener('click', function() {
    initSimplePeer(true);
});

const receiverButton = document.querySelector('.js-receiver');
receiverButton.addEventListener('click', function() {
    initSimplePeer(false);
});

// Copies the SimplePeer signal key thing from the text field
let copyButton = document.querySelector('#copy_json');
copyButton.addEventListener('click', function () {
    let outgoingText = document.querySelector('#outgoing');
    outgoingText.select();
    document.execCommand('copy');
});