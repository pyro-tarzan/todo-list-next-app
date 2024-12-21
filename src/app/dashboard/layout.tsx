import SideNavigation from "../ui/dashboard/navigation"
import styles from "./dashboard.module.scss"

export default function DashboardLayout({children}: {children: React.ReactNode}){
    return (
        <div className="dashboard">
            <div className={styles.dashboardLayout}>
                {/* Add sideBar */}
                <SideNavigation />
                <div className={styles.dashboardContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}