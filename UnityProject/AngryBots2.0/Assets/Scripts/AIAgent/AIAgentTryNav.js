#pragma strict

public class AIAgentTryNav extends MonoBehaviour {
	
	public var target : Transform;
	public var targetScript : AiAgentTargetList;

	public var timeSinceStop : float;
	private var timeSinceStuck : float;
	private var timeSinceChanged : float;
	private var changed : boolean;
	public var stopped : boolean;

	private var playerLastPosition : Vector3;
	private var stuckPosition : Vector3;


	var navmeshAgent : NavMeshAgent;

	function Start () {
		playerLastPosition = transform.position;
		navmeshAgent.updateRotation = false;
		targetScript.findClosestTarget();
		stopped = false;
	}

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

	function setNewDestination() {
		if(targetScript.closestTargetIndex != -1)
			navmeshAgent.SetDestination(targetScript.closestTarget);
		else 
			navmeshAgent.SetDestination(transform.position);
	}

	public function stop() {
		if(gameObject.GetComponent.<NavMeshAgent>())
			navmeshAgent.Stop();
	}

	public function resume() {
		if(gameObject.GetComponent.<NavMeshAgent>())
			navmeshAgent.Resume();
	}

}


