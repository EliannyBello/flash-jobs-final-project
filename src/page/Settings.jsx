import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Settings.css'
import AccountSettings from '../components/settings/AccountSettings'
import NotificationsSettings from '../components/settings/NotificationsSettings'
import PrivacyAndSecureSettings from '../components/settings/PrivacyAndSecureSettings'
import ProfileSettings from '../components/settings/ProfileSettings'

const Settings = () => {
  const params = useParams();
  const [collapsed, setCollapsed] = useState();

  useEffect(() => {
    const isCollapsed = () => {
      setCollapsed(window.innerWidth < 768)
    }
    window.addEventListener('resize', isCollapsed);
    isCollapsed();
    return () => {
      window.removeEventListener('resize', isCollapsed);
    };
  }, []);

  const SettingTab = () => {
    switch (params.tab) {
      case 'account':
        return <AccountSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'privsec':
        return <PrivacyAndSecureSettings />;
      case 'notification':
        return <NotificationsSettings />;
    }
  };

  useEffect(() => {
    console.log(params.tab)
  }, [params.tab])

  return (
    <div className="container-fluid mt-5 py-4 mb-3">
      <div className="row d-flex justify-content-center">
        <div className='col-12 col-md-3 col-xl-2 d-flex justify-content-between'>
          <div className='container'>
            <div className={'d-flex text-center text-md-start flex-md-column mt-4 justify-content-center ' + (!collapsed && 'sticky-top')}>
              {!collapsed && <h4>Settings</h4>}
              <Link to='/settings/account' className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover mx-1">
                Account
              </Link>
              <Link to='/settings/profile' className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover mx-1">
                Profile
              </Link>
            </div>
          </div>
          {!collapsed && <div className='setting-vertical-rule' />}
        </div>
        <div className="col-12 col-md-9 col-lg-6 col-xl-5 col-xxl-4">
          <SettingTab />
        </div>
      </div>
    </div>
  )
}

export default Settings