#pragma strict

/*
 * This class represents a physical collider that is placed around the AIAgent
 * 	The collider agents as a trigger system for detecting enemy objects that
 *	are close to the AIAgent. When an enemy steps inside the collider an event (Trigger)
 *	is called inside this class. When this happens this class will check to see if the AIAgent
 *	can see the enemy, and if so will add it to a list of enemys currently in the collider, otherwise
 *	the enemy object will be ignored
 */
public class AgentCollider extends AIAgent{


	public var navigationAgentEnables : boolean = true; //This says if the AIAgent is using the navigationMesh or not

	//this is the variables for the list that will hold the objects for the current enemies inside the collider
	public  var enemyTriggerColliderList : System.Collections.Generic.List.<GameObject> = new System.Collections.Generic.List.<GameObject> ();
	public var listSize : int = 0;

	//a class object for the class that deals with the navigationMeshAgent
	public var navMeshAgent : AIAgentTryNav;


	//This is the first function that is called when the game starts and this object is awoken.
	//	This sets the initial variables that need to be initialized
	function Awake() {
		navMeshAgent = gameObject.GetComponent.<AIAgentTryNav>();
	}


	//This is the function that is called whenever an object moves inside the Collider
	//	This function will place the object in the list only if the object is an enemy
	function OnTriggerEnter (otherObject : Collider) {
		if(otherObject.gameObject.tag == "Enemy" && canSeeEnemy(otherObject) == true) {
				enemyTriggerColliderList.Add(otherObject.gameObject);
				listSize++;
				Debug.Log("Enemy has entered trigger " + otherObject.gameObject.name + "   " + otherObject.gameObject.GetInstanceID());
				stopNavAgent();
		}
	}


	// This is the function that is called whenever an object moves outside the collider after it has already been inside.
	// 	if the object is and Enemy object and has already been in the list then it will be removed from the list
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


	//This function is called once every frame and is used to do reoccuring logic
	//	This function will enable or disable the navigationMeshAgent depending on how many enemy objects are in the list.
	//	This function will also check to see if an enemy was destroyed and if so it will be removed from the List.
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


	//This function will test weither the AIAgent can see the enemy or not
	//It will not beable to see the enemy if the enemy is behind a wall or another object
	public function canSeeEnemy(enemyToCheck : Collider) : boolean {
		var enemyDirection : Vector3 = (enemyToCheck.transform.position - transform.position);
		var hit : RaycastHit;
		Physics.Raycast (transform.position, enemyDirection, hit, enemyDirection.magnitude);
		if (hit.collider && hit.collider.transform == enemyToCheck.transform) {
			return true;
		}
		return false;
	}


	//This function returns the current size of the list
	public function getListSize() : int {
		return listSize;
	}


	//This function will stop the navigationMeshAgent from moving further
	public function stopNavAgent() {
		if(navMeshAgent) {
			navMeshAgent.stop();
			navigationAgentEnables = false;
		}
	}


	//This function will make the navigationMeshAgent continue moving
	public function resumeNavAgent() {
		if(navMeshAgent) {
			navMeshAgent.resume();
			navigationAgentEnables = true;
		}
	}


	//This function will return the first enemy object in the List
	public function getFirstTarget() : Transform {
		if(listSize == 0)
			return null;
		for(var count: int = 0; count < listSize; count++)
			if(enemyTriggerColliderList.Item[count] != null)
				return enemyTriggerColliderList.Item[count].transform;

	}

}
