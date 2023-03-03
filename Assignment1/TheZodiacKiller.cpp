#include<iostream>
using namespace std;

int main(void){
    int key = 0;
    cin>>key;
    string cipherText;
    cin>>cipherText;
    int sizeOfCipherText = cipherText.length();
    int numRows = 0;
    int numCols = key;
    if(sizeOfCipherText%key == 0){
        numRows = sizeOfCipherText/key;
    }else{
        numRows = sizeOfCipherText/key+1;
    }
    char** matrix = (char**)malloc(numRows*sizeof(char*));
    for(int i=0;i<numRows;i++){
        matrix[i] = (char*)malloc(key*sizeof(char));
    }
    int currRow = 0;
    int currCol = 0;
    int j = 0;
    int count = 0;
    for(int i=0;i<sizeOfCipherText;i++){
        matrix[0][count] = cipherText[i];
        currRow++;
        currCol = count;
        for(j=i+1;j<i+numRows;j++){
            if(currCol+2 < numCols){
                matrix[currRow][currCol+2] = cipherText[j];
                currRow++;
                currCol = currCol+2;
            }else{
                currCol = currCol+2-key;
                matrix[currRow][currCol] = cipherText[j];
                currRow++;
            }
        }
        i = j-1;
        currRow = 0;
        count++;
    }
    for(int i=0;i<numRows;i++){
        for(int j=0;j<key;j++){
            cout<<matrix[i][j];
        }
    }
    cout<<endl;
    return 0;
}

