"use client";

import Image from "next/image";
import styles from "@/app/page.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {

	const router = useRouter();

	const handleClick = () => {
		router.push("/dashboard");
	}

	return (
		<div className={styles.welcome}>
			<div className={styles.home}>
				<div className={styles.contentsGrid}>
					<div className={styles.contentsFlex}>
						<h1 className={styles.h1content}>Welcome to the Todo List</h1>
						<button onClick={handleClick} className={styles.dashboardBtn}>Go to Dashboard</button>
					</div>
				</div>
				<div className={styles.screenshot}></div>
			</div>
		</div>
	);
}
