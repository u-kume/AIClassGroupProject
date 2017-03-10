#pragma strict

public class Arrive extends AgentBehaviour {

	public var targetRadius : float;
	public var slowRadius : float;
	public var timeToTarget: float = 0.1;
	
	
	public override function GetSteering() : Steering {
		//Computing the speed depending of the distance to the 
		// target according to the radii variables
		var steering : Steering = new Steering();
		var direction : Vector3 = target.transform.position - transform.position;
		var distance : float = direction.magnitude;
		var targetSpeed: float ;
		if (distance < targetRadius)
			return steering;
		if (distance > slowRadius)
			targetSpeed = agent.maxSpeed;
		else	
			targetSpeed = agent.maxSpeed * distance / slowRadius;
			
		//set the steering value and clamp it according to the 
		//maximum speed
		var desiredVelocity : Vector3 = direction;
		desiredVelocity.Normalize();
		desiredVelocity *= targetSpeed;
		steering.linear = desiredVelocity - agent.velocity;
		steering.linear /= timeToTarget;
		if(steering.linear.magnitude > agent.maxAccel) {
			steering.linear.Normalize();
			steering.linear *= agent.maxAccel;
		}
		return steering;
	}
}