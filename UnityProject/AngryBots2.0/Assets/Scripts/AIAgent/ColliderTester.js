#pragma strict


	function OnCollisionEnter(col : Collision) {
		Debug.Log(gameObject.name + " has collieded with " + col.gameObject.name);
	}
	
	function OnTriggerEnter(other : Collider) {
		Debug.Log(gameObject.name + " was triggered by " + other.gameObject.name);
	}