import React from "react";
import axios from "axios";

//logos
import squareCheck from "../assets/square-check-regular.svg";
import squareChecked from "../assets/square-regular.svg";
import editTaskLogo from "../assets/pen-to-square-regular.svg";
import deleteTaskLogo from "../assets/delete-left-solid.svg";

const Task = ({
	texto,
	estado,
	id,
	getData,
	setForm,
	state,
	setTemporalId,
	setOperation,
}) => {
	const deleteTask = (e) => {
		try {
			axios.delete(`/api/tasks/${id}`);
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	const changeInput = () => {
		setForm({
			task: texto,
			completed: estado,
		});
		getData();
		setTemporalId(id);
		setOperation(true);
	};

	//cambiar estado de tarea completada
	const changeTaskStatus = (e) => {
		try {
			axios.patch(`/api/tasks/${id}`, {
				state: !state,
			});
			setForm({
				task: "",
				completed: "",
			});
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<article>
			<div className='task-container'>
				<div className='info-container'>
					<p className={state ? "class_1" : "class_2"}>{texto}</p>
					{estado ? (
						<p className={state ? "class_1" : "class_2"}>{estado}</p>
					) : (
						<p className={state ? "class_1" : "class_2"}>
							no description provided
						</p>
					)}
				</div>
				<div className='logos-container'>
					{state ? (
						<img
							onClick={changeTaskStatus}
							className='svg'
							src={squareCheck}
							alt='task incomplete'
						/>
					) : (
						<img
							onClick={changeTaskStatus}
							className='svg'
							src={squareChecked}
							alt='task complete'
						/>
					)}

					<img
						className='svg'
						alt='edit task'
						src={editTaskLogo}
						onClick={changeInput}
					/>

					<img
						className='svg'
						alt='delete task'
						src={deleteTaskLogo}
						onClick={deleteTask}
					/>
				</div>
			</div>
		</article>
	);
};

export default Task;
