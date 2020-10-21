import React from 'react';
import axios from 'axios'
import "../styles/Page/select_item.sass";
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';
import type from './item_type.json';
import Select from 'react-select'

const Select_item = () => {


	// const [projects, setproject] = useState([])

	// useEffect(() => {
	// 	axios.get('https://capstone2020.jamacloud.com/rest/v1/projects',
	// 		{
	// 			headers: {
	// 				'Access-Control-Allow-Origin' : '*',
	// 				'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS' ,
	// 			}
	// 		})
	// 		.then(res => {
	// 			console.log(res)
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})

	// }, [])



	const resultdata = () => {
		const tempArray = [];
		type.data.map((element) => {
			tempArray.push({ label: `${element.display}`, value: element.id });
		});
		return tempArray;
	}


	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend className="mx-auto border-separate font-bold italic text-xl">Item Selection</legend>
				<div className="select_item-item">


					<div className="dropdown">
						<Select
							options={[
								{ label: "Alligators", value: 1 },
								{ label: "Crocodiles", value: 2 },
								{ label: "Sharks", value: 3 },
								{ label: "Small crocodiles", value: 4 },
								{ label: "Smallest crocodiles", value: 5 },
								{ label: "Snakes", value: 6 },
							]}
							placeholder="Select project here"
								// 		projects.map(project => (
								// 			<option key={project.data.id}>{project.data.name}</option>
								// 		))}
							/>

							<br />

						<Select
							placeholder="Select item type"
							options={resultdata()}
						/>

					</div>

					<div className="textfield">
						<input
							className="field"
							type="text"
							id='itemid'
							placeholder="Enter the item ID here"
						/>
					</div>

					<div className="btn">
						<button type='button' className='but'>Search</button>
					</div>

				</div>
			</form>

		</div>
	);
}

export default Select_item;
