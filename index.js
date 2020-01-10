// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

var obja = [
  {USER:"bob",	SCORE:2000,	TIME:32,	AGE:16,	COUNTRY:"US"},
  {USER:"jane",	SCORE:4000,	TIME:35,	AGE:16,	COUNTRY:"DE"},
  {USER:"tim",	SCORE:1000,	TIME:30,	AGE:17,	COUNTRY:"UK"},
  {USER:"mary",	SCORE:1500,	TIME:31,	AGE:19,	COUNTRY:"PL"},
  {USER:"joe",	SCORE:2500,	TIME:33,	AGE:18,	COUNTRY:"US"},
  {USER:"sally",	SCORE:2000,	TIME:30,	AGE:16,	COUNTRY:"CA"},
  {USER:"yuri",	SCORE:3000,	TIME:34,	AGE:19,	COUNTRY:"RU"},
  {USER:"anita",	SCORE:2500,	TIME:32,	AGE:17,	COUNTRY:"LV"},
  {USER:"mark",	SCORE:2000,	TIME:30,	AGE:18,	COUNTRY:"DE"},
  {USER:"amy",	SCORE:1500,	TIME:29,	AGE:19,	COUNTRY:"UK"}
];

var sorto = {
  SCORE:"desc",TIME:"asc", AGE:"asc"
}; 

Array.prototype.keySort = function(keys) {

	keys = keys || {};
  
	var obLen = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key))
				size++;
		}
		return size;
	};

	var obIx = function(obj, ix) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (size == ix)
					return key;
				size++;
			}
		}
		return false;
	};

	var keySort = function(a, b, d) {
		d = d !== null ? d : 1;
		if (a == b)
			return 0;
		return a > b ? 1 * d : -1 * d;
	};

	var KL = obLen(keys);

	if (!KL) return this.sort(keySort);

	for ( var k in keys) {
		// asc unless desc or skip
		keys[k] = 
				keys[k] == 'desc' || keys[k] == -1  ? -1 
              : (keys[k] == 'skip' || keys[k] === 0 ? 0 
              : 1);
	}

	this.sort(function(a, b) {
		var sorted = 0, ix = 0;

		while (sorted === 0 && ix < KL) {
			var k = obIx(keys, ix);
			if (k) {
				var dir = keys[k];
				sorted = keySort(a[k], b[k], dir);
				ix++;
			}
		}
		return sorted;
	});
	return this;
};

var print = function(obj, delp, delo, ind){
    delp = delp!=null ? delp : "\t";
    delo = delo!=null ? delo : "\n"; // object delimeter
    ind = ind!=null ? ind : " "; // indent; ind+ind geometric addition not great for deep objects
    var str='';
  
    for(var prop in obj){
        if(typeof obj[prop] == 'string' || typeof obj[prop] == 'number'){
          var q = typeof obj[prop] == 'string' ? "" : ""; // make this "'" to quote strings
          str += ind + prop + ': ' + q + obj[prop] + q + '; ' + delp;
        }else{
          str += ind + prop + ': {'+ delp + print(obj[prop],delp,delo,ind+ind) + ind + '}' + delo;
        }
    }
    return str;
};

console.log(print(obja));
document.write("<pre>BEFORE:\n"+print(obja)+"</pre>");

document.write("<pre>SORTO:\n"+print(sorto)+"</pre>");

obja.keySort(sorto);

console.log(print(obja));
document.write("<pre>AFTER:\n"+print(obja)+"</pre>");


