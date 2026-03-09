
const music = document.getElementById("music");
const musicAlt = document.getElementById("musicAlt");
const sfxClickGalmi = document.getElementById("sfxClickGalmi");
const sfxClickGalmiSuper = document.getElementById("sfxClickGalmiSuper");
const sfxClickUI = document.getElementById("sfxClickUI");
const sfxClickPurchasable = document.getElementById("sfxClickPurchasable");
const sfxClickSave = document.getElementById("sfxClickSave");
const sfxGrow = document.getElementById("sfxGrow");
const sfxTool = document.getElementById("sfxTool");
const sfxStaff = document.getElementById("sfxStaff");
const sfxSon = document.getElementById("sfxSon");

music.muted = true;
musicAlt.muted = true;
sfxClickGalmi.muted = true;
sfxClickUI.muted = true;
sfxClickGalmiSuper.muted = true;
sfxClickPurchasable.muted = true;
sfxClickSave.muted = true;
sfxGrow.muted = true;
sfxTool.muted = true;
sfxStaff.muted = true;
sfxSon.muted = true;

let musicVolume = 0;
let sfxVolume = 0;
let soundStarted = false;

const playClickGalmiPooled = makePool("/galmi/audio/clickgalmi.wav", 8, 0.6);
const playClickUIPooled = makePool("/galmi/audio/clickui.wav", 4, 0.7);
const playClickGalmiSuperPooled = makePool("/galmi/audio/clickgalmisuper.wav", 8, 0.6);
const playClickPurchasablePooled = makePool("/galmi/audio/clickpurchasable.wav", 4, 0.7);
const playClickSavePooled = makePool("/galmi/audio/clicksave.wav", 8, 0.6);
const playGrowPooled = makePool("/galmi/audio/grow.wav", 4, 0.7);
const playToolPooled = makePool("/galmi/audio/tool.wav", 1, 0.7);
const playStaffPooled = makePool("/galmi/audio/toolstaff.wav", 1, 0.7);
const playSonPooled = makePool("/galmi/audio/clickgalmison.wav", 1, 0.7);

setMutedSfx(true);

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("music");
    const musicAlt = document.getElementById("musicAlt");
    if (!music) return; // prevents crash
    music.volume = musicVolume;
    musicAlt.volume = musicVolume;
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
        musicAlt.volume = musicVolume;
        musicAlt.play().catch(() => {});
    }
    
    loadVolumes();
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
function playClickGalmiSon() {
    if (!audioUnlocked) return;
    sfxSon.currentTime = 0;
    sfxSon.play().catch(() => {});
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
function playStaff() {
    if (!audioUnlocked) return;
    sfxStaff.currentTime = 0;
    sfxStaff.play().catch(() => {});
}
function playTool() {
    if (!audioUnlocked) return;
    sfxTool.currentTime = 0;
    sfxTool.play().catch(() => {});
    // switch(Math.floor(Math.random() * 3) + 1) {
    //     case 3:
    //         sfxSon.currentTime = 0;
    //         sfxSon.play().catch(() => {});
    //         break;
    //     case 2:
    //         sfxStaff.currentTime = 0;
    //         sfxStaff.play().catch(() => {});
    //         break;
    //     case 1:
    //     default:
    //         sfxTool.currentTime = 0;
    //         sfxTool.play().catch(() => {});
    //         break;
    // } 
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
    sfxStaff.muted = on;
    sfxSon.muted = on;
}

function setVolumeMusic(v) {
    musicVolume = v;
    music.volume = switchVolumeMusicIndex == 0 ? 0 : v;
    musicAlt.volume = switchVolumeMusicIndex == 0 ? 0 : v;
}

function setVolumeSfx(v) {
    sfxVolume = v;
    sfxClickGalmi.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxClickUI.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxClickGalmiSuper.volume = switchVolumeSfxIndex == 0 ? 0 : v / 1.5;
    sfxClickPurchasable.volume = switchVolumeSfxIndex == 0 ? 0 : v / 1.5;
    sfxClickSave.volume = switchVolumeSfxIndex == 0 ? 0 : v / 3;
    sfxGrow.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxTool.volume = switchVolumeSfxIndex == 0 ? 0 : v / 1.5;
    sfxStaff.volume = switchVolumeSfxIndex == 0 ? 0 : v;
    sfxSon.volume = switchVolumeSfxIndex == 0 ? 0 : v / 3;
}

function switchVolumeMusic() {
    switch (switchVolumeMusicIndex) {
        case 7:
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC";
            switchVolumeMusicIndex = 0;
            setVolumeMusic(0);
            break;
        case 6:
            document.getElementById('util-button-music-switch').innerHTML = "ALT ///";
            switchVolumeMusicIndex = 7;
            setVolumeMusic(0.2);
            break;
        case 5:
            document.getElementById('util-button-music-switch').innerHTML = "ALT //";
            switchVolumeMusicIndex = 6;
            setVolumeMusic(0.05);
            break;
        case 4:
            document.getElementById('util-button-music-switch').innerHTML = "ALT /";
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
                music.muted = true;
                musicAlt.muted = false;
                musicAlt.volume = musicVolume;
                musicAlt.play().catch(() => {});
            }
            switchVolumeMusicIndex = 5;
            setVolumeMusic(0.01);
            break;
        case 3:
            document.getElementById('util-button-music-switch').innerHTML = "ALT";
            switchVolumeMusicIndex = 4;
            setVolumeMusic(0);
            break;
        case 2:
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC ///";
            switchVolumeMusicIndex = 3;
            setVolumeMusic(0.2);
            break;
        case 1:
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC //";
            switchVolumeMusicIndex = 2;
            setVolumeMusic(0.05);
            break;
        default:
            setMutedMusic(false);
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC /";
            if (!soundStarted) {
                music.muted = false;
                music.volume = musicVolume;
                music.play().catch(() => {});
                musicAlt.volume = musicVolume;
                musicAlt.muted = true;
            }
            switchVolumeMusicIndex = 1;
            setVolumeMusic(0.01);
            break;
    }

    localStorage.setItem('switchVolumeMusicIndex', JSON.stringify(switchVolumeMusicIndex));
}

function switchVolumeSfx() {
    switch (switchVolumeSfxIndex) {
        case 3:
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS";
            switchVolumeSfxIndex = 0;
            setVolumeSfx(0);
            break;
        case 2:
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS ///";
            switchVolumeSfxIndex = 3;
            setVolumeSfx(1);
            break;
        case 1:
            setMutedSfx(false);
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
        case 7:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "ALT ///";
            setVolumeMusic(0.2);
            music.muted = true;
            musicAlt.muted = false;
            break;
        case 6:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "ALT //";
            setVolumeMusic(0.05);
            music.muted = true;
            musicAlt.muted = false;
            break;
        case 5:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "ALT /";
            setVolumeMusic(0.01);
            music.muted = true;
            musicAlt.muted = false;
            break;
        case 4:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "ALT";
            setVolumeMusic(0);
            music.muted = true;
            musicAlt.muted = true;
            break;
        case 3:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC ///";
            setVolumeMusic(0.2);
            music.muted = false;
            musicAlt.muted = true;
            break;
        case 2:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC //";
            setVolumeMusic(0.05);
            music.muted = false;
            musicAlt.muted = true;
            break;
        case 1:
            setMutedMusic(false);
            if (!soundStarted) {
                music.volume = musicVolume;
                music.play().catch(() => {});
            }
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC /";
            setVolumeMusic(0.01);
            music.muted = false;
            musicAlt.muted = true;
            break;
        default:
            setMutedMusic(false);
            document.getElementById('util-button-music-switch').innerHTML = "MUSIC";
            setVolumeMusic(0);
            music.muted = true;
            musicAlt.muted = true;
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
            setMutedSfx(false);
            document.getElementById('util-button-sfx-switch').innerHTML = "SOUNDS";
            setVolumeSfx(0);
            break;
    }
}
