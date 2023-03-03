#include<iostream>
using namespace std;

void printMatrix(char** polybiusMatrix){
    for(int i=0;i<6;i++){
        for(int j=0;j<6;j++){
            cout<<polybiusMatrix[i][j]<<" ";
        }
        cout<<endl;
    }
}

string polybiusSubstitution(string plainText,char** polybiusMatrix){
    string encipheredText;
    int size = plainText.length();
    for(int k=0;k<size;k++){
        for(int i=1;i<6;i++){
            for(int j=1;j<6;j++){
                if(polybiusMatrix[i][j] == plainText[k]){
                    encipheredText += polybiusMatrix[i][0];
                    encipheredText += polybiusMatrix[0][j];
                }
            }
        }
    }
    return encipheredText;
}

string columnarTransposition(string encipheredText,string keyword,char** transpositionMatrix,int numRows,int numCols){
    string cipherText;
    for(int i=0;i<numCols;i++){
        transpositionMatrix[0][i] = keyword[i];
    }

    // filling the transposition matrix
    for(int i=1;i<numRows;i++){
        for(int j=0;j<numCols;j++){
            transpositionMatrix[i][j] = encipheredText[numCols*(i-1)+j];
        }
    }

    // sorting the transposition matrix according to the given keyword
    for(int i=0;i<numCols;i++){
        for(int j=i+1;j<numCols;j++){
            if(int(transpositionMatrix[0][j]) < int(transpositionMatrix[0][i])){
                // exchange cols
                for(int k=0;k<numRows;k++){
                    char temp = transpositionMatrix[k][i];
                    transpositionMatrix[k][i] = transpositionMatrix[k][j];
                    transpositionMatrix[k][j] = temp;
                }
            }
        }
    }

    // reading col wise
    for(int j=0;j<numCols;j++){
        for(int i=1;i<numRows;i++){
            cipherText += transpositionMatrix[i][j];
        }
    }

    return cipherText;
}

int main(void){
    string keyword;
    cin>>keyword;
    string polybiusString;
    cin>>polybiusString;
    string plainText;
    cin>>plainText;
    char** polybiusMatrix = (char**)malloc(6*sizeof(char*));
    for(int i=0;i<6;i++){
        polybiusMatrix[i] = (char*)malloc(6*sizeof(char));
    }
    string cipher = "ADFGX";

    // filling the polybius matrix
    polybiusMatrix[0][0] = '*';
    for(int i=1;i<6;i++){
        polybiusMatrix[0][i] = cipher[i-1];
    }
    for(int i=1;i<6;i++){
        polybiusMatrix[i][0] = cipher[i-1];
    }
    for(int i=1;i<6;i++){
        for(int j=1;j<6;j++){
            polybiusMatrix[i][j] = polybiusString[5*(i-1)+(j-1)];
        }
    }

    string encipheredText = polybiusSubstitution(plainText,polybiusMatrix);

    int numCols = keyword.length();
    int numRows = 0;
    if(encipheredText.length()%numCols == 0){
        numRows = encipheredText.length()/numCols;
    }else{
        numRows = encipheredText.length()/numCols+1;
    }
    numRows++; // for storing the keyword

    char** transpositionMatrix = (char**)malloc(numRows*sizeof(char*));
    for(int i=0;i<numRows;i++){
        transpositionMatrix[i] = (char*)malloc(numCols*sizeof(char));
    }

    string cipherText = columnarTransposition(encipheredText,keyword,transpositionMatrix,numRows,numCols);
    cout<<cipherText<<endl;
    return 0;
}

