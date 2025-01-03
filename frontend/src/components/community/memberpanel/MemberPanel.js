import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Outlet } from 'react-router-dom';
import CommunityService from '../CommunityService';
import MemberSidebar from './MemberSidebar';
import './memberpanel.css';
 

const MemberPanel = () => {
  const { communityId } = useParams();
  const location = useLocation();
  const [community, setCommunity] = useState(location.state?.community || null);

  useEffect(() => {
    if (!community) {
      const fetchCommunity = async () => {
        try {
          const response = await CommunityService.getCommunityById(communityId);
          setCommunity(response);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchCommunity();
    }
  }, [community, communityId]);

  return (
    <>
    
    <div className="member-panel">
      {community ? (
        <>
          <MemberSidebar />
          <main className="main-content">
            <Outlet />
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default MemberPanel;
