import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

const promiseWorker = new PromiseWorker(new Worker())

const send = (type = 'message', data) => promiseWorker.postMessage({
  type,
  data
})

export default {
  send
}