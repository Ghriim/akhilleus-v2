import React from 'react';
import AdminSidebar from "./AdminSidebar.tsx";
import AdminFooter from "./AdminFooter.tsx";
import AdminHeader from "./AdminHeader.tsx";

interface AdminLayoutType {
    children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutType> = (props) => {
    return (
        <>
            <AdminSidebar />
            <div id={"main-logged-content"}>
                <AdminHeader />
                <main id={"logged-page-body"}>
                    {props.children}
                </main>
            </div>
            <AdminFooter />
        </>
    );
}

export default AdminLayout;