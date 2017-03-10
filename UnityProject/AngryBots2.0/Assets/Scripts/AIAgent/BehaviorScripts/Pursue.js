#pragma strict

public class Pursue extends Seek {

	public var maxPrediction : float;
	
	private var targetAux : GameObject;
	private var targetAgent : Agent;
	
	public override function Awake () {
		super.Awake();
		targetAgent = target.GetComponent.<Agent>();
		targetAux = target;
		target = new GameObject();
	}
	
	function OnDestroy () {
		Destroy(targetAux);
	}
	
	public override function GetSteering() : Steering {
		var direction : Vector3 = targetAux.transform.position - transform.position;
		var distance : float = direction.magnitude;
		var speed : float = agent.velocity.magnitude;
		var prediction : float;
		if(speed <= distance / maxPrediction)
			prediction = maxPrediction;
		else 
			prediction = distance / speed;
		target.transform.position = targetAux.transform.position;
		target.transform.position += targetAgent.velocity * prediction;
		return super.GetSteering();	
	}
}