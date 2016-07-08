import when from 'when';

export default class WorkerQueue {
  constructor() {
    this.id = 0;
    this.q = [];
    this.running = false;
    this.active = false;
    this.current = null;
    this.previous = null;
  }

  push(cmd, fn) {
    if (typeof fn !== 'function') throw new TypeError('WorkerQueue.push must be passed a function.');

    let defer = when.defer();
    this.q.push({cmd, fn, id: this.id++, defer});
    if (!this.running) {
      this.running = true;
      this.process();
    }
    return defer.promise;
  }

  process() {
    if (!this.active) {
      this.running = false;
      return;
    }
    const item = this.q.shift();
    if (item) {
      this.current = item.cmd;
      item.fn()
      .then(item.defer.resolve)
      .catch(item.defer.reject)
      .finally(() => {
        this.previous = item.cmd;
        this.current = null;
        this.process();
      });
    } else {
      this.running = false;
    }
  }
}
