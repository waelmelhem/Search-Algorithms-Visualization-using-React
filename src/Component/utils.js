import Grid from './Grid';
import PriorityQueue from 'js-priority-queue';
export const status = [
    {
        num: 0,
        color: "blue",
        isClicked: function () {
            console.log(this.state.n, 222222222)
            return [this.state.isClicked, this.state.isDoubleClicked]
        },
        getCondtionResult: function () {
            this.setIsclicked(false, true)
            return false
        },
        setMatrix: function (i, j) {
            console.log(i, j, 211)
            let _matrix = [...this.state.matrix];
            if (this.state.start != null) {
                // this.setIANdJStatus(this.state.end[0],this.state.end[1],"")
                _matrix[this.state.start[0]][this.state.start[1]] = [<Grid color="white" key={this.state.m * this.state.start[0] + this.state.start[1]} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={this.state.start[0]} j={this.state.start[1]} getCondtionResult={this.getCondtionResult.bind(this)} />, { i: this.state.start[0], j: this.state.start[1] }]

            }
            _matrix[i][j] = [<Grid key={this.state.m * i + j} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={i} j={j} getCondtionResult={this.getCondtionResult.bind(this)} color={this.getColor()} />, { i, j }]
            this.setState({ start: [i, j], "matrix": _matrix })
        },
    },
    {
        num: 1,
        color: "green",
        isClicked: function () {
            return [this.state.isClicked, this.state.isDoubleClicked]
        },
        getCondtionResult: function () {
            this.setIsclicked(false, true)
            return false
        },
        setMatrix: function (i, j) {
            let _matrix = [...this.state.matrix];
            if (this.state.end != null) {
                // this.setIANdJStatus(this.state.end[0],this.state.end[1],"")
                _matrix[this.state.end[0]][this.state.end[1]] = [<Grid color="white" key={this.state.m * this.state.end[0] + this.state.end[1]} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={this.state.end[0]} j={this.state.end[1]} getCondtionResult={this.getCondtionResult.bind(this)} />, { i: this.state.end[0], j: this.state.end[1] }]

            }
            _matrix[i][j] = [<Grid key={this.state.m * i + j} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={i} j={j} getCondtionResult={this.getCondtionResult.bind(this)} color={this.getColor()} />, { i, j }]
            this.setState({ end: [i, j], "matrix": _matrix })
        },
    },
    {
        num: 2,
        color: "black",
        isClicked: function () {
            return [this.state.isClicked, this.state.isDoubleClicked]
        },
        getCondtionResult: function () {
            return (this.isClicked()[0] && !this.isClicked()[1])
        },
        setMatrix: function (i, j) {
            let _matrix = [...this.state.matrix];
            _matrix[i][j] = [<Grid key={this.state.m * i + j} setMatrix={this.setMatrix.bind(this)} isClicked={this.isClicked.bind(this)} i={i} j={j} getCondtionResult={this.getCondtionResult.bind(this)} color={this.getColor()} />, { isBlock: 1, i, j }]
            this.setState({ "matrix": _matrix })
        },
    },
    {
        num: -1,
        color: "blue",
        isClicked: function () {
            alert("Select Color Before")
            return -1;
        },
        getCondtionResult: function () {
            alert("Select Color Before")
            return -1;
        },
        setMatrix: function (i, j) {
            alert("Select Color Before")
            return -1;
        }
    },
];
export const Algorthim = [
    {
        name: "dfs",
        fun: function (i, j) {
            let stack = []
            let start = `${this.state.start[0]},${this.state.start[1]}`
            let whoAddTheNode = {};
            whoAddTheNode[start] = null;
            stack.push([i, j])
            console.log(stack)
            let path = [];
            let matrix = this.state.matrix;
            let i_end = this.state.end[0]
            let j_end = this.state.end[1];
            matrix[this.state.start[0]][this.state.start[1]][1].isVisited = 1;
            this.setState({ matrix });

            matrix = this.state.matrix;
            while (stack.length > 0) {


                let current = stack.pop();

                matrix[current[0]][current[1]][1].isVisited = 1;
                this.setState({ matrix });
                matrix = this.state.matrix;

                let currentStr = `${current[0]},${current[1]}`
                let children = this.getChildren(current[0], current[1]);
                this.state.AlgorthimStep.push({
                    current: current,
                    children
                })
                if (current[0] === i_end && current[1] === j_end) {
                    return (this.findPath(whoAddTheNode, currentStr))
                    return;
                }
                for (let x = 0; x < children.length; x++) {
                    let child = children[x];
                    let childStr = `${child[0]},${child[1]}`
                    whoAddTheNode[childStr] = currentStr;
                    console.log(child[1], child[0])
                    if (!matrix[child[0]][child[1]][1].isVisited) {
                        stack.push(child);
                    }
                }
            }
            return []
        }
    },
    {
        name: "bfs",
        fun: function (i, j) {
            let queue = []
            let start = `${this.state.start[0]},${this.state.start[1]}`
            let whoAddTheNode = {};
            whoAddTheNode[start] = null;
            queue.push([i, j])
            console.log(queue)
            let path = [];
            let matrix = this.state.matrix;
            let i_end = this.state.end[0]
            let j_end = this.state.end[1];
            matrix[this.state.start[0]][this.state.start[1]][1].isVisited = 1;
            this.setState({ matrix });

            matrix = this.state.matrix;
            while (queue.length > 0) {
                let current = queue.shift();

                matrix[current[0]][current[1]][1].isVisited = 1;
                this.setState({ matrix });
                matrix = this.state.matrix;

                let currentStr = `${current[0]},${current[1]}`
                let children = this.getChildren(current[0], current[1]);
                this.state.AlgorthimStep.push({
                    current: current,
                    children
                })
                if (current[0] === i_end && current[1] === j_end) {
                    return (this.findPath(whoAddTheNode, currentStr))
                    return;
                }
                for (let x = 0; x < children.length; x++) {
                    let child = children[x];
                    let childStr = `${child[0]},${child[1]}`
                    if (!whoAddTheNode[childStr]) {
                        whoAddTheNode[childStr] = currentStr;
                        if (!matrix[child[0]][child[1]][1].isVisited) {
                            queue.push(child);
                        }
                    }
                }
            }
            return [];
        }
    },
    {
        name: "a*",
        fun: function (i, j) {
            let queue = new PriorityQueue({
                comparator: (a, b) => a.cost - b.cost // Compare by cost
            });
            queue.queue({
                path: [[i, j],],
                cost: 1
            });
            let matrix = this.state.matrix;
            let i_end = this.state.end[0]
            let j_end = this.state.end[1];
            matrix[this.state.start[0]][this.state.start[1]][1].isVisited = 1;
            this.setState({ matrix });
            matrix = this.state.matrix;

            while (queue.length > 0) {
                let element = queue.dequeue();
                let path = element.path, cost = element.cost;
                let current = path[path.length - 1];
                matrix[current[0]][current[1]][1].isVisited = 1;
                this.setState({ matrix });
                matrix = this.state.matrix;
                let children = this.getChildren(current[0], current[1]);
                this.state.AlgorthimStep.push({
                    current: current,
                    children
                })
                if (current[0] === i_end && current[1] === j_end) {
                    console.log("end")
                    return path.map(e => matrix[e[0]][e[1]]).reverse();
                }
                for (let x = 0; x < children.length; x++) {
                    let child = children[x];
                    console.log(child)
                    if (!matrix[child[0]][child[1]][1].isVisited) {
                        matrix[child[0]][child[1]][1].isVisited = 1;
                        this.setState({ matrix });
                        queue.queue({
                            path: [...path, child],
                            cost: (path.length + 1) + Math.sqrt(Math.pow(i_end - child[0], 2) + Math.pow(j_end - child[1], 2))
                        });
                    }
                }
            }

            return [];
        }
    },
    {
        name: "GBFS",
        fun: function (i, j) {
            let queue = new PriorityQueue({
                comparator: (a, b) => a.cost - b.cost // Compare by cost
            });
            queue.queue({
                path: [[i, j],],
                cost: 1
            });
            let matrix = this.state.matrix;
            let i_end = this.state.end[0]
            let j_end = this.state.end[1];
            matrix[this.state.start[0]][this.state.start[1]][1].isVisited = 1;
            this.setState({ matrix });
            matrix = this.state.matrix;

            while (queue.length > 0) {
                let element = queue.dequeue();
                let path = element.path, cost = element.cost;
                let current = path[path.length - 1];
                matrix[current[0]][current[1]][1].isVisited = 1;
                this.setState({ matrix });
                matrix = this.state.matrix;
                let children = this.getChildren(current[0], current[1]);
                this.state.AlgorthimStep.push({
                    current: current,
                    children
                })
                if (current[0] === i_end && current[1] === j_end) {
                    console.log("end")
                    return path.map(e => matrix[e[0]][e[1]]).reverse();
                }
                for (let x = 0; x < children.length; x++) {
                    let child = children[x];
                    console.log(child)
                    if (!matrix[child[0]][child[1]][1].isVisited) {
                        matrix[child[0]][child[1]][1].isVisited = 1;
                        this.setState({ matrix });
                        queue.queue({
                            path: [...path, child],
                            cost: Math.sqrt(Math.pow(i_end - child[0], 2) + Math.pow(j_end - child[1], 2))
                        });
                    }
                }
            }

            return [];
        }
    },

];