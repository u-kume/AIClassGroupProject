#pragma strict

public class Leave extends AgentBehaviour {
	
	public var escapeRadius : float;
	public var dangerRadius : float;
	public var timeToTarget : float = 0.1;
	
	public override function GetSteering() : Steering {
		var steering : Steering = new Steering();
		var direction : Vector3 = transform.position - target.transform.position;
		var distance : float = direction.magnitude;
		
		if(distance > dangerRadius)
			return steering;
		var reduce : float;
		if(distance < escapeRadius)
			reduce = 0.0;
		else
			reduce = distance / dangerRadius * agent.maxSpeed;
		var targetSpeed : float = agent.maxSpeed - reduce;
		
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