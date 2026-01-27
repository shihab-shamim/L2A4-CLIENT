import React from 'react';

const dashboardLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            This is Dashboard layout 
            
            {children}
        </div>
    );
};

export default dashboardLayout;