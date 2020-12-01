import React from 'react';
import axios from 'axios';
import "../../styles/pages/SelectItemsunlink.sass";
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import makeToast from '../../components/Toaster';
import Button from '@atlaskit/button';


const SelectItemunlink = () => {

	// const [token, setToken] = useState(0);
	const [list, setlist] = useState([])
	const [item_id, setitem_id] = useState(0)
	const [flag , setflag ] =useState(true)
	const [listLength, setListLength] = useState(0);

	//test if the jama id is valid
	const [testjama, settestjama] = useState(false)

	//use information from store
	const token = useStoreState(state => state.accountStore.token)

	const check = useStoreActions(actions => actions.jamaitem.checkunlinkingpage)

	//Get the list of item with specific item type id and specific project id
	const get_list = () => {
		axios.get(`http://127.0.0.1:5000/capstone/get_linked_jama_items`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				/*if(res.data.length === 0){
					makeToast("error", "There is no Jama item in our database.")
				}*/ 
				console.log(res);
				setlist(res.data);
				setListLength(res.data.length);
			})
			.catch(err => {
				console.log(err);
				makeToast("error", "There is something wrong when getting item list")
			})
	}


	//Check if the input ID for jama are actually valid
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
				if (res.data === "Item ID not found.") {
					console.log("The item is found!!!!!")
					settestjama(false);
				}
				else {
					settestjama(true)
				}
				console.log(res);
			})
			.catch(err => {
				console.log(err.data);
				//makeToast("error", "There is something wrong with your Jama ID")
			})

	}



	//unlink item with jama item id
	const unlink_items = () => {

		axios.get(`http://127.0.0.1:5000//capstone/unlink_with_id?id=${item_id}`,
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS',
					'Authorization': `Bearer ${token}`,
				}
			})
			.then(res => {
				makeToast("success",res.data);
				console.log(res);

			})
			.catch(err => {
				console.log(err.data);
				makeToast("error", "There is something wrong while unlinking")
			})

			setflag(!flag);
	}

	const check_again = () => {

		if (item_id === 0) {
			makeToast("error", "You have to enter an jama ID!")
		}
		else {
			if (testjama) {
				unlink_items();
				check(true);
				setListLength(listLength-1);
			}
			else {
				makeToast("error", "This is not a valid jama ID!")
			}
		}

		document.getElementById("itemid").value = "";

	}



	//simulated with json file
	const temp = () => {
		const tempArray = [];
		if(listLength === 0) {
			tempArray.push("No Jama items currently in our database.");
		}
		else {
			list.map((element) => {
				tempArray.push('ID: ' + element[0]);
			});
		}
		return tempArray;
	}





	//Everytime types_id or projects_id change get_list() will be called
	useEffect(() => {
		if (token) {
			get_list();
		}
	}, [token, listLength])


	useEffect(() => {
		if (token) {
			check_error();
		}
	}, [item_id])


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


						<div className="btn">
							<Button id="linkbutton" appearance="primary" type='button' className='but' onClick={() => { check_again(); }} >Unlink</Button>
						</div>


					</div>

					<div className="select_item_unlink-list">
						<ul >
							{temp().map((s,index) => (<li key={index} className="test">{s}</li>))}
						</ul>
					</div>
				</div>


			</form>

		</div>
	);
}

export default SelectItemunlink;
