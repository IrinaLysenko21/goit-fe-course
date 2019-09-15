import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const errorMsg = msg => {
  notyf.error(msg);
};

export default errorMsg;