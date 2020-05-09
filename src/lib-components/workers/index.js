import PromiseWorker from "./promiseWorker.js";
import OperationsWorker from "worker-loader!./operations.worker.js";
//}
const worker = new OperationsWorker();
const promiseWorker = PromiseWorker(worker);

const send = (type = "message", data) =>
	promiseWorker.postMessage({
		type,
		data
	});

export default {
	send
};
