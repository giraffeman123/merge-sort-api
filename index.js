var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const PORT = process.env.PORT || 80;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/api', async(req,res)=>{
    console.log('-----------fetching /api-----------');
    res.status(200).json("Welcome to merge sort app.");
});

app.get('/api/401', async(req,res)=>{
    console.log('-----------simulating error 401-----------');
    res.status(401).json("Unauthorized Access");
});

app.get('/api/500', async(req,res)=>{
    console.log('-----------simulating application error 5XX-----------');
    res.status(500).json("Server Error");
});

app.post('/api/mergeSort', async(req, res) =>{                
    console.log('-----------fetching /api/mergeSort-----------');
    //var nums = [3,6,7,2,5,8,1];
    var nums = req.body.nums;
    var sortedArray = mergeSort(nums);        
    res.status(200).json({"nums":sortedArray});    
});

var mergeSort = function(nums){
    if(nums.length == 1)
        return nums[0];
            
    var middle = Math.trunc((nums.length-1)/2); 
    var leftArray = getSubArray(nums,0,middle);
    var rightArray = getSubArray(nums,middle+1,nums.length-1);  

    var leftSortedArray = mergeSort(leftArray);
    var rightSortedArray = mergeSort(rightArray);
    var merge = mergeSortedArrays(leftSortedArray, rightSortedArray);
    return merge;
};

var mergeSortedArrays = function(leftArray, rightArray){        
    if(typeof leftArray.length === 'undefined')
        leftArray = transformDigitToArray(leftArray);
    if(typeof rightArray.length === 'undefined')
        rightArray = transformDigitToArray(rightArray);

    var rs = rightArray.length;
    var ls = leftArray.length;
    leftArray.push(...Array(rs).fill(0));    

    while(ls > 0 && rs > 0){
        if(rightArray[rs-1] > leftArray[ls-1]){
            leftArray[ls+rs-1] = rightArray[rs-1];             
            rightArray.pop();
            rs--;
        }else{
            leftArray[ls+rs-1] = leftArray[ls-1];
            leftArray[ls-1] = 0;
            ls--;
        }
    }

    if(rs > 0){
        for(var i = 0; i<rs;i++)
            leftArray[i] = rightArray[i];
    }    

    return leftArray;
};

var getSubArray = function(arr,s,e){
    var newArr = [];
    for(var i=s;i<=e;i++)
        newArr.push(arr[i]);
    return newArr;
};

var transformDigitToArray = function(digit){
    var arr = [];
    arr.push(digit);
    return arr;
}

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});