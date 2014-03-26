#pragma strict
var liveStatus : int = 0;
var myAudio : AudioSource;

function Start () {

}

function Update () {

	if (EndController.ifEndStarted) liveStatus = 2;

	if (liveStatus == 1) {
		EndController.highestBrick = Mathf.Max(transform.position.y,EndController.highestBrick);
		GetComponent(Rigidbody).isKinematic = true;
		if (transform.position.y<1) liveStatus = 3;
	}
	if (liveStatus == 2) {
		if (transform.position.y < EndController.changeHeight ) {
			liveStatus = 3;
		}
	}
	if (liveStatus == 3) {
		GetComponent(Rigidbody).isKinematic = false;
		GetComponent(Rigidbody).WakeUp();
		gameObject.AddComponent(AudioSource);
		GetComponent(LiveBrickController).enabled = true;
		Destroy (GetComponent(StatuesBrickController));
	}
	
}

function OnCollisionEnter(collision : Collision) {

	if (liveStatus == 0) liveStatus = 1;

}
