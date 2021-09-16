const keys = ['1','2','3','4','5','6','7','8','9','10']
let remaining = keys;

// $
function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}
function tnt(input) {
    return parseInt(input)
}

let numberString = '*'
$(".phone-number").innerHTML = numberString

// Generate the keyboard

// Put the keys in .keys-visualized
let kv = $(".keys-visualized")
keys.forEach(key => {
    let tempElement = document.createElement("h1")
    tempElement.className = "key"
    tempElement.id = "key-" + key;
    tempElement.innerHTML = key;
    kv.appendChild(tempElement);
})

// Start the number flow. We use the click event for mobile support
let numberCreate = setInterval(function() {
    let newNumber = document.createElement("h1");
    newNumber.innerHTML = remaining[Math.floor(Math.random() * remaining.length)]
    newNumber.style.padding = "30px 30px"
    // Random rotation
    newNumber.style.transform = `rotate(${Math.floor(Math.random() * 90)}deg)`


    newNumber.style.position = "absolute"
    newNumber.style.transition = "color 0.2s"
    // Go from left/right?
    if(Math.floor(Math.random() * 2) == 1) {
        // Left
        newNumber.style.left = -50 + "px"
    } else {
        // Right
        newNumber.style.right = -50 + "px"
    }
    // Random top
    newNumber.style.top = Math.floor(Math.random() * 300) + "px"

    $(".game").appendChild(newNumber)

    // Click event
    newNumber.addEventListener("click", () => {
        newNumber.style.color = "black"
        setTimeout(function() {
            newNumber.remove();

            // mark as removed in keys-visualized
            remaining = remaining.filter((a => a !== newNumber.innerHTML))
            $(`#key-${newNumber.innerHTML}`).style.color = "#8c8c8c"

            // only 1 remaining? use as a number and reset
            if(remaining.length == 1) {
                // take advantage of the fact that JS replace only replaces the first occurence
                $(".phone-number").innerHTML = $(".phone-number").innerHTML.replace("*", remaining[0]);

                remaining = keys;
                $(".keys-visualized h1").forEach(key => {
                    key.style.color = "white"
                })

                // maybe that's the entire number?
                if($(".phone-number").innerHTML.includes("*") == false) {
                    clearInterval(numberFlow)
                    clearInterval(numberCreate)
                    setTimeout(function() {
                        alert("Thank you!")
                    }, 300)
                }
            }
        }, 225)
    })
}, 350)

let numberFlow = setInterval(function() {
    if($(".game h1").length > 1) {
        $(".game h1").forEach(key => {
            if(key.style.left == "") {
                // move right
                key.style.right = tnt(key.style.right) + 2 + "px"
            } else {
                // move left
                key.style.left = tnt(key.style.left) + 2 + "px"
            }
    
    
            // if out of bounds, remove
            if(tnt(key.style.left) >= 420 || tnt(key.style.right) >= 420) {
                key.remove();
            } 
        })
    }
    
}, 17)



// if using a mouse, replace it with a crosshair of sorts
$(".game").addEventListener("mousemove", (event) => {
    $(".game").style.cursor = "none"
    $(".crosshair").style.visibility = "visible"

    let x = Math.floor(event.clientX - $(".game").getBoundingClientRect().left)
    let y = Math.floor(event.clientY - $(".game").getBoundingClientRect().top)
    $(".crosshair").style.left = x - 30 + "px"
    $(".crosshair").style.top = y - 30 + "px"
})
