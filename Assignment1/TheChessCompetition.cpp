#include<iostream>
using namespace std;

int main(void){
    string permutation;
    cin>>permutation;
    int num1=0,num2=0;
    cin>>num1>>num2;
    string cipherText;
    cin>>cipherText;
    char** matrix = (char**)malloc(3*sizeof(char*));
    for(int i=0;i<3;i++){
        matrix[i] = (char*)malloc(10*sizeof(char));
    }

    int k = 0;
    for(int i=0;i<3;i++){
        for(int j=0;j<10;j++){
            if(i==0 && (j == num1 || j == num2)){
                matrix[i][j] = '0';
            }else{
                matrix[i][j] = permutation[k];
                k++;
            }
        }
    }

    string plainText;
    int size = cipherText.length();
    for(int i=0;i<size;i++){
        if(int(cipherText[i])-48 == num1){
            i++;
            plainText += matrix[1][int(cipherText[i])-48];
        }
        else if(int(cipherText[i])-48 == num2){
            i++;
            plainText += matrix[2][int(cipherText[i])-48];
        }
        else{
            plainText += matrix[0][int(cipherText[i])-48];
        }
    }

    cout<<plainText<<endl;

    return 0;
}