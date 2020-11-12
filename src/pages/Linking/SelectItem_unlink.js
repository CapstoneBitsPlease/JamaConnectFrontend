import React from 'react';
import axios from 'axios'
import "../../styles/components/SelectItems.sass";
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useStoreActions, useStoreState } from 'easy-peasy';



const SelectItem = () => {
	//token : authorization token 
	//projects : get all project to display in select box
	//types : get all item type to display in select box

	// const [token, setToken] = useState(0);
	const [list, setlist] = useState([])
	const [item_id, setitem_id] = useState(0)
	const [jira_id, setjira_id] = useState(0)

	//store information using easy peasy
	const item = useStoreActions(actions => actions.jamaitem.setitemID)
	const item1 = useStoreActions(actions => actions.jamaitem.setjiraID)


	//use information from store
	const token = useStoreState(state => state.accountStore.token)



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
			})
	}



	//simulated with json file
	const temp = () => {
		const tempArray = [];
		list.map((element) => {
			tempArray.push('ID: ' + element.id + ' ' + element.name);
		});
		return tempArray;
	}





	//Everytime types_id or projects_id change get_list() will be called
	useEffect(() => {
		if (token) {
			get_list();
		}
	}, [token])




	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend className="select_item-title">Item Selection</legend>
				<div className="select_item-item">


					<div className="textfield">
						<input
							className="field"
							type="text"
							id='itemid'
							placeholder=" Enter the Jama item ID here"
							onChange={e => { setitem_id(e.target.value); }}
						/>
						<input
							className="field1"
							type="text"
							id="jiraid"
							placeholder=" Enter the Jira item ID here"
							onChange={e => { setjira_id(e.target.value) }}
						/>
					</div>

					<div className="btn">
						<button id="linkbutton" type='button' className='but' onClick={() => { item1(jira_id); item(item_id); }} >Unlink</button>
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
