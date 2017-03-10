#pragma strict

public class Seek extends AgentBehaviour {

	public override function GetSteering () : Steering {
		var steering : Steering = new Steering();
		steering.linear = target.transform.position - transform.position;
		steering.linear.Normalize();
		steering.linear = steering.linear * agent.maxAccel;
		return steering;
	}
}