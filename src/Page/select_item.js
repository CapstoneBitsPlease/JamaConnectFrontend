import React from 'react';
import "../styles/Page/select_item.sass";

const select_item = () => {
    return (
        <div className="select_item-container">
            <form className="select_item-select">
                    <legend>Item Selection</legend>

                    <div className="item">

                        <table>
                            <tbody>

                                <select name="pid" id="proid"></select>

                                <select name="itype" id="itemtype"></select>

                                <input
                                    type="text"
                                    id='itemid'
                                    placeholder="Enter the item ID here"
                                />

                            </tbody>
                        </table>
                    </div>
            </form>

        </div>
    );
}

export default select_item;
