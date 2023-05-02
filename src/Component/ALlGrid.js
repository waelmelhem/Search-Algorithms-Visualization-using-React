import React from 'react';
import Grid from './Grid';

class AllGrid extends React.Component {
    constructor(props){
        super(props)
        this.state={
            any:1
        }
    }
    render() {
        
        return (
            <div className="AllGrid"  onClick={()=>{this.props.setIsClicked(true,false)}} onDoubleClick={()=>{this.props.setIsClicked(false,true)}}>
                {!this.props.matrix?"":this.props.matrix.map((e,i)=><div className='line'>{e.map((r,j)=><span>{r[0]}</span>)}</div>)}
            </div>
        );
    }
}

export default AllGrid;