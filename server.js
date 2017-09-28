const express = require('express');
const wpi = require('wiring-pi');
const bodyParser = require('body-parser');

let pin = 7;
wpi.setup('wpi');
wpi.pinMode(pin, wpi.OUTPUT);


let app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/status', (req, res) => {
  if (wpi.digitalRead(pin) === 1) {
    res.send({status: 'off'})
  } else {
    res.send({status: 'on'})
  }
});

app.post('/light', (req, res) => {
  if (wpi.digitalRead(pin) === 1) {
    wpi.digitalWrite(pin, 0);
    res.send({status: 'on'})
  } else {
    wpi.digitalWrite(pin, 1);
    res.send({status: 'off'})
  }

});

app.listen(port, () => { console.log(`Server is up on port: ${port}`);});
