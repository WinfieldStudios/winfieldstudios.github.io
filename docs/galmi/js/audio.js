
const music = document.getElementById("music");
const sfxClickGalmi = document.getElementById("sfxClickGalmi");
const sfxClickGalmiSuper = document.getElementById("sfxClickGalmiSuper");
const sfxClickUI = document.getElementById("sfxClickUI");
const sfxClickPurchasable = document.getElementById("sfxClickPurchasable");
const sfxClickSave = document.getElementById("sfxClickSave");
const sfxGrow = document.getElementById("sfxGrow");
const sfxTool = document.getElementById("sfxTool");
const sfxTool2 = document.getElementById("sfxTool2");
const sfxTool3 = document.getElementById("sfxTool3");

music.muted = true;
sfxClickGalmi.muted = true;
sfxClickUI.muted = true;
sfxClickGalmiSuper.muted = true;
sfxClickPurchasable.muted = true;
sfxClickSave.muted = true;
sfxGrow.muted = true;
sfxTool.muted = true;
sfxTool2.muted = true;
sfxTool3.muted = true;

const playClickGalmiPooled = makePool("/galmi/audio/clickgalmi.wav", 8, 0.6);
const playClickUIPooled = makePool("/galmi/audio/clickui.wav", 4, 0.7);
const playClickGalmiSuperPooled = makePool("/galmi/audio/clickgalmisuper.wav", 8, 0.6);
const playClickPurchasablePooled = makePool("/galmi/audio/clickpurchasable.wav", 4, 0.7);
const playClickSavePooled = makePool("/galmi/audio/clicksave.wav", 8, 0.6);
const playGrowPooled = makePool("/galmi/audio/grow.wav", 4, 0.7);
const playToolPooled = makePool("/galmi/audio/tool.wav", 1, 0.7);
const playTool2Pooled = makePool("/galmi/audio/tool2.wav", 1, 0.7);
const playTool3Pooled = makePool("/galmi/audio/tool3.wav", 1, 0.7);

let musicVolume = 0;
let sfxVolume = 0;
let soundStarted = false;

setMutedSfx(true);

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
    [sfxClickGalmi, sfxClickUI].forEach(a => {
        a.volume = sfxVolume;
        a.currentTime = 0;
        a.play().then(() => {
            a.pause();
            a.currentTime = 0;
        }).catch(() => {});
    });

    if (switchVolumeMusicIndex !== 0 && !soundStarted) {
        music.volume = musicVolume;
        music.play().catch(() => {});
    }
}

document.addEventListener("pointerdown", unlockAudioOnce, { once: true });

// Example: click sound (important: reset currentTime for rapid clicks)
function playClickGalmi() {
    if (!audioUnlocked) return;
    sfxClickGalmi.currentTime = 0;
    sfxClickGalmi.play().catch(() => {});
}
function playClickGalmiSuper() {
    if (!audioUnlocked) return;
    sfxClickGalmiSuper.currentTime = 0;
    sfxClickGalmiSuper.play().catch(() => {});
}
function playClickUI() {
    if (!audioUnlocked) return;
    sfxClickUI.currentTime = 0;
    sfxClickUI.play().catch(() => {});
}
function playClickPurchasable() {
    if (!audioUnlocked) return;
    sfxClickPurchasable.currentTime = 0;
    sfxClickPurchasable.play().catch(() => {});
}
function playClickSave() {
    if (!audioUnlocked) return;
    sfxClickSave.currentTime = 0;
    sfxClickSave.play().catch(() => {});
}
function playGrow() {
    if (!audioUnlocked) return;
    sfxGrow.currentTime = 0;
    sfxGrow.play().catch(() => {});
}
function playTool() {
    if (!audioUnlocked) return;
    switch(Math.floor(Math.random() * 3) + 1) {
        case 3:
            sfxTool3.currentTime = 0;
            sfxTool3.play().catch(() => {});
            console.log("switch case ", 3);
            break;
        case 2:
            sfxTool2.currentTime = 0;
            sfxTool2.play().catch(() => {});
            console.log("switch case ", 2);
            break;
        case 1:
        default:
            sfxTool.currentTime = 0;
            sfxTool.play().catch(() => {});
            console.log("switch case ", 1);
            break;
    } 
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
    sfxClickGalmi.muted = on;
    sfxClickUI.muted = on;
    sfxClickGalmiSuper.muted = on;
    sfxClickPurchasable.muted = on;
    sfxClickSave.muted = on;
    sfxGrow.muted = on;
    sfxTool.muted = on;
    sfxTool2.muted = on;
    sfxTool3.muted = on;
}

function setVolumeMusic(v) {
    musicVolume = v;
    music.volume = switchVolumeMusicIndex == 0 ? 0 : v;
}

function setVolumeSfx(v) {
    sfxVolume = v;
    sfxClickGalmi.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxClickUI.volume = switchVolumeSfxIndex == 0 ? 0 : v / 2;
    sfxClickGalmiSuper.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxClickPurchasable.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxClickSave.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxGrow.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxTool.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxTool2.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxTool3.volume = switchVolumeSfxIndex == 0 ? 0 : v;
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

    localStorage.setItem('switchVolumeMusicIndex', JSON.stringify(switchVolumeMusicIndex));
}

function switchVolumeSfx() {
    switch (switchVolumeSfxIndex) {
        case 3:
            setMutedSfx(true);
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
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS /  ";
            switchVolumeSfxIndex = 1;
            setVolumeSfx(0.2);
            break;
    }
    localStorage.setItem('switchVolumeSfxIndex', JSON.stringify(switchVolumeSfxIndex));
}

function loadVolumes() {
    switch (switchVolumeMusicIndex) {
        case 3:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC ///";
            setVolumeMusic(0.2);
            break;
        case 2:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC //";
            setVolumeMusic(0.08);
            break;
        case 1:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC /";
            setVolumeMusic(0.02);
            break;
        default:
            setMutedMusic(true);
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC";
            break;
    }
    switch (switchVolumeSfxIndex) {
        case 3:
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS ///";
            setVolumeSfx(1);
            break;
        case 2:
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS // ";
            setVolumeSfx(0.5);
            break;
        case 1:
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS /  ";
            setVolumeSfx(0.2);
            break;
        default:
            setMutedSfx(true);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS";
            setVolumeSfx(0);
            break;
    }
}
