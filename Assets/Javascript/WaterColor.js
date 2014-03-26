#pragma strict
private var colorR : float;
private var colorG : float;
private var colorB : float;
private var color1 : float;
private var color2 : float;

function Start () {
	
	color1 = 0.3;
	color2 = 0.7;
	colorR = 0.5;
	colorG = 0.5;
	colorB = 0.5;

}

function Update () {

	colorR += (1-Random.Range(0,3))/200.0;
	colorG += (1-Random.Range(0,3))/200.0;
	colorB += (1-Random.Range(0,3))/200.0;
	colorR = Mathf.Max(color1,Mathf.Min(color2,colorR));
	colorG = Mathf.Max(color1,Mathf.Min(color2,colorG));
	colorB = Mathf.Max(color1,Mathf.Min(color2,colorB));
	renderer.sharedMaterial.SetColor("_horizonColor",Color(colorR,colorG,colorB,0)); 

}