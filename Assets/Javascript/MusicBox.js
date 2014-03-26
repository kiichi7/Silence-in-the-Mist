#pragma strict

var walker : GameObject;
var Mist : GameObject;
var player : GameObject[];
private var playerChooser : int = 0;
var notes : AudioClip[];
private var noteChooser : int = 0;
var chosenNotes : int[];
private var chosenNotesTotal : int;
private var theVolume : float;
private var partCounter : int;
private var isEmptyBeat : boolean;
private var timer : float;
private var playGap : float;

function Start () {
	
	for (noteChooser = 0;noteChooser< chosenNotes.length;noteChooser++ ) 
		chosenNotes[noteChooser] = Random.Range(7,28);
	noteChooser = 0;
}

function Update () {
	timer += Time.deltaTime;
	playGap = (10-walker.GetComponent(Move).speed)*(200-walker.transform.position.y)/1000;
	if ((!walker.GetComponent(Move).isWalking)&&(walker.GetComponent(Move).isWalkerGrouded)) partCounter = 0;
	else if (timer>playGap) {
		timer = 0;
		
		
			if (partCounter%4 == 0) {theVolume = 1;
									if (partCounter == 4) theVolume = 0.9;
									isEmptyBeat = false;
									}
			else {
				theVolume -= 0.1;
				if ((partCounter%4 == 3)&&(isEmptyBeat == false)) ;
				else isEmptyBeat = (Random.Range(0,2)==0);
				}		
			
				chosenNotesTotal = 0;
				for (var i = 0;i<chosenNotes.Length;i++){
					chosenNotesTotal += chosenNotes[i];
				}	
			if (Mist.GetComponent(MistController).isDay) chosenNotes[noteChooser] = Random.Range(Mathf.Max(14,chosenNotesTotal/chosenNotes.Length-7),Mathf.Min(chosenNotesTotal/chosenNotes.Length+7,27));
			else chosenNotes[noteChooser] = Random.Range(Mathf.Max(7,chosenNotesTotal/chosenNotes.Length-7),Mathf.Min(chosenNotesTotal/chosenNotes.Length+7,20));
				
			if (!isEmptyBeat) {
				player[playerChooser].audio.clip = notes[chosenNotes[noteChooser]];
				player[playerChooser].audio.volume = theVolume;
				player[playerChooser].audio.pitch = 1+walker.transform.position.y/200.0;
				if (player[playerChooser].audio.pitch < 0.3) player[playerChooser].audio.pitch = 0.3;
				player[playerChooser].audio.Play();
			}
				
			if (partCounter%2 == 0) {
				player[playerChooser+player.Length/2].audio.clip = notes[chosenNotes[noteChooser]-5];
				player[playerChooser+player.Length/2].audio.volume = theVolume-0.2;
				player[playerChooser+player.Length/2].audio.pitch = Mathf.Max((1+walker.transform.position.y/200.0),0.3);
				player[playerChooser+player.Length/2].audio.Play();
			}
			
			partCounter = (partCounter + 1)%8;
			playerChooser = (playerChooser + 1)%(player.Length/2);
			noteChooser = (noteChooser + 1)%chosenNotes.Length;
		

	}  
}