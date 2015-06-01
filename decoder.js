



//for every decoder, this file should have the following functions. How the functions accomplish their tasks is usually highly decoder-specific, but they must all appear the same to programs that call them. If your decoder does not have these functions, just make them not actually do anything (for example, if the timing is right with sound_notch, it wouldn't send any commands, it would just return "true") and that way you won't break any higher level things

//sound_notch(up or down) - This should be callable by the higher level notching system (Which is decoder-agnostic) and should have the option to notch up or down. It should also have a function that makes the system wait between notches, so a user can't go from notch 1 to 8 in 5 seconds. An example of this can be seen in the function below.
//It's VERY important that the function has a proper return system! If the notch is successful and allowed, return 0. if the notch is not allowed, return string "notAllowed"

//engine("start" or "stop") - This doesn't have to return anything,it's very simple


//notching system
var notchAllowed //this tells if the engine can safely go up a notch. Of course, the HO loco is electric, so it doesn't really matter, but we're shooting for realism here, and it's not really realistic to go from notch 0 to notch 8 in 1 second :P
function sound_notch(direction) {
    notchSuccess = false
    if (notchAllowed != false) {
        //don't allow another notch change for however long
        notchAllowed = false
        if (direction == "up") {
            notchSuccess = true
            //send commands to the decoder to make the prime mover sound "notch up"
            setTimeout(function() { sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F9":true, "throttle":"' + throttleName + '"}}'); console.log("Sent command")}, 500)
    setTimeout(function() { sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F9":false, "throttle":"' + throttleName + '"}}'); console.log("Sent command")},  1750)
            //after this long (in ms) allow notch change again
            setTimeout(function() {notchAllowed = true}, 7000)
        }
        else if (direction == "down") {
            notchSuccess = true
            //send commands to notch down
            setTimeout(function() { sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F10":true, "throttle":"' + throttleName + '"}}'); console.log("Sent command")}, 500)

    setTimeout(function() { sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F10":false, "throttle":"' + throttleName + '"}}'); console.log("Sent command")}, 1750)
            //after this long (in ms) allow notch change again
            setTimeout(function() {notchAllowed = true}, 7000)
            
        }
    }
    else {
    }
    return notchSuccess;
}


//engine start/stop, call with either true or false
function setEngine(dowhat) {
    if (dowhat == true) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F8":true, "throttle":"' + throttleName + '"}}');
        console.log("Started engine on EMD 567 ESU LokSound bad-to-the-bone decoder! :D This decoder.js file written by K4KFH");
        engine = true
    }
    else if (dowhat == false) {
        //add if(notch == 0) statement here later
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F8":false, "throttle":"' + throttleName + '"}}');
        console.log("Stopped engine on EMD 567 ESU LokSound bad-to-the-bone decoder! D:");
        engine = false
    }
}

//compressor and all other sounds (unless otherwise specified) are called with setSoundNameChosen(true/false)
//compressor
function setCompressor(dowhat) {
    if (dowhat == true) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F20":true, "throttle":"' + throttleName + '"}}');
        compressor = true
    }
    if (dowhat == false) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F20":false, "throttle":"' + throttleName + '"}}');
        compressor = false
    }
}


//air bell
function setBell(dowhat) {
    if (dowhat == true) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F1":true, "throttle":"' + throttleName + '"}}');
        bell = true
    }
    else if (dowhat == false) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F1":false, "throttle":"' + throttleName + '"}}');
        bell = false
    }
}

//air horn
function setHorn(dowhat) {
    if (dowhat == true) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F2":true, "throttle":"' + throttleName + '"}}');
        horn = true
    }
    if (dowhat == false) {
        sendcmd('{"type":"throttle","data":{"address":' + locoAddress + ', "F2":false, "throttle":"' + throttleName + '"}}');
        horn = false
    }
}
    