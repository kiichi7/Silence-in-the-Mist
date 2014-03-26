#pragma strict
var notes : AudioClip[];
var isPlaying : boolean = false;
private var timer : float = 0;
private var lastHeight : float;
private var timeCounter : int = 0;

function Start () {

}

function Update () {

//Debug.Log(audio.isPlaying);

	if (isPlaying) timer += Time.deltaTime;
	if (timer > 3) {
		isPlaying = false;
		if ((lastHeight - transform.position.y)>0.00001) lastHeight = transform.position.y;
		else {
			timeCounter ++;
			if (timeCounter>5) {
				Destroy (GetComponent(Rigidbody));
				Destroy (GetComponent(AudioSource));
				Destroy (GetComponent(LiveBrickController));
			}
		}
	}
	
}

function OnCollisionEnter(collision : Collision) {

	if ((!isPlaying)&&(enabled)) {
		audio.clip = notes[Random.Range(0,7)];
		audio.Play();
		timer =0;
		isPlaying = true;
	}

}

