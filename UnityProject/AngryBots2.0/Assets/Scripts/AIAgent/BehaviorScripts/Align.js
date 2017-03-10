#pragma strict

public class Align extends AgentBehaviour {
	
	public var targetRadius : float;
	public var slowRadius : float;
	public var timeToTarget : float = 0.1;
	
	public override function GetSteering() : Steering {
		var steering : Steering = new Steering();
		var targetOrientation : float = target.GetComponent.<Agent>().orientation;
		var rotation : float = targetOrientation - agent.orientation;
		rotation = MapToRange(rotation);
		var rotationSize : float = Mathf.Abs(rotation);
		if (rotationSize < targetRadius)
			return steering;
		var targetRotation : float;
		if(rotationSize > slowRadius)
			targetRotation = agent.maxRotation;
		else
			targetRotation = agent.maxRotation * rotationSize / slowRadius;
		targetRotation *= rotation / rotationSize;
		steering.angular = targetRotation - agent.rotation;
		steering.angular /= timeToTarget;
		var angularAccel : float = Mathf.Abs(steering.angular);
		if(angularAccel > agent.maxAngularAccel) {
			steering.angular /= angularAccel;
			steering.angular *= agent.maxAngularAccel;
		}
		return steering;
	}
}