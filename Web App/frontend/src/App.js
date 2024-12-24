// This is the main file of the frontend. It is the first file that is executed when the frontend is started. It contains the main component of the frontend, which is the SignUp component.
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
// import Welcome from './components/Welcome';


function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Login />
      {/* <Welcome/> */}
    </>
  );
}

export default App;
