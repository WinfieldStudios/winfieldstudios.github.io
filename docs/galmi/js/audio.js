const sfxClick = document.getElementById("sfxClick");
const sfxBuy = document.getElementById("sfxBuy");
const music = document.getElementById("music");

sfxClick.muted = true;
sfxBuy.muted = true;
music.muted = true;

const playClickPooled = makePool("/galmi/audio/click.wav", 8, 0.6);
const playBuyPooled   = makePool("/galmi/audio/buy.wav",   4, 0.7);

let sfxVolume = 0;
let musicVolume = 0;
let soundStarted = false;
let switchVolumeIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("music");
    if (!music) return; // prevents crash
    music.volume = musicVolume;
});

let audioUnlocked = false;

function unlockAudioOnce() {
    if (audioUnlocked) return;
    audioUnlocked = true;

    // "Prime" audio so future plays work smoothly
    [sfxClick, sfxBuy].forEach(a => {
        a.volume = sfxVolume;
        a.currentTime = 0;
        a.play().then(() => {
            a.pause();
            a.currentTime = 0;
        }).catch(() => {});
    });
}

document.addEventListener("pointerdown", unlockAudioOnce, { once: true });

// Example: click sound (important: reset currentTime for rapid clicks)
function playClick() {
    if (!audioUnlocked) return;
    sfxClick.currentTime = 0;
    sfxClick.play().catch(() => {});
}

function playBuy() {
    if (!audioUnlocked) return;
    sfxBuy.currentTime = 0;
    sfxBuy.play().catch(() => {});
}

function makePool(src, size = 6, volume = sfxVolume) {
    const pool = Array.from({ length: size }, () => {
        const a = new Audio(src);
        a.preload = "auto";
        a.volume = volume;
        return a;
    });
    let i = 0;
    return () => {
        if (!audioUnlocked) return;
        const a = pool[i];
        i = (i + 1) % pool.length;
        a.currentTime = 0;
        a.play().catch(() => {});
    };
}

function setMuted(on) {
    switchVolumeIndex = 0;
    music.muted = on;
    sfxClick.muted = on;
    sfxBuy.muted = on;
}

function setSfxVolume(v) {
    sfxVolume = v;
    sfxClick.volume = v;
    sfxBuy.volume = v;
}

function setMusicVolume(v) {
    musicVolume = v;
    music.volume = switchVolumeIndex == 0 ? 0 : v;
}

function switchVolume() {
    switch (switchVolumeIndex) {
        case 3:
            setMuted(true);
            document.getElementById('util-button-mute-toggle').innerHTML = "MUTED";
            switchVolumeIndex = 0;
            break;
        case 2:
            setMusicVolume(0.2);
            setSfxVolume(1);
            document.getElementById('util-button-mute-toggle').innerHTML = "LOUD";
            switchVolumeIndex = 3;
            break;
        case 1:
            setMusicVolume(0.08);
            setSfxVolume(0.5);
            document.getElementById('util-button-mute-toggle').innerHTML = "NORMAL";
            switchVolumeIndex = 2;
            break;
        default:
            setMuted(false);
            setMusicVolume(0.02);
            setSfxVolume(0.2);
            document.getElementById('util-button-mute-toggle').innerHTML = "QUIET";
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            switchVolumeIndex = 1;
            break;
    }
}
