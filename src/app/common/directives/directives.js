//FORM
import eInput from './input/eInputDirective';
import formInput from './formInput/formInputDirective';
import formSelect from './formSelect/formSelectDirective';

export default angular
	.module('app.directives', [eInput, formInput, formSelect])
	.name;