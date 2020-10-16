import React from 'react';
import axios from 'axios'
import "../styles/Page/select_item.sass";
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';


const Select_item = () => {
	const [projects, setproject] = useState([])

	useEffect(() => {
		axios.get('https://capstone2020.jamacloud.com/rest/v1/projects',
			{
				headers: {
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Method': 'GET,PUT,POST,DELETE,OPTIONS' ,
				}
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})

	}, [])



	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend class="mx-auto border-separate font-bold italic text-xl">Item Selection</legend>
				<div className="select_item-item">

					<table className="select_item-table">
						<tbody>

							<div className="dropdown">
								<select className="list1" name="pid" id="proid">
									{
										projects.map(project => (
											<option key={project.data.id}>{project.data.name}</option>
										))}
								</select>

								<br />

								<select className="list2" name="itype" id="itemtype">
									<option></option>
								</select>
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

						</tbody>
					</table>
				</div>
			</form>

		</div>
	);
}

export default Select_item;
