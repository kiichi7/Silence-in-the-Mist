#pragma strict
static var ifEndStarted : boolean;
static var ifEnd : boolean ;
static var endTimer : float;
static var highestBrick : float;
static var changeHeight : float;

function Start () {

	ifEndStarted = false;
	ifEnd = false;
	endTimer = 0;
	highestBrick = 0;
	changeHeight = 1;

}

function Update () {

	//highestBrick = Mathf.Min(highestBrick,50);
	
	if (ifEndStarted) endTimer += Time.deltaTime;
	if (endTimer > 180) ifEnd = true;
	if (ifEndStarted) {
		changeHeight += 0.002;
	}
	
	//if (Input.GetKey(KeyCode.Alpha0)) ifEndStarted = true;

}