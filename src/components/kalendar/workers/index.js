// main.js
var PromiseWorker = require('promise-worker');
var worker = new Worker('./operations.worker.js', { type: 'module' });
const promiseWorker = new PromiseWorker(worker);

const send = (type = 'message', data) => promiseWorker.postMessage({
  type,
  data
})

export default {
  send
}