import React from 'react';

class NavBtn extends React.Component {
    imgIcon = React.createRef();
    textNavBtn = React.createRef();

    state = {
        isSelected: this.props.selected
    }

    updateComponent(isSelected) {
        this.setState({ isSelected });
        if (isSelected === "1") { 
            this.imgIcon.current.style.color = "rgb(255, 255, 255)";
            this.imgIcon.current.style.opacity = "1";

            this.textNavBtn.current.style.backgroundColor = "rgba(68, 68, 68, 0.7)";
            this.textNavBtn.current.style.color = "rgb(255, 255, 255)";
            this.textNavBtn.current.style.textShadow = "0px 0px";
        } else {
            this.textNavBtn.current.style.backgroundColor = "rgba(0, 0, 0, 1)";
        }
    }

    makeElementBright = () => {
        if (this.state.isSelected === "0") {
            this.textNavBtn.current.style.color = "rgb(255, 255, 255)";
            this.textNavBtn.current.style.textShadow = "0px 0px 5px rgb(255,255,255)";

            this.imgIcon.current.style.opacity = "1";
        }
    }

    makeElementNormal = () => {
        if (this.state.isSelected === "0") {
            this.textNavBtn.current.style.color = "rgb(200, 200, 200)";
            this.textNavBtn.current.style.textShadow = "0px 0px";

            this.imgIcon.current.style.opacity = "0.6";
        }
    }

    componentDidMount() {
        this.updateComponent(this.props.selected);
    }

    render() { 
        return (
            <div id="leftSideBtn"
                ref={this.mainRef }
                onMouseOver={this.makeElementBright}
                onMouseLeave={this.makeElementNormal}>
                <img ref={this.imgIcon} id="pageIcon" src={this.props.iconURL} width="21px" height="21px" />
                <input ref={this.textNavBtn} name={ this.state.isSelected } type="button" value={this.props.btnName} id="navbtn" />
            </div>
        );
    }
}
 
export default NavBtn;