//Hints: If possible, use const. If not, use let
let myItems = [] 
const inputEl = document.getElementById("input-el") 
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")


const itemsFromLocalStorage = JSON.parse( localStorage.getItem("myItems") )
//  Does items exist in locaStorage ? 
if (itemsFromLocalStorage){
    myItems = itemsFromLocalStorage
    render(myItems)
}

function render(items){
    let listItems = ""
    for (var i = 0; i < items.length; i++){

        listItems += `
        <li>
        <a target ='_blank' href='${items[i]}'>${items[i]}</a>
        </li>
        `
    
    }
    // render items to list-element
    ulEl.innerHTML = listItems

}

inputBtn.addEventListener("click", function(){ 
 // Push the value from inputEl into the myItems array 
    myItems.push(inputEl.value)  
 // Clear value from the inputEl
    inputEl.value = "" 
// save items to localStorage
    localStorage.setItem("myItems", JSON.stringify(myItems)) 

    render(myItems)

})

tabBtn.addEventListener("click", function(){
    console.log("Tab button clicked!")
    // Grab the Urls of the current tab!
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // Push the value from tabs into the myItems array 
        myItems.push(tabs[0].url)
        // save items to localStorage
        localStorage.setItem("myItems", JSON.stringify(myItems)) 
    
        render(myItems)
    })
})

deleteBtn.addEventListener("click", function(){
    // Clear items form localStorage 
    localStorage.clear()
    myItems = []
    render(myItems)
})


