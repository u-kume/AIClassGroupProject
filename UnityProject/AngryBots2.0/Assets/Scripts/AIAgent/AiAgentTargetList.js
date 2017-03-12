#pragma strict

/*
 * This class holds the targets for the AIAgent that the navigationMesh needs to find a path to
 * This class will find the nearest target to the player for the navigationMesh.
 */
public class AiAgentTargetList extends MonoBehaviour {

	public var priorityList : Transform[]; //List of targets
	public var priorityListDone : boolean[]; //List of targets that have been completed
	public var listSize : int; //the size of the List


	public var closestTarget : Vector3; //The position of the closestTarget
	public var closestTargetIndex : int; //The index in the list of the closestTarget
	private var numberOfChanged : int = 0; //The number of targets that have been completed
	private var player : Transform; //The transform of the agent


	//This function is called when the object is awoken
	//	This function is used to initialize the starting variables of this object
	function Awake () {
		for(var count : int = 0; count < listSize; count++)
			priorityListDone[count] = false;
		player = transform;
	}


	// This function will find the clases target to the player that has not been completed
	public function findClosestTarget() {
		if(numberOfChanged == listSize) {
			closestTarget = transform.position;
			closestTargetIndex = -1;
		} else {
			var closestPosition : float = float.MaxValue;
			var closestPositionIndex : int = -1;
			var currentDistance : float;

			for(var count : int = 0; count < listSize; count++) {
				if(priorityListDone[count] == false) {
					currentDistance = Vector3.Distance(player.position, priorityList[count].position);
					if(currentDistance < closestPosition) {
							closestPosition = currentDistance;
							closestPositionIndex = count;
					}
				}
			}
			closestTarget = priorityList[closestPositionIndex].position;
			closestTargetIndex = closestPositionIndex;
		}
	}


	//This function will set the current target to completed
	public function setCurrent()
	{
		if(closestTargetIndex != -1) {
			priorityListDone[closestTargetIndex] = true;
			numberOfChanged++;
			findClosestTarget();
		}
	}

}
