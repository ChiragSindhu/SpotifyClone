import React from "react";

import Playlist from "./playlist";

class MainComponent extends React.Component {
    state = {
        noOfPlaylist: new Array(Math.floor(3 + Math.random() * 3)).fill(0),
        expression:['Good Morning','India\'s best','Trending now','Made for you','You Liked','Top Songs','Best Hits','Good afternoon','Best of Best']
    }

    render() { 
        return (
            <div ref="main" className="mainComponent">
                {
                    this.state.noOfPlaylist.map((i) => {
                        return (
                            <Playlist
                                key={Math.random()}
                                pName={this.state.expression[Math.floor(Math.random()*(this.state.expression.length - 1))]}
                                getSongDetail={this.props.songDetails}
                                updatePlayerSong={this.props.updatePlayerSong}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

/*
 */
 
export default MainComponent;