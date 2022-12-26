righthandWristX = 0;
righthandWristY = 0;

lefthandWristX = 0;
lefthandWristY = 0;

song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

score_rightwrist = 0;
score_leftwrist = 0;

function preload(){
    song1 = loadSound("blackpink.mp3");
    song2= loadSound("bts.mp3");
}

function setup(){
    canvas = createCanvas(500,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function modelLoaded(){
    console.log("PoseNet model had been intialized ");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results); 
        
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;

        righthandWristX = results[0].pose.rightWrist.x;
        righthandWristY = results[0].pose.rightWrist.y;

        lefthandWristX = results[0].pose.leftWrist.x;
        lefthandWristY = results[0].pose.leftWrist.y;

        console.log("Right Wrist X = " + righthandWristX);
        console.log("Right Wrist Y = " + righthandWristY);

        console.log("Left Wrist X = " + lefthandWristX);
        console.log("Left Wrist Y = " + lefthandWristY);
    }
}

function draw(){
    image(video,0,0,500,450);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#f51111");
    stroke("#f51111");

    if(score_rightwrist > 0.2){
        circle(righthandWristX,righthandWristY,30);

        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing Blackpink song"; 
        }
    }


    if(score_leftwrist > 0.2){
        circle(lefthandWristX,lefthandWristY,30);

        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing BTS song";
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}



