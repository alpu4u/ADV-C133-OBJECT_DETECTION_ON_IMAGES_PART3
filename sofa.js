img=""
status=""
objects=[]

function preload()
{
    img = loadImage("image3.jpg")
}

function setup()
{
    canvas= createCanvas(640, 420)
    canvas.center()
    objectDetection=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status = Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetection.detect(img, gotResult);
}

function draw()
{
    image(img, 0, 0, 640, 420 )
    if (status !=""){
    for (i = 0; i < objects.length; i++) 
    {
    document.getElementById("status").innerHTML="Status = Objects Detected";
    fill("green");    
    percent=floor(objects[i].confidence * 100);
    text(objects[i].label+" " + percent + "%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke("green");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}

function gotResult(error,result)
{
 if (error)
 {
    console.error(error);
 }
 console.log(result);
 objects=result;
}