let arr = ["a","c","f","b","g","e","d"]

function mergeSort(arr){
    let len = arr.length;
    if(len <2)
       return arr;
    let mid = Math.floor(len/2),
        left = arr.slice(0,mid),
        right =arr.slice(mid);
        console.log("mid",mid,"left",left,"right",right)
    //send left and right to the mergeSort to broke it down into pieces
    //then merge those
    return merge(mergeSort(left),mergeSort(right));
 }
         
 
 function merge(left, right){
   let result = [],
       lLen = left.length,
       rLen = right.length,
       l = 0,
       r = 0;
   while(l < lLen && r < rLen){
      if(left[l] < right[r]){
        result.push(left[l++]);
        console.log("mergeL",left)
      }
      else{
        result.push(right[r++]);
        console.log("mergeR",right)

     }
   }  
   //remaining part needs to be addred to the result
   return result.concat(left.slice(l)).concat(right.slice(r));
 }

 console.log("merge",mergeSort(arr))


 // An algorithm is a repeatable process for determining the solution to a problem. 
 // Merge Sort first divides the array into two halves(equal if possible) and then
 // combines them together in a sorted order.
 // Big O It is  O(n * log(n)), because the entire input must be iterated 
 // through, and this must occur O(log(n)) 
 // times (the input can only be halved O(log(n)) times). 
 // n items iterated log(n) times gives O(n log(n)).