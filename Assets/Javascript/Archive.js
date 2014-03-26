#pragma strict
private var myPosition : Vector3;
private var myLastPosition : Vector3;
private var myRotation : Quaternion;
private var myLastRotation : Quaternion;
private var mySpeed : float;
private var myLastSpeed : float;
@HideInInspector
var saveTimer : float;
private var myPosition2 : Vector3;
private var myLastPosition2 : Vector3;
private var myRotation2 : Quaternion;
private var myLastRotation2 : Quaternion;
private var mySpeed2 : float;
private var myLastSpeed2 : float;
@HideInInspector
var saveTimer2 : float;
private var backTime : int;
private var tryTime : float;

function Start () {

	backTime = 0;
	tryTime = 0;
	myPosition = transform.position;
	myLastPosition = myPosition;
	myRotation = transform.rotation;
	myLastRotation = myRotation;
	mySpeed = GetComponent(Move).speed;
	myLastSpeed = mySpeed;
	myPosition2 = transform.position;
	myLastPosition2 = myPosition2;
	myRotation2 = transform.rotation;
	myLastRotation2 = myRotation2;
	mySpeed2 = GetComponent(Move).speed;
	myLastSpeed2 = mySpeed2;

}

function Update () {

	if (!EndController.ifEndStarted) {
		saveTimer += Time.deltaTime;
		saveTimer2 += Time.deltaTime;

		if ((saveTimer > 2.5)&&(GetComponent(CharacterController).isGrounded)){
			myLastPosition = myPosition;
			myLastRotation = myRotation;
			myLastSpeed = mySpeed;
			myPosition = transform.position;
			myRotation = transform.rotation;
			mySpeed = GetComponent(Move).speed;
			saveTimer = 0;
		}
		
		if ((saveTimer2 > 150)&&(GetComponent(CharacterController).isGrounded)){
			myLastPosition2 = myPosition2;
			myLastRotation2 = myRotation2;
			myLastSpeed2 = mySpeed2;
			myPosition2 = transform.position;
			myRotation2 = transform.rotation;
			mySpeed2 = GetComponent(Move).speed;
			saveTimer2 = 0;
		}

		if (Input.GetButtonDown("GetBack")||Input.GetKeyDown(KeyCode.Delete)) backTime++;

		if (backTime > 0) tryTime += Time.deltaTime;

		if ((backTime > 0)&&(tryTime>0.5)) {
		
			if (backTime == 1) {
				saveTimer = 0;
				transform.position = myLastPosition;
				transform.rotation = myLastRotation;
				GetComponent(Move).speed = myLastSpeed;
				myPosition = myLastPosition;
				myRotation = myLastRotation;
				mySpeed = myLastSpeed;
				backTime = 0;
				tryTime = 0;
			}
			else {
				saveTimer2 = 0;
				transform.position = myLastPosition2;
				transform.rotation = myLastRotation2;
				GetComponent(Move).speed = myLastSpeed2;
				myPosition2 = myLastPosition2;
				myRotation2 = myLastRotation2;
				mySpeed2 = myLastSpeed2;
				backTime = 0;
				tryTime = 0;
			}
		}
	}
		
}