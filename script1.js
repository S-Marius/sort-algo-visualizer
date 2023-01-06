// From here below starts the implementation of the various algorithms in the various programming languages

let preview = document.getElementById("preview")
let choice1 = document.getElementById("choice1")
let choice2 = document.getElementById("choice2")
let choice3 = document.getElementById("choice3")
let choice4 = document.getElementById("choice4")
let choice5 = document.getElementById("choice5")

choice1.addEventListener("click", function() {

    preview.innerHTML = 
`<span class="keyword1">void</span> <span class="keyword2">bubbleSort</span>(<span class="keyword1">int</span> arr[], <span class="keyword1">int</span> n)
{
    <span class="keyword1">bool</span> swapped;
    <span class="keyword1">for</span> (<span class="keyword1">int</span> i = 0; i < n - 1; i++)
    {
        swapped = false;
        <span class="keyword1">for</span> (<span class="keyword1">int</span> j = 0; j < n - i - 1; j++)
        {
            <span class="keyword1">if</span> (arr[j] > arr[j + 1])
            {
                <span class="keyword1">int</span> temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
                
                        
        <span class="keyword1">if</span> (!swapped)
            break;
    }
}

`
})

choice2.addEventListener("click", function() {

    preview.innerHTML = 
`<span class="keyword1">public static void</span> <span class="keyword2">bubbleSort</span>(<span class="keyword1">int</span>[] arr) {
    <span class="keyword1">int</span> n = arr.length;
    <span class="keyword1">boolean</span> swapped;
    <span class="keyword1">for</span> (<span class="keyword1">int</span> i = 0; i < n - 1; i++) {
        swapped = false;
        <span class="keyword1">for</span> (<span>int</span> j = 0; j < n - i - 1; j++) {
            <span class="keyword1">if</span> (arr[j] > arr[j + 1]) {

                <span class="keyword1">int</span> temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
            
        <span class="keyword1">if</span> (!swapped) {
            break;
        }
    }
}

`
})

choice3.addEventListener("click", function() {

    preview.innerHTML = 
`<span class="keyword1">def</span> <span class="keyword2">bubble_sort</span>(arr)
n = arr.length
swapped = true

<span class="keyword1">while</span> swapped
    swapped = false
    
    (n - 1).times do |i|
        <span class="keyword1">if</span> arr[i] > arr[i + 1]

            arr[i], arr[i + 1] = arr[i + 1], arr[i]
            swapped = true
        <span class="keyword1">end</span>
    <span class="keyword1">end</span>
<span class="keyword1">end</span>
            
arr
<span class="keyword1">end</span>

`
})

choice4.addEventListener("click", function() {


    preview.innerHTML = 
`<span class="keyword1">def</span> <span class="keyword2">bubble_sort</span>(arr):

n = len(arr)
<span class="keyword1">for</span> i <span class="keyword1">in</span> range(n):
    <span class="keyword1">for</span> j <span class="keyword1">in</span> range(0, n-i-1):
        <span class="keyword1">if</span> arr[j] > arr[j+1] :
            arr[j], arr[j+1] = arr[j+1], arr[j]

`
})

choice5.addEventListener("click", function() {


    preview.innerHTML = 
`<span class="keyword1">function</span> <span class="keyword2">bubbleSort</span>(array) {
        
    <span class="keyword1">do</span> {
        <span class="keyword1">let</span> swapped = false;
        <span class="keyword1">for </span>(<span class="keyword1">let</span> i = 1; i &lt; array.length; i++){
            <span class="keyword1">if </span>(array[i-1] > array[i]){
                swapped = true;
                [array[i-1], array[i]] = [array[i], array[i-1]];
            }
        }
    } <span class="keyword1">while</span>(swapped);
    
}

`})

// From here below starts the sorting algorithm code

let array = [];

let audioCtx=null;

init()

function init(){
    for(let i=0;i<60;i++){
        array[i]= getRandomNumberBetween(5, 250);
    }
    showBars();
}

function play(){
    const swaps=bubbleSort([...array]);
    animate(swaps);
}

function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    playNote(100+array[i]*35);
    playNote(100+array[j]*35);

    setTimeout(function(){
        animate(swaps);
    }, 1);
}

function bubbleSort(array){
    const swaps=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swaps.push([i-1,i]);
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return swaps;
}

function showBars(indices){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]+"%";
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.background = "#00f3ad";
        }
        container.appendChild(bar);
    }   
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.05;
    osc.connect(node);
    node.connect(audioCtx.destination);
}