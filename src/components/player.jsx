import React from "react";
import ReactHowler from 'react-howler'
import Control from "./controle";
import ProgressBar from "./progressBar";
import MusicLeft from "./playerMusicLeft";
import MusicRight from "./playerMusicRight";

class MusicPlayer extends React.Component {
    controlRef = React.createRef();

    state = {
        src: 'https://firebasestorage.googleapis.com/v0/b/spotify-d8fce.appspot.com/o/Ek%20Raat.mp3?alt=media&token=75c55817-37d7-4c47-8d5f-4484d955b6c5',
        isPlaying: false,
        percent: 0,
        isSongChanged:0,
        volume: 0.5,
        name: "Ek Raat",
        artist: "Vilan",
        iconURL:"https://firebasestorage.googleapis.com/v0/b/spotify-d8fce.appspot.com/o/icons%2FEk-Raat-Hindi-2018-20180209-500x500.jpg?alt=media&token=1264f3f7-9cfc-4b9c-9460-01c513d0e36c"
    }

    updateSongSrc = (src, name, artist, iconURL) => {
        this.setState({ src, name, artist, iconURL,isSongChanged:1});
        this.updateSeekDuration(0);
    }
    
    updateMusicPlayPause = (value) => {
        this.setState({
            isPlaying: value
        });
    }

    updateSongDuration = () => {
        this.intervals = setInterval(this.updateSeek, 1000)
    }

    updateSeek = () => {
        var songCompleted = ((this.player.seek() / this.player.duration()) * 100).toFixed(2);
        var min = Math.floor(this.player.seek() % 3600 / 60);
        var sec = Math.floor(this.player.seek() % 3600 % 60);
        if (sec < 10)
            sec = "0" + sec
            
        var min2 = Math.floor(this.player.duration() % 3600 / 60);
        var sec2 = Math.floor(this.player.duration() % 3600 % 60);
        if (sec2 < 10)
            sec2 = "0" + sec2

        this.setState({ percent: songCompleted });

        document.getElementById('valueBar').style.width = songCompleted + "%";
        document.getElementById('valuePoint').style.left = "calc("+songCompleted+ "% - 6px)";
        document.getElementById('songCompleted').innerText = "" + min + ":" + sec;
        document.getElementById('songDuration').innerText = "" + min2 + ":" + sec2;

        if (!this.state.isPlaying && this.intervals)
            clearInterval(this.intervals);
    }

    updateSeekDuration = (percent) => {
        var sec = (percent * this.player.duration())/100;
        //console.log(sec,this.player.duration());
        this.player.seek(sec);
        this.updateSeek();
    }

    updateVolume = (volume) => {
        this.setState({ volume });
        document.getElementById('valueBarVolume').style.width = volume*100 + "%";
        document.getElementById('valuePointVolume').style.left = "calc("+volume*100+ "% - 6px)";
    }

    isPlaying = () => {
        return this.state.isPlaying
    }

    render() { 
        return (
            <div className="musicComponent">
                <div id="reactHowler">
                    <ReactHowler
                        src={this.state.src}
                        playing={this.state.isPlaying}
                        onLoad={() => {
                            console.log("Song Loaded");
                            if (this.state.isSongChanged === 1 && this.state.isPlaying === false) {
                                this.controlRef.current.play();
                                console.log("SRC updated");
                                this.setState({isSongChanged:0});
                            }
                        }}
                        onPlay={this.updateSongDuration}
                        volume={ this.state.volume}
                        ref={(ref) => (this.player = ref)}
                    />
                </div>
                <MusicLeft
                    songName={ this.state.name}
                    songArtist={ this.state.artist}
                    songIconName={ this.state.iconURL}
                />
                <span id="middlePart">
                    <Control
                        ref={ this.controlRef }
                        updateMusicPlayPause={this.updateMusicPlayPause}
                        isPlaying={this.isPlaying}
                    />
                    <ProgressBar
                        value={this.state.percent}
                        updateSeekDuration={ this.updateSeekDuration}
                    />
                </span>
                <MusicRight
                    updateVolume={ this.updateVolume}
                />
            </div>
        );
    }
}

export default MusicPlayer;



/*
 */