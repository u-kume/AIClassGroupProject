#pragma strict

/* This class represents the free moving and rotating of the agent.
 *	This class has movement logic for the camera, Agent, and cursor.
 *	This class has logic for a user to move the Agent if the agent gets stuck
 */
public class AIAgentMovement extends AIAgent{

	public var motor : AIAgentMovementMotor;
	public var cursorPrefab : GameObject;

	// Settings
	public var cameraSmoothing : float = 0.01;
	public var cameraPreview : float = 2.0f;

	// Cursor settings
	public var cursorPlaneHeight : float = 0;
	public var cursorFacingCamera : float = 0;
	public var cursorSmallerWithDistance : float = 0;
	public var cursorSmallerWhenClose : float = 1;


	//private
	private var mainCamera : Camera;

	private var cursorObject : Transform;

	private var mainCameraTransform : Transform;
	private var cameraVelocity : Vector3 = Vector3.zero;
	public var cameraOffset : Vector3 = Vector3.zero;
	public var initOffsetToPlayer : Vector3;

	// Prepare a cursor point varibale. This is the mouse position on PC and controlled by the thumbstick on mobiles.
	private var cursorScreenPosition : Vector3;

	private var agentMovementPlane : Plane;

	private var screenMovementSpace : Quaternion;
	private var screenMovementForward : Vector3;
	private var screenMovementRight : Vector3;

	private var agentCollider : AgentCollider;

	//This function is called whenever this object is awoken.
	//	It is used to set the initial data inside certian variables that need to be initialized
	public function Awake() {
		agentCollider = GetComponent.<AgentCollider>();

		motor.movementDirection = Vector2.zero;
		motor.facingDirection = Vector2.zero;

		// Set main camera
		mainCamera = Camera.main;
		mainCameraTransform = mainCamera.transform;

		initOffsetToPlayer = mainCameraTransform.position - agentTransform.position;

		#if !UNITY_FLASH
			if (cursorPrefab) {
				cursorObject = (Instantiate (cursorPrefab) as GameObject).transform;
			}
		#endif

		// Save camera offset so we can use it in the first frame
		cameraOffset = mainCameraTransform.position - agentTransform.position;

		// Set the initial cursor position to the center of the screen
		cursorScreenPosition = Vector3 (0.5 * Screen.width, 0.5 * Screen.height, 0);

		// caching movement plane
		agentMovementPlane = new Plane (agentTransform.up, agentTransform.position + agentTransform.up * cursorPlaneHeight);

	}


	//This function is called before everything else and is used to screen movement for later
	public function Start() {
		// it's fine to calculate this on Start () as the camera is static in rotation
		screenMovementSpace = Quaternion.Euler (0, mainCameraTransform.eulerAngles.y, 0);
		screenMovementForward = screenMovementSpace * Vector3.forward;
		screenMovementRight = screenMovementSpace * Vector3.right;
	}


	//This function is called once every frame and is used to get the new movement of the Agent and to set
	//	the camera movement and the cursor.
	public function Update() {

		motor.movementDirection = Input.GetAxis ("Horizontal") * screenMovementRight + Input.GetAxis ("Vertical") * screenMovementForward;
		// Make sure the direction vector doesn't exceed a length of 1
		// so the character can't move faster diagonally than horizontally or vertically
		if (motor.movementDirection.sqrMagnitude > 1)
			motor.movementDirection.Normalize();

		// HANDLE CHARACTER FACING DIRECTION AND SCREEN FOCUS POINT

		// First update the camera position to take into account how much the character moved since last frame
		//mainCameraTransform.position = Vector3.Lerp (mainCameraTransform.position, character.position + cameraOffset, Time.deltaTime * 45.0f * deathSmoothoutMultiplier);

		// Set up the movement plane of the character, so screenpositions
		// can be converted into world positions on this plane
		//playerMovementPlane = new Plane (Vector3.up, character.position + character.up * cursorPlaneHeight);

		// optimization (instead of newing Plane):

		agentMovementPlane.normal = agentTransform.up;
		agentMovementPlane.distance = -agentTransform.position.y + cursorPlaneHeight;

		// used to adjust the camera based on cursor or joystick position
		var cameraAdjustmentVector : Vector3 = Vector3.zero;

		#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)

			// On consoles use the analog sticks
			var axisX : float = Input.GetAxis("LookHorizontal");
			var axisY : float = Input.GetAxis("LookVertical");
			motor.facingDirection = axisX * screenMovementRight + axisY * screenMovementForward;

			cameraAdjustmentVector = motor.facingDirection;

		#else

		var tempTransform = agentCollider.getFirstTarget();
		var cursorScreenPosition : Vector3;
		if(tempTransform == null)
			cursorScreenPosition = Vector3 (0.5 * Screen.width, 0.5 * Screen.height, 0);
		else
			cursorScreenPosition = mainCamera.WorldToScreenPoint(tempTransform.position);

		// On PC, the cursor point is the mouse position
		//var cursorScreenPosition : Vector3 = Input.mousePosition;

		// Find out where the mouse ray intersects with the movement plane of the player
		var cursorWorldPosition : Vector3 = ScreenPointToWorldPointOnPlane (cursorScreenPosition, agentMovementPlane, mainCamera);

		var halfWidth : float = Screen.width / 2.0f;
		var halfHeight : float = Screen.height / 2.0f;
		var maxHalf : float = Mathf.Max (halfWidth, halfHeight);

		// Acquire the relative screen position
		var posRel : Vector3 = cursorScreenPosition - Vector3 (halfWidth, halfHeight, cursorScreenPosition.z);
		posRel.x /= maxHalf;
		posRel.y /= maxHalf;

		cameraAdjustmentVector = posRel.x * screenMovementRight + posRel.y * screenMovementForward;
		cameraAdjustmentVector.y = 0.0;

		// The facing direction is the direction from the character to the cursor world position
		motor.facingDirection = (cursorWorldPosition - agentTransform.position);
		motor.facingDirection.y = 0;

		#endif

		// Draw the cursor nicely
		HandleCursorAlignment (cursorWorldPosition);

		// HANDLE CAMERA POSITION

		// Set the target position of the camera to point at the focus point
		var cameraTargetPosition : Vector3 = agentTransform.position + initOffsetToPlayer + cameraAdjustmentVector * cameraPreview;

		// Apply some smoothing to the camera movement
		mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, cameraTargetPosition, cameraVelocity, cameraSmoothing);

		// Save camera offset so we can use it in the next frame
		cameraOffset = mainCameraTransform.position - agentTransform.position;
	}


	//This function is used to take a Point on the screen and transform it to a real position in the 3D world
	public static function ScreenPointToWorldPointOnPlane (screenPoint : Vector3, plane : Plane, camera : Camera) : Vector3 {
		// Set up a ray corresponding to the screen position
		var ray : Ray = camera.ScreenPointToRay (screenPoint);

		// Find out where the ray intersects with the plane
		return PlaneRayIntersection (plane, ray);
	}


	//This function is used to find at what point a plane and a ray intersect
	public static function PlaneRayIntersection (plane : Plane, ray : Ray) : Vector3 {
		var dist : float;
		plane.Raycast (ray, dist);
		return ray.GetPoint (dist);
	}


	//This function moves the cursor to where ever the agent is aiming at
	//	This function also decreases or increases the size of the cursor depending on how far from the agent
	//		the cursor is
	function HandleCursorAlignment (cursorWorldPosition : Vector3) {
		if (!cursorObject)
			return;

		// HANDLE CURSOR POSITION

		// Set the position of the cursor object
		cursorObject.position = cursorWorldPosition;


		// HANDLE CURSOR ROTATION

		var cursorWorldRotation : Quaternion = cursorObject.rotation;
		if (motor.facingDirection != Vector3.zero)
			cursorWorldRotation = Quaternion.LookRotation (motor.facingDirection);

		// Calculate cursor billboard rotation
		var cursorScreenspaceDirection : Vector3 = Input.mousePosition - mainCamera.WorldToScreenPoint (transform.position + agentTransform.up * cursorPlaneHeight);
		cursorScreenspaceDirection.z = 0;
		var cursorBillboardRotation : Quaternion = mainCameraTransform.rotation * Quaternion.LookRotation (cursorScreenspaceDirection, -Vector3.forward);

		// Set cursor rotation
		cursorObject.rotation = Quaternion.Slerp (cursorWorldRotation, cursorBillboardRotation, cursorFacingCamera);


		// HANDLE CURSOR SCALING

		// The cursor is placed in the world so it gets smaller with perspective.
		// Scale it by the inverse of the distance to the camera plane to compensate for that.
		var compensatedScale : float = 0.1 * Vector3.Dot (cursorWorldPosition - mainCameraTransform.position, mainCameraTransform.forward);

		// Make the cursor smaller when close to character
		var cursorScaleMultiplier : float = Mathf.Lerp (0.7, 1.0, Mathf.InverseLerp (0.5, 4.0, motor.facingDirection.magnitude));

		// Set the scale of the cursor
		cursorObject.localScale = Vector3.one * Mathf.Lerp (compensatedScale, 1, cursorSmallerWithDistance) * cursorScaleMultiplier;
	}
}

//Code to use in free movement and check being stuck
/*
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
}*/
