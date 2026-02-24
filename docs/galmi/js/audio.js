const sfxClick = document.getElementById("sfxClick");
const sfxBuy = document.getElementById("sfxBuy");
const music = document.getElementById("music");

sfxClick.muted = true;
sfxBuy.muted = true;
music.muted = true;

setMutedSfx(false);

const playClickPooled = makePool("/galmi/audio/click.wav", 8, 0.6);
const playBuyPooled   = makePool("/galmi/audio/buy.wav",   4, 0.7);

let sfxVolume = 0;
let musicVolume = 0;
let soundStarted = false;
let switchVolumeMusicIndex = 0;
let switchVolumeSfxIndex = 0;

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

function setMutedMusic(on) {
    music.muted = on;
}
function setMutedSfx(on) {
    sfxClick.muted = on;
    sfxBuy.muted = on;
}

function setVolumeSfx(v) {
    sfxVolume = v;
    sfxClick.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxBuy.volume = switchVolumeSfxIndex == 0 ? 0 : v;
}

function setVolumeMusic(v) {
    musicVolume = v;
    music.volume = switchVolumeMusicIndex == 0 ? 0 : v;
}

function switchVolumeSfx() {
    switch (switchVolumeSfxIndex) {
        case 3:
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS";
            switchVolumeSfxIndex = 0;
            setVolumeSfx(0);
            break;
        case 2:
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS ///";
            switchVolumeSfxIndex = 3;
            setVolumeSfx(1);
            break;
        case 1:
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS // ";
            switchVolumeSfxIndex = 2;
            setVolumeSfx(0.5);
            break;
        default:
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS /  ";
            switchVolumeSfxIndex = 1;
            setVolumeSfx(0.2);
            break;
    }
}

function switchVolumeMusic() {
    switch (switchVolumeMusicIndex) {
        case 3:
            setMutedMusic(true);
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC";
            switchVolumeMusicIndex = 0;
            break;
        case 2:
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC ///";
            switchVolumeMusicIndex = 3;
            setVolumeMusic(0.2);
            break;
        case 1:
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC //";
            switchVolumeMusicIndex = 2;
            setVolumeMusic(0.08);
            break;
        default:
            setMutedMusic(false);
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC /";
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            switchVolumeMusicIndex = 1;
            setVolumeMusic(0.02);
            break;
    }
}
