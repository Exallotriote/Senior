/*Functions*/
function log(vari){console.log(vari)}
function element(selector){return document.querySelector(selector)}
function addCSS(css){styleTag = document.createElement("style"); styleTag.innerText = css; document.head.appendChild(styleTag)}

function reloadCard(){
var senior_numbers = senior_data.seniors.length
var count = 0

element('div.senior-cards').innerHTML = ''

while (count != senior_numbers) {
	/*Changes the chapter to volume if comic or episode if series*/
	if (senior_data.seniors[count].type == 'Novel'){var chapter = 'Chapter: '}
	if (senior_data.seniors[count].type == 'Comic'){var chapter = 'Volume: '}
	if (senior_data.seniors[count].type == 'Series'){var chapter = 'Episode: '}

	/*Appends the html for the novel cards*/
	log(count)
	senior_card_html = `
	<div class="card x` + count + `">
	<p class="card-edit"><a href="javascript:editCard('div.card.x`+count+`')"><img src="img/edit.png" width="20" height="20"></a></p>
	<p class="card-title">`+senior_data.seniors[count].title+`</p>
	
	<center>
	<p class="card-type">`+senior_data.seniors[count].type+`</p>
	</center>
	
	<div class="senior-info">
	<p><span class="faint">`+chapter+`</span><span class="data-chapter">`+senior_data.seniors[count].chapter+`</span></p>
	<p><span class="faint">Status: </span><span class="data-status">`+senior_data.seniors[count].status+`<span></p>
	</div>
	
	</div>`
	element('div.senior-cards').insertAdjacentHTML('beforeend', senior_card_html)
	count++
}}

function editCard(vari){
//pre selects the type 
	function getTypeOptions(){
		if(element(vari+' p.card-type').innerText == 'Novel'){return "<option value='Novel' selected='selected'>Novel</option><option value='Comic'>Comic</option><option value='Series'>Series</option>"} //If novel, select novel
		if(element(vari+' p.card-type').innerText == 'Comic'){return "<option value='Novel'>Novel</option><option value='Comic' selected='selected'>Comic</option><option value='Series'>Series</option>"} //If comic, select comic
		if(element(vari+' p.card-type').innerText == 'Series'){return "<option value='Novel'>Novel</option><option value='Comic'>Comic</option><option value='Series' selected='selected'>Series</option>"} //If series, select series
	}
	
	function getStatusOptions(){
		if(element(vari+' span.data-status').innerText == 'Currently Reading'){return "<option value='Currently Reading' selected='selected'>Currently Reading</option><option value='Waiting for Updates'>Waiting for Updates</option><option value='On a Hiatus'>On a Hiatus</option><option value='Finished'>Finished</option><option value='To Read / Watch'>To Read / Watch</option>"}
		if(element(vari+' span.data-status').innerText == 'Waiting for Updates'){return "<option value='Currently Reading'>Currently Reading</option><option value='Waiting for Updates' selected='selected'>Waiting for Updates</option><option value='On a Hiatus'>On a Hiatus</option><option value='Finished'>Finished</option><option value='To Read / Watch'>To Read / Watch</option>"}
		if(element(vari+' span.data-status').innerText == 'On a Hiatus'){return "<option value='Currently Reading'>Currently Reading</option><option value='Waiting for Updates'>Waiting for Updates</option><option value='On a Hiatus' selected='selected'>On a Hiatus</option><option value='Finished'>Finished</option><option value='To Read / Watch'>To Read / Watch</option>"}
		if(element(vari+' span.data-status').innerText == 'Finished'){return "<option value='Currently Reading'>Currently Reading</option><option value='Waiting for Updates'>Waiting for Updates</option><option value='On a Hiatus'>On a Hiatus</option><option value='Finished' selected='selected'>Finished</option><option value='To Read / Watch'>To Read / Watch</option>"}
		if(element(vari+' span.data-status').innerText == 'To Read / Watch'){return "<option value='Currently Reading'>Currently Reading</option><option value='Waiting for Updates'>Waiting for Updates</option><option value='On a Hiatus'>On a Hiatus</option><option value='Finished'>Finished</option><option value='To Read / Watch' selected='selected'>To Read / Watch</option>"}
	}
	
//da html for the edit forms thing. def needs css
	element(vari).innerHTML = `
	<div class='edit-forms'>
	<label for='card-title'>Title: </label>
	<input type='text' name='card-title' class='card-title' value='`+element(vari+' p.card-title').innerText+`'>
	<br><br>
	<label for='card-status'>Type: </label>
		<select name='card-type' class='card-type'>
			`+getTypeOptions()+`
		</select>
	<br><br>
	<label for='card-chapter' class='chapter-name'>Chapter: </label>
		<input type='number' name='card-chapter' class='card-chapter' value='`+element(vari+' span.data-chapter').innerText+`'>
	<br><br>
	<label for='card-status'>Status: </label>
	<select name='card-status' class='card-status'>
		`+getStatusOptions()+`
	</select>
	<p class='edit-save'><a href="javascript:saveEdit('`+vari+`')">Save</a></p>
	</div>
`
}

function saveEdit(vari){
	senior_data.seniors[vari.slice(10)].title = element(vari+' input.card-title').value
	senior_data.seniors[vari.slice(10)].type = element(vari+' select.card-type').value
	senior_data.seniors[vari.slice(10)].chapter = element(vari+' input.card-chapter').value
	senior_data.seniors[vari.slice(10)].status = element(vari+' select.card-status').value
	reloadCard()
}
/*da css*/
addCSS(`
	body{
		color:white;
		background-color: #222;
		font-family: 'Noto Sans';
	}
	div.add-senior{
		text-align: center;
	}
	div.card {
		border-style: solid;
		border-color: #6e6e6e;
		border-radius: 20px;
		padding: 0.5em 0.5em 0.5em 0em;
		margin-right: 30vw;
		margin-left: 30vw;
		margin-bottom: 3vw;
		@media (pointer:coarse) {margin-right: 15vw; margin-left: 15vw}
	}
	span.faint {
		color: #a7a7a7;
	}
	p.card-title{
		text-align: center;
		font-size: 18px
	}
	p.card-type {
		display: inline;
		background-color: #4d5a7a;
		border-style: solid;
		border-color: #4d5a7a;
		border-radius: 20px;
		padding: 0.3em 0.4em 0.3em 0.4em;
		margin-right: -2em;
		margin-left: -2em;
		font-size: 13px;
	}
	div.senior-info {
		padding-left: 0.5em;
	}
	p.card-edit{
		margin-left: 0.5em;
	}
	div.edit-forms{
		margin: 1em 2em 1em 2em;
	}
	p.edit-save a{
		color: cyan;
	}
	p.edit-save {
		text-align: right;
	}
`)

/*checks if senior_db alread exists. if not, it makes one*/
if (localStorage.senior_db == undefined){
	senior_data = {'seniors':[]}
	log(senior_data)
}
else {
	var senior_data = JSON.parse(localStorage.senior_db)
}

/*gets the inputs from the form, pushes them into the db, then reloads the cards*/
function submit_senior(){
	if (element('input.senior-title').value == ''){return}
	senior_data.seniors.push({'title': element('input.senior-title').value, 'type': element('select.senior-type').value, 'chapter': element('input.senior-chapter').value, 'status': element('select.senior-status').value})
	localStorage.setItem('senior_db', JSON.stringify(senior_data))
	log(senior_data)
	reloadCard()
}

reloadCard()

/*Changed the chapter label to episode or volume*/
element('select.senior-type').onchange = changeChapterName
function changeChapterName(){
	if (element('select.senior-type').value == 'Novel'){element('label.chapter-name').innerText = 'Chapter: '}
	if (element('select.senior-type').value == 'Comic'){element('label.chapter-name').innerText = 'Volume: '}
	if (element('select.senior-type').value == 'Series'){element('label.chapter-name').innerText = 'Episode: '}
}