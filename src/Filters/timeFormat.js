export default function (timestamp) {
  const time = new Date(timestamp * 1000);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDay();
  return `${year}-${month}-${day}`;
}
