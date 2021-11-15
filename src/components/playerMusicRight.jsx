import React from "react";

import volumeFULL from '../icons/volumeFULL.png';

class MusicRight extends React.Component {
    changeValueBarColor = () => {
        document.getElementById('valueBarVolume').style.backgroundColor = "rgb(30 ,215, 96)";
        document.getElementById('valuePointVolume').style.opacity = "1";
    }

    changeValueBarColor2 = () => {
        document.getElementById('valueBarVolume').style.backgroundColor = "rgb(163, 163, 163)";
        document.getElementById('valuePointVolume').style.opacity = "0";
    }

    updateVolume = () => {
        this.refs.progressBar.addEventListener('mousedown', (e) => {
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            var width = getComputedStyle(this.refs.progressBar).width;
            var percent = ((x / width.split('.')[0])).toFixed(2);

            this.props.updateVolume(parseFloat(percent));
        });
    }

    render() { 
        return (
            <div id="musicRight">
                <img src={volumeFULL} width="15px" height="15px" />
                <div ref='progressBar' id="progressBarVolume"
                    onMouseOver={this.changeValueBarColor}
                    onMouseLeave={this.changeValueBarColor2}
                    onClick={this.updateVolume}
                >
                    <div id="valueBarVolume"></div>
                    <span id="valuePointVolume"></span>
                </div>
            </div>
        );
    }
}
 
export default MusicRight;