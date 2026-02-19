
let canRockTalkTimeout = null;
let galmiTalkMessageTimeout = null;

let canRockTalk = true;
let isGalmiTalking = false;

// CLICKING THE ROCK
function clickOnRock(event) {
  rocks.count += rocksPerClick;
  totalClicksEver++;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;

  if (canRockTalk == true) rockTalk();

  const x = event.offsetX + (Math.floor(Math.random() * (window.isPowerupGoldenActive ? 100 : 20)) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${formatNumber(Math.round(rocksPerClick))}`;
  div.style.cssText = `color: ${window.isPowerupGoldenActive ? "#FFD24A" : "var(--primary-color)"}; text-shadow: ${window.isPowerupGoldenActive ? "0 0 12px rgba(255,200,80,1)" : "none"}; position: absolute; top: ${y}px; left: ${x}px; font-size: ${window.isPowerupGoldenActive ? (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 42 : 24) : (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 30 : 15)}px; font-weight: ${window.isPowerupGoldenActive ? "bold" : "lighter"}; font-family: "Pixelated"; pointer-events: none;`;

  rockImageContainer.appendChild(div);
  div.classList.add('fade-up');
  timeout(div);
}

function rockTalk() {
  // Bonus message particle
  if (document.getElementById("particle-layer")) {
    if (isGalmiTalking) return;
    const galmiTalkMessage = document.createElement("div");
    galmiTalkMessage.textContent = getVoiceline();
    galmiTalkMessage.style.cssText = `color: var(--primary-color); position: fixed; top: 12vh; left: 52.25%; transform: translateX(-50%); font-size: 20px; font-family: "Pixelated"; pointer-events: none;`;
    document.getElementById("particle-layer").appendChild(galmiTalkMessage);
    isGalmiTalking = true;
    galmiTalkMessageTimeout = setTimeout(() => {galmiTalkMessage.remove(); isGalmiTalking = false;}, 4500);
  }

  // Reset the cooldown + (re)start the 15s unlock timer
  canRockTalk = false;

  if (canRockTalkTimeout) clearTimeout(canRockTalkTimeout);
  canRockTalkTimeout = setTimeout(() => {
    canRockTalk = true;
  }, 10000);
}

function getVoiceline() {
  let voicelines = ["..."];

  switch (upgradeGalmi.level) {
    case 1:
      voicelines = ["..."];
      break;
    case 2:
      voicelines = [
        "...",
        "....",
        ".....",
        "......",
        "...",
        "....",
        ".....",
        "......",
        "...",
        "....",
        ".....",
        "......",
        "...",
        "....",
        ".....",
        "......",
        "...",
        "....",
        ".....",
        "......",
        "...?"
      ];
      break;
    case 3:
      voicelines = [

        // For Sure
        "...",
        "..!",
        "....",
        ".....?",
        ".....!",
        "?.....",
        "!.....",
        ". . .",
        ".......",
        "....!",
        "........",
        "........?",
        ".........!",
        ". . . . .",
        "..........",
        "...!....!",
        "....!....",
        "..?.........?",
        ".!...!.....!",
        ". . . . . . .",
        "...",
        "..!",
        "....",
        ".....?",
        ".....!",
        "?.....",
        "!.....",
        ". . .",
        ".......",
        "....!",
        "........",
        "........?",
        ".........!",
        ". . . . .",
        "..........",
        "...!....!",
        "....!....",
        "..?.........?",
        ".!...!.....!",
        ". . . . . . .",
        "(╥﹏╥)",
        
        // Unsure
        "*stone noises*",
        "*404 mouth not found*",
        "*confused pebble sounds*",
        "*shakes violently*",
        "hm...",
        "hmm....",
        "hMMM....!",
        "u— ...",
        "asdf...",
        "ngh....",
        "grr....",
        "rrr.....",
        "k—k— ...",
        "c—cl— ...",
        "I— ...",
        "m—mph!...",
        ".....(pls help)",
        ".....(i am trying ok)"
      ];
      break;

    case 4: // early 2010s internet speak rock
      voicelines = [
        
        // For Sure:
        "im a buff baby...",
        "i hungry for minerals :3",
        "67",
        "unirocktualowkenuinely",
        "(˶ᵔ ᵕ ᵔ˶)",
        "(¬_¬\")",
        "(๑ᵔ⤙ᵔ๑)",
        "get rekt",
        "git gud",
        "gg ez",
        "smh my head",
        "dank minerals detected",
        "yolo",
        "swag rock reporting in",
        "all your rock are belong to us",
        "personally, i prefer the ground",
        "im helping!!1!",
        "rawr xD",
        "hehe derp.",
        "i can haz clicks?",
        "LE CLICK.",
        "trolololol",
        "click harder senpai",
        "y u stop clickin",
        "rock.exe has stopped working",

        // Unsure:
        "omg im talkin now o_o",
        "u mad? im rock.",
        "lolwut",
        "brb becoming legendary.",
        "pls click. thx.",
        "no u.",
        "IM A ROCK. deal w/ it.",
        "so wow. much mineral.",
        "epic win.",
        "epic fail... jk we gud.",
        "i liek dis.",
        "you jelly?",
        "2 stronk 4 u.",
        "i'm smol but fierce >:3",
        "huehuehue",
        "dat click tho",
        "such progress. wow.",
        "i can haz upgrade plz",
        "don't panic. it's just a rock.",
        "omnomnom minerals",
        "like a boss.",
        "this is fine.",
        "FIRST. (jk)",
        "keyboard cat would be proud",
        "okay but srsly keep clickin",
        "ayy lmao",
        "i'm not crying ur crying",
        "i'm baby... but also a unit",
        "hold up... is this power??",
        "click click boom"
      ];
      break;


    // case 5: // rock hard dude (stern / intense)
    //   voicelines = [
    //     "Focus. Don't waste clicks.",
    //     "I don't need luck. I need discipline.",
    //     "You hesitate. That's why you lose.",
    //     "Keep your hands steady. Keep your mind sharper.",
    //     "Do it again. Faster.",
    //     "Stop celebrating. We're not done.",
    //     "Every click is a choice. Choose better.",
    //     "You want progress? Earn it.",
    //     "You think this is hard? Good.",
    //     "We don't quit when it's boring.",
    //     "You're stronger than your excuses.",
    //     "That upgrade wasn't clean. But it'll do.",
    //     "Stay sharp. Stay moving.",
    //     "Don't look away. Keep clicking.",
    //     "Control the pace. Control the fight.",
    //     "I've been a pebble. I remember.",
    //     "We're not here to feel good. We're here to win.",
    //     "You can rest when the numbers stop climbing.",
    //     "I don't want easy. I want better.",
    //     "Good. Now prove it wasn't luck.",
    //     "Your will is showing. Don't let it slip.",
    //     "You're improving. Don't get cocky.",
    //     "We harden under pressure.",
    //     "You have potential. Stop wasting it.",
    //     "Again."
    //   ];
    //   break;

    case 5: // giga chad gym bro (supportive hype)
      voicelines = [

        // For Sure:
        "...AND I DANCE LIKE A MAN!",
        "YES BRO! THAT'S A CLEAN REP!",
        "LIGHTWEIGHT, BABY!",
        "THE PUMP IS REAL. THE ROCK IS REALER.",
        "STAY HARD. STAY KIND. STAY CLICKING.",
        "I'M ROCK HARD RIGHT NOW.",
        "i love you",
        "BRO I'M PROUD OF YOU. NO JOKE.",
        "THAT UPGRADE? ABSOLUTE UNIT MOVE.",
        "LET'S GO! MINERAL MINDSET.",
        "BRO... WE'RE CRACKED.",
        "AIN'T NOTHIN' BUT A PEANUT.",
        "AIN'T NUTH' TO IT BUT TO DO IT.",
        "I'M ROCK SOLID...",
        "DON'T STOP NOW, PLEASE.",
        "CHROMITE? IRON? WHATEVER. WE EAT IT ALL.",

        // Unsure:
        "WE'RE ASCENDING, KING.",
        "LOCK IN. BREATHE. CLICK.",
        "ONE MORE CLICK. NOW ANOTHER.",
        "YOU'RE BUILT DIFFERENT. I CAN TELL.",
        "WE DON'T CHASE MOTIVATION. WE CHASE RESULTS.",
        "YOU'RE NOT TIRED. YOU'RE ADAPTING.",
        "BIG ENERGY. BIG ROCK.",
        "THIS IS WHAT PEAK EVOLUTION LOOKS LIKE.",
        "YOU'RE A MACHINE. BUT WITH A SOUL.",
        "KEEP GOING. FUTURE YOU IS CHEERING.",
        "RESPECT. DISCIPLINE. CONSISTENCY.",
        "THAT'S IT. THAT'S THE GRINDSET.",
        "YOU CLICK LIKE YOU MEAN IT.",
        "DON'T STOP NOW, WE'RE IN THE ZONE.",
        "I BELIEVE IN YOU, BRO. FULLY."
      ];
      break;

    default:
      voicelines = ["..."];
      break;
  }

  return voicelines[Math.floor(randInt(0, voicelines.length - 1))];
}

