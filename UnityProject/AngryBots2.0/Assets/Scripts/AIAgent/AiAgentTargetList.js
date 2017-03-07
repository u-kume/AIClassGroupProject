#pragma strict

public var priorityList : Transform[];
public var priorityListDone : boolean[];
public var listSize : int;


public var closestTarget : Vector3;
public var closestTargetIndex : int;
private var numberOfChanged : int = 0;
private var player : Transform;

function Awake () {
	for(var count : int = 0; count < listSize; count++)
		priorityListDone[count] = false;
	player = transform;
}


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
				//if(count == 3)
					//Debug.Log("Third  count   "  + currentDistance + "      closestPosition " + closestPosition);
				if(currentDistance < closestPosition) {
						closestPosition = currentDistance;
						closestPositionIndex = count;
				}
			}
		}
		closestTarget = priorityList[closestPositionIndex].position;
		closestTargetIndex = closestPositionIndex;
		//Debug.Log( " closestPositionIndex = " + closestPositionIndex);
	}
}

public function setCurrent()
{
	if(closestTargetIndex != -1) {
		priorityListDone[closestTargetIndex] = true;
		numberOfChanged++;
		findClosestTarget();
	}
}