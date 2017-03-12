#pragma strict


/*
 * This class will use the Unity navigationMesh to move the Agent from target to target
 *	This class can also stop the navigationMesh to allow for free movement of the Agent
 */
public class AIAgentTryNav extends MonoBehaviour {

	public var target : Transform; //the transform of the current target for the navigationMesh
	public var targetScript : AiAgentTargetList; //An object for the targetList class

	//used to check if the agent is stuck or not
	public var timeSinceStop : float;
	private var timeSinceStuck : float;
	private var timeSinceChanged : float;
	private var changed : boolean;
	private var playerLastPosition : Vector3;
	private var stuckPosition : Vector3;

	//used to tell if the navigationMesh is stopped or moving
	public var stopped : boolean;

	//the navigationMesh for the Agent
	var navmeshAgent : NavMeshAgent;


	//This function is called at the very beginning before any other function
	//	This is used to set the initial variables
	function Start () {
		playerLastPosition = transform.position;
		navmeshAgent.updateRotation = false;
		targetScript.findClosestTarget();
		stopped = false;
	}


	//This function is called once every frame and is used to see if the Agent's navigationMesh needs
	//	to stop becuase it is at the target or not
	function Update () {
		targetScript.findClosestTarget();

		if(stopped == true){
			if(Time.time - timeSinceStop > 3) {
				targetScript.setCurrent();
				resume();
				setNewDestination();
				stopped = false;
			}
		} else
			if(Vector3.Distance(transform.position, targetScript.closestTarget) < 5 && stopped == false) {
				stop();
				stopped = true;
				timeSinceStop = Time.time;
			} else {
				setNewDestination();
				}

		playerLastPosition = transform.position;
	}


	//This function will set a new destination for the navigationMesh
	function setNewDestination() {
		if(targetScript.closestTargetIndex != -1)
			navmeshAgent.SetDestination(targetScript.closestTarget);
		else
			navmeshAgent.SetDestination(transform.position);
	}


	//This function will stop the navigationMesh
	public function stop() {
		if(gameObject.GetComponent.<NavMeshAgent>())
			navmeshAgent.Stop();
	}


	//This function will allow the navigationMesh to start again
	public function resume() {
		if(gameObject.GetComponent.<NavMeshAgent>())
			navmeshAgent.Resume();
	}

}
