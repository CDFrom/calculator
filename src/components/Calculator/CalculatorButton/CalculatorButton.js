import styles from "./CalculatorButton.module.css";

const CalculatorButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default CalculatorButton;
