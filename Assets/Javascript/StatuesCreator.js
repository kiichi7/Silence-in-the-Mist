#pragma strict
var theBrick : GameObject;
private var number : int;
private var maxNumber : int =10000;
private var timer : float = 0;
private var changeTimer : float = 900;
private var theDegree : float = 0;

function Start () {

}

function Update () {

	if (changeTimer > 900) {
		transform.position =Vector3(Random.Range(-10,10),0,Random.Range(1290,1310));
		changeTimer = 0;
	}
	changeTimer += Time.deltaTime;
	timer += Time.deltaTime;
	transform.position.y = EndController.highestBrick + 0.5;
	theDegree = transform.position.y/3;
	if ((number < maxNumber)&&(timer > 0.5)) {
		var instance : GameObject = Instantiate(theBrick,transform.position + Vector3(Random.Range(-theDegree,theDegree), 0, Random.Range(-theDegree,theDegree)),Quaternion(Random.Range(0.0,1.0), Random.Range(0.0,1.0), Random.Range(0.0,1.0), 1.0));
		timer = 0;
		number ++;
	}
	if(EndController.ifEndStarted) Destroy(gameObject);

}
