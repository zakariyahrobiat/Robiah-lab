const hamburger = document.getElementById("hamburger");
const sideBar = document.querySelector(".sideBar");
const close = document.querySelector(".close");
const table = document.querySelector("#table tbody")
const search = document.getElementById("search")
const suggestions = document.getElementById("suggestions")
const medicineName = document.getElementById("medicine-name")
const nameSuggestion = document.getElementById("name-suggestion")
const strengthValue = document.getElementById("strength")
const interval = document.getElementById("interval")
const durationValue = document.getElementById("duration")
const stopDurationValue = document.getElementById("stop-duration")
const instructionValue = document.getElementById("instruction")
hamburger.addEventListener("click", () => {
  sideBar.classList.toggle("showSidebar");
});
close.addEventListener("click", () => {
  sideBar.classList.remove("showSidebar");
});


search.addEventListener("click",()=>{
  const url ="https://cliniqueplushealthcare.com.ng/prescriptions/drug_class"
 
const drug = async ()=>{
const fetchUrl = await fetch (url)
const data = await fetchUrl.json()
console.log(data);

suggestions.innerHTML=""
data.map((item)=>{
  const li = document.createElement("li")
  li.textContent= item.name
  suggestions.classList.add("show-height")
  li.onclick=()=>{
    search.value = item.name
    const id = item.id
    suggestions.innerHTML=""
drugName(id)
  }
  suggestions.appendChild(li)
})
} 
drug()
  })
 
  const drugName  = async(id)=>{
    const nameUrl =`https://cliniqueplushealthcare.com.ng/prescriptions/get_drug_class_by_id/${id}`
try{
  const fetchUrl = await fetch (nameUrl)
  const data = await fetchUrl.json()
  console.log(data,id);
  data.map((item)=>{
    const li = document.createElement('li')
    li.innerHTML = item.medicine_name
    const medicineId = item.medicine_name
nameSuggestion.classList.add("show-height")
    li.onclick=()=>{
      medicineName.value = item.medicine_name
      nameSuggestion.innerHTML=""
      medicine(medicineId)
    }
    nameSuggestion.appendChild(li)
  }

)
} catch(error){
  console.error("Error fectch drug detail", error)
}

} 

const medicine = async(medicineId)=>{
  const url = "https://cliniqueplushealthcare.com.ng/prescriptions/all_medicine"
  
  try{
    const fetchUrl = await fetch (url)
  const data = await fetchUrl.json()
  console.log(data);
  const filteredItem = data.filter((item)=> item.medicine_name === medicineId)
  console.log(filteredItem);
  
  
  if (filteredItem.length > 0) {
  const {strength, medicine_interval, duration, instruction} = filteredItem[0]
    
strengthValue.value= strength 
  interval.value= medicine_interval 
  instructionValue.value = instruction 
  durationValue.value = duration 
  
  } else {
    console.log(`No medicine found with ID: ${medicineId}`);
  }

  }
  catch(error){
    console.error(error);
    
  }
}
const clickElement = document.querySelectorAll(".click")
clickElement.forEach(click=>{click.addEventListener("click",()=>{
  clickElement.forEach(el => el.classList.remove("active"));
  click.classList.toggle("active")
})
})

function Add() {
  document.getElementById("table-body").innerHTML=""
  const row = document.createElement("tr")
  row.innerHTML = `
  <td>1</td>
 
  <td>${medicineName.value}</td>
   <td>${search.value}</td>
  <td>${strengthValue.value}</td>
  <td>${durationValue.value}/${stopDurationValue.value}</td>
  <td>${instructionValue.value}</td>
  <td><button>Remove</button></td>
  `
  table.appendChild(row)
  
}
function Done() {
  document.querySelector(".remark").classList.toggle("active")
}