#pragma strict

public class AgentBehaviour extends MonoBehaviour {
	//first set of variables
	public var target : GameObject;
	protected var agent : Agent;
	
	
	
	
	public function Awake () {
		agent = gameObject.GetComponent.<Agent>();
	}
	
	public function Update() {
		agent.SetSteering(GetSteering());
	}
	
	public function GetSteering() : Steering {
		return new Steering();
	}
	
	//helps in finding the actual direction of rotation after 
	//two orentation vaules are subtracted
	public function MapToRange(rotation : float) : float {
		rotation = rotation % 360.0;
		if(Mathf.Abs(rotation) > 180.0) {
			if(rotation < 0.0f)
				rotation += 360.0;
			else 
				rotation -= 360.0;
		} 
		return rotation;
	}
	
}