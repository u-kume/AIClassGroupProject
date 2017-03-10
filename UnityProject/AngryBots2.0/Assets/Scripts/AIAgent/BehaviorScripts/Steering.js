#pragma strict

public class Steering extends MonoBehaviour {

	public var angular : float;
	public var linear : Vector3;
	
	public function Steering() {
		angular = 0.0;
		linear = new Vector3();
	}
}