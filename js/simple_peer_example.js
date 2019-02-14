
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

var p = new SimplePeer({initiator: location.hash === '#initiator', trickle: false});

p.on('error', function (err) {
    console.log('error', err);
});

p.on('signal', function (data) {
    console.log('SIGNAL', JSON.stringify(data));
    document.querySelector('#outgoing').textContent = JSON.stringify(data);
});

document.querySelector('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    p.signal(JSON.parse(document.querySelector('#incoming').value));
});

p.on('connect', function () {
    console.log('CONNECT');
    p.send('whatever' + Math.random());
});

p.on('data', function (data) {
    console.log('data: ' + data);
});