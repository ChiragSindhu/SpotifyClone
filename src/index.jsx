import React from "react";
import ReactDom from "react-dom";

import LeftComponent from "./leftSide";
import MainComponent from "./main";
import SearchComponent from "./components/searchComponent/searchComponent";
import MusicPlayer from "./components/player";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore,collection, getDocs,query, startAt, orderBy } from "firebase/firestore";

class App extends React.Component {
    firebaseConfig = {
        apiKey: "AIzaSyD7Y7XZzquY_OKlV6nCibYLFE0LWQk58Bk",
        authDomain: "spotify-d8fce.firebaseapp.com",
        projectId: "spotify-d8fce",
        storageBucket: "spotify-d8fce.appspot.com",
        messagingSenderId: "789959123307",
        appId: "1:789959123307:web:ae366e549b771655ae2c2e",
        measurementId: "G-3K6YT21TQJ"
    };

    firebaseApp = initializeApp(this.firebaseConfig);
    storage = getStorage(this.firebaseApp);
    db = getFirestore();

    playerRef = React.createRef();

    state = {
        songDetails: [],
        activeComponent: 1,
        min: 0,
        max:0
    }

    constructor() {
        super();
        this.txtdetails = [];

        getDocs(collection(this.db, "data")).then((snapshot) => {
            snapshot.forEach((doc) => {
                this.txtdetails.push(doc.data());
            })

            this.setState({songDetails:this.txtdetails});
        })
    }

    getSongDetails = () => {
        const min = Math.floor(Math.random() * (this.state.songDetails.length - Math.floor(Math.random() * (this.state.songDetails.length)) ))
        const max = 2 + Math.floor(Math.random() * (this.state.songDetails.length - min - 2)) + min;

        //console.log("Min:",min,"Max:",max);
        return this.state.songDetails.slice(min,max)
    }

    updatePlayerSong = (songName,artist,iconUrl,url) => {
        this.playerRef.current.updateSongSrc(url,songName,artist,iconUrl);
    }

    currentComponent = (value) => {
        this.setState({ activeComponent: value });
    }

    render() {
        if (this.state.activeComponent === 1) {
            this.homeComponent = <MainComponent
                songDetails={this.getSongDetails}
                updatePlayerSong={this.updatePlayerSong} />
        } else if (this.state.activeComponent === 2) {
            this.homeComponent = <SearchComponent
                db={this.db}
                getDocs={getDocs}
                startAt={startAt}
                orderBy={orderBy}
                query={query}
                collection={collection}
                updatePlayerSong={ this.updatePlayerSong}

            />
        } else if (this.state.activeComponent === 3) {
            this.homeComponent = null
        }

        if (this.state.songDetails.length > 0) {
            return (
                <div>
                    <LeftComponent
                        currentComponent={this.currentComponent}
                    />
                    {this.homeComponent}
                    <MusicPlayer ref={this.playerRef}/>
                </div>
            );
        } else {
            return (
                <div>
                    <LeftComponent />
                    <MusicPlayer ref={this.playerRef}/>
                </div>
            );
        }
    }
}
 
ReactDom.render(<App />
    , document.getElementById('root')
);