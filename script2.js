let preview = document.getElementById("preview")
let choice1 = document.getElementById("choice1")
let choice2 = document.getElementById("choice2")
let choice3 = document.getElementById("choice3")
let choice4 = document.getElementById("choice4")
let choice5 = document.getElementById("choice5")

choice1.addEventListener("click", function() {

    preview.innerHTML = 
`<span class="keyword1">void</span> <span class="keyword2">selectionSort</span>(<span class="keyword1">int</span> arr[], <span class="keyword1">int</span> n) {
    <span class="keyword1">for</span> (<span class="keyword1">int</span> i = 0; i < n - 1; i++) {
        <span class="keyword1">int</span> minIndex = i;

        <span class="keyword1">for</span> (<span class="keyword1">int</span> j = i + 1; j < n; j++) {
            <span class="keyword1">if</span> (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[minIndex], arr[i]);
    }
}

`
})

choice2.addEventListener("click", function() {

    preview.innerHTML = 
`<snap class="keyword1">public static void</snap> <snap class="keyword2">selectionSort</snap>(<snap class="keyword1">int</snap>[] arr) {
    <snap class="keyword1">for</snap> (<snap class="keyword1">int</snap> i = 0; i < arr.length - 1; i++) {
        <snap class="keyword1">int</snap> minIndex = i;

        <snap class="keyword1">for</snap> (<snap class="keyword1">int</snap> j = i + 1; j < arr.length; j++) {
            <snap class="keyword1">if</snap> (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        <snap class="keyword1">int</snap> temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}

`
})

choice3.addEventListener("click", function() {

    preview.innerHTML = 
`<snap class="keyword1">def</snap> <snap class="keyword2">selection_sort</snap>(arr)
    (0...arr.length).each <snap class="keyword1">do</snap> |i|
        min_index = i
        (i + 1...arr.length).each <snap class="keyword1">do</snap> |j|
            min_index = j if arr[j] < arr[min_index]
        <snap class="keyword1">end</snap>

        <snap class="keyword1">if</snap> min_index != i:
            temp = arr[i]
            arr[i] = arr[min_index]
            arr[min_index] = temp

    <snap class="keyword1">end</snap>
<snap class="keyword1">end</snap>

`
})

choice4.addEventListener("click", function() {


    preview.innerHTML = 
`<snap class="keyword1">def</snap> <snap class="keyword2">selection_sort</snap>(arr):
    <snap class="keyword1">for</snap> i <snap class="keyword1">in</snap> range(len(arr) - 1):
        min_index = i
        
        <snap class="keyword1">for</snap> j <snap class="keyword1">in</snap> range(i + 1, len(arr)):
            <snap class="keyword1">if</snap> arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]

`
})

choice5.addEventListener("click", function() {


    preview.innerHTML = 
`<snap class="keyword1">function</snap> <snap class="keyword2">selectionSort</snap>(arr) {
    <snap class="keyword1">for</snap> (<snap class="keyword1">var</snap> i = 0; i < arr.length; i++) {
        <snap class="keyword1">let</snap> min = i;

        <snap class="keyword1">for</snap> (<snap class="keyword1">var</snap> j = i + 1; j < arr.length; j++) {
            <snap class="keyword1">if</snap> (arr[min] > arr[j]) {
                min = j;
            }
        }

        <snap class="keyword1">if</snap> (i != min) {
            [arr[ i ],arr[min]] = [arr[min],arr[ i ]];
        }
    }
}

`

})

let array = [];

let audioCtx = null;

init()

function init(){
    for(let i=0;i<50;i++){
        array[i]= getRandomNumberBetween(5, 250);
    }
    showBars();
}

function play() {
    const swaps = selectionSort([...array]);
    animate(swaps);
}

function animate(swaps) {
    if (swaps.length == 0) {
        showBars();
        return;
    }
    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i, j]);
    playNote(100 + array[i] * 35);
    playNote(100 + array[j] * 35);

    setTimeout(function() {
        animate(swaps);
    }, 100);
}

function selectionSort(arr) {
    const swaps = []
    for (var i = 0; i < arr.length; i++) {
        let min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i != min) {
            [arr[ i ],arr[min]]= [arr[min],arr[ i ]];
        }
        swaps.push([i, min])
    }
    return swaps
}


function showBars(indices) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] + "%";
        bar.classList.add("bar");
        if (indices && indices.includes(i)) {
            bar.style.background = "#00f3ad";
        }
        container.appendChild(bar);
    }
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.05;
    osc.connect(node);
    node.connect(audioCtx.destination);
}