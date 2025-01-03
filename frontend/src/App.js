import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/contexts/ProtectedRoute';
import HomePage from './components/homepage';
import SnippetsPage from './components/publicSnippets/SnippetsPage';
import ViewMore from './components/publicSnippets/ViewMore';
import CreateSnippetForm from './components/snippetmanager/CreateSnippetForm';
import LoginForm from './components/login'
import SignupForm from './components/signup';
import SnippetManager from './components/masscode/welcome';
import AppBar from './components/AppBar';
import Profile from './components/Profile';

import Projects from './components/Projects';
import Notifications from './components/Notifications';
import UserWelcome from './components/userwelcome';
import MainApp from './components/notify';




import Community from './components/community/community';
import JoinCommunity from './components/community/joincommunity';
import CreateNewCommunity from './components/community/createnewcommunity';
import AdminPanel from './components/community/adminpanel/AdminPanel';
import MemberPanel from './components/community/memberpanel/MemberPanel';
import AdminDashboard from './components/community/adminpanel/AdminDashboard';
import CommunityDashboard from './components/community/CommunityDashboard';
import CommunitySnippets from './components/community/CommunitySnippets';
import CommunityMembers from './components/community/CommunityMembers';
import CommunityMessages from './components/community/CommunityMessages';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          {/* <ProtectedRoute> */}
            <Route path="/AppBar" element={ <ProtectedRoute><AppBar /></ProtectedRoute> }/>
            <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* <Route path="/Community" element={<ProtectedRoute><Community /></ProtectedRoute>} /> */}
            <Route path="/communitypage" element={<ProtectedRoute><Community/></ProtectedRoute>} />
            <Route path="/Projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/Notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/UserWelcome" element={<ProtectedRoute><UserWelcome /></ProtectedRoute>} />
            <Route path="/SnippetManager" element={<ProtectedRoute><SnippetManager /></ProtectedRoute>} />
            <Route path="/SnippetsPage" element={<ProtectedRoute><SnippetsPage /></ProtectedRoute>} />
            <Route path="/SnippetsPage/:snippetId" element={<ViewMore />} />
            <Route path="/CreateSnippetForm" element={<ProtectedRoute><CreateSnippetForm /></ProtectedRoute>} />
            <Route path="/notify" element={<ProtectedRoute><MainApp /></ProtectedRoute>} />


            <Route path="/joincommunity" element={<ProtectedRoute><JoinCommunity /></ProtectedRoute>} />
            <Route path="/createcommunity" element={<ProtectedRoute><CreateNewCommunity /></ProtectedRoute>} />
            <Route path="/adminpanel/:communityId" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>}/>
            <Route path="/memberpanel/:communityId" element={<ProtectedRoute><MemberPanel/></ProtectedRoute>}/>
            <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>


            <Route path="/memberpanel/:communityId/dashboard" element={<ProtectedRoute><CommunityDashboard/></ProtectedRoute>}/>
            <Route path="/memberpanel/:communityId/snippets" element={<ProtectedRoute><CommunitySnippets/></ProtectedRoute>}/>
            <Route path="/memberpanel/:communityId/members" element={<ProtectedRoute><CommunityMembers/></ProtectedRoute>}/>
            <Route path="/memberpanel/:communityId/messages" element={<ProtectedRoute><CommunityMessages/></ProtectedRoute>}/>
            
          {/* </ProtectedRoute> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
