#pragma strict

public var mouseDownSignals : SignalSender;
public var mouseUpSignals : SignalSender;

private var state : boolean = false;
private var needToFire : boolean = false;
private var timeSinceFire : float;



#if UNITY_IPHONE || UNITY_ANDROID || UNITY_WP8 || UNITY_BLACKBERRY
private var joysticks : Joystick[];

function Start () {
	joysticks = FindObjectsOfType (Joystick) as Joystick[];	
	timeSinceFire = Time.time;
}
#endif

function Update () {
#if UNITY_IPHONE || UNITY_ANDROID || UNITY_WP8 || UNITY_BLACKBERRY
	if (state == false && joysticks[0].tapCount > 0) {
		mouseDownSignals.SendSignals (this);
		state = true;
	}
	else if (joysticks[0].tapCount <= 0) {
		mouseUpSignals.SendSignals (this);
		state = false;
	}	
#else	
	#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)
		// On consoles use the right trigger to fire
		var fireAxis : float = Input.GetAxis("TriggerFire");
		if (state == false && fireAxis >= 0.2) {
			mouseDownSignals.SendSignals (this);
			state = true;
		}
		else if (state == true && fireAxis < 0.2) {
			mouseUpSignals.SendSignals (this);
			state = false;
		}
	#else
		if (state == false && Input.GetMouseButtonDown (0)) {
			mouseDownSignals.SendSignals (this);
			state = true;
		}
		
		else if (state == true && Input.GetMouseButtonUp (0)) {
			mouseUpSignals.SendSignals (this);
			state = false;
		}
	#endif
#endif

	if(needToFire == true)
	{
		if(Time.time - timeSinceFire > .2) {
			mouseDownSignals.SendSignals(this);
			timeSinceFire = Time.time;	
		}
	}
		
}


public function aiAgentStartFiring() {
	needToFire = true;
}

public function aiAgentStopFiring() {
	needToFire = false;
	mouseUpSignals.SendSignals(this);
}
