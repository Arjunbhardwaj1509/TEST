#include<bits/stdc++.h>
using namespace std;
struct Data
{
    string identifier;
    int priority;
    int cost;
    string start;
    string end;

    void print(){
        cout<<identifier<<" "<<priority<<" "<<cost<<" "<<start<<" "<<end<<endl;
    }


};
void search(vector<Data>data,string a){
   for(int i=0;i<data.size();i++){
    if(data[i].identifier==a){
        cout<<a<<" "<<"Found"<<endl;
        return ;
    }
   }
  cout<<a<<" "<<"Not Found"<<endl;

   return ;
}// search function to check if the particular identifier is present or not.
// Comparator function
bool compare(const Data &a, const Data &b) {
    if (a.priority != b.priority){
                return a.priority > b.priority; // Higher priority first

    }
    return a.cost < b.cost; // Lower cost for same priority
}

void func(){
    int n;
    cin>>n;
    vector<Data>data(n);
    for(int i=0;i<n;i++){
        Data a;
        cin>>a.identifier>>a.priority>>a.cost>>a.start>>a.end;
        data[i]=a;
       

    }
    sort(data.begin(),data.end(),compare);
    for(int i=0;i<n;i++){
        data[i].print();
    
    }
    search(data,"road6");
    search(data,"road4");
    // minimum number of roads is 
    cout<<n-1<<endl;
    
    


    






}


int main(){
    func();
    return 0;
}