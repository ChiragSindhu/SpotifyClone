import React from "react";

class Song extends React.Component {
    songRef = React.createRef();

    componentDidMount() {
        this.songRef.current.addEventListener('click', () => {
            this.props.updatePlayerSong(
                this.songRef.current.title,
                this.props.artist,
                this.props.songIconUrl,
                this.props.url
            );
        })
    }

    render() { 
        return (
            <div id="song" ref={this.songRef} title={this.props.songName}>
                <img id="songIMG" src={this.props.songIconUrl} width="155px" height="155px" />
                <span id="songName">{this.props.songName}</span>
                <span id="songArtist">{this.props.artist}</span>
            </div>
        );
    }
}
 
export default Song;