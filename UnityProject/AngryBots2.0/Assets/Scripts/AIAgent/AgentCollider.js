#pragma strict

public var enemyTriggerCollider : SphereCollider;


private var enemyTriggered : GameObject;

private var navigationAgentEnables : boolean = true;

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.tag == "Enemy") {
			enemyTriggered = other.gameObject;
			Debug.Log("Enemy has entered trigger " + other.gameObject.name + "   " + other.gameObject.GetInstanceID());
			gameObject.GetComponent.<AIAgentTryNav>().enabled = false;
			navigationAgentEnables = false;
	}
}

function OnTriggerExit (other : Collider) {
	if(other.gameObject.tag == "Enemy") {
			Debug.Log("Enemy has exited trigger");
			if(navigationAgentEnables == false) {
				gameObject.GetComponent.<AIAgentTryNav>().enabled = true;
				navigationAgentEnables = true;
			}
	}
}

function Update() {
	Debug.Log("enemyTriggered = " + enemyTriggered.name + "   " + enemyTriggered.GetInstanceID());
	if(navigationAgentEnables == false) {
		if(enemyTriggered == null) {
			navigationAgentEnables = true;
			gameObject.GetComponent.<AIAgentTryNav>().enabled = true;
		}
	}
}