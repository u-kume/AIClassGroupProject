#pragma strict

public class Flee extends AgentBehaviour {

	public override function GetSteering() : Steering {
		var steering : Steering = new Steering();
		steering.linear = transform.position - target.transform.position;
		steering.linear.Normalize();
		steering.linear = steering.linear * agent.maxAccel;
		return steering;
	}
}