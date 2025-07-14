const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
      <div className="bg-white p-6 rounded-md shadow">
        <div className="space-y-4">
          <div>
            <h2 className="font-medium text-gray-700">Name</h2>
            <p className="mt-1">John Doe</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-700">Email</h2>
            <p className="mt-1">john@example.com</p>
          </div>
          <div>
            <h2 className="font-medium text-gray-700">About</h2>
            <p className="mt-1">
              This is a simple notes app built with React and TypeScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;