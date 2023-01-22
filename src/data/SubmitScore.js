
export default async function SubmitScore(name, score) {
  let API_key = process.env.REACT_APP_API_KEY;

  fetch(`https://hip-gnu-30050.upstash.io/set/${name}/${score}`, {
    headers: {
      Authorization: API_key,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  //   //   let data = fetch('https://hip-gnu-30050.upstash.io/set/foo/bar', {
  //   //     //ZREVRANGE return scoreboard
  //   //     //   ZADD add score
  //   //     headers: {
  //   //       Authorization: API_key,
  //   //     },
  //   //     body: JSON.stringify({ name, score }),
  //   //   }).then((response) => response.json());
  //   //   console.log('data - ' + data);
  //   //   return data;
  //   await Redis.zadd('scores', score, name);

  //   const rank = await Redis.zrevrank('scores', name);

  //  console.log(rank)
  //   // fetch('https://hip-gnu-30050.upstash.io/set/foo/bar', {
  //   //   headers: {
  //   //     Authorization: 'Bearer AXViACQgZmJjNGI3ZmItMmY1YS00NDgwLWFmODItM2Y0NDFjMjBhNDc3YzI0YzQyMjVhZTVjNDM5Yjg0ZmUxNmQ5YzI5ZTZiYzg=',
  //   //   },
  //   // })
  //   //   .then((response) => response.json())
  //   //   .then((data) => console.log(data));
}
