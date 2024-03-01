async function addCricketer(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let dob = e.target.dob.value;
  let photoUrl = e.target.photoUrl.value;
  let birthplace = e.target.birthplace.value;
  let career = e.target.career.value;
  let noOfMatches = e.target.noOfMatches.value;
  let score = e.target.score.value;
  let fifties = e.target.fifties.value;
  let centuries = e.target.centuries.value;
  let wickets = e.target.wickets.value;
  let average = e.target.average.value;
  let myObj = {
    name: name,
    dob: dob,
    photoUrl: photoUrl,
    birthplace: birthplace,
    career: career,
    noOfMatches: noOfMatches,
    score: score,
    fifties: fifties,
    centuries: centuries,
    wickets: wickets,
    average: average,
  };
  try {
    const add = await axios.post(
      "http://localhost:8080/cricketer/add-cricketer",
      myObj
    );
    // console.log(add);
    // console.log(myObj);
    myObj = add.data;
  } catch (err) {
    console.log(err);
  }
}

async function searchCricketer() {
  const name = document.getElementById("inputSearch").value.trim();
  if (!name) {
    alert("Please enter a name to search.");
    return;
  }
  try {
    const response = await axios.get(
      `http://localhost:8080/cricketer/search?name=${name}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching cricketer data.");
  }
}

document.getElementById("search").addEventListener("click", searchCricketer);
