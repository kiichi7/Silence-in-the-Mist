#pragma strict
var myMistController : GameObject;
private var goTimer : float;
private var backTimer : float;
private var positionCounter : int = 0;

function Start () {

}

function Update () {

	//IGFChina2012 测试版 测试代码开始
	/*if (Input.GetKey(KeyCode.Alpha1)) {
		positionCounter = 2;
		transform.position = Vector3 (100,3,200);
	}
	if (Input.GetKey(KeyCode.Alpha2)) {
		positionCounter = 2;
		transform.position = Vector3 (115,80,355);
	}
	if (Input.GetKey(KeyCode.Alpha3)) {
		positionCounter = 2;
		transform.position = Vector3 (127,41,372);
	}
	if (Input.GetKey(KeyCode.Alpha4)) {
		positionCounter = 2;
		transform.position = Vector3 (100,55,370);
	}
	if (Input.GetKey(KeyCode.Alpha5)) {
		positionCounter = 2;
		transform.position = Vector3 (180,5,270);
	}
	if (Input.GetKey(KeyCode.Alpha6)) {
		positionCounter = 2;
		transform.position = Vector3 (50,52,437);
	}
	if (Input.GetKey(KeyCode.Alpha7)) {
		positionCounter = 2;
		transform.position = Vector3 (61,52,481);
	}
	if (Input.GetKey(KeyCode.Alpha8)) {
		positionCounter = 2;
		transform.position = Vector3 (120,101,561);
	}
	if (Input.GetKey(KeyCode.Alpha9)) {
		positionCounter = 2;
		transform.position = Vector3 (134,5,686);
	}
	if (Input.GetKey(KeyCode.Alpha0)) {
		positionCounter = 4;
		transform.position = Vector3 (132,3,1200);
	}*/
	//IGFChina2012 测试版 测试代码结束

	if (transform.position.x < 200) {
		if (transform.position.x > 100) transform.position.x -= 200;
		if (transform.position.x < -100) transform.position.x += 200;
		if ((transform.position.z > 1100)&&(positionCounter<4)) {
			transform.position.z -= 200;
			positionCounter ++;
		}
		if ((transform.position.z < 900)&&(positionCounter>2)) {
			transform.position.z += 200;
			positionCounter --;
		}
		if ((transform.position.z > 100)&&(positionCounter<2)) {
			transform.position.z -= 200;
			positionCounter ++;
		}
		if ((transform.position.z < -100)&&(positionCounter>0)) {
			transform.position.z += 200;
			positionCounter --;
		}
	}
	if ((Mathf.Abs(transform.position.x)<25)&&(Mathf.Abs(transform.position.z-1300)<25)) EndController.ifEndStarted = true;
	
	if (transform.position.z < -350) transform.position.z += 1;
	if (transform.position.z > 1350) transform.position.z -= 1;
	if (transform.position.x>500) {
		GetComponent(CharacterMotor).jumping.baseHeight = 100;
		GetComponent(CharacterMotor).jumping.extraHeight = 100;
	}
	else {
		GetComponent(CharacterMotor).jumping.baseHeight = 0.75;
		GetComponent(CharacterMotor).jumping.extraHeight = 0.75;
	}
	if ((transform.position.x>611)&&(transform.position.x<613)&&(transform.position.y<60)&&(transform.position.z)>595&&(transform.position.z)<596) {
			backTimer += Time.deltaTime;
			GetComponent(Archive).saveTimer2 = 150;
			transform.position.x = 62.5;
			transform.position.y = 100;
			transform.position.z = 481;
			myMistController.GetComponent(MistController).Turn();

	}
	if ((transform.position.x>62)&&(transform.position.x<63)&&(transform.position.y<10)&&(transform.position.z)>480&&(transform.position.z)<482) {
			goTimer += Time.deltaTime;
			GetComponent(Archive).saveTimer2 = 150;
			transform.position.x = 612;
			transform.position.y = 150;
			transform.position.z = 595.5;
			myMistController.GetComponent(MistController).Turn();

	}
}

