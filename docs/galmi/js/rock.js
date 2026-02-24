
let canRockTalkTimeout = null;
let galmiTalkMessageTimeout = null;

let canRockTalk = true;
let isGalmiTalking = false;

// CLICKING THE ROCK
function clickOnRock(event) {
  rocks.count += rocksPerClick;
  totalClicksEver++;
  document.querySelector('.total-clicks-ever').innerHTML = formatNumberWithCommas(totalClicksEver);

  if (canRockTalk == true) rockTalk();

  const x = event.offsetX + (Math.floor(Math.random() * (window.isPowerupGoldenActive ? 100 : 20)) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${formatNumber(Math.round(rocksPerClick))}`;
  div.style.cssText = `color: ${window.isPowerupGoldenActive ? "var(--golden)" : "var(--primary-color)"}; text-shadow: ${window.isPowerupGoldenActive ? "0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black, 0.05em 0.05em black" : "none"}; position: absolute; top: ${y}px; left: ${x}px; font-size: ${window.isPowerupGoldenActive ? (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 42 : 24) : (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 30 : 15)}px; font-weight: ${window.isPowerupGoldenActive ? "bold" : "lighter"}; font-family: "Pixelated"; pointer-events: none;`;

  rockImageContainer.appendChild(div);
  div.classList.add('fade-up');
  timeout(div);
}

function rockTalk() {
  // Bonus message particle
  if (document.getElementById("particle-layer")) {
    if (isGalmiTalking) return;
    let spacefromTop = 35;
    if (upgradeGalmi.level >= TOTAL_ROCK_IMAGES) spacefromTop = 15;
    else if (upgradeGalmi.level === 5) spacefromTop = 30;
    const galmiTalkMessage = document.getElementById("galmi-voiceline");
    galmiTalkMessage.innerHTML = getVoiceline();
    isGalmiTalking = true;
    galmiTalkMessageTimeout = setTimeout(() => {galmiTalkMessage.innerHTML = ""; isGalmiTalking = false;}, GALMI_VOICELINE_DISPLAY_DURATION_MILLISECONDS);
  }

  // Reset the cooldown + (re)start the 15s unlock timer
  canRockTalk = false;

  if (canRockTalkTimeout) clearTimeout(canRockTalkTimeout);
  canRockTalkTimeout = setTimeout(() => {
    canRockTalk = true;
  }, GALMI_VOICELINE_DOWNTIME_DURATION_MILLISECONDS);
}

function getVoiceline() {
  let voicelines = [""];

  switch (upgradeGalmi.level) {
    case 1:
      voicelines = [""];
      break;
    case 2:
      voicelines = [

        // For Sure
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
        "...?",

        // Unsure
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""

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
        "( ꩜ ᯅ ꩜;)",
        "(╥‸╥)",
        "(⸝⸝๑﹏๑⸝⸝)",
        "(｡•́︿•̀｡)",
        "( ͡° ͜ʖ ͡°)",
        "(⇀‸↼‶)",
        "~ stone noises ~",
        "~ 404 mouth not found ~",
        "~ shakes violently ~",
        "~ eats a rock ~",
        "hm...?",
        "hmm....",
        "hMMM....!",
        "asdf...",
        "u— ...",
        "ngh....",
        "grr....",
        "rrr.....",
        "k—k— ...",
        "c—cl— ...",
        "I— ...",
        "m—mph!...",
        ".....(plz hlp)",
        ".....(i tryn ok)",
        
        // Unsure
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ];
      break;

    case 4: // early 2010s internet speak rock
      voicelines = [
        
        // For Sure:
        "i can talk?",
        "im a buff baby...",
        "i hungry for minerals :3",
        "67",
        "69",
        "21",
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
        "hehe derp",
        "i can haz clicks?",
        "LE CLICK",
        "trolololol",
        "click harder senpai",
        "y u stop clickin",
        "rock.exe has stopped working",
        "keep clickin!",
        "bravo 6 going rock",
        "no u",
        "vro",
        "deez rocks",
        "i so hungie i could eat boulder",
        "i eat rocks",
        "ty 4 growing me",
        "lets go 2 candy mountain, rocky",
        "TEEHEE",
        "shut up",
        "=3",
        "i rock",
        "i used to be in terraria",
        "who is dat rock w da parachute?",
        "is chromite green?",
        "wut is ur highest clicks per second?",
        "look at ur stats in the bottom left!",
        "this is fine",
        "i liek dat.",
        "lolwut",
        "i can haz upgrade plz",
        "i watch bluey sumtimez",
        "tung tung tung tung tung",
        "bad biscitz make baker broke bro",
        "mmmmmmm check plz!!!",
        "i wish 4 a rockwich!",

        // Unsure:
        "epic win",
        "you jelly?",
        "2 stronk 4 u.",
        "huehuehue",
        "dat click tho",
        "such progress wow",
        "dont panic im just rock",
        "omnomnom minerals",
        "like a boss",
        "keyboard cat would be proud"
      ];
      break;


    case 5: // rock hard dude (stern / intense)
      voicelines = [
        // For Sure
        "I DON'T NEED ANY CALMING TEA!",
        "I can't feel my legs...",
        "She a nice lady and she shakin' her yams.",
        "Spent the whole summer trappin' out the sedan.",
        "I was born in Terraria.",
        "Malph just R Flashed.",
        "My cousin's name is Tiny.",
        "Thank Rock I'm not a cookie.",
        "Oh my Rock.",
        "Bears. Beets. Battle Rock Galactica.",
        "Have you played Rock Souls?",
        "Don't take me for Granite.",
        "I've been to too many Rock Bottoms.",
        "You know nothing, John Stone",
        "I'm so hungry, I could eat a mountain.",
        "I'm stoned.",
        "That's a lotta goblins...",
        "You tryna tell me a goblin bought a hellcat?",
        "I eat rocks for breakfast... without any milk!",
        "These goblins are graveling in fear.",
        "They're goblin these rocks.",
        "You're stuck between me and a hard place.",
        "My goblin sense is tingling.",
        "Don't forget to upgrade your tool.",
        "Mine your own business.",
        "These rocks are all natural baby.",
        "I must capture the rockatar to restore my honor.",
        "The boulder feels conflicted.",
        "I'll bury you in a rock-a-lanche!",
        "Hm! Hm! Hm! Hm! Hm!",
        "You know who else likes rocks? My mom!",
        "I eat shale.",
        "When do we get to the deepslate?",
        "Where are the diamonds?",
        "You can see your stats in the bottom left vro.",
        "I'd use all 3 of my wishes for 999Q rocks.",
        "Everybody dies in their nightmares.",
        "Lean wit me, Pop wit me, ...if you rock wit me.",
        "That little guy in the parachute is my son.",

        // unsure
        "Stone cold."
      ];
      break;

    case 6: // giga chad gym bro (supportive hype)
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
        "BRO... YOU'RE CRACKED.",
        "BRO... WE'RE CRAGGED.",
        "AIN'T NOTHIN' BUT A PEANUT.",
        "AIN'T NUTH' TO IT BUT TO DO IT.",
        "I'M ROCK SOLID...",
        "DON'T STOP NOW, PLEASE.",
        "CHROMITE? IRON? ROCKS? I'LL EAT IT ALL.",
        "ROCK ON!",
        "I TURNED MYSELF INTO A ROCK, MORTY!",
        "I'M SO HUNGRY; I COULD EAT THE PLANET.",
        "ROCK AND STONE!",
        "FOR CARL!",

        // Unsure:
        "I RECOMMEND FRIEREN!",
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
      voicelines = [""];
      break;
  }

  return voicelines[Math.floor(randInt(0, voicelines.length - 1))];
}

