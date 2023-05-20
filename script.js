/*Functions*/
function log(vari){console.log(vari)}
function element(selector){return document.querySelector(selector)}
function addCSS(css){styleTag = document.createElement("style"); styleTag.innerText = css; document.head.appendChild(styleTag)}

function reloadCard(){
var senior_numbers = senior_data.seniors.length
var count = 0
log(count)

element('div.senior-cards').innerHTML = ''

while (count != senior_numbers) {
	senior_card = document.createElement('div')
	/*Changes the chapter to volume if comic or episode if series*/
	if (senior_data.seniors[count].type == 'Novel'){var chapter = 'Chapter: '}
	if (senior_data.seniors[count].type == 'Comic'){var chapter = 'Volume: '}
	if (senior_data.seniors[count].type == 'Series'){var chapter = 'Episode: '}

	/*Appends the html for the novel cards*/
	senior_card.innerHTML = '<div class="card ' + count + '"><p class="card-title">'+senior_data.seniors[count].title+'</p>' + '<center><p class="card-type">' + senior_data.seniors[count].type + '</p></center>' + '<div class="senior-info"><p><span class="faint">' + chapter +'</span>' + senior_data.seniors[count].chapter + '</p>' + '<p><span class="faint">Status: </span>' + senior_data.seniors[count].status + '</p>' + '</div></div><br>'
	element(`div.senior-cards`).appendChild(senior_card)
	count++
}
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