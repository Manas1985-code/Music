song1 = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	  console.log(results);
	  scoreRightWrist = results[0].pose.keypoints[10].score;
	  scoretLeftWrist = results[0].pose.keypoints[9].score;
	  console.log('scoreLeftWrist = ' + scoreLeftWrist + 'scoreRightWrist' + scoreRightWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() 
{
	image(video, 0, 0, 600, 500);

	fill('#FF0000');
	stroke('#FF0000');

  if(scoreRightWrist > 0.01)
  {

	circle(rightWristX, rightWristY, 20);

	if(rightWristY > 0 && rightWristY <= 100)
	{
	    song1.play();
	}

  } 
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
