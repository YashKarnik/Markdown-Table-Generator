function getString(arr, padding = 2, isString = false) {
	// console.log(arr);
	function max(arr) {
		let m = arr[0][0].length;
		arr.forEach(element => {
			element.forEach(e => {
				if (m < e.length) m = e.length;
			});
		});
		return m;
	}

	let NLdelimiter = isString ? '\n' : '<br/>';
	let SPdelimiter = isString ? ' ' : '&nbsp;';
	let m = max(arr) + padding * 2;
	// console.log(m);
	// str = '';
	let str = '|';
	// str = '+' + ('-'.repeat(m) + '+').repeat(arr[0].length) + NLdelimiter;
	//Print Header
	arr[0].forEach(e => (str += e + SPdelimiter.repeat(m - e.length) + '|'));
	str += NLdelimiter + '|';
	arr[0].forEach(e => (str += '-'.repeat(m) + '|'));
	str += NLdelimiter;
	arr = arr.filter((e, i) => i !== 0);
	arr.forEach(element => {
		str += '|';
		element.forEach(e => {
			str += e + SPdelimiter.repeat(m - e.length) + '|';
		});
		str += NLdelimiter;
	});
	return str;
}
let x = [
	['1', '2', '3', '4', '5', '6', '8'],
	['1', '2', '3', '4', '5', '6', '8'],
	['1', '2', '3', '4', '5', '6', '8'],
	['1', '2', '3', '4', '5', '6', '8'],
];
console.log(getString(x, 2, true));
