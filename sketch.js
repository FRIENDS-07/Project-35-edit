var dog,dogImage,dogHappyImage;
var dataBase,position;

function preload(){

  dogImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");

}

function setup(){

  dataBase = firebase.database();

  createCanvas(500,500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  var dogRef = dataBase.ref('Food/Quantity');
  dogRef.on("value",readStock);
  
}

function draw(){  

  background("white");
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(20);
    dog.addImage(dogHappyImage);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

  textSize(30);
  fill("red");
  text("Food remaining: " + position,100,100);

}

function writeStock(x){

  dataBase.ref('Food').set({
    'Quantity':position - 1
  })

}

function readStock(data){
  position = data.val();
}

