let times = null;
function timedCount(now) {
  // now += 1000
  now = now == 0 ? 0 : now - 1;
  postMessage(now);
  clearTimeout(times);
  times = setTimeout("timedCount(" + now + ")", 1000);
}

onmessage = function(event) {
  timedCount(event.data);
};
