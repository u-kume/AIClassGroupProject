#pragma strict

/*
 * This is used for debugging only
 */
	function OnCollisionEnter(col : Collision) {
		Debug.Log(gameObject.name + " has collieded with " + col.gameObject.name);
	}

	function OnTriggerEnter(other : Collider) {
		Debug.Log(gameObject.name + " was triggered by " + other.gameObject.name);
	}
