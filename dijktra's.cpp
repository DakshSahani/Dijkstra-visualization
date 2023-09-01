#include <iostream>
#include <queue>
#include <vector>
#include <climits>
#include <set>
using namespace std;

// const int INF = INT_MAX;

// void dijktra(vector<pair<int,int>> g[],int n,int src,int dist[]){
//     for(int i=0;i<=n;i++)dist[i]=INF;

//     dist[src]=0;
//     bool fixed[n+1] = {0};
//     set<pair<int,int>> st;
    
//     st.insert({0,src});

//     while(!st.empty()){
//         int cur_node = st.begin()->second;
//         int cur_dist = st.begin()->first;
//         fixed[cur_node] = true;
//         st.erase(st.begin());

//         for(pair<int,int> adj : g[cur_node]){
//             int adj_node = adj.second;
//             int adj_wt = adj.first;
//             if(!fixed[adj_node]){
//                 if(dist[adj_node] > cur_dist + adj_wt){
//                     dist[adj_node] = cur_dist + adj_wt;
//                 }
//                 st.insert({dist[adj_node],adj_node});
//             }    
//         }
//     }
//     for(int i=1;i<=n;i++)cout<<dist[i]<<" ";
//     cout<<endl;
// }

// int main(){
//     int n,e;
//     cin>>n>>e;
//     int g[n+1][n+1];
//     vector<pair<int,int>> gr[n+1];
//     for(int i=0;i<e;i++){
//         int x,y,wt;
//         cin>>x>>y>>wt;
//         gr[x].push_back({wt,y});
//     }
//     int t;
//     cin>>t;
//     while(t--){
//         int src;
//         cin>>src;
//         int dist[n+1];
//         // dijkstra(gr, n,src,dist);
//     }
// }

const int INF = 1e9;


vector <int> dijkstra(int V, vector<vector<int>> adj[], int S)
{
    vector<int> dist(V+1,INF);
    bool fixed[V+1] = {0};
    set<pair<int,int>> set;
    set.insert({0,S});

    // cout<<"check"<<endl;
    dist[S]=0;
    
    while(!set.empty()){
        int cur_v = set.begin()->second;
        int cur_dist = set.begin()->first;
        fixed[cur_v]=1;
        set.erase(set.begin());
        
        for(vector<int> child : adj[cur_v]){
            int c_v = child[0];
            int c_wt = child[1];
            if(!fixed[c_v]){
                if(dist[cur_v]+c_wt < dist[c_v]){
                    dist[c_v] = dist[cur_v] + c_wt;
                }
                set.insert({dist[c_v],c_v});
            }
        }
    }
    return dist;
}
int main()
{
    int t;
    cin >> t;
    while (t--) {
        int V, E;
        cin >> V >> E;
        vector<vector<int>> adj[V];
        int i=0;
        while (i++<E) {
            int u, v, w;
            cin >> u >> v >> w;
            vector<int> t1,t2;
            t1.push_back(v);
            t1.push_back(w);
            adj[u].push_back(t1);
            t2.push_back(u);
            t2.push_back(w);
            adj[v].push_back(t2);
        }
        int S;
        cin>>S;
    	vector<int> res = dijkstra(V, adj, S);
    	
    	for(int i=0; i<V; i++)
    	    cout<<res[i]<<" ";
    	cout<<endl;
    }

    return 0;
}

