var editingItemId = null;
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
    if (editingItemId) {
      axios
        .put(
          `http://localhost:8080/cricketer/update-cricketer/${editingItemId}`,
          myObj
        )
        .then((response) => {
          console.log(response.data);
          editingItemId = null;
          clearForm();
        })
        .catch((err) => console.error(err));
    } else {
      const add = await axios.post(
        "http://localhost:8080/cricketer/add-cricketer",
        myObj
      );
      // console.log(add);
      // console.log(myObj);
      myObj = add.data;
    }
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
    // console.log(response.data);
    displayCricketers(response.data);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching cricketer data.");
  }
}

document.getElementById("search").addEventListener("click", searchCricketer);

function displayCricketers(cricketers) {
  document.getElementById("inputSearch").value = "";
  console.log(cricketers[0]);
  const details = document.getElementById("details");
  details.style.visibility = "visible";
  document.getElementById("dphoto").src = cricketers[0].photoUrl;
  document.getElementById("dname").innerHTML = `Name: ${cricketers[0].name}`;
  document.getElementById(
    "ddob"
  ).innerHTML = `Date of Birth: ${cricketers[0].dob}`;
  document.getElementById(
    "dbirthplace"
  ).innerHTML = `Birthplace: ${cricketers[0].birthplace}`;
  document.getElementById(
    "dcareer"
  ).innerHTML = `Career: ${cricketers[0].career}`;
  document.getElementById(
    "dnoofmatches"
  ).innerHTML = `Number of Matches: ${cricketers[0].numberOfMatches}`;
  document.getElementById("dscore").innerHTML = `Score: ${cricketers[0].score}`;
  document.getElementById(
    "dfifties"
  ).innerHTML = `Fifties: ${cricketers[0].fifties}`;
  document.getElementById(
    "dcenturies"
  ).innerHTML = `Centuries: ${cricketers[0].centuries}`;
  document.getElementById(
    "dwickets"
  ).innerHTML = `Wickets: ${cricketers[0].wickets}`;
  document.getElementById(
    "daverage"
  ).innerHTML = `Average: ${cricketers[0].average}`;
  localStorage.setItem("details", JSON.stringify(cricketers[0]));
  //   const cricketerList = document.getElementById("cricketerList");
  //   const cricketer = cricketers[0];
  //   cricketerList.innerHTML = "";
  //   const listItem = document.createElement("li");
  //   cricketers.forEach((cricketer) => {
  // const listItem = document.createElement("li");
  // const details = `
  //   <button class="btn btn-outline-secondary" id="editPlayer">Edit</button>
  //   <img src="${cricketer.photoUrl}" alt="Cricketer Photo" style="max-width: 200px;">
  //   <p><strong>Name:</strong> ${cricketer.name}</p>
  //   <p><strong>Date of Birth:</strong> ${cricketer.dob}</p>
  //   <p><strong>Birthplace:</strong> ${cricketer.birthplace}</p>
  //   <p><strong>Career:</strong> ${cricketer.career}</p>
  //   <p><strong>Number of Matches:</strong> ${cricketer.noOfMatches}</p>
  //   <p><strong>Score:</strong> ${cricketer.score}</p>
  //   <p><strong>Fifties:</strong> ${cricketer.fifties}</p>
  //   <p><strong>Centuries:</strong> ${cricketer.centuries}</p>
  //   <p><strong>Wickets:</strong> ${cricketer.wickets}</p>
  //   <p><strong>Average:</strong> ${cricketer.average}</p>
  // `;
  // listItem.innerHTML = details;
  // cricketerList.appendChild(listItem);
  //   });
}

function editPlayer() {
  //   const cricketerList = document.getElementById("cricketerList");
  //   cricketerList.innerHTML = "";
  const localDetails = JSON.parse(localStorage.getItem("details"));
  // console.log(document.getElementById("dname").innerHTML);
  editingItemId = localDetails.id;
  console.log(editingItemId);
  const details = document.getElementById("details");
  details.style.visibility = "hidden";
  document.getElementById("name").value = localDetails.name;
  document.getElementById("dob").value = localDetails.dob;
  document.getElementById("photoUrl").value = localDetails.photoUrl;
  document.getElementById("birthplace").value = localDetails.birthplace;
  document.getElementById("career").value = localDetails.career;
  document.getElementById("noOfMatches").value = localDetails.numberOfMatches;
  document.getElementById("score").value = localDetails.score;
  document.getElementById("fifties").value = localDetails.fifties;
  document.getElementById("centuries").value = localDetails.centuries;
  document.getElementById("wickets").value = localDetails.wickets;
  document.getElementById("average").value = localDetails.average;
  //   console.log(localDetails);
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("photoUrl").value = "";
  document.getElementById("birthplace").value = "";
  document.getElementById("career").value = "";
  document.getElementById("noOfMatches").value = "";
  document.getElementById("score").value = "";
  document.getElementById("fifties").value = "";
  document.getElementById("centuries").value = "";
  document.getElementById("wickets").value = "";
  document.getElementById("average").value = "";
}
