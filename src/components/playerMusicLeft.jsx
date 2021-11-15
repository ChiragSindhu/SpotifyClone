import React from 'react';

class MusicLeft extends React.Component {
    render() { 
        return (
            <div id="musicLeft">
                <img
                    id="leftMusicIcon"
                    src={this.props.songIconName}
                    width="64px"
                    height="64px"
                />
                <div id="songDetails">
                    <div id="songNamePlayer">{this.props.songName}</div>
                    <div id="songArtistPlayer">{this.props.songArtist}</div>
                </div>
            </div>
        );
    }
}
 
export default MusicLeft;