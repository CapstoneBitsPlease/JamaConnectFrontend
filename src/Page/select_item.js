import React from 'react';
import "../styles/Page/select_item.sass";

const Select_item = () => {
	return (
		<div className="select_item-container">
			<form className="select_item-selecting" >
				<legend class="mx-auto border-separate font-bold italic text-xl">Item Selection</legend>
				<div className="select_item-item">

					<table className="select_item-table">
						<tbody>

							<div className="dropdown">
								<select className="list1" name="pid" id="proid">
									<option></option>
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

							<button type='button' className='but'>Search</button>

						</tbody>
					</table>
				</div>
			</form>

		</div>
	);
}

export default Select_item;
