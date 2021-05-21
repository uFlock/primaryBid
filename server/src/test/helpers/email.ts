export const createTooLongEmail = (placeholder: string = 'x') => {

	const x = placeholder;

	return x.repeat(50) + '@' + x.repeat(96) + '.com';
};