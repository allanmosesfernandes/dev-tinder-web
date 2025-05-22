import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((store) => store.user);
    const userName = user?.firstName ?? 'friend';

    return (
      <div className="p-6">
        <h2>Welcome back, {userName} !</h2>
      </div>
    )
}

export default App
