#pragma strict

public class Agent extends MonoBehaviour {

	public var maxSpeed : float;
	public var maxAccel : float;
	public var orientation : float;
	public var rotation : float;
	public var velocity : Vector3;
	public var steering : Steering;
	
	//facing an object set of variables
	public var maxRotation : float;
	public var maxAngularAccel : float;
	
	public function Start () {
		velocity = Vector3.zero;
		steering = new Steering();
	}
	
	public function SetSteering (steering : Steering) {
		this.steering = steering;
	}
	
	public function Update () {
		var displacement : Vector3 = this.velocity * Time.deltaTime;
		this.orientation += rotation * Time.deltaTime;
		//we need to limit the orientation values
		//to be in the range (0 - 360)
		if(this.orientation < 0.0)
			this.orientation += 360.0;
		else if (this.orientation > 360.0)
			this.orientation -= 360.0;
		transform.Translate(displacement, Space.World);
		transform.rotation = new Quaternion ();
		transform.Rotate(Vector3.up, this.orientation);
	}
	
	public function LateUpdate () {
		this.velocity += this.steering.linear * Time.deltaTime;
		this.rotation += this.steering.angular * Time.deltaTime;
		if(this.velocity.magnitude > this.maxSpeed) {
			this.velocity.Normalize();
			this.velocity = this.velocity * maxSpeed;
		}
		if(this.steering.angular == 0.0) {
			this.rotation = 0.0;
		}
		if(this.steering.linear.sqrMagnitude == 0.0) {
			this.velocity = Vector3.zero;
		}
		this.steering = new Steering();
	}

}