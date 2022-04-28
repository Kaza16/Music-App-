
song1="";
song2="";
song1status="";
song2status="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function setup(){
 canvas=createCanvas(800,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 posenet=ml5.poseNet(video,modelLoaded);
 posenet.on('pose',gotPoses)
}
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function draw(){
    image(video,0,0,800,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    stroke("yellow");
    fill("red");
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1status==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter theme song";
        }
    }
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2status==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan song";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pause(){
    song.stop();
}
function modelLoaded(){
    console.log("modelLoaded")
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWrist.x"+leftWristX+"leftWrist.y"+leftWristY+"rightWrist.x"+rightWristX+"rightWrist.Y"+rightWristY);
    }
}