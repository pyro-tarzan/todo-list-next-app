"use client";
import SideNavigation from "../ui/dashboard/navigation";
import styles from "@/app/dashboard/dashboardLayout.module.scss";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <div className="dashboard">
            <div className={styles.dashboardLayout}>
                <div className={styles.navigationPadding}>
                    <SideNavigation />
                </div>

                <div className={styles.dashboardContent}>
                    {children}
                </div>
            </div>                 
        </div>
    )
}