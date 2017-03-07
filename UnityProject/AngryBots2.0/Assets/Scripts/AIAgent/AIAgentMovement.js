#pragma strict

public var horizontalMovement : float = 0;
public var verticalMovement : float = 0;

public var player : Transform;

private var playerLastPosition : Vector3;
private var stuckCheckPosition : Vector3;
private var timeSinceLastCheck : float;
private var leftOrRight : float; // 1 = Right and -1 = Left
private var upOrDown : float; // 1 = Up and -1 = Down



function Awake () {
	playerLastPosition = player.position;
	timeSinceLastCheck = Time.time;
	leftOrRight = 1;
	upOrDown = -1;
	stuckCheckPosition = player.position;
}

function Update () {
//	Debug.Log(Time.realtimeSinceStartup + " playerLastPos = " + playerLastPosition + "   player pos = " + player.position);

	move();

}

function move() {
	if(playerLastPosition == player.position) {
		changeVariables (0, upOrDown); //go down
	}
	else {
		
		changeVariables(leftOrRight, 0); //go right
	}
	if(Time.time - timeSinceLastCheck > .1)
		checkPosition();
	playerLastPosition = player.position;
}

function checkPosition () {
	if(Vector3.Distance(player.position, stuckCheckPosition) < .05)
		leftOrRight *= -1;
	stuckCheckPosition = player.position;
	timeSinceLastCheck = Time.time;
}


function changeVariables (hor : int, vert : int) {
	horizontalMovement = hor;
	verticalMovement = vert;
}
