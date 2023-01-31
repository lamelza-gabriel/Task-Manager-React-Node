import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../contexts/UserContext";
import axios from "axios";
import Task from "./Task";
import "../styles/App.scss";
import Navbar from "./Navbar";

const Form = () => {
	const navigate = useNavigate();

	//reset form || initial state
	const { userState } = useContext(userContext);

	const intialState = {
		task: "",
		completed: "",
	};

	//STATES
	//state para el formulario
	const [form, setForm] = useState(intialState);
	//test state for jsonplaceholder
	const [data, setData] = useState(false);

	//estado para controlar update o create

	//state para editar o crear
	const [operation, setOperation] = useState(false);
	//state que tendra el id
	const [temporalId, setTemporalId] = useState();

	//actualizar state del form
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	//traer datos de la db
	const getData = () => {
		axios.get("/api/tasks").then((response) => {
			const data = response.data.tasks;
			const test = data.filter((el) => el.createdBy === userState.id);
			setData(test);
			if (data.length === 0) {
				setData(false);
			}
		});
	};

	//agregar tarea y editar segun state update
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			axios
				.post("/api/tasks", {
					task: form.task,
					completed: form.completed,
					createdBy: userState.id,
				})
				.then(setForm(intialState));
		} catch (error) {
			console.log(error);
		}
		getData();
	};

	//editar tarea, de componente Task

	const editTask = (e) => {
		try {
			axios.patch(`/api/tasks/${temporalId}`, {
				task: form.task,
				completed: form.completed,
			});
			setForm({
				task: "",
				completed: "",
			});
			setOperation(false);
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	//useEffect para redirigir en caso de no user logeado

	useEffect(() => {
		if (userState.id === "") {
			navigate("/");
		}
	}, [userState.id, navigate]);

	//useEffect para cargar las tareas
	useEffect(() => {
		axios.get("/api/tasks").then((response) => {
			const data = response.data.tasks;
			const test = data.filter((el) => el.createdBy === userState.id);
			setData(test);
			if (data.length === 0) {
				setData(false);
			}
		});
	}, [userState.id]);

	return (
		<>
			<div className='form-html'>
				<Navbar />

				<h1 className='form-title'>Task Manager</h1>

				<form className='form-1' onSubmit={handleSubmit}>
					<label className='label-1' htmlFor='task'>
						Task
					</label>
					<input
						className='input-1'
						type='text'
						name='task'
						id='task'
						required
						value={form.task}
						onChange={handleChange}
					/>
					<label className='label-1' htmlFor='completed'>
						Description
					</label>
					<input
						className='input-1'
						type='text'
						name='completed'
						id='completed'
						value={form.completed}
						onChange={handleChange}
					/>

					{operation ? (
						<button
							className='btn-1'
							type='submit'
							onClick={editTask}
							value='Update Task'
						>
							Edit Task
						</button>
					) : (
						<input className='task-btn' type='submit' value='Add Task' />
					)}
				</form>
				<h2 className='h2-1'>Tasks</h2>
				<div className='tasks-container'>
					{data ? (
						data.map((el) => {
							return (
								<Task
									key={el._id}
									texto={el.task}
									estado={el.completed}
									id={el._id}
									getData={getData}
									form={form}
									setForm={setForm}
									state={el.state}
									setTemporalId={setTemporalId}
									setOperation={setOperation}
								/>
							);
						})
					) : (
						<p>No hay tareas, por favor ingrese una</p>
					)}
				</div>
			</div>
			<div className='space'></div>
			<footer className='footer-form'>
				©2023 Gabriel Lamelza. All rights reserved
			</footer>
		</>
	);
};

export default Form;
