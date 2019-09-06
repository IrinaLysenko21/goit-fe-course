import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const successMsg = msg => {
  notyf.success(msg);
};

export default successMsg;

