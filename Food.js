class Food{
    constructor(){
        this.foodStock= 20
        this.lastFed;
        this.image = loadImage("images/Milk.png")
        
    }

    display(){
        var x  = 50
        var y = 70

        imageMode(CENTER);
        image(this.image, 720, 220,70,70);

        if(this.foodStock != 0){
            for(var i = 0;i< this.foodStock; i++){
              if(i%10 === 0){
                  x = 80
                  y += 50
              }  
            image(this.image, x, y,50,50);
            x += 30
            }
        }   
    }

    getFoodStock(){

    }

    updateFoodStock(milk_bottle){
        this.foodStock = milk_bottle;

    }
    
    deductFood(){

    }

}