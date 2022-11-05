import { useState, ChangeEvent, useId, FormEvent } from "react";
import { PlusCircle } from "phosphor-react";

import { Task } from "./components/Task";

import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import clipBoard from "./assets/Clipboard.svg";

interface Task {
  id: Date;
  title: string;
  checked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [textInput, setTextInput] = useState("");

  const buttonEnabled = textInput.length === 0;
  const listLength = tasks.length;
  const initialValue = 0;
  const listCheckedList = tasks.reduce(
    (acc, cur) => (cur.checked === true ? acc + 1 : acc),
    initialValue
  );

  function textInputOnChange(event: ChangeEvent<HTMLInputElement>) {
    setTextInput(event.target.value);
  }

  function createrNewTask(event: FormEvent) {
    event?.preventDefault();
    const id = new Date();
    const newTask: Task = {
      id,
      title: textInput,
      checked: false,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
  }

  function checkTask(id: Date) {
    const listTasksWhitOneTaskChecked = tasks.map((task: Task) => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(listTasksWhitOneTaskChecked);
  }

  function deleteTask(id: Date) {
    const listWithoutOneTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(listWithoutOneTask);
  }

  function renderTasks() {
    if (tasks.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <img src={clipBoard} alt="" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      );
    }
    return tasks.map((task) => (
      <Task task={task} onCheckTask={checkTask} onDeleteTask={deleteTask} />
    ));
  }

  return (
    <main>
      <header className={styles.header}>
        <img src={logo} alt="Logo" />
      </header>
      <section className={styles.container}>
        <form onSubmit={createrNewTask} className={styles.form} action="">
          <input
            className={styles.input}
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={textInput}
            onChange={textInputOnChange}
          />
          <button type="submit" disabled={buttonEnabled}>
            <p>Criar</p>
            <PlusCircle size={16} />
          </button>
        </form>
        <section className={styles.listContainer}>
          <div className={styles.infosContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.infoText}>Tarefas criadas</p>
              <span className={styles.infoNumber}>{listLength}</span>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoText}>Concluídas</p>
              <span className={styles.infoNumber}>
                {`${listCheckedList} de ${listLength}`}
              </span>
            </div>
          </div>
          <ul>{renderTasks()}</ul>
        </section>
      </section>
    </main>
  );
}

export default App;
