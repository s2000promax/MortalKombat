 //Get random attack from remote server
 export const getFight = async (hit, defence) => {
  const data = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify({
      hit,
      defence
    })
  }).then(res => res.json());  ;
  
  return data;
  }

//Get random enemy from remote server
export const getRandomPlayer = async () => {
  const data = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
  .then(res => res.json());  

return {id: 2, name: data.name, img: data.img, hp: 100};
}