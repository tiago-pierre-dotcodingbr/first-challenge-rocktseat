import styles from "./Task.module.css";
import { Circle, CheckCircle, Trash } from "phosphor-react";

interface Task {
  id: Date;
  title: string;
  checked: boolean;
}

interface TaskProps {
  task: Task;
  onCheckTask: (id: Date) => void;
  onDeleteTask: (id: Date) => void;
}

export function Task(props: TaskProps) {
  const {
    task: { id, title, checked },
    onCheckTask,
    onDeleteTask,
  } = props;

  function handleCheckTask() {
    onCheckTask(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function renderButtonChecked() {
    function renderIconChecked() {
      if (checked) {
        return <CheckCircle size={24} weight="fill" color="#5E60CE" />;
      }

      return <Circle size={24} color="#4EA8DE" />;
    }

    return <button onClick={handleCheckTask}>{renderIconChecked()}</button>;
  }

  return (
    <li className={styles.containerTaks}>
      <div className={styles.infosTasks}>
        {renderButtonChecked()}
        <p>{title}</p>
      </div>
      <button onClick={handleDeleteTask} className={styles.buttonTrash}>
        <Trash size={24} />
      </button>
    </li>
  );
}
