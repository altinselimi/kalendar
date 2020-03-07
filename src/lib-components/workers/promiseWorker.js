export default function(worker) {
  let messageIds = 0;
  let callbacks = {};
  worker.addEventListener("message", e => onMessage(e));

  const onMessage = e => {
    const message = e.data;
    if (!Array.isArray(message) || message.length < 2) {
      return;
    }

    const messageId = message[0];
    const error = message[1];
    const result = message[2];

    const callback = callbacks[messageId];

    if (!callback) return;

    delete callbacks[messageId];
    callback(error, result);
  };

  return {
    initiateWorker(_worker) {},
    postMessage(userMessage) {
      const messageId = messageIds++;

      const messageToSend = [messageId, userMessage];
      return new Promise((resolve, reject) => {
        callbacks[messageId] = (error, result) => {
          if (error) return reject(new Error(error.message));
          resolve(result);
        };

        if (typeof worker.controller !== "undefined") {
          // service worker, use MessageChannels because e.source is broken in Chrome < 51:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=543198
          const channel = new MessageChannel();
          channel.port1.onmessage = function(e) {
            onMessage(e);
          };
          worker.controller.postMessage(messageToSend, [channel.port2]);
        } else {
          // web worker
          worker.postMessage(messageToSend);
        }
      });
    }
  };
}
