import React from 'react';
import axios from 'axios';
import "../../styles/pages/SelectItemsunlink.sass";
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import makeToast from '../../components/Toaster';


const SelectItemunlink = () => {

	// const [token, setToken] = useState(0);
	const [list, setlist] = useState([])
	const [item_id, setitem_id] = useState(0)
	const [jira_id, setjira_id] = useState(0)


	//use information from store
	const token = useStoreState(state => state.accountStore.token)

	const checkjama = useStoreActions(actions => actions.jamaitem.checkjamaID)
	const checkjira = useStoreActions(actions => actions.jamaitem.checkjiraID)

	//Get the list of item with specific item type id and specific project id
	const get_list = () => {
		axios.get(`http://127.0.0.1:5000/capstone/get_linked_items`,
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
				makeToast("error","There is something wrong when getting item list")
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
				checkjama(true);
				console.log(res);
			})
			.catch(err => {
				console.log(err.data);
				makeToast("error","There is something wrong with your Jama ID")
			})

		axios.get(`http://127.0.0.1:5000/jira/item_by_id?${jira_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDUyMTkzNDksIm5iZiI6MTYwNTIxOTM0OSwianRpIjoiNmZiMjZlNzEtZDU0Zi00ZDMwLWI1YjgtZjk5YmM1ODE1NDQ3IiwiZXhwIjoxNjA1MzA1NzQ5LCJpZGVudGl0eSI6eyJjb25uZWN0aW9uX2lkIjoiOTRhNmU4NDktNWE0Zi00YTE4LTg3ZmEtNTIyYTZhNGE5Y2U2In0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.pT74AJqu0i8gNHtR4sFai_WoeW_4UWqEmDCiHczPPSs`,
				}
			})
			.then(res => {
				checkjira(true);
				console.log(res);
			})
			.catch(err => {
				console.log(err.data);
				makeToast("error","There is something wrong with your Jira ID")
			})

	}



	//simulated with json file
	const temp = () => {
		const tempArray = [];
		list.map((element) => {
			tempArray.push('ID: ' + element[0]);
		});
		return tempArray;
	}





	//Everytime types_id or projects_id change get_list() will be called
	useEffect(() => {
		if (token) {
			get_list();
		}
	}, [item_id, jira_id])




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

						<br></br>

						<input
							className="field1"
							type="text"
							id="jiraid"
							placeholder=" Enter the Jira item ID here"
							onChange={e => { setjira_id(e.target.value) }}
						/>

						<div className="btn">
							<button id="linkbutton" type='button' className='but'  onClick={ () => {check_error();} } >Unlink</button>
						</div>


					</div>

					<div className="select_item_unlink-list">
						<ul >
							{temp().map(s => (<li className="test">{s}</li>))}
						</ul>
					</div>
				</div>


			</form>

		</div>
	);
}

export default SelectItemunlink;
