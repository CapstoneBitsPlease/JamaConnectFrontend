import React from 'react';
import axios from 'axios'
import "../../styles/pages/SelectItems.sass";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Route, useHistory } from 'react-router-dom';
import makeToast from '../../components/Toaster';


const SelectItem = () => {

	//token : authorization token 
	//projects : get all project to display in select box
	//types : get all item type to display in select box

	const history = useHistory();
	const [projects, setproject] = useState([])
	const [types, settypes] = useState([])
	const [list, setlist] = useState([])
	const [types_id, settypes_id] = useState(0)
	const [projects_id, setprojects_id] = useState(0)
	const [item_id, setitem_id] = useState(0)
	const [jira_id, setjira_id] = useState(0)

	const [testjamaid , settestjamaid ] = useState(0)
	const [testjiraid , settestjiraid ] = useState(0)

	//store information using easy peasy
	const item = useStoreActions(actions => actions.jamaitem.setitemID)
	const item1 = useStoreActions(actions => actions.jamaitem.setjiraID)

	const progname = useStoreActions(actions => actions.jamaitem.setprogname)
	const progID = useStoreActions(actions => actions.jamaitem.setprogID)
	const itemname = useStoreActions(actions => actions.jamaitem.setitemname)
	const itemtype = useStoreActions(actions => actions.jamaitem.setitemtype)
	
	const checkjamalink = useStoreActions(actions => actions.jamaitem.checkjamaIDlink)
	const checkjiralink = useStoreActions(actions => actions.jamaitem.checkjiraIDlink)


	//use information from store
	const token = useStoreState(state => state.accountStore.token)
	// const token = "1"


	//Getting all the project with API call
	const get_prog = () => {
		axios.get('http://127.0.0.1:5000/jama/projects',
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				console.log(res);
				setproject(res.data);
			})
			.catch(err => {
				console.log(err);
				makeToast("error","Having trouble getting project information")
				
			})
			console.log(token);
	}

	//Getting all the item type with API call
	const get_type = () => {
		axios.get('http://127.0.0.1:5000/jama/item_types',
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				console.log(res);
				settypes(res.data);
			})
			.catch(err => {
				console.log(err);
				makeToast("error","Having trouble getting item type information")
			})
	}


	//Get the list of item with specific item type id and specific project id
	const get_list = () => {
		axios.get(`http://127.0.0.1:5000/jama/items_by_type?type_id=${types_id}&project_id=${projects_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				console.log(res);
				setlist(res.data);
			})
			.catch(err => {
				console.log(err);
				makeToast("error","Having trouble getting jama item information")
			})
	}

	//Check if the input ID for jama and jira are actually valid
	const check_error = () => {
		axios.get(`http://127.0.0.1:5000/jama/item_by_id?item_id=${item_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				if(res.request.status ==  200 )
				{
					checkjamalink(true);
				}
				console.log(res.request.status);
			})
			.catch(err => {
				console.log(err.data);
				makeToast("error","There is something wrong with your Jama ID")
			})

		axios.get(`http://127.0.0.1:5000/jira/item_by_id?id=${jira_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUyMjA5MjEsIm5iZiI6MTYwNTIyMDkyMSwianRpIjoiNDRhYzM2ZTYtYTBjZS00OWQzLTlkYTQtM2I3OGRlZGFiYjJiIiwiZXhwIjoxNjA1MzA3MzIxLCJpZGVudGl0eSI6eyJjb25uZWN0aW9uX2lkIjoiYWNhNTQwYTktZDkyZi00MmU3LTg1MGYtODI3ODZhMjgwN2IwIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.df4oDeaLpdbKcPAvV8ilr_nNG0pAElKw0UBVEhMlZnk`,
				}
			})
			.then(res => {
				if(res.request.status == 200)
				{
					checkjiralink(true);
				}
				console.log(res.request.status);
			})
			.catch(err => {
				console.log(err);
				makeToast("error","There is something wrong with your Jira ID")
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
		if (token) {
			get_prog();
			get_type();
		}
	}, [token])


	//Everytime types_id or projects_id change get_list() will be called
	useEffect(() => {
		if (token) {
			get_list();
		}
	}, [types_id, projects_id])



	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend className="select_item-title">Item Selection</legend>
				<div className="select_item-item">


					<div className="dropdown">
						<Select
							options={resultproject()}
							id="projectselection"
							placeholder="Select project here"
							onChange={e => { setprojects_id(e.value); progID(e.value); progname(e.label); }}
						/>

						<br />

						<Select
							placeholder="Select item type"
							id="typeselection"
							options={resulttype()}
							onChange={e => { settypes_id(e.value); itemtype(e.label); }}
						/>

					</div>

					<div className="textfield">
						<input
							className="field"
							type="text"
							id='itemid'
							placeholder=" Enter the Jama item ID here"
							onChange={e => { setitem_id(e.target.value); settestjamaid(e.target.value); }}
						/>
						<input
							className="field1"
							type="text"
							id="jiraid"
							placeholder=" Enter the Jira item ID here"
							onChange={e => { setjira_id(e.target.value); settestjiraid(e.target.value); }}
						/>
					</div>

					<div className="btn">
<<<<<<< HEAD
						<button id="linkbutton" type='button' className='but' onClick={() => { item1(jira_id); item(item_id); check_error(); }} >Link</button>
=======
						<button id="linkbutton" type='button' className='but' onClick={() => { item1(jira_id); item(item_id);}} >Link</button>
>>>>>>> 3fa2bcf93244c1a4c7405e96b5644391dc45a455
					</div>


				</div>

				<div className="select_item-list">
					<ul >
						{temp().map(s => (<li className="test">{s}</li>))}
					</ul>
				</div>

			</form>

		</div>
	);
}

export default SelectItem;
