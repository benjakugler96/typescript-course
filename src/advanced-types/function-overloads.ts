/*
  This feature allow us to have more than one function signature for same func.
  Multiple way of calling func with different paramenters
*/
type CombinableType = number | string;

function add2(a: number, b: number): number;
function add2(a: number, b: string): string;
function add2(a: string, b: string): string;
function add2(a: string, b: number): string;
function add2(a: CombinableType, b: CombinableType) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}

	return a + b;
}
