#pragma strict

function Start () {

}

function Update () {

	if ((transform.position.y < 49.5)&&(EndController.ifEndStarted)) 
	transform.position.y += Time.deltaTime;

}