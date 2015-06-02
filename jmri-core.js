//this contains decoder-agnostic functions for JMRI

//with the current getThrottle() function, you can only have one throttle per instance of LocoThrottleJS. it sets the variables for the rest of the program's throttle info and address info there, so no need to set it yourself.


//getthrottle grabs a throttle for a locomotive, and refers to it as whatever throttlename is
function getThrottle(address, name) {
    sendcmd('{"type":"throttle","data":{"throttle":"' + name + '","address":' + address + '}}')
    console.log("Requested throttle " + name + " for locomotive #" + address)
    locoAddress = address
    throttleName = name
    
}



//call with state as string, either "on", "off", or "toggle"
function trkpower(option) {
    if (option == "on") {
        sendcmd('{"type":"power","data":{"state":2}}')
        console.log("Track power set to ON")
    }
    else if (option == "off") {
        sendcmd('{"type":"power","data":{"state":4}}')
        console.log("Track power set to OFF")
    }
    
    else if (option == "toggle") {
        //if track power is currently on, turn it off
        if (layoutTrackPower_state == true) {
            sendcmd('{"type":"power","data":{"state":4}}')
        console.log("Track power set to OFF")
        }
        //if its currently off, turn it on
        else if (layoutTrackPower_state == false) {
            sendcmd('{"type":"power","data":{"state":2}}')
        console.log("Track power set to ON")
        }
    }
}
    