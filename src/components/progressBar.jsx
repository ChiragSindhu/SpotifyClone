import React from 'react';

class ProgressBar extends React.Component {
    changeValueBarColor = () => {
        document.getElementById('valueBar').style.backgroundColor = "rgb(30 ,215, 96)";
        document.getElementById('valuePoint').style.opacity = "1";
    }

    changeValueBarColor2 = () => {
        document.getElementById('valueBar').style.backgroundColor = "rgb(163, 163, 163)";
        document.getElementById('valuePoint').style.opacity = "0";
    }

    updateSeek = () => {
        this.refs.progressBar.addEventListener('mousedown', (e) => {
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            var width = getComputedStyle(this.refs.progressBar).width;
            var percent = ((x / width.split('.')[0]) * 100);

            this.props.updateSeekDuration(percent);
        });
    }

    render() { 
        return (
            <div id="middleLowerPart">
                <div id="songCompleted">0:00</div>
                <div ref='progressBar' id="progressBar"
                    onMouseOver={this.changeValueBarColor}
                    onMouseLeave={this.changeValueBarColor2}
                    onClick={this.updateSeek}
                >
                    <div id="valueBar"></div>
                    <span id="valuePoint"></span>
                </div>
                <div id="songDuration">0:00</div>
            </div>
        );
    }
}
 
export default ProgressBar;