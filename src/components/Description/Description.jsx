import style from "./Description.module.css";

export default function Description({ children }) {
  return <p className={style.description}>{children}</p>;
}
