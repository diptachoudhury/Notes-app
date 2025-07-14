// src/App.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './components/Auth/LoginButton';
import LogoutButton from './components/Auth/LogoutButton';
import Profile from './components/Profile/Profile';
import TodoList from './components/Todo/TodoList';
import './App.css';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app">
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
  <h1 className="text-xl font-semibold">Note App</h1>
  <div className="flex items-center gap-4">
    {isAuthenticated && (
      <span className="hidden sm:inline">
        {user?.name || user?.email}
      </span>
    )}
    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  </div>
</header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <TodoList /> : (
                <div className="auth-prompt">
                  <h2>Please log in to manage your todos</h2>
                  <LoginButton />
                </div>
              )
            } />
            <Route path="/profile" element={
              isAuthenticated ? <Profile /> : (
                <div className="auth-prompt">
                  <h2>Please log in to view your profile</h2>
                  <LoginButton />
                </div>
              )
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

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
