#pragma strict


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
	//navmeshAgent = GetComponent.<NavMeshAgent>();
	navmeshAgent.updateRotation = false;
	//var targetScript : AiAgentTargetList = transform.GetComponent(AiAgentTargetList);
	targetScript.findClosestTarget();
	stopped = false;
	//transform.Rotate(m)
}

function Update () {
	targetScript.findClosestTarget();
	
	if(stopped == true){
		//Debug.Log (Time.time - timeSinceStop + " hererere");
		if(Time.time - timeSinceStop > 3) {
			//Debug.Log("making new selection from stop");
			targetScript.setCurrent();
			navmeshAgent.Resume();
			setNewDestination();
			stopped = false;
		}
	} else
		if(Vector3.Distance(transform.position, targetScript.closestTarget) < 5 && stopped == false) {
			//Debug.Log("Stopping");
			navmeshAgent.Stop(true);
			stopped = true;
			timeSinceStop = Time.time;
		} else {
			//Debug.Log ("in Else");
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

function OnDisable() {
	navmeshAgent.Stop();
}

function OnEnable() {
	navmeshAgent.Resume();
}


