import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import useSound from 'use-sound';
import Pottu_thakku from "./songs/Pottu-Thakku.mp3";

function App() {
  
  const [endPoint,setPoint]=useState('')
  const [container,setContainer]=useState([])
  const [finalPoint,setFinalPoint]=useState('');

  useEffect(()=>{
    fetchme()
  },[finalPoint])


  const  fetchme = async ()=> { 

  fetch(`https://spotify23.p.rapidapi.com/search/?q=+${endPoint}`,{
    method: await 'GET',
    headers: {
      'X-RapidAPI-Key': '79b226d5c5msh58936cc3837787ap1e2f40jsn18453c50cd1b',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
})

.then ( response => {
  return response.json();
})	

.then(data =>{
  console.log(data.albums)
  setContainer(data.albums.items)
})

.catch (error => {
	console.error(error);
})
}

function onchangeHandler(e){
  setPoint(e.target.value)
}

const submitHandler = e =>{
  e.preventDefault();
  setFinalPoint(endPoint);
}
const [playSong] = useSound(Pottu_thakku);

// const playSong=()=>{
//   const [playSong] = useSound("https://www.jiosaavn.com/song/one-way-ticket/Cl9daz4EQ2I");
//    console.log("playSound")



// }
// const useAudio = url => {
  
//   const [audio] = useState(new Audio());
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

// const Player = ({ url }) => {
//   const [playing, toggle] = useAudio(url);
// }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <center><h1> SEARCH THE songs YOU WANT</h1></center>
        <center>  <input type="text" className='inputField'  value={endPoint} onChange={onchangeHandler}/>
      <button type='submit' className='btn btn-primary'>submit</button>
      </center>
      
      <div className='car'>{container.map((item,index)=>{
        return (<div key={index} className='card'  style={{width: "18rem"} }>
          <p>{item.data.name}</p>
          <div>
          {/* <button onClick={playSong}>play song</button> */}
          </div>    
          {/* <img src={item.i.imageUrl} alt="" width={250} height={300} />
          <p>Actors name:{item.s}</p>
           */}
          </div>
       
 )
      })}
      </div>
</form>
<button onClick={playSong}>click me</button>
    </div>
  )
}

export default App;