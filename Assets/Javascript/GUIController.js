#pragma strict
var CnStyle : GUIStyle;
var EnStyle : GUIStyle;
var NormalStyle : GUIStyle;
var MenuStyle : GUIStyle;
var TipStyle : GUIStyle;
private var diameter : float;
private var isStarted : boolean = false;
private var startTimer : float = 0;
private var isStarting : boolean = true;
private var showQuit : boolean = false;
private var showEnd : boolean = false;
private var isEnding : boolean = true;
private var showThanks : boolean = false;

function Start () {

}

function Update () {

	showEnd = EndController.ifEnd;

	if (showThanks) {
		MenuStyle.fontSize = diameter/25;
		if (Input.anyKeyDown) Application.Quit();
	}
	else if (!isStarted) {
		diameter = Mathf.Min(Screen.width,Screen.height);
		CnStyle.fontSize = diameter/10;
		EnStyle.fontSize = diameter/20;
		NormalStyle.fontSize = diameter/30;
		MenuStyle.fontSize = diameter/20;
		TipStyle.fontSize = diameter/30;
		if (isStarting) {
			if (startTimer<4) startTimer += Time.deltaTime;
			else if (Input.GetKeyDown(KeyCode.Escape)) showThanks = true;
			else if (Input.anyKey) isStarting = false;
		}
		else {
			if (startTimer>0) startTimer -= Time.deltaTime;
			else isStarted = true;
		}
		CnStyle.normal.textColor.a = startTimer/4;
		EnStyle.normal.textColor.a = startTimer/4;
		NormalStyle.normal.textColor.a = startTimer/4;
	}
	else if (showQuit) {
		if (Input.GetKey(KeyCode.R)) {
			Application.LoadLevel("Silence in the Mist");
		}
		else if (Input.GetKey(KeyCode.E)) {
			showThanks = true;
		}
		else if (Input.anyKeyDown) {
			showQuit = false;
		}
	}
	else if (showEnd) {
		if (isEnding) {
			if (startTimer < 4) {
				startTimer += Time.deltaTime;
				CnStyle.normal.textColor.a = startTimer/4;
				EnStyle.normal.textColor.a = startTimer/4;
				NormalStyle.normal.textColor.a = startTimer/4;
			}
			else {
				if (Input.GetKey(KeyCode.Escape)) {
					showThanks = true;
				}
				else if (Input.anyKey) {
					isEnding = false;
				}
			}
		}
		else {
			startTimer -= Time.deltaTime;
			CnStyle.normal.textColor.a = startTimer/4;
			EnStyle.normal.textColor.a = startTimer/4;
			NormalStyle.normal.textColor.a = startTimer/4;
			if (startTimer < 0) Application.LoadLevel("Silence in the Mist");
		}
	}
	else if (Input.GetKeyDown(KeyCode.Escape)) showQuit = true;
	


}

function OnGUI () {

	//IGFChina2012 测试版 测试代码开始
	//GUI.Label(Rect(10, 10, 600, 100), "该游戏版本为 IGFChina2012专版，按1~0键可直接转换到其他场景进行测试。");
	//GUI.Label(Rect(10, 30, 600, 100), "This is special version for IGFChina2012. Press 1~0 to change position directly for testing.");
	//IGFChina2012 测试版 测试代码结束
	
	if (showThanks) {
		MenuStyle.fontSize = diameter/25;
		GUI.Label(Rect(Screen.width/2-15*MenuStyle.fontSize, Screen.height/3-1.2*MenuStyle.fontSize, 30*MenuStyle.fontSize, 1000), "该游戏的灵感来源于 Andrei & Sergiu 照的照片",MenuStyle);
		GUI.Label(Rect(Screen.width/2-20*MenuStyle.fontSize, Screen.height/3, 40*MenuStyle.fontSize, 1000), "This game is inspired by the photos taken by Andrei & Sergiu",MenuStyle);
		GUI.Label(Rect(Screen.width/2-15*MenuStyle.fontSize, Screen.height/3+1.2*MenuStyle.fontSize, 30*MenuStyle.fontSize, 1000), "他们的网站 Their website: http://www.photocosma.com/",MenuStyle);
		GUI.Label(Rect(Screen.width/2-15*TipStyle.fontSize, 2*Screen.height/3, 30*TipStyle.fontSize, 1000), "按任意键退出游戏",TipStyle);
		GUI.Label(Rect(Screen.width/2-15*TipStyle.fontSize, 2*Screen.height/3+1.2*TipStyle.fontSize, 30*TipStyle.fontSize, 1000), "Press anykey to quit the game",TipStyle);
	}	
	else if (!isStarted) {
	    GUI.Label(Rect(Screen.width/2-2.5*CnStyle.fontSize, Screen.height/3, 5.25*CnStyle.fontSize, 1000), "静在迷雾中",CnStyle);
	    GUI.Label(Rect(Screen.width/2-2.5*CnStyle.fontSize, Screen.height/3+1.2*CnStyle.fontSize, 5*CnStyle.fontSize, 1000), "Silence in the Mist",EnStyle);
	    GUI.Label(Rect(NormalStyle.fontSize, Screen.height-2*NormalStyle.fontSize, 20*NormalStyle.fontSize, 1000), "by pengbitao@inpla.net",NormalStyle);
	    GUI.Label(Rect(Screen.width-20*NormalStyle.fontSize, Screen.height-2*NormalStyle.fontSize, 20*NormalStyle.fontSize, 1000), "http://inpla.net/thread-5211-1-1.html",NormalStyle);
    }

	else if (showQuit) {
		GUI.Label(Rect(Screen.width/2-10*MenuStyle.fontSize, Screen.height/3-1.2*MenuStyle.fontSize, 20*MenuStyle.fontSize, 1000), "重来 Restart (R)",MenuStyle);
		GUI.Label(Rect(Screen.width/2-10*MenuStyle.fontSize, Screen.height/3, 20*MenuStyle.fontSize, 1000), "退出 Exit (E)",MenuStyle);
		if (!EndController.ifEndStarted) {
			GUI.Label(Rect(Screen.width/2-15*TipStyle.fontSize, 2*Screen.height/3, 30*TipStyle.fontSize, 1000), "提醒： 单击双击退格或删除键回到过去",TipStyle);
			GUI.Label(Rect(Screen.width/2-20*TipStyle.fontSize, 2*Screen.height/3+1.2*TipStyle.fontSize, 40*TipStyle.fontSize, 1000), "Tips: Click and double click Backspace or Delete can return to past",TipStyle);
		}
	}
	else if (showEnd) {
	    GUI.Label(Rect(Screen.width/2-0.5*CnStyle.fontSize, Screen.height/3, CnStyle.fontSize, 100), "完",CnStyle);
	    GUI.Label(Rect(Screen.width/2-0.5*CnStyle.fontSize, Screen.height/3+1.2*CnStyle.fontSize, CnStyle.fontSize, 1000), "End",EnStyle);	    
	    GUI.Label(Rect(NormalStyle.fontSize, Screen.height-2*NormalStyle.fontSize, 20*NormalStyle.fontSize, 1000), "by pengbitao@inpla.net",NormalStyle);
	    GUI.Label(Rect(Screen.width-20*NormalStyle.fontSize, Screen.height-2*NormalStyle.fontSize, 20*NormalStyle.fontSize, 1000), "http://inpla.net/thread-5211-1-1.html",NormalStyle);
    }
    
}