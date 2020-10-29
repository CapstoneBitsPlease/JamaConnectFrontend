import React from 'react';
import axios from 'axios'
import "../styles/Page/SelectItem.sass";
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';
import item from './all_item';
import Select from 'react-select'

//authorization function with bearer
axios.interceptors.request.use(
	config => {
		config.headers.Authorization = `Bearer `;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

const Select_item = () => {

	//token : authorization token 
	//projects : get all project to display in select box
	//types : get all item type to display in select box

	// const [token, setToken] = useState(0);
	const [projects, setproject] = useState([])
	const [types, settypes] = useState([])
	const [list, setlist] = useState([])
	const [types_id, settypes_id] = useState(0)
	const [projects_id, setprojects_id] = useState(0)


	//Tried to use login fucntion to get token and set token for authorization but failed with
	//422 (unbprocessable entities)

	// const log_in = () => {
	// 	axios.post('',
	// 		{
	// 			headers: {
	// 				'Access-Control-Allow-Origin': '*',
	// 				'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
	// 			}
	// 		})
	// 		.then(res => {
	// 			console.log(res)
	// 			setToken(res.data.access_token);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})

	// }


	//Getting all the project with API call
	const get_prog = () => {
		axios.get('http://127.0.0.1:5000/jama/projects',
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
				}
			})
			.then(res => {
				console.log(res);
				setproject(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	//Getting all the item type with API call
	const get_type = () => {
		axios.get('http://127.0.0.1:5000/jama/item_types',
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
				}
			})
			.then(res => {
				console.log(res);
				settypes(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}


	//Get the list of item with specific item type id and specific project id
	const get_list = () => {
		axios.get(`http://127.0.0.1:5000/jama/items_by_type?type_id=${types_id}&project_id=${projects_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
				}
			})
			.then(res => {
				console.log(res);
				setlist(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	//Create an array with label and value for the use of dropdown for select project
	const resultproject = () => {
		const tempArray = [];
		projects.map((element) => {
			tempArray.push({ label: `${element.name}`, value: element.id });
		});
		return tempArray;
	}

	//Create an array with label and value for the use of dropdown for select item type
	const resulttype = () => {
		const tempArray = [];
		types.map((element) => {
			tempArray.push({ label: `${element.name}`, value: element.id });
		});
		return tempArray;
	}

	//simulated with json file
	const temp = () => {
		const tempArray = [];
		list.map((element) => {
			tempArray.push('ID: ' + element.id + ' ' + element.name);
		});
		return tempArray;
	}

	//Useeffect hook function
	useEffect(() => {
		get_prog();
		get_type();
	}, [])


	//Everytime types_id or projects_id change get_list() will be called
	useEffect(() => {
		get_list();
	}, [types_id, projects_id])




	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend className="mx-auto border-separate font-bold italic text-xl">Item Selection</legend>
				<div className="select_item-item">


					<div className="dropdown">
						<Select
							options={resultproject()}
							placeholder="Select project here"
							onChange={e => { setprojects_id(e.value) }}
						/>

						<br />

						<Select
							placeholder="Select item type"
							options={resulttype()}
							onChange={e => { settypes_id(e.value) }}
						/>

					</div>

					<div className="textfield">
						<input
							className="field"
							type="text"
							id='itemid'
							placeholder=" Enter the item ID here"
						/>
					</div>

					<div className="btn">
						<button type='button' className='but'>Link</button>
					</div>

				</div>

				<div className="select_item-list">
					<ul>
						{temp().map(s => (<li>{s}</li>))}
					</ul>
				</div>


			</form>

		</div>
	);
}

export default Select_item;
