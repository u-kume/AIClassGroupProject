#pragma strict

public class AIAgent extends MonoBehaviour {

	public var agentHealth : float;
	public var agentTransform : Transform;
	
	public var isDead : boolean;
	
	public function Awake() {
		agentHealth = transform.GetComponent.<Health>().health;
		agentTransform = transform;
		isDead = false;
	}
	
	public function Update() {
		agentHealth = transform.GetComponent.<Health>().health;
		if(agentHealth <= 0) {
			isDead = true;
		}
	}
	
}