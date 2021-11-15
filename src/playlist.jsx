import React from "react";

import Song from "./song";

class Playlist extends React.Component {
    render() { 
        return (
            <div id="playlist">
                <span id="playlistHeading">{this.props.pName}</span>
                <div id="songs">
                    {
                        this.props.getSongDetail().map((song) =>
                            <Song
                                key={song.id}
                                artist={song.artist}
                                songIconUrl={song.iconURL}
                                songName={song.name}
                                url={ song.fileUrl }
                                updatePlayerSong={ this.props.updatePlayerSong}
                            />
                    )}
                </div>
            </div>
        );
    }
}
 
export default Playlist;