//this file is purely to cut down on the "OH NO THIS VARIABLE ISNT DEFINED!" errors. there are arrangements in everything to alert the user when the variable it needs == undefined, but it has to just have an undefined value. This takes care of that
var locoAddress //locomotive's DCC #
var throttleName //name given to throttle requested
var reverser  //direction locomotive should be in (neutral, forward, or reverse),
var JMRIhellomsg  //initial websockets hello message
var layoutRailroadName //the name of the railroad as set in JMRI prefs, only checked on initial connect
var notch = 0 //this is the notch the loco is currently in. DO NOT try to adjust the notch with this, it's only for reading. The only reason it's set here is because it's always supposed to start at 0. if you want to adjust the notch use the function setNotch("up"/"down")
var notchAllowed = true //this is set to true because the program assumes the locomotive is idling, and if we can't run setNotch() at least once it creates an impossibility

var prototypeMaxNotch = 8 //this is really just in case you have a weird 16 notcher or something, or you want to only allow up to a certain notch. It MUST be set though, if it's undefined the notching system will cease to function!

var locoMaxSpeed = 100 //if your locomotive's speed step system isn't really prototypical (you know, that one locomotive you have where 100 speed steps is like breaking the sound barrier?)

var layoutTrackPower_state //this is true if track power is on, false if it's off. When it's updated, updateHTML("layoutTrackPower_state") is called, which is an HTMLcab specific script inside ui.js

var locoBrake = 100 //this is set to 0 purely starting out, because reasons (better to be stopped unintentionally than driving off unintentionally,right?


//ALL LOCOMOTIVE PROTOTYPE SPECIFIC VARIABLES
//these variables help ProtoEngine accurately represent the behavior of the prototype
var prototypeHorsepower = 1350
var prototypeTopSpeed = 70
var prototypeMinRPM = 275
var prototypeMaxRPM = 800
var prototypeMinAmps = 0 //amperage basically set in perecent because I have no idea right now, but if you know the min/max generator amperage for your locomotive, you can set it here and it SHOULD work.
var prototypeMaxAmps = 100 //^^^
var prototypeMass = 108900 //this is in kg