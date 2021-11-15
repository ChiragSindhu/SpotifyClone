import React from 'react';
import searchIcon from '../../icons/searchIcon.png';
import Song from '../../song.jsx';

class searchComponent extends React.Component {
    state = {
        isSearching:0,
        searchedSongList: [],
        searchTxt:""
    }

    handleKeyPress = (event) => {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 8) {
            if (this.state.isSearching === 0) {
                this.searchTxt();
            }
        }
    }

    searchTxt = () => {
        this.setState({ isSearching: 1 });
        
        setTimeout(() => {
            if (this.refs.searchText.value.length > 0) {
                this.searchSong(this.refs.searchText.value.toUpperCase());
                this.setState({ searchTxt: "Searching for \"" + this.refs.searchText.value + "\"..." });
            } else {
                this.setState({searchTxt:""});
            }
            this.setState({ isSearching: 0 });
        },1200)
    }

    searchSong = (txt)=>{
        console.log("Searching for::", txt);
        //console.log(this.props);
        this.searchedSongList = []
        this.props.getDocs(
            this.props.query(
                this.props.collection(this.props.db, "data"),
                this.props.orderBy("name","asc"),
                this.props.startAt(txt)
            )).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.searchedSongList.push(doc.data());
                    console.log(doc.data().name);
                });
                this.setState({searchedSongList:this.searchedSongList});
        })
        
    }

    render() { 
        return (
            <div className="searchComponent">
                <img
                    id="searchIcon"
                    src={searchIcon}
                    width="20px"
                    height="20px"
                />
                <input
                    id="searchtxt"
                    type="text"
                    placeholder="Song"
                    onKeyUp={this.handleKeyPress}
                    ref="searchText"
                />
                <div id="extraSearcg" style={
                    {
                        margin: "2px 0px 7px 2.5%",
                        color: "rgb(200,200,200)",
                        fontWeight:"bold"
                    }
                }>
                    {
                        this.state.searchTxt
                    }
                </div>
                <div id="searchedSongs" style={{margin: "20px 0px 20px 2.5%"}}>
                {
                    this.state.searchedSongList.map((song) => {
                        return (
                                <Song
                                    key={song.id}
                                    artist={song.artist}
                                    songIconUrl={song.iconURL}
                                    songName={song.name}
                                    url={ song.fileUrl }
                                    updatePlayerSong={ this.props.updatePlayerSong}
                                />
                            )
                        })
                }
                </div>
            </div>
        );
    }
}
 
export default searchComponent;