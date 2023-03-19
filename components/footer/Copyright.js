/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import styles from "./styles.module.scss";
import { IoLocationSharp } from "react-icons/io5";

export const Copyright = ({country }) => {
  return (
    <div className={styles.footer__copyright}>
    <section>©2022 LOKALIZE All Rights Resereved.</section>
    <section>Created By : <Link href="https://github.com/sahrilputra"> Sahril Putra </Link></section>
    <section>
      <ul>
        {data.map((link) => (
          <li>
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
        <li>
          <a>
            <IoLocationSharp />
          </a>
        </li>
      </ul>
    </section>
  </div>
  )
}
const data = [
    {
      name: "Privacy Center",
      link: "",
    },
    {
      name: "Privacy & Cookie Policy",
      link: "",
    },
    {
      name: "Manage Cookies",
      link: "",
    },
    {
      name: "Terms & Conditions",
      link: "",
    },
    {
      name: "Copyright Notice",
      link: "",
    },
  ];
