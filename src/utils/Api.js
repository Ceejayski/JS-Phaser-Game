// { "result": "Game with ID: v42vFPBrTwKTd2VRvG26 added."}
export const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/v42vFPBrTwKTd2VRvG26/scores';

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

export const getScores = (url) => fetch(url)
  .then(handleErrors)
  .then((response) => response.json())
  .then((data) => {
    if (data.result.length === 0) {
      throw new Error();
    }
    return data.result.sort((m, n) => n.score - m.score);
  });

export const postScores = (user, score, url) => fetch(url,
  {
    method: 'POST',
    mode: 'cors',
    headers:
      { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  })
  .then(handleErrors);

function ranker(arr) {
  const array = arr.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
  const rankArr = [{ rank: 1, user: array[0] }];
  let count = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i].score === array[i - 1].score) {
      const rank = i - count;
      rankArr[i] = { rank, user: array[i] };
      count += 1;
    } else {
      count = 0;
      rankArr[i] = { rank: i + 1, user: array[i] };
    }
  }
  return rankArr;
}
