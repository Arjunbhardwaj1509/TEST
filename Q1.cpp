#include <iostream>
#include <vector>
#include <cstring>
#include<stack>

using namespace std;



// A function to check if a matching for superstar u is possible
bool bpm(int u, vector<int> adj[], vector<bool>& visited, vector<int>& matched) {
    // Try every superstar v that u is willing to work with
    for (int v : adj[u]) {
        // If superstar v is not visited
        if (!visited[v]) {
            visited[v] = true;

            // If v is not matched or previously matched superstar can find an alternate match
            if (matched[v] < 0 || bpm(matched[v], adj, visited, matched)) {
                matched[v] = u; // Assign u to v
                return true;
            }
        }
    }
    return false;
}

// Function to find the maximum number of movies (maximum bipartite matching)
int maxMovies(vector<int> adj[], int n) {
    // Array to store the match result for each superstar
    vector<int> matched(n, -1);

    int result = 0; // Count of matches
    for (int u = 0; u < n; u++) {
        // Mark all superstars as not visited for the next round
        vector<bool> visited(n, false);

        // If superstar u can find a match
        if (bpm(u, adj, visited, matched)) {
            result++;
        }
    }
    return result / 2; // Each match corresponds to two superstars
}

int main() {
    int n;
    
    cin >> n;

    vector<int> adj[n]; // Adjacency list to store collaboration preferences

    // Reading superstar collaboration preferences
    for (int i = 0; i < n; i++) {
        int m,k;
        cin>>m>>k;
            adj[i].push_back(m - 1); // Storing 0-based index
            adj[i].push_back(k - 1); // Storing 0-based index

        }
    

    // Call the function to find the maximum number of movies
    int result = maxMovies(adj, n);
    cout << "Maximum number of movies that can be made: " << result << endl;

    return 0;
}
