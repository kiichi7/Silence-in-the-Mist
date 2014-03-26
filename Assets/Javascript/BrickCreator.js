#pragma strict
var theWalker : GameObject;
var theBrick : GameObject;
private var number : int;
private var timer : float = 0;

function Start () {

}

function Update () {

	if (EndController.ifEndStarted) {
		timer += Time.deltaTime;
		if (timer > 1) {
			var instance : GameObject = Instantiate(theBrick,theWalker.transform.position + Vector3(Random.Range(-10,10), 50, Random.Range(-10,10)),Quaternion(Random.Range(0.0,1.0), Random.Range(0.0,1.0), Random.Range(0.0,1.0), 1.0));
			timer = 0;
			number ++;
		}
	}
}
