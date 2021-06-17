document.addEventListener("DOMContentLoaded", function() {
    console.log("Ready!")

fetch("https://covid-19-data.p.rapidapi.com/country?name=canada", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3219b27cd3msh7e6c60d0d96a498p1f282cjsn3b2bf50000a2",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);

	let lastestData = document.getElementById('lastestData');
	console.log(lastestData) 

	lastestData.innerHTML = (`
	<h2>Lastest</h2>
	<p  style="font-size: 0.9em; font-style: italic;" >Updated at <span>${response[0].lastUpdate}</span></p>
	<h3>All Cases</h3>
	<ul class="data-container">
		<li class="data">
			<div>
				<span class="bold">Total</span>
				<span class="right">${response[0].confirmed}</span>
			</div>
		</li>
		<li class="data">
			<div>
				<span class="bold">Resolved</span>
				<span class="right">${response[0].recovered}</span>
			</div>
		</li>
		<li class="data">
			<div>
				<span class="bold">Critical</span>
				<span class="right">${response[0].critical}</span>
			</div>
		</li>
		<li class="data">
			<div>
				<span class="bold">Deaths</span>
				<span class="right">${response[0].deaths}</span>
			</div>
		</li>
	</ul>
	`
	)

})
.catch(err => {
	console.error(err);
});

const db = firebase.firestore();
const form = document.getElementById("form");
const firstname = document.getElementById("fname");
const lastname = document.getElementById("lname");
const email = document.getElementById("emailadd");

form.addEventListener("submit", function(event){
	event.preventDefault();
	console.log('Submit!');

	if (firstname.value && lastname.value && email.value) {
		console.log(firstname.value, lastname.value, email.value)
		addUser(firstname.value, lastname.value, email.value)
		form.innerHTML = (`
		<h3 style="color: rgb(74, 110, 27);"> ✓ Thank you! You have been added to the updates messaging list.</h3>
		`) + form.innerHTML
	}
})

function addUser(first, last, email) {
	db.collection('Users')
	.add({
		firstname: first,
		lastname: last,
		emailadress: email,
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
	}).then(function(docRef){
		console.log('Document written with ID:', docRef.id);
	})
	.catch(function (error) {
		console.error("Error adding document", error);
	})
}

});