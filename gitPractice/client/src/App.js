import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [createMessage, setCreateMessage] = useState("")
  const [currentMessages, setCurrentMessages] = useState([])
  const [setTrigger, setSentTrigger] = useState(true);

  const sendReply = async () => {
    try {
      let res = await axios.post("/api/textall", { message: `${createMessage}` })
      console.log(res.data);
      setCreateMessage("");
      setSentTrigger(!setTrigger);
    }
    catch (error) {
      console.log(error)
    }
  }
  async function getAllData() {
    let currMessages = await axios.get("/api/getdata")
    console.log(currMessages.data);
    setCurrentMessages(currMessages.data.msg);
  }

  useEffect(() => {
    
    getAllData();
  }, [setTrigger])

  const msgVal = createMessage;

  return (
    <>

      <div style={{height: "100vh"}}>
        <h1>Chat App</h1>

        <div className='containerDiv'>

      {/* This is first child of page which is our old texts */}
        <div className='childOne'>
        {
          currentMessages.length !== 0 ? currentMessages.map((ele, idx) => (
            <div key={idx}>{ele.message} </div>
          )) : <div>No Previous Data</div>
        }
        </div>
        

        {/* This is second child of container which are buttons at the bottom */}
        <div className='childTwo'>
        <input type="text" onChange={(eve) => setCreateMessage(eve.target.value)} value={msgVal} />
        <input type="button" onClick={sendReply} value={"Send Message"} />
        </div>

        </div>

      </div>
    </>
  )
}

export default App;
