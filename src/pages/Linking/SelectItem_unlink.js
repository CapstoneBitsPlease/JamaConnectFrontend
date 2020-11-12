import React from 'react';
import axios from 'axios';
import "../../styles/pages/SelectItemsunlink.sass";
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';



const SelectItemunlink = () => {
	//token : authorization token 

	// const [token, setToken] = useState(0);
	const [list, setlist] = useState([])
	const [item_id, setitem_id] = useState(0)
	const [jira_id, setjira_id] = useState(0)


	//use information from store
	const token = useStoreState(state => state.accountStore.token)


	//Get the list of item with specific item type id and specific project id
	const get_list = () => {
		axios.get(`http://127.0.0.1:5000/jama/projects`,
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
		<div className="select_item_unlink-container">
			<form className="select_item_unlink-selecting" >
				<legend className="select_item_unlink-title">Item Selection</legend>
				<div className="select_item_unlink-item">


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
						<button id="linkbutton" type='button' className='but' >Unlink</button>
					</div>


				</div>

				<div className="select_item_unlink-list">
					<ul >
						{temp().map(s => (<li className="test">{s}</li>))}
					</ul>
				</div>


			</form>

		</div>
	);
}

export default SelectItemunlink;
