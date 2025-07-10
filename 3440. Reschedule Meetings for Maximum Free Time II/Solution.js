/**
 * @param {number} eventTime
 * @param {number[]} st
 * @param {number[]} et
 * @return {number}
 */
function maxFreeTime(eventTime, st, et) {
  const n = st.length;
  const pre = new Array(n + 1).fill(0);
  const suf = new Array(n + 1).fill(0);

  let end = 0;
  let ans = st[0];

  // Tính khoảng trống trước từng cuộc họp và lưu vào pre[]
  for (let i = 0; i < n; i++) {
    const gap = st[i] - end;
    ans = Math.max(ans, gap);
    end = et[i];
    pre[i + 1] = Math.max(pre[i], gap);
  }

  // Xét khoảng trống sau cuộc họp cuối cùng đến eventTime
  ans = Math.max(ans, eventTime - et[n - 1]);

  let start = eventTime;

  // Tính khoảng trống sau từng cuộc họp và lưu vào suf[]
  for (let i = n - 1; i >= 0; i--) {
    const gap = start - et[i];
    start = st[i];
    suf[i] = Math.max(suf[i + 1], gap);
  }

  // Xem xét di chuyển từng cuộc họp
  for (let i = 0; i < n; i++) {
    const prevEnd = (i === 0 ? 0 : et[i - 1]);
    const nextStart = (i === n - 1 ? eventTime : st[i + 1]);

    const gap = nextStart - prevEnd;
    const len = et[i] - st[i];

    if (pre[i] >= len || suf[i + 1] >= len) {
      ans = Math.max(ans, gap);
    } else {
      ans = Math.max(ans, gap - len);
    }
  }

  return ans;
}
