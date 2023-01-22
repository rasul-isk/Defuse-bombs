// export default async function Scoreboard() {
//   //ZREVRANGE return scoreboard
//   let API_key = process.env.REACT_APP_API_KEY;
//   let data = fetch('https://hip-gnu-30050.upstash.io/set/foo/bar', {
//     headers: {
//       Authorization: API_key,
//     },
//   }).then((response) => response.json());
//   console.log('data - ' + data);
//   return data;
//   // fetch('https://hip-gnu-30050.upstash.io/set/foo/bar', {
//   //   headers: {
//   //     Authorization: 'Bearer AXViACQgZmJjNGI3ZmItMmY1YS00NDgwLWFmODItM2Y0NDFjMjBhNDc3YzI0YzQyMjVhZTVjNDM5Yjg0ZmUxNmQ5YzI5ZTZiYzg=',
//   //   },
//   // })
//   //   .then((response) => response.json())
//   //   .then((data) => console.log(data));
// }

export default function DummyData() {
  let dummyData = {
    'Rasul Isk': '05:05',
    Dicaprio: '13:12',
    Davinci: '07:34',
    'Margo Robbi': '24:11',
    'Will Smith': '13:59',
    'Jason Statham': '01:32',
  };

  return dummyData;
}
