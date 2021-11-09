import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { IoSearch, IoLogoTwitter, IoPodium, IoLocationSharp, IoArrowRedoOutline, IoMoonOutline, IoPlanet } from "react-icons/io5";


function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState('iam-ignite');
  const [mode, setMode] = useState(false)


  useEffect(() => {
    const getGitUser = async () => {
      const res = await axios.get(`https://api.github.com/users/${user}`);
      setData(res.data)
    }
    getGitUser();
  }, [user])


  return (
    <div className="App" style={{ backgroundColor: `${mode ? '#141C2F ' : ' #F2F3FF'}` }} >
      <div className="main-container" style={{ color: `${mode ? 'white' : 'black'}` }}>
        <div className="logo">
          <h2>Dev Finder</h2><button onClick={() => setMode(!mode)} className="btn-mode"
            style={{ color: `${mode ? 'white' : 'black'}` }}>
            {mode ? <h2><IoMoonOutline /> Light</h2> : <h2><IoPlanet /> Dark</h2>}</button>
        </div>
        <div className="content_box search-box" style={{
          backgroundColor: `${mode ? '#1f2a48 ' : ' #FEFEFE'}`,
          boxShadow: `${mode ? '' : " 0 3px 6px 0px #8a95d9e0"}`
        }}>
          <form >
            <IoSearch className='search-icon' />
            <input
              type="text"
              value={user}
              placeholder="Enter your github username . . "
              onChange={(e) => setUser(e.target.value)}
              style={{ backgroundColor: `${mode ? '#1f2a48 ' : ' #FEFEFE'}`,
              color: `${mode ? '#fff' : ' #111'}`
               }}/>
            <button className="btn" type="submit">Search</button>
          </form>
        </div>
        <div className="content_box profile-box " style={{
          backgroundColor: `${mode ? '#1f2a48 ' : ' #FEFEFE'}`,
          boxShadow: `${mode ? '' : " 0 3px 6px 0px #8a95d9e0"}`
        }}>
          <div className="details_box">
            <img src={data.avatar_url} alt="avatar" />
          </div>
          <div className="details_box">
            <div className="name_box">
              <div className="text"><h1>{data.name}</h1>
                <a href={`https://github.com/${user}`}>
                  <h4>{data.login}</h4></a></div>
              <div className="text ">
              </div>
            </div>
            <h3>{data.bio == null ? <span>This profile has no bio</span> : <span>{data.bio}</span>}</h3>
            <div className="status_box" style={{
              backgroundColor: `${mode ? '#141c2f ' : ' #F5F8FF'}`,
              color: `${mode ? '#fff' : ' #4f535e'}` }}>
              <div className="status_row">
                <h5>Repos</h5>
                <h2>{data.public_repos}</h2>
              </div>
              <div className="status_row">
                <h5>Followers</h5>
                <h2>{data.followers}</h2>
              </div>
              <div className="status_row">
                <h5>Following</h5>
                <h2>{data.following}</h2>
              </div>
            </div>

            <div className="media mp">
              <b style={{   color: `${mode ? '#fff' : ' #4E6995'}` }}><IoLocationSharp className="icons" /></b>
              {data.location == null ? <span>Not Available</span> : <span>{data.location}</span>}
              <b style={{color: `${mode ? '#fff' : ' #4E6995'}`}}><IoLogoTwitter className="icons" /> </b>
              {data.twitter_username == null ? <span>Not Available</span> : <span>{data.twitter_username}</span>}
            </div>
            <div className="media">
              <b style={{ color: `${mode ? '#fff' : ' #4E6995'}`}}>
                <IoArrowRedoOutline className="icons" /></b>
              {data.blog == null || data.blog.length == 0 ?
              <span >Not Available</span> : <span>{data.blog}</span>}
              <b style={{color: `${mode ? '#fff' : ' #4E6995'}`}}>
              <IoPodium className="icons" /></b>
              {data.company == null ? <span>Not Available</span> : <span>{data.company}</span>}


            </div>
          </div>
        </div>

      </div>


    </div>
  );
}

export default App;
