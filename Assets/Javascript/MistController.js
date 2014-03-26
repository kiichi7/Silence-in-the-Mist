#pragma strict
var walker : GameObject;
var eyes : GameObject;
var sun : GameObject;
private var isWalking : boolean;
private var lightness : float;
private var lightnessToBe : float;
@HideInInspector
var isDay : boolean = true;
private var walkingTimer : float;
private var stopWalkingTimer : float;
private var lastStatus : boolean;
private var isTurning : boolean;
private var ifTurned : boolean;
private var startTimer : float = 0;
private var blueDegree : float = 0;
private var colorSwitch : boolean = true;
private var isStarted : boolean = false;
private var isStarting : boolean = false;

function Start () {

	lightness = 0.4;
	RenderSettings.fogEndDistance = 100;
	eyes.GetComponent(Camera).farClipPlane = 200;

}

function Update () {

	isWalking = walker.GetComponent(Move).isWalking;
	
	if (isWalking) {
		if (colorSwitch) blueDegree += Time.deltaTime/500;
		else blueDegree -= Time.deltaTime/500;
	}
	else if (blueDegree!=0) {
		if (blueDegree>0) blueDegree = blueDegree-Time.deltaTime/20;
		else blueDegree = blueDegree+Time.deltaTime/20;
		if (Mathf.Abs(blueDegree)<Time.deltaTime/20) {
			colorSwitch = !colorSwitch;
			blueDegree = 0;
		}
	}

	if (isWalking!=lastStatus) {
		if (isWalking) walkingTimer = 0;
		else stopWalkingTimer = 0;
	}
	else {
		if (isWalking) walkingTimer += Time.deltaTime;
		else stopWalkingTimer += Time.deltaTime;
	}
	
	lastStatus = isWalking;

	if (isTurning) {
		if (Mathf.Abs(lightness-lightnessToBe)<0.01) {
			lightness = lightnessToBe;
			walkingTimer = 0;
			stopWalkingTimer = 0;
			isDay = !isDay;
			isTurning = false;
		}
		else if(lightness<lightnessToBe) lightness+=0.01;
		else lightness-=0.01;
	}
	else if ((walkingTimer > 10)&&(stopWalkingTimer>2)&&(!isWalking)) {
		lightnessToBe = 0.8-lightness;
		isTurning = true;														 
		}
	
	/*if (Input.GetKey(KeyCode.Alpha1)) blueDegree += Time.deltaTime/10;
	if (Input.GetKey(KeyCode.Alpha2)) blueDegree -= Time.deltaTime/10;
	if (Input.GetKey(KeyCode.Q)) lightness+=Time.deltaTime;
	if (Input.GetKey(KeyCode.E)) lightness-=Time.deltaTime;
	lightness = Mathf.Max(0.0,lightness);
	lightness = Mathf.Min(lightness,0.8);*/
	
	if (!isStarted) {
		if (startTimer < 4) startTimer += Time.deltaTime;
		else if (Input.anyKey) isStarting = true;
		if (isStarting) lightness += Time.deltaTime/20;
		if (Mathf.Abs(lightness-0.7)<0.01) lightness = 0.7; 
		if (lightness == 0.7) isStarted = true;
	}
	if (EndController.ifEnd) {
		isTurning = false;
		if ((lightness - 0.4)>0.02) lightness -= Time.deltaTime/20;
		else if ((0.4 - lightness)>0.02) lightness += Time.deltaTime/20;
		else lightness = 0.4;
	}
	
	RenderSettings.fogColor = Color(lightness, 0.5*blueDegree+lightness, blueDegree+lightness, 1);
	RenderSettings.ambientLight = Color(0.8,0.8,0.8,1) - RenderSettings.fogColor;
	eyes.GetComponent(Camera).backgroundColor = RenderSettings.fogColor;
	
	//RenderSettings.fogEndDistance = 50+walker.transform.position.y;
	RenderSettings.fogDensity = Mathf.Max((0.1-walker.transform.position.y/1000),0.05);

	eyes.GetComponent(Camera).farClipPlane = 5/RenderSettings.fogDensity;
	if (lightness>0.4) sun.GetComponent(LensFlare).brightness = Mathf.Min(walker.transform.position.y/100,0.5);
	else sun.GetComponent(LensFlare).brightness = 0;

}

function Turn () {
	if (!isTurning) {
		isTurning = true;														 
		lightnessToBe = 0.8-lightness;
	}
}
