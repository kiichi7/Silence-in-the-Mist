@HideInInspector
var speed : float = 0;
@HideInInspector
var isWalking : boolean;
private var lastY : float;
@HideInInspector
var fallingTime : float = 0;
private var maxSpeed : float = 5.0;
private var jumpSpeed : float = 5.0;
private var gravity : float = 10.0;
private var moveDirection : Vector3 = Vector3.zero;
@HideInInspector
var isWalkerGrouded : boolean;

// Use this for initialization
function Awake () {
	
}

function Update() {

	if (EndController.ifEnd) this.enabled = false;
	
	var motor : CharacterMotor = GetComponent(CharacterMotor);
    var controller : CharacterController = GetComponent(CharacterController);
    isWalkerGrouded = GetComponent(CharacterController).isGrounded;
    if (controller.isGrounded) {

		fallingTime = 0;
        moveDirection = Vector3(Input.GetAxis("Horizontal"), 0,
                                Input.GetAxis("Vertical"));
                       
        if (Input.GetAxis("Vertical")>0) {if (speed < maxSpeed) speed += 0.5*Time.deltaTime;
        								 }
        else if ((speed > 1)&&(Input.GetAxis("Vertical")==0)) speed -= Time.deltaTime;
       	else speed = 1; 

    	if (controller.collisionFlags & CollisionFlags.Sides) speed = 1;

		isWalking = ((speed>1)||(Input.GetAxis("Horizontal")!=0)||(Input.GetAxis("Vertical")!=0));

		if (speed > 1) moveDirection.z = 1;
        moveDirection.z *= speed;
        moveDirection = transform.TransformDirection(moveDirection);

        /*if (Input.GetButton ("Jump")) {
            moveDirection.y = jumpSpeed;
        }*/
        motor.inputJump = Input.GetButton("Jump");
        
    }
    else {
    	if (lastY > transform.position.y) fallingTime += Time.deltaTime;
    	else fallingTime -= Time.deltaTime;
    	lastY = transform.position.y;
    }

    //moveDirection.y -= gravity * Time.deltaTime;
    
    controller.Move(moveDirection * Time.deltaTime);


}

@script RequireComponent (CharacterMotor)