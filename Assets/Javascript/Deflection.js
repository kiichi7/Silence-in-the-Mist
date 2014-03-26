#pragma strict

function Start () {

	transform.Rotate(0,Random.Range(0,360),0);

}

function Update () {

	if ((GetComponent(Move).isWalking)&&(GetComponent(CharacterController).isGrounded)){
		if((transform.rotation.eulerAngles.y%180.0)>90.0) transform.Rotate(0,-3*Time.deltaTime,0);
		else transform.Rotate(0,3*Time.deltaTime,0);
	}
}