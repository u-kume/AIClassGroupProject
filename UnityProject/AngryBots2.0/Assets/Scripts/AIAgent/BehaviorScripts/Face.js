#pragma strict

public class Face extends Align {
	
	protected var targetAux : GameObject;
	
	public override function Awake() {
		super.Awake();
		targetAux = target;
		target = new GameObject();
		target.AddComponent.<Agent>();
	}
	
	function OnDestroy() {
		Destroy(target);
	}
	
	public override function GetSteering() : Steering {
		var direction : Vector3 = targetAux.transform.position - transform.position;
		if(direction.magnitude > 0.0) { 
			var targetOrientation : float = Mathf.Atan2(direction.x, direction.z);
			targetOrientation *= Mathf.Rad2Deg;
			target.GetComponent.<Agent>().orientation = targetOrientation;
		}
		return super.GetSteering();
	}

}