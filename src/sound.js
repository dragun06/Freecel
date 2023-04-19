class Sound {
  music; //Son ambiance
  start; //Son partie lancée
  card; //Son pose de carte
  forfeit; //Son abandon
  win; //Son partie gagnée
  soundOn;
  soundFiles;
  isPlaying;

  constructor(_soundFiles) {
    this.soundFiles = _soundFiles;
    this.music = new Audio('../media/Sounds/' + _soundFiles[0]);
    this.start = new Audio('../media/Sounds/' + _soundFiles[1]);
    this.card = new Audio('../media/Sounds/' + _soundFiles[2]);
    this.forfeit = new Audio('../media/Sounds/' + _soundFiles[3]);
    this.win = new Audio('../media/Sounds/' + _soundFiles[4]);
    this.music.play();
    this.isPlaying = true;
    this.music.loop = true;
    this.soundOn = true;
    console.log(this.music);
    this.initVolume();
  }

  initVolume() {
    this.music.volume = 0.2;
    this.start.volume = 0.3;
    this.card.volume = 0.5;
    this.win.volume = 0.4;
    this.forfeit.volume = 0.4;
  }

  soundOnOff() {
    this.soundOn = !this.soundOn;
  }

  playPauseMusic() {
    console.log(this.isPlaying);
    if (this.isPlaying === true) {
      this.music.pause();
    } else {
      this.music.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  playDiscord() {
    if (this.soundOn) {
      this.discord.load();
      this.discord.play();
    }
  }

  playApplause() {
    if (this.soundOn) {
      this.applause.load();
      this.applause.play();
    }
  }

  playForfeit() {
    if (this.soundOn) {
      this.forfeit.load();
      this.forfeit.play();
    }
  }

  playWin() {
    if (this.soundOn) {
      this.win.load();
      this.win.play();
    }
  }

  playStart() {
    if (this.soundOn) {
      this.start.load();
      this.start.play();
    }
  }


  playCard() {
    if (this.soundOn) {
      this.card.load();
      this.card.play();
    }
  }

}