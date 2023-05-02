import React from 'react';
import { status,Algorthim } from './utils';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 0,
            m: 0,
            algorithm: 'DFS',
            array: [],
            start: 0,
            end: 0,
            block: 0,
        }
    }
    onNChange = (e) => {
        console.log(e.target.value)
        this.setState({
            ...this.state,
            n: e.target.value
        })
    }
    onMChange = (e) => {
        this.setState({
            ...this.state,
            m: e.target.value
        })
    }
    onButtonClick = (e) => {
        e.preventDefault()
        this.props.setNAndM(this.state.n, this.state.m)
    }
    onStartSelect(e) {
        e.preventDefault()
        this.props.setStatus(status[0]);
        this.setState({
            start: 1,
            end: 0,
            block: 0,
        })
    }
    onEndSelect(e) {
        e.preventDefault()
        this.props.setStatus(status[1]);
        this.setState({
            start: 0,
            end: 1,
            block: 0,
        })
    }
    onBlockSelect(e) {
        e.preventDefault()
        this.props.setStatus(status[2]);
        this.setState({
            start: 0,
            end: 0,
            block: 1,
        })
    }
    onPlayClicked(){
        this.props.isPlayClicked();
    }
    handleAlgorithmChange(event) {
        this.setState({ "algorithm": event.target.value });
        if(event.target.value==="DFS"){
            this.props.setAlgorthim(Algorthim[0])
            
        }
        else if(event.target.value==="BFS"){
            this.props.setAlgorthim(Algorthim[1])
        }
        else if(event.target.value==="GreedyBFS"){
            this.props.setAlgorthim(Algorthim[3])
        }
        else{
            this.props.setAlgorthim(Algorthim[2])
        }  
        
    }
    render() {

        return (
            <div className="Setting">
                <div className="card text-dark bg-light mb-3" >
                    <div className="card-header">Setting</div>
                    <div className="card-body">
                        {/* n:<input/> */}
                        <div>
                            <div><label htmlFor="n">n:</label></div>
                            <div><input value={this.state.n} onChange={this.onNChange} className="n" type="number" id="n" /></div>
                        </div>
                        <div>
                            <div><label htmlFor="m">m:</label></div>
                            <div><input value={this.state.m} onChange={this.onMChange} className='m' type="number" id="m" /></div>
                        </div>
                        <div>
                            <button onClick={this.onButtonClick} className='btn btn-success'>set dimensions</button>
                        </div>
                        <div>
                            <button onClick={this.onStartSelect.bind(this)} className={`btn ` + `${this.state.start ? "btn-secondary" : "btn-outline-secondary"}`}>Add Start : <div style={startStyle} ></div></button><br />
                            <button onClick={this.onEndSelect.bind(this)} className={`btn ` + `${this.state.end ? "btn-secondary" : "btn-outline-secondary"}`}>Add End : <div style={endtStyle} ></div></button><br />
                            <button onClick={this.onBlockSelect.bind(this)} className={`btn ` + `${this.state.block ? "btn-secondary" : "btn-outline-secondary"}`}>Add Block : <div style={blocktStyle} ></div></button><br />
                        </div>
                        <div>
                            <br/>
                            <label htmlFor="algorithm-select"> Select algorithm:</label><br/>
                            <select id="algorithm-select" value={this.state.algorithm} onChange={this.handleAlgorithmChange.bind(this)}>
                                <option value="DFS">DFS</option>
                                <option value="BFS">BFS</option>
                                <option value="A*">A*</option>
                                <option value="GreedyBFS">GreedyBFS</option>
                            </select>
                        </div>
                        <div>
                            <button onClick={this.onPlayClicked.bind(this)}className='btn btn-primary'>Play</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;
const startStyle = {
    minWidth: '20px',
    minHeight: '20px',
    marginTop: "px",
    display: "relative",
    top: "4px",
    backgroundColor: 'blue',
    display: 'inline-block'
};
const endtStyle = {
    minWidth: '20px',
    minHeight: '20px',
    marginTop: "px",
    display: "relative",
    top: "4px",
    backgroundColor: 'green',
    display: 'inline-block'
};
const blocktStyle = {
    minWidth: '20px',
    minHeight: '20px',
    marginTop: "px",
    display: "relative",
    top: "4px",
    backgroundColor: 'black',
    display: 'inline-block'
};