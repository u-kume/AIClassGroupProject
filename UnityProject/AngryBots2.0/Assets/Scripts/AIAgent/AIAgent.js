#pragma strict


/*
 * This class is a shell class for the other AIAgent scripts to extend. This class holds
 * 	the information that every AIAgent script might need like heatlh and the transform for the
 *	Agent object
 */
public class AIAgent extends MonoBehaviour {

	public var agentHealth : float; //the Health of the agent
	public var agentTransform : Transform;//The transform class of the agent Object

	public var isDead : boolean; //Represents if the Agent is alive or dead


	//This function is called when the program is ran and this object is awoken
	public function Awake() {
		agentHealth = transform.GetComponent.<Health>().health;
		agentTransform = transform;
		isDead = false;
	}


	//This function is called once per frame and it will do some small logic of getting the current
	//	health and checking to see if the agent is dead
	public function Update() {
		agentHealth = transform.GetComponent.<Health>().health;
		if(agentHealth <= 0) {
			isDead = true;
		}
	}

}
