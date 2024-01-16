import { Profile } from "./profile";
import { Roboto } from "next/font/google";
import { useState } from "react";
import FactModal from "./factModal";
import Link from "next/link";
import CreateFact from "./factModal";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
export default function Navbar({}) {
  const [showProfile, setShowProfile] = useState(false);

  const showSidebar = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbarDiv}>
        <img src="/1730974_gift_box_christmas_holiday_present_icon (1).png" />

        <button style={styles.menu} className={roboto.className}>
          <Link href="/">
            {" "}
            <p>Facts</p>
          </Link>
        </button>
        <button style={styles.menu} className={roboto.className}>
          <Link href="/myfact/myfacts">
            {" "}
            <p>My Facts</p>
          </Link>
        </button>

        <CreateFact />

        <button
          style={styles.menu}
          className={roboto.className}
          onClick={showSidebar}
        >
          <p>Profile</p>
        </button>
      </div>
      {showProfile && <Profile />}
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "80px",
    border: "1px solid black",
  },
  navbarDiv: {
    width: "100vw",
    height: "80px",
    backgroundColor: "#212121",
    border: "1px solid #303030",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "100px",
    paddingRight: "100px",
  },
  body: {
    width: "100vw",
    height: "60px",
    backgroundColor: "#212121",
    border: "1px solid #303030",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "100px",
    paddingRight: "100px",
  },
  menu: {
    color: "white",
    border: "1px solid #AAAAAA",
    borderRadius: "32px",
    width: "120px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303030",
  },
};
