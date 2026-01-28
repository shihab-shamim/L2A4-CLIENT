import DashboardNavbar from '@/componets/dashboard/DashboardNavbar ';
import React from 'react';

const dashboardLayout = ({children}:{children:React.ReactNode}) => {
    return (
         <div className="flex min-h-screen  bg-gray-50">
      {/* Sidebar */}
      <aside className=" border-r bg-white">
        <DashboardNavbar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
    );
};

export default dashboardLayout;