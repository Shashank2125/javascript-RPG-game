//intializing keywords
let xp=0;// variable of keeping track of xp
let health=100;
let gold=50;
let currentWeapon=0;//we can use let instead var
let fighting;
let monsterHealth;
let inventory =["stick"];
//we need to refrence of Html elements
const button1=document.querySelector("#button1");//var allows most changes but it opens us to bugs
//const is used where we do least amount of changing
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");
const weapons=[

    {
        name:"stick",
        power:5

    },
    {
        name:"dagger",
        power:30
    },
    {
        name:"claw hammer",
        power:50
    },
    {
        name:"sword",
        power:100
    }


];
const monsters=[
    {
        name:"slime",
        level:2,
        health:15

    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
];
const locations=[
    {
        name:"town square ",
        "button text":["Go to store","Go to cave","Fight dragon"],
        "button function":[goStore,goCave,fightDragon],
        text:"You are in the town square you see sign that says \"store\"."

    },
    {
        name:"store",
        "button text":["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button function":[buyHealth,buyWeapon,goTown],
        text:"You enter the store"
    },
    {
        name:"cave",
        "button text":["Fight slime","Fight fanged beast","Go to town square"],
        "button function":[fightSlime,FightBeast, goTown],
        text:"You enter the cave. You see some monster"
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button function":[attack,dodge,goTown],
        text:"You are fighting a monster."

    },
    {
        name:"killed monster",
        "button text":["Go to town square","Go to town square","Go to town square"],
        "button function":[goTown,goTown,easterEgg],
        text:"The monster screams 'Arg!' as it dies. You gain experince points and find gold."

    },
    {
       name:"lose",
       "button text":["REPLAY","REPLAY","REPLAY"],
       "button function":[restart,restart,restart],
       text:"You die !"

    },
    {
        name:"win",
        "button text":["REPLAY","REPLAY","REPLAY"],
        "button function":[restart,restart,restart],
        text:"You defeated the dragon! You WIN THE GAME!"
    },
    {
        name: "easterEgg",
        "button text":["2","8","Go to town square?"],
        "button function":[pickTwo,pickEight,goTown],
        text:"You find a secret game. Pick a number above. Ten numbers will be randomly choosen between 0 to 10. if you choose matches one of the random numbers, you win!"


    }



];//empty object inserted in arr 
//intialize buttons
button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

//funcions 
function update(location){
    monsterStats.style.display="none";
   button1.innerText=location["button text"][0];
   button2.innerText=location["button text"][1];
   button3.innerText=location["button text"][2];
   button1.onclick=location["button function"][0];
   button2.onclick=location["button function"][1];
   button3.onclick=location["button function"][2];
   text.innerText=location.text;//accessing the refrences is single worded like text for multiple words use above

}
function goTown(){
    //updating text by clicking button1
   update(locations[0]);//first element is passed from locations

}
function goStore(){
   //updating text by clicking button1
   update(locations[1]);
  

}
function goCave(){
    update(locations[2])
}

function buyHealth(){
   if (gold>=10){
     gold-=10;
     health+=10;
     goldText.innerText=gold;
     healthText.innerText=health;
   }
   else
   {
    text.innerText="You donot have enough gold to buy health."
   }

}
function buyWeapon()
{
if (currentWeapon<weapons.length-1){    
    if (gold>=30)
    {
        gold-=30;
        goldText.innerText=gold;
        currentWeapon+=1;
        let newWeapon=weapons[currentWeapon].name;
        text.innerText="You now have new weapon "+ newWeapon +".";
        inventory.push(newWeapon);
        text.innerText+="In your inventory you have: "+inventory;


    }
    else
    {
    text.innerText="You donot have enough gold to buy weapon."
    }


 }
else{
    text.innerText="You already have most powerfull weapon !"
    button2.innerText="Sell Weapon for 15 gold"
    button2.onclick=sellWeapon;
}
}
function sellWeapon()
{ 
 if (inventory.length>1)
    {
     gold+=15;
     goldText.innerText=gold;
     let currentWeapon=inventory.shift();//.shift is removing the first element from the array and returning it 
     text.innerText="you sold a "+ currentWeapon+".";
     text.innerText+="In your inventory you have "+ inventory;

    }
    else{
        text.innerText="Don't sell your only weapon";
    }

}
function fightDragon(){
   fighting=2;
   goFight();
}

function fightSlime(){
    fighting=0;
    goFight();


}
function FightBeast(){
    fighting=1;
    goFight();

}
function goFight()
{
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block";//the html is blocked which is not showing we activate the moster
    //stats when we fight monster 
    monsterNameText.innerText=monsters[fighting].name;//display the name of the moster we are fighting 

    monsterHealthText.innerText=monsterHealth;





}
function attack()
{
    text.innerText="The "+ monsters[fighting].name+" attacks.";
    text.innerText+="You attack it with your " + weapons[currentWeapon].name +".";
    if (isMonsterHit())
    {
        health-=getMonsterAttackValue(monsters[fighting].level);//you get damage according to moster level

    }
    else{
        text.innerText+="You miss."
    }
    
    monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;//moster gets damaged according weapon + some random amount of experince

    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if (health<=0){
        lose();
    }
    else if (monsterHealth<=0){
       // if (fighting===2)//tripe equal sign does not necessarily do any conversion but 
        //the == sign does the necessary conversion for type conversoion

           // {
         //   winGame();
            
       // }
       // else{
       //     defeatMonster();
       //one line if else statement for the if else satement
       fighting===2 ? winGame() : defeatMonster();
        }
    if (Math.random()<=0.1 && inventory.length!==1)
    {
        text.innerText="Your "+ inventory.pop() + " breaks."
        currentWeapon--;
        //it breaks randomly breaks at 10% of time but if the weapon is more than 1
        //it pops the element last inserted and shows at this line
        //as broken 
    }

    }


function dodge()
{
  text.innerText="You doged the attack from "+monsters[fighting].name+".";

}
function defeatMonster()
{
 gold+=Math.floor(monsters[fighting].level*6.7);
 //we will add 6.7 times of gold from the moster level and round off to the 
 //nearest whole number to avoid float value
 xp+=monsters[fighting].level;
 goldText.innerText=gold;
 xpText.innerText=xp;
 update(locations[4]);
}
function lose()
{
    update(locations[5]);


}
function winGame(){
    update(locations[6]);
}
function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}
function getMonsterAttackValue(level)
{
  let hit=(level*5)-(Math.floor(Math.random()*xp));
  console.log(hit);
  return hit;

}
function isMonsterHit(){
    return Math.random()>0.2||health<20;
    //20% it will randomly return false else True
    //OR=||
    //if the health is less than 20% then it will return True

}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pick(2);

}
function pickEight(){
    pick(8);

}
function pick(guess)
{
    let numbers=[];
    while (numbers.length<10)
    {
        numbers.push(Math.floor(Math.random()*11));
        //this will give us random number between 1 and 10 

    }
    text.innerText="You picked "+ guess+" . Here are the random numbers:\n";
    for (let i=0;i<10;i++)
    {
        text.innerText+= numbers[i] + "\n";

    }
    if (numbers.indexOf(guess)!==-1){
        text.innerText="Right You win 20 gold!"
        gold+=20;
        goldText.innerText=gold;
    }
    else{
        text.innerText+="Wrong You lose 10 health!";
        health-=10;
        healthText.innerText=health;
        if (health<=0){
            lose();
            
        }
    }

}



