import React from "react";

import NavBtn from './navbtn';

import spotifyIconUrl from './icons/spotifyIcon.png';
import homeIconUrl from './icons/homeIcon.png';
import searchIconUrl from './icons/searchIcon.png';
import libraryIconUrl from './icons/libraryIcon.png';

class LeftComponent extends React.Component {
    homeRef = React.createRef();
    SearchRef = React.createRef();
    LibraryRef = React.createRef();

    componentDidMount() {
        this.homeRef.current.textNavBtn.current.addEventListener('click', () => {
            if (this.homeRef.current.state.isSelected === "0") {
                if (this.SearchRef.current.state.isSelected === "1") {
                    this.SearchRef.current.updateComponent("0");
                    this.SearchRef.current.makeElementNormal();
                }
                this.homeRef.current.updateComponent("1");
                this.props.currentComponent(1);
                if (this.LibraryRef.current.state.isSelected === "1") {
                    this.LibraryRef.current.updateComponent("0");
                    this.LibraryRef.current.makeElementNormal();
                }
            }
        });

        this.SearchRef.current.textNavBtn.current.addEventListener('click', () => {
            if (this.SearchRef.current.state.isSelected === "0") {
                this.SearchRef.current.updateComponent("1");
                this.props.currentComponent(2);
                if (this.homeRef.current.state.isSelected === "1") {
                    this.homeRef.current.updateComponent("0");
                    this.homeRef.current.makeElementNormal();
                }
                if (this.LibraryRef.current.state.isSelected === "1") {
                    this.LibraryRef.current.updateComponent("0");
                    this.LibraryRef.current.makeElementNormal();
                }
            }
        });

        this.LibraryRef.current.textNavBtn.current.addEventListener('click', () => {
            if (this.LibraryRef.current.state.isSelected === "0") {
                if (this.SearchRef.current.state.isSelected === "1") {
                    this.SearchRef.current.updateComponent("0");
                    this.SearchRef.current.makeElementNormal();
                }
                if (this.homeRef.current.state.isSelected === "1") {
                    this.homeRef.current.updateComponent("0");
                    this.homeRef.current.makeElementNormal();
                }
                this.LibraryRef.current.updateComponent("1");
                this.props.currentComponent(3);
            }
        });
    }

    render() { 
        return (
            <div className="leftSide">
                <div id="navLeftSide">
                    <img id="spotICON" src={spotifyIconUrl} width="39px" height="39px" />
                    <span id="heading">Spotify</span>
                </div>
                <div id="pageLeftSide">
                    <NavBtn ref={ this.homeRef } btnName="Home" iconURL={homeIconUrl} selected="1" />
                    <NavBtn ref={ this.SearchRef } btnName="Search" iconURL={searchIconUrl} selected="0"/>
                    <NavBtn ref={ this.LibraryRef } btnName="Your Library" iconURL={ libraryIconUrl } selected="0" />
                </div>
            </div>
        );
    }
}
 
export default LeftComponent;