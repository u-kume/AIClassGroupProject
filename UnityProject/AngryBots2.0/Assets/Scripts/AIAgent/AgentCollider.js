#pragma strict


public class AgentCollider extends AIAgent{


	public var enemyTriggerCollider : Collider;


	
	public var navigationAgentEnables : boolean = true;

	public  var enemyTriggerColliderList : System.Collections.Generic.List.<GameObject> = new System.Collections.Generic.List.<GameObject> ();
	public var listSize : int = 0;

	public var navMeshAgent : AIAgentTryNav;
	
	function Awake() {
		navMeshAgent = gameObject.GetComponent.<AIAgentTryNav>();
	}

	function OnTriggerEnter (otherObject : Collider) {
		if(otherObject.gameObject.tag == "Enemy" && canSeeEnemy(otherObject) == true) {
				enemyTriggerColliderList.Add(otherObject.gameObject);
				listSize++;
				Debug.Log("Enemy has entered trigger " + otherObject.gameObject.name + "   " + otherObject.gameObject.GetInstanceID());
				stopNavAgent();
		}
	}
	
	function OnTriggerExit (otherObject : Collider) {
		if(otherObject.gameObject.tag == "Enemy" && enemyTriggerColliderList.IndexOf(otherObject.gameObject) != -1) {
				Debug.Log("Enemy has exited trigger");
				enemyTriggerColliderList.Remove(otherObject.gameObject);
				listSize--;
				if(navigationAgentEnables == false && listSize == 0) {
					resumeNavAgent();
				}
		}
	}

	function Update() {
		super.Update();
		if(navigationAgentEnables == false) {
			if(listSize == 0) {
				resumeNavAgent();
			} else {
				for(var count : int = 0; count < listSize; count++) {
					if(enemyTriggerColliderList.Item[count] == null) {
						enemyTriggerColliderList.RemoveAt(count);
						listSize--;
						count--;
					}
				}
			}
		}
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
	
	public function getListSize() : int {
		return listSize;
	}
	
	public function stopNavAgent() {
		if(navMeshAgent) {
			navMeshAgent.stop();
			navigationAgentEnables = false;
		}
	}
	
	public function resumeNavAgent() {
		if(navMeshAgent) {
			navMeshAgent.resume();
			navigationAgentEnables = true;	
		}
	}
	
	public function getFirstTarget() : Transform {
		if(listSize == 0)
			return null;
		for(var count: int = 0; count < listSize; count++)
			if(enemyTriggerColliderList.Item[count] != null)
				return enemyTriggerColliderList.Item[count].transform;
		
	}
	
}