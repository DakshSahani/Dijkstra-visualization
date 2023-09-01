class graph{    //Undirected Weighted Graph
    constructor(n){
        this.n = n;
        this.adjList = new Map();
    }
    addVertex(V){
        this.adjList.set(V,[])
    }
    addEdge(U,V,W){
        this.adjList.get(U).push([V,W]);
        this.adjList.get(V).push([U,W]);
    }
    printGraph(){
        let get_keys = this.adjList.keys();
    
        // iterate over the vertices
        for (let i of get_keys){
            let get_values = this.adjList.get(i);
            let conc = "";
    
            for (let j of get_values)
                conc += j + " ";
    
            console.log(i + " -> " + conc);
        }
    }
}

var container = document.getElementsByClassName('animation-container')[0];

var nodes = document.getElementsByClassName('node');
// for(let x of nodes){
//     x.addEventListener("mouseover",()=>{x.style.border = "1px solid red";});
//     x.addEventListener("mouseout",()=>{x.style.border = "4px double var(--animation)";});
// }

var g = new graph(6);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);

/*Assumption : 
ith node is the ith child of the div'animation-container'*/

createEdge(1,2,1);
createEdge(2,4,7);
createEdge(2,3,2);
createEdge(1,3,4);
createEdge(3,5,1);
createEdge(5,6,6);
createEdge(4,6,3);
createEdge(4,5,3);
createEdge(2,5,5);

function createEdge(node1,node2,wt){
    g.addEdge(node1,node2,wt);

    node1 = nodes[node1-1];
    node2 = nodes[node2-1];
    
    if(node1.offsetLeft > node2.offsetLeft){
        temp = node1;
        node1 = node2;
        node2 = temp;
    }
    
    let x1 = node1.offsetLeft;
    let x2 = node2.offsetLeft;
    let y1 = node1.offsetTop;
    let y2 = node2.offsetTop;
    let angle = Math.atan((y2-y1)/(x2-x1));
    let width = ((x2-x1)**2 +(y2-y1)**2)**0.5 - 50;
    
    const line = document.createElement('hr');
    const weight = document.createElement("div");
    weight.appendChild(document.createTextNode(wt));
    container.appendChild(line);
    container.appendChild(weight);
    line.classList.add("line");
    line.id = 'line'+node1.innerHTML + '_' +node2.innerHTML;
    weight.classList.add('weight');
    
    weight.style.left = `${x1+(x2-x1)/2}px`;
    weight.style.top = `${y1+(y2-y1)/2 }px`;

    line.style.left = `${x1+50}px`;
    line.style.top = `${y1+25}px`;

    line.style.width = `${width}px`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.transformOrigin = '-25px 0'; 
}


// g.printGraph();

async function dijktra(g,src){
    return new Promise(async (res,rej)=>{

    let dist = [];
    let fixed = [];
    for(let i = 0; i<=g.n ;i++){
        dist[i]= Infinity;
        fixed[i]=false;
    }
    
    dist[src] = 0;
    let pq = [[0,src]];

    let prevsrc = -1;
    while(pq.length != 0 ){
        let min = Infinity;
        let minInd;
        for(let i = 0;i<pq.length;i++){
            if(min > pq[i][0]){
                min = pq[i][0];
                minInd = i;
            }
        }

        u = pq[minInd];
        pq.splice(minInd,1);
        
        let cur_src = u[1];

        await selectNode(prevsrc,cur_src); //Turn the node green

        prevsrc = cur_src;
        fixed[cur_src] = true;
        for(let child of g.adjList.get(cur_src)){
            cur_child = child[0];
            cur_wt = child[1];

            if(fixed[cur_child]==false){
                if(dist[cur_child] > dist[cur_src]+cur_wt){
                    dist[cur_child] = dist[cur_src]+cur_wt;
                    pq.push([dist[cur_child],cur_child]);

                    await selectEdge(cur_src,cur_child);

                }
            }
        }
    }

    res();
});
}

function selectNode(prevnode,node){
    p = new Promise((resolve,reject)=>{
        setTimeout(resolve,800);
    })
    p.then(()=>{

        nodes[node-1].style.borderColor = 'var(--hover-node)'
        if(prevnode > node){
            prevnode = prevnode ^ node;
            node = prevnode ^ node;
            prevnode = prevnode ^ node;
        }
        const id = 'line'+prevnode+'_'+node;
        const line = document.getElementById(id);
        if(line != null)
        line.style.borderColor = 'var(--hover-node)';
    });
    return p;
}


function selectEdge(node1,node2){
    p = new Promise((resolve,reject)=>{
        setTimeout(resolve,500);
    })
    p.then(()=>{
        if(node1 > node2){      //swap node1 and node2
            node1 = node1 ^ node2;
            node2 = node1 ^ node2;
            node1 = node1 ^ node2;
        }
        const id = 'line'+node1+'_'+node2;
        const line = document.getElementById(id);
        line.style.borderColor = 'red';
    });
    return p;
}

//on pressing 'start-animation' button
const startAnimationButton = document.getElementById('start-animation');
// console.log(startAnimationButton);
startAnimationButton.addEventListener('click',()=>{
    startAnimationButton.disabled = true;
    dijktra(g,1).then(()=>{
        startAnimationButton.disabled  = false;
    })
});