import React from 'react';

import playIcon from '../icons/playIcon.jpg';
import pauseIcon from '../icons/pauseIcon.png';
import nextMusicIcon from '../icons/nextMusic.png';

class Control extends React.Component {
    play = () => {
        if (this.props.isPlaying() === false) {
            this.props.updateMusicPlayPause(true);
            document.getElementById("playIcon").src = pauseIcon;
            console.log("Playing");
        } else {
            this.props.updateMusicPlayPause(false);
            document.getElementById("playIcon").src = playIcon;
            console.log("Paused");
        }
    }

    render() { 
        return (
            <div id="controls">
                <img id="prevMusicIcon" src={nextMusicIcon} width="21px" height="20px" />
                <img onClick={this.play} id="playIcon" src={playIcon }width="32px" height="32px" />
                <img id="nextMusicIcon" src={nextMusicIcon} width="21px" height="20px" />
            </div>
        );
    }
}
 
export default Control;