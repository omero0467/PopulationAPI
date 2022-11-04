import app from './app.js';
import appFuncs from './app.js'

const ContinentsSelection = document.querySelector('.Continents-Selection')
const countreyBtns = document.querySelector('.countreyBtns')
const mainChartDiv = document.querySelector('.chart')
const overlay = document.querySelector('.overlay')
let currentCon;

function setEvents () {
ContinentsSelection.addEventListener('click',continentSelect)
addGlobalEventListenet('click','.countryBtn',getCitiesByOfficialOrCommonEventHandler)
}

function continentSelect(e){
    overlay.classList.toggle('hidden')
       currentCon = e.target.innerText
       drawChart(countriesNamesArrMaker(true),popByNamesArrMaker(),currentCon)
   }

 function createNewBtn(arr,appendingParent,className){
    appendingParent.replaceChildren('')
    arr.forEach((e,i)=>{
        let newBtn = document.createElement('button')
        newBtn.setAttribute('data-index',i)
        newBtn.classList.add('btn', `${className}Btn`)
        newBtn.innerText = e
        appendingParent.appendChild(newBtn)
    })
 }




 function createAndAppendCanvas(){
    mainChartDiv.replaceChildren('')
    let newChart=document.createElement('canvas')
    newChart.id = 'newChart'
    mainChartDiv.appendChild(newChart)
    return document.getElementById('newChart')
 }



     function countriesNamesArrMaker(bol=false){
        const xLabels = appFuncs.worldObj[currentCon].map((country)=>{
            return country.name.common
        })
        bol?createNewBtn(xLabels,countreyBtns,'country'):null
        return xLabels
     }
     function popByNamesArrMaker(){
        const yPopulationData =appFuncs.worldObj[currentCon].map((country)=>{
            return country.population
        })
        return yPopulationData
     }


    function drawChart(xLabelsArr,yPopulationDataArr,title){

        const ctx = createAndAppendCanvas()
        ctx.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xLabelsArr,
            
            datasets: [{
                label: 'Population',
                data: yPopulationDataArr,
                backgroundColor: 
                    'rgba(75, 192, 192, 0.2)',
                borderColor: 
                    'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins:{title:{
              display:true,
              text: title,
              fontSize:50,
            },},
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
}


 function getCitiesArr (responseData){
    let names = responseData.data.map((city)=>{
        return city.city
    })
return names
}
 function getCitiesPopArr (responseData){
    let pop = responseData.data.map((city,index)=>{
        return city.populationCounts[0].value
    })
return pop
}


async function getCitiesByOfficialOrCommonEventHandler(e){
    try    {
    //     let myArr =[appFuncs.fetchCityDataFromCountries(appFuncs.worldObj[currentCon][e.target.getAttribute('data-index')].name.common),appFuncs.fetchCityDataFromCountries(appFuncs.worldObj[currentCon][e.target.getAttribute('data-index')].name.official)]
    // const res =await Promise.any(myArr)
    const res2 = await appFuncs.fetchCityDataFromCountries(appFuncs.worldObj[currentCon][e.target.getAttribute('data-index')].name.common)
    if(res2.error){
        const res3= await appFuncs.fetchCityDataFromCountries(appFuncs.worldObj[currentCon][e.target.getAttribute('data-index')].name.official)
        drawChart(getCitiesArr(res3),getCitiesPopArr(res3))
    }

    drawChart(getCitiesArr(res2),getCitiesPopArr(res2),e.target.innerText)
    // drawChart(getCitiesArr(res),getCitiesPopArr(res))
    // console.log(getCitiesArr(res))
    // console.log(getCitiesPopArr(res))
    // if (res.error==true){
    //     console.log('no Data')///! display message to user
    // }
    return res2.data}
    catch(e){console.log(e);}
}


function addGlobalEventListenet(type, selector, callback) {
    document.addEventListener(type, (e) => {
      if (e.target.matches(selector)) callback(e);
    });
  }


  


createNewBtn(appFuncs.continentsArr,ContinentsSelection,'continent')
setEvents()
    export default {createNewBtn,setEvents}