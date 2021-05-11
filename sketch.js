//Create variables here
var dog, happyDogImg,dogImg;
var database;
var foodS, foodStock;
var milk;
var feedbutton,addfoodbutton;
var fedTime, lastFed;
var lastFedRef;

function preload()
{
	happyDogImg = loadImage("images/dogImg.png");
  dogImg = loadImage("images/dogImg1.png");
 
}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  milk = new Food();

  feedbutton = createButton("Feed the dog");
  feedbutton.position(700,95);
  feedbutton.mousePressed(feedDog);


  addfoodbutton = createButton("Buy food");
  addfoodbutton.position(800,95);
  addfoodbutton.mousePressed(addFood);


}

function draw() {  
  background(46, 139, 87);
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDogImg);
  // }

  lastFedRef = database.ref('lastFed');
  lastFedRef.on("value",function (data){
    lastFed = data.val();
  });

  drawSprites();
  //add styles here
  fill(255)
  stroke(0)
  textSize(15);
  if(lastFed>=12){
    text("Your last fed was at " +lastFed%12+"PM",350,30)
  }
  else if(lastFed==0){
    text("Your last fed was at 12 AM",350,30)
  }
  else{
    text("Your last fed was at " +lastFed+"AM",350,30)
  }
  // text("Food remaining:" + foodS,170,210)

  milk.display();
}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  
  if(foodS <= 0){
    foodS = 0
  }
  else{
    foodS = foodS - 1;
  }

database.ref('/').update({
  food:foodS,
  lastFed : hour()
});
  dog.addImage(happyDogImg);
  milk.updateFoodStock(foodS);
}
function addFood(){
  if(foodS< 30){
   foodS++;  
  database.ref('/').update({
    food:foodS,
  });
  milk.updateFoodStock(foodS);
  }
  else{
    text("NO MORE STORAGE",200,200)
  }
}



