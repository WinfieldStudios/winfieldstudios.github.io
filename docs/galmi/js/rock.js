
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

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${formatNumber(Math.round(rocksPerClick))}`;
  div.style.cssText = `color: ${window.sonBonusActive ? "#FFD24A" : "var(--primary-color)"}; text-shadow: ${window.sonBonusActive ? "0 0 12px rgba(255,200,80,1)" : "none"}; position: absolute; top: ${y}px; left: ${x}px; font-size: ${window.sonBonusActive ? (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 42 : 24) : (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 30 : 15)}px; font-weight: ${window.sonBonusActive ? "bold" : "lighter"}; font-family: "Pixelated"; pointer-events: none;`;

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
    galmiTalkMessageTimeout = setTimeout(() => {galmiTalkMessage.remove(); isGalmiTalking = false;}, 3000);
  }

  // Reset the cooldown + (re)start the 15s unlock timer
  canRockTalk = false;

  if (canRockTalkTimeout) clearTimeout(canRockTalkTimeout);
  canRockTalkTimeout = setTimeout(() => {
    canRockTalk = true;
  }, 15000);
}

function getVoiceline() {
  let voicelines = ["..."];

  switch (upgradeGalmi.level) {
    case 1:
    case 2:
    case 3:
      voicelines = ["..."];
      break;

    case 4: // baby rock
      voicelines = [
        "ga ga... rock!",
        "me click?",
        "more tap! yay!",
        "u my friend!",
        "i wuv clicks.",
        "rocky happy!",
        "hehe! tickle!",
        "i made number go up!",
        "big rock soon!",
        "i try! i try!",
        "what dat?",
        "wow! shiny!",
        "u strong finger!",
        "tap tap tap!",
        "more! more!",
        "i hungry... minerals?",
        "rock go brrr!",
        "i sleepy... nope! click!",
        "look! i do it!",
        "no stop!",
        "good job us!",
        "is that... upgrade?",
        "i got FACE now!",
        "am baby. but TOUGH baby.",
        "we growin'!"
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
        "YES BRO! THAT'S A CLEAN REP!",
        "WE'RE ASCENDING, KING.",
        "LOCK IN. BREATHE. CLICK.",
        "LIGHTWEIGHT, BABY!",
        "THE PUMP IS REAL. THE ROCK IS REALER.",
        "ONE MORE CLICK. NOW ANOTHER.",
        "YOU'RE BUILT DIFFERENT. I CAN TELL.",
        "STAY HARD. STAY KIND. STAY CLICKING.",
        "BRO I'M PROUD OF YOU. NO JOKE.",
        "WE DON'T CHASE MOTIVATION. WE CHASE RESULTS.",
        "THAT UPGRADE? ABSOLUTE UNIT MOVE.",
        "YOU'RE NOT TIRED. YOU'RE ADAPTING.",
        "LET'S GO! MINERAL MINDSET.",
        "BIG ENERGY. BIG ROCK.",
        "THIS IS WHAT PEAK EVOLUTION LOOKS LIKE.",
        "YOU'RE A MACHINE. BUT WITH A SOUL.",
        "KEEP GOING. FUTURE YOU IS CHEERING.",
        "RESPECT. DISCIPLINE. CONSISTENCY.",
        "BRO… WE'RE CRACKED.",
        "THAT'S IT. THAT'S THE GRINDSET.",
        "YOU CLICK LIKE YOU MEAN IT.",
        "DON'T STOP NOW, WE'RE IN THE ZONE.",
        "I BELIEVE IN YOU, BRO. FULLY.",
        "WATER? IRON? WHATEVER. WE EAT IT ALL.",
        "WE'RE NOT JUST ROCK. WE'RE LEGEND."
      ];
      break;

    default:
      voicelines = ["..."];
      break;
  }

  return voicelines[Math.floor(randInt(0, voicelines.length - 1))];
}

