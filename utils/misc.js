const doubleTap = (callback) => {
  const now = Date.now();
  const DOUBLE_PRESS_DELAY = 300;
  if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
    return callback()
  } else {
    this.lastTap = now;
  }
}

export {
  doubleTap
}
