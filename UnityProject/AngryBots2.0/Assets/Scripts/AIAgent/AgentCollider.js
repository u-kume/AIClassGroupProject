#pragma strict

public var enemyTriggerCollider : Collider;


private var enemyTriggered : GameObject = null;

private var navigationAgentEnables : boolean = true;

private var enemyTriggerColliderList : System.Collections.Generic.List.<GameObject> = new System.Collections.Generic.List.<GameObject> ();
private var listSize : int = 0;


function OnTriggerEnter (other : Collider) {
	if(other.gameObject.tag == "Enemy" && canSeeEnemy(other) == true) {
			enemyTriggerColliderList.Add(other.gameObject);
			listSize++;
			//enemyTriggered = other.gameObject;
			Debug.Log("Enemy has entered trigger " + other.gameObject.name + "   " + other.gameObject.GetInstanceID());
			gameObject.GetComponent.<AIAgentTryNav>().enabled = false;
			navigationAgentEnables = false;
	}
}

function OnTriggerExit (other : Collider) {
	if(other.gameObject.tag == "Enemy" && enemyTriggerColliderList.IndexOf(other.gameObject) != -1) {
			Debug.Log("Enemy has exited trigger");
			//enemyTriggerColliderList.IndexOf(other.gameObject);
			enemyTriggerColliderList.Remove(other.gameObject);
			listSize--;
			if(navigationAgentEnables == false && listSize == 0) {
				gameObject.GetComponent.<AIAgentTryNav>().enabled = true;
				navigationAgentEnables = true;
			}
	}
}

function Update() {
	//var numberOfChanged : int = 0;
	//if(enemyTriggered != null) 
		//Debug.Log(Time.realtimeSinceStartup + "listSize = " + listSize);
	//if(navigationAgentEnables == false) {
		if(listSize == 0) {
			navigationAgentEnables = true;
			gameObject.GetComponent.<AIAgentTryNav>().enabled = true;
		} else {
			for(var count : int = 0; count < listSize; count++) {
				if(enemyTriggerColliderList.Item[count] == null) {
					enemyTriggerColliderList.RemoveAt(count);
					listSize--;
					count--;
				}
			}
		}
	//}
}

public function canSeeEnemy(enemyToCheck : Collider) {
	var enemyDirection : Vector3 = (enemyToCheck.transform.position - transform.position);
	var hit : RaycastHit;
	Physics.Raycast (transform.position, enemyDirection, hit, enemyDirection.magnitude);
	if (hit.collider && hit.collider.transform == enemyToCheck.transform) {
		return true;
	}
	return false;
}