let num=2

function checkprime(num){
    let count=0
    for(let i=1;i<=num;i++){
        if(num%1==0){
            count++
        }
    }
     if(count==2){
        return true
     }else {
        return false
     }
}

console.log(checkprime(num))

//check even odd

if(num%2==0){
    console.log("Even")
}else{
    console.log("Odd")
}