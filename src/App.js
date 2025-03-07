import './App.css';
import StarfieldBackground from './components/StarfieldBackground';
// import SkyBackground from './components/SkyBackground';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <div>
      {<StarfieldBackground />}
      {/* <SkyBackground /> */}
      <NavBar />
      <div className='content-wrapper'>
        <Home />
        <About />
        <Contact />
        <section id="torus-knot">
        </section>
      </div>
    </div>
  );
};

export default App;
