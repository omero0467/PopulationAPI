import indexFuncs from "./index.js";

const continentsArr = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
const worldObj = {}


const fetchData = async (url) => {
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

async function fetchDataFromContinents(array) {
   let arr = []
   for (const continent of array) {
      arr.push(fetchData(`https://restcountries.com/v3.1/region/${continent}`))
   }
   const result = await Promise.all(arr)
   return result
}


async function setObj() {
   ((await fetchDataFromContinents(continentsArr)).forEach((e, idx, a) => {
      worldObj[continentsArr[idx]] = e
   })
   )
   console.log(worldObj)
}

async function arrangeObj() {
   await setObj()
   for (const continent of continentsArr) {
      worldObj[continent].map((e, index, a) => {
         const { name, population, flag, borders, continents, flags } = e
         let common = name.common
         let official = name.official
         worldObj[continent][index] = { name: {common, official}, population, continents, flags, borders }
      })
   }
   // console.log(myOBj);
}

arrangeObj()

const fetchCityDataFromCountries = async (country) => {
   try {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            'limit': 20,
            'order': "asc",
            'orderBy': "populationCounts",
            'country': country,
         }),
      });
      const data = await res.json();
      // console.log(data);
      return data
   }
   catch (err) {
      console.log(err);
   }
};




export default { continentsArr, fetchCityDataFromCountries, fetchData, fetchDataFromContinents, worldObj }
