import React from 'react';

class Grid extends React.Component {
    constructor(props) {
        super(props);
    }
    drawPath(e) {
        // console.log((this.props.isClicked()[0]), (this.props.isClicked()[1]))
        if (this.props.getCondtionResult()) {
            this.props.setMatrix(this.props.i,this.props.j)
        }
    }
    render() {
        let color=this.props.color;
        return (
            <div onClick={() => {
                this.props.setMatrix(this.props.i,this.props.j)
            }} onMouseMove={this.drawPath.bind(this)} className="mygrid" style={{ backgroundColor: color }} >

            </div>
        );
    }
}

export default Grid;
