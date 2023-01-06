let preview = document.getElementById("preview")
let choice1 = document.getElementById("choice1")
let choice2 = document.getElementById("choice2")
let choice3 = document.getElementById("choice3")
let choice4 = document.getElementById("choice4")
let choice5 = document.getElementById("choice5")

choice1.addEventListener("click", function() {

    preview.innerHTML = 
`<snap class="keyword1">void</snap> <snap class="keyword2">insertion_sort</snap>(<snap class="keyword1">int</snap> arr[], <snap class="keyword1">int</snap> n) {
    <snap class="keyword1">for</snap> (<snap class="keyword1">int</snap> i = 1; i < n; i++) {
        <snap class="keyword1">int</snap> current_value = arr[i];
        <snap class="keyword1">int</snap> position = i;

        <snap class="keyword1">while</snap> (position > 0 && arr[position - 1] > current_value) {
            arr[position] = arr[position - 1];
            position -= 1;
        }

        arr[position] = current_value;
    }
}

`
})

choice2.addEventListener("click", function() {

    preview.innerHTML = 
`<snap class="keyword1">public static void</snap> <snap class="keyword2">insertionSort</snap>(<snap class="keyword1">int</snap>[] arr) {
    <snap class="keyword1">for</snap> (<snap class="keyword1">int</snap> i = 1; i < arr.length; i++) {
        <snap class="keyword1">int</snap> currentValue = arr[i];
        <snap class="keyword1">int</snap> position = i;

        <snap class="keyword1">while</snap> (position > 0 && arr[position - 1] > currentValue) {
            arr[position] = arr[position - 1];
            position -= 1;
        }

        arr[position] = currentValue;
    }
}

`
})

choice3.addEventListener("click", function() {

    preview.innerHTML = 
`<snap class="keyword1">def</snap> <snap class="keyword2">insertion_sort</snap>(arr)
    (1...arr.length).each <snap class="keyword1">do</snap> |i|
        current_value = arr[i]
        position = i

        <snap class="keyword1">while</snap> position > 0 && arr[position - 1] > current_value
            arr[position] = arr[position - 1]
            position -= 1
        <snap class="keyword1">end</snap>

        arr[position] = current_value

    <snap class="keyword1">end</snap>
<snap class="keyword1">end</snap>

`
})

choice4.addEventListener("click", function() {


    preview.innerHTML = 
`<snap class="keyword1">def</snap> <snap class="keyword2">insertion_sort</snap>(arr):
    <snap class="keyword1">for</snap> i <snap class="keyword1">in</snap> range(1, len(arr)):
        current_value = arr[i]
        position = i
        <snap class="keyword1">while</snap> position > 0 <snap class="keyword1">and</snap> arr[position - 1] > current_value:
            arr[position] = arr[position - 1]
            position -= 1
        arr[position] = current_value

`
})

choice5.addEventListener("click", function() {


    preview.innerHTML = 
`<snap class="keyword1">function</snap> <snap class="keyword2">insertionSort</snap>(array) {
    <snap class="keyword1">for</snap> (<snap class="keyword1">let</snap> i = 1; i < array.length; i++) {
        <snap class="keyword1">let</snap> currentValue = array[i];
        <snap class="keyword1">let</snap> j;

        <snap class="keyword1">for</snap> (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
            array[j + 1] = array[j];
        }

        array[j + 1] = currentValue;
    }
}

`

})

let array = [];

let audioCtx = null;

init()

function init(){
    for(let i=0;i<60;i++){
        array[i]= getRandomNumberBetween(5, 250);
    }
    showBars();
}

function play() {
    const swaps = insertionSort([...array]);
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
    playNote(parseFloat(100 + array[i] * 35));
    playNote(parseFloat(100 + array[j] * 35));

    setTimeout(function() {
        animate(swaps);
    }, 1);
}

function insertionSort(array) {
    const swaps = []
    for (let i = 1; i < array.length; i++) {
      let currentValue = array[i];
      let j;
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        swaps.push([j+1, j])
        array[j + 1] = array[j];
      }
      array[j + 1] = currentValue;
    }
    return swaps;
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