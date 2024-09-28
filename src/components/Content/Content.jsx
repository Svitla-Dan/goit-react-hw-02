import style from "./Content.module.css";

export default function Content({ children }) {
  return <h1 className={style.content}>{children}</h1>;
}
