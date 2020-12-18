let MDarr = [...Array(2)].map(e => Array(2).fill(''));
document
	.querySelector('.input-group-btn')
	.addEventListener('click', createTableHTML);
let defaultValue = document.querySelector('#default-value');
defaultValue.addEventListener('input', updateArray);
let copyBtn = document.querySelector('#copy-btn');
copyBtn.addEventListener('click', copyToClipboard);

let text = document.querySelector('.output-tables-container').innerText;
function copyToClipboard() {
	navigator.clipboard
		.writeText(text)
		.then(alert('Copied to clipboard'))
		.catch(err => alert('Error', err));
}
getDimentions = (row, col) => {
	return { rows: parseInt(row.value) || 2, cols: parseInt(col.value) || 2 };
};

function createTableHTML(e) {
	let table = document.querySelector('.table');
	// Getimentions
	let { rows, cols } = getDimentions(
		document.querySelector('#dimention-row'),
		document.querySelector('#dimention-col')
	);
	//Set array
	MDarr = [...Array(rows)].map(e => Array(cols).fill(' '));

	//Get Markdown String
	document.querySelector('.output-tables-container').innerHTML = getString(
		MDarr,
		2,
		false
	);
	// Create <input> html elements
	let str = '';
	for (let i = 0; i < rows; i++) {
		str += `<div class="table-row">`;
		for (let j = 0; j < cols; j++) {
			str += `<span><label for="index-${i}-${j}">${i}x${j}</label><input
			type="text"
			value=" "
			id="index-${i}-${j}"
			data-row-number=${i}
			data-col-number=${j}
			class="table-column input-group"
		/></span>`;
		}
		str += '</div>';
	}
	table.innerHTML = str;
	// Add type=input event listeners to each <input tag>
	document
		.querySelectorAll('.table-column')
		.forEach(e => e.addEventListener('input', e => updateArray(e)));
	copyBtn.style.display = 'inline';
	defaultValue.style.display = 'inline';
}

function updateArray(evt, val = '') {
	// console.log(evt);
	if (evt.target.id == 'default-value') {
		MDarr = MDarr.map((element, i) =>
			element.map((e, j) => {
				let temp = document.getElementById(`index-${i}-${j}`);
				// if (temp.value === '') {
				temp.value = evt.target.value;
				return evt.target.value;
				// } else return temp.value;
			})
		);
	} else
		MDarr[evt.target.getAttribute('data-row-number')][
			evt.target.getAttribute('data-col-number')
		] = evt.target.value;
	let s = getString(MDarr, 2, false);
	text = getString(MDarr, 2, true);
	document.querySelector('.output-tables-container').innerHTML = s;
}
