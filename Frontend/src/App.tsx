import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./components/Layout";
import NotesPage from './pages/NotesPage';
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState  } from "react";

const App = () => {
 const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
     if (!isAuthenticated) {
        return;
      }

      try {
        // Get the access token
        const accessToken = await getAccessTokenSilently({});

        console.log("Access Token:", accessToken);

        
      } catch (e) {
        console.error("Error fetching notes:", e);
        setError("Could not fetch notes. Please try again.");
      }
    };

    fetchNotes();
  }, [isAuthenticated, getAccessTokenSilently]);
 return(
    <>
     <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
    </>
  )

};

export default App;



// {
//   isAuthenticated && (
//     <div>
//       <img src={user?.picture} alt={user?.name} />
//       <h2>{user?.name}</h2>
//       <p>{user?.email}</p>
//     </div>
//   );
// }
