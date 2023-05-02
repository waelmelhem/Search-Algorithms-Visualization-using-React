import logo from './logo.svg';
import React from 'react';
import './main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import AllGrid from './Component/ALlGrid';
import Setting from './Component/Setting';
import Grid from './Component/Grid';
import { status,Algorthim } from './Component/utils';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      n: 0,
      m: 0,
      isClicked: false,
      isDoubleClicked: false,
      matrix: [[]],
      status: status[3],
      start: null,
      end: null,
      Algorthim:Algorthim[0] ,
      AlgorthimStep: [],
      result: false,
    }
  }
  async setAlgorthim(Algorthim) {
    this.setState({
      Algorthim: Algorthim
    });
  }
  async drawSteps(){
    let steps = [...this.state.AlgorthimStep]

    async function delay() {
      return new Promise(resolve => setTimeout(resolve, 10));
    }

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      let { current, children } = step;
      let matrix = this.state.matrix;
      matrix[current[0]][current[1]] = [
        <Grid
          color="lightblue"
          key={this.state.m * current[0] + current[1]}
          setMatrix={this.setMatrix.bind(this)}
          isClicked={this.isClicked.bind(this)}
          i={current[0]}
          j={current[1]}
          getCondtionResult={this.getCondtionResult.bind(this)}
        />,
        { i: current[0], j: current[1] },
      ];
      this.setState({ matrix });
      await delay();

      for (let j = 0; j < children.length; j++) {
        const child = children[j];
        let [x, y] = child;
        matrix[child[0]][child[1]] = [
          <Grid
            color="red"
            key={this.state.m * child[0] + child[1]}
            setMatrix={this.setMatrix.bind(this)}
            isClicked={this.isClicked.bind(this)}
            i={child[0]}
            j={child[1]}
            getCondtionResult={this.getCondtionResult.bind(this)}
          />,
          { i: child[0], j: child[1] },
        ];
        this.setState({ matrix });
        await delay();
      }
    }
  }
  async drawPath(path){
    let _matrix = [...this.state.matrix];
    _matrix[this.state.start[0]][this.state.start[1]] = [<Grid color="blue" key={this.state.m * this.state.start[0] + this.state.start[1]} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={this.state.start[0]} j={this.state.start[1]} getCondtionResult={this.getCondtionResult.bind(this)} />, { i: this.state.start[0], j: this.state.start[1] }]
    _matrix[this.state.end[0]][this.state.end[1]] = [<Grid color="green" key={this.state.m * this.state.end[0] + this.state.end[1]} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={this.state.end[0]} j={this.state.end[1]} getCondtionResult={this.getCondtionResult.bind(this)} />, { i: this.state.end[0], j: this.state.end[1] }]
    this.setState({ "matrix": _matrix })
    let delay2 = 30;
    path.reverse().forEach((e, index) => {
      if (index != 0 && index != path.length - 1) {
        setTimeout(() => {
          let i = e[1].i;
          let j = e[1].j;
          let _matrix = [...this.state.matrix];
          _matrix[i][j] = [<Grid key={this.state.m * i + j} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={i} j={j} getCondtionResult={this.getCondtionResult.bind(this)} color={"lightgreen"} />, { isBlock: 1, i, j }]
          this.setState({ "matrix": _matrix })
        }, delay2 * index);
      }
    });
  }
  async isPlayClicked(){
    let path=await this.state.Algorthim.fun.bind(this)(this.state.start[0],this.state.start[1])
    await this.drawSteps();
    this.drawPath(path)
    this.setState({
      AlgorthimStep:[]
    })
  }
  isClicked() {
    let result = this.state.status.isClicked.call(this);
    if (result !== -1) return result
  }
  getColor() {
    return this.state.status.color
  }
  getCondtionResult() {
    let result = this.state.status.getCondtionResult.call(this);
    if (result !== -1) return result
  }
  setMatrix(i, j,) {
    return this.state.status.setMatrix.bind(this)(i, j)
  }
  setStatus(value) {
    this.setState({
      status: value
    })
  }
  setNAndM(n, m) {
    let matrix = []
    for (let i = 0; i < n; i++) {
      let arr2 = []
      for (let j = 0; j < m; j++) {
        arr2.push([<Grid color="white" key={m * i + j} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={i} j={j} getCondtionResult={this.getCondtionResult.bind(this)} getColor={this.getColor.bind(this)} />, { i, j }])
      }
      matrix.push(arr2);
    }
    this.setState({
      AlgorthimStep: [],
      result: false,
      start: null,
      end: null,
      isClicked: false,
      isDoubleClicked: false,
      "n": n,
      "m": m,
      matrix,
    })
  }
  setIANdJStatus(i, j, status = this.state.status) {
    let _matrix = this.state.matrix;
    _matrix[i][j].status = status;
    this.setState({ "matrix": _matrix })
  }

  findPath(map, goal) {
    let node = goal;
    let path = [goal];
    while (map[node]) {
      node = map[node];
      path.push(node)
    }
    let matrix = this.state.matrix;
    return path.map(e => {
      let x = e.split(",")
      return matrix[x[0] * 1][x[1] * 1]
    })
  }
  getChildren(i, j) {
    let matrix = this.state.matrix;
    const rows = matrix.length;
    const cols = matrix[0].length;
    const children = [];
    // Check top neighbor
    if (i > 0 && !matrix[i - 1][j][1].isBlock && !matrix[i - 1][j][1].isVisited) {
      children.push([i - 1, j]);
    }

    // Check bottom neighbor
    if (i < rows - 1 && !matrix[i + 1][j][1].isBlock && !matrix[i + 1][j][1].isVisited) {
      children.push([i + 1, j]);
    }

    // Check left neighbor
    if (j > 0 && !matrix[i][j - 1][1].isBlock && !matrix[i][j - 1][1].isVisited) {
      children.push([i, j - 1]);
    }

    // Check right neighbor
    if (j < cols - 1 && !matrix[i][j + 1][1].isBlock && !matrix[i][j + 1][1].isVisited) {
      children.push([i, j + 1]);
    }
    return children;
  }
  setIsclicked(isClicked, isDoubleClicked) {
    this.setState({
      isClicked,
      isDoubleClicked
    });
  }
  render() {
    return (
      <div className="App" >
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <AllGrid setIsClicked={this.setIsclicked.bind(this)} setIANdJStatus={this.setIANdJStatus.bind(this)} matrix={this.state?.matrix} status={this.state?.status} n={this.state?.n} m={this.state?.m} />
            </div>
            <div className="col-sm-3">
              <Setting isPlayClicked ={this.isPlayClicked.bind(this)} setAlgorthim={this.setAlgorthim.bind(this)} setStatus={this.setStatus.bind(this)} setNAndM={this.setNAndM.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
