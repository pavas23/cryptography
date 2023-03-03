#include<iostream>
#include<vector>
using namespace std;

vector<string> decryptWordRailFenceCipher(vector<string> cipherText,int n){
    int numColsCharRailFence = cipherText.size();
    int numRowsCharRailFence = n;
    string** stringMatrix = (string**)malloc(n*sizeof(string*));
    for(int i=0;i<n;i++){
        stringMatrix[i] = (string*)malloc(numColsCharRailFence*sizeof(string));
    }
    for(int i=0;i<numRowsCharRailFence;i++){
        for(int j=0;j<numColsCharRailFence;j++){
            stringMatrix[i][j] = "-";
        }
    }
    int numRow = 0;
    int numCol = 0;
    int flag = 0;
    stringMatrix[numRow][numCol] = "*";
    for(int i=1;i<cipherText.size();i++){
        if(numRow == numRowsCharRailFence-1){
            flag = 1;
        }
        if(flag){
            numRow--;
        }
        if(!flag){
            numRow++;
        }
        if(numRow < 0){
            numRow = 1;
            flag = 0;
        }
        numCol++;
        stringMatrix[numRow][numCol] = "*";
    }

    int k = 0;
    for(int i=0;i<numRowsCharRailFence;i++){
        for(int j=0;j<numColsCharRailFence;j++){
            if(stringMatrix[i][j] == "*"){
                stringMatrix[i][j] = cipherText[k];
                k++;
            }
        }
    }

    vector<string> decryptedText;
    numRow = 0;
    numCol = 0;
    flag = 0;
    decryptedText.push_back(stringMatrix[numRow][numCol]);
    for(int i=1;i<cipherText.size();i++){
        if(numRow == numRowsCharRailFence-1){
            flag = 1;
        }
        if(flag){
            numRow--;
        }
        if(!flag){
            numRow++;
        }
        if(numRow < 0){
            numRow = 1;
            flag = 0;
        }
        numCol++;
        decryptedText.push_back(stringMatrix[numRow][numCol]);
    }

    return decryptedText;
}

string decryptCharRailFenceCipher(string cipherText,int m){
    int numColsCharRailFence = cipherText.length();
    int numRowsCharRailFence = m;
    char** charMatrix = (char**)malloc(m*sizeof(char*));
    for(int i=0;i<m;i++){
        charMatrix[i] = (char*)malloc(numColsCharRailFence*sizeof(char));
    }
    for(int i=0;i<numRowsCharRailFence;i++){
        for(int j=0;j<numColsCharRailFence;j++){
            charMatrix[i][j] = '-';
        }
    }
    int numRow = 0;
    int numCol = 0;
    int flag = 0;
    charMatrix[numRow][numCol] = '*';
    for(int i=1;i<cipherText.length();i++){
        if(numRow == numRowsCharRailFence-1){
            flag = 1;
        }
        if(flag){
            numRow--;
        }
        if(!flag){
            numRow++;
        }
        if(numRow < 0){
            numRow = 1;
            flag = 0;
        }
        numCol++;
        charMatrix[numRow][numCol] = '*';
    }

    int k = 0;
    for(int i=0;i<numRowsCharRailFence;i++){
        for(int j=0;j<numColsCharRailFence;j++){
            if(charMatrix[i][j] == '*'){
                charMatrix[i][j] = cipherText[k];
                k++;
            }
        }
    }

    string decryptedText;
    numRow = 0;
    numCol = 0;
    flag = 0;
    decryptedText += charMatrix[numRow][numCol];
    for(int i=1;i<cipherText.length();i++){
        if(numRow == numRowsCharRailFence-1){
            flag = 1;
        }
        if(flag){
            numRow--;
        }
        if(!flag){
            numRow++;
        }
        if(numRow < 0){
            numRow = 1;
            flag = 0;
        }
        numCol++;
        decryptedText += charMatrix[numRow][numCol];
    }

    return decryptedText;
}

int main(void){
    int N=0,n=0,M=0,m=0;
    cin>>N>>n>>M>>m;
    string spaceString;
    cin>>spaceString;
    string cipherText;
    cin>>cipherText;

    string wordCipherText;

    for(int i=0;i<M;i++){
        cipherText = decryptCharRailFenceCipher(cipherText,m);
    }
    wordCipherText = cipherText;

    string cipherTextWithoutSpaceString;
    vector<string> cipherTextWordWithoutSpacing;

    int sizeOfSpaceString = spaceString.length();
    int firstIndex = 0;
    int index = 0;
    while(firstIndex < wordCipherText.length()){
        index = firstIndex;
        firstIndex = wordCipherText.find(spaceString,firstIndex);
        if(firstIndex < wordCipherText.length()){
            for(int i=index;i<firstIndex;i++){
                cipherTextWithoutSpaceString += wordCipherText[i];
            }
            cipherTextWordWithoutSpacing.push_back(cipherTextWithoutSpaceString);
            cipherTextWithoutSpaceString = "";
            firstIndex = firstIndex+sizeOfSpaceString;
        }else{
            if(index < wordCipherText.length()){
                for(int i=index;i<wordCipherText.length();i++){
                    cipherTextWithoutSpaceString += wordCipherText[i];
                }
                cipherTextWordWithoutSpacing.push_back(cipherTextWithoutSpaceString);
                cipherTextWithoutSpaceString = "";
            }else{
                break;
            }
        }
    }

    for(int i=0;i<N;i++){
        cipherTextWordWithoutSpacing = decryptWordRailFenceCipher(cipherTextWordWithoutSpacing,n);
    }

    for(int i=0;i<cipherTextWordWithoutSpacing.size();i++){
        cout<<cipherTextWordWithoutSpacing[i]<<" ";
    }
    cout<<endl;

    return 0;
}
