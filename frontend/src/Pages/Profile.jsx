import Navbar from '../Components/Navbar';
import ProfileForm from '../Components/ProfileForm';

function Profile() {
  return (
    <main className="app-shell">
      <div className="page-shell">
        <Navbar />

        <div className="dashboard-panel">
          <div className="card-header">
            <div>
              <h2>Profile Settings</h2>
              <p>Manage your personal information securely.</p>
            </div>
          </div>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}

export default Profile;
