import * as React from 'react';
import {useSelector} from "react-redux";
import SelectedItem from "./selectedItem";
import InventorySlot from "./inventorySlot";
import {GameTypes, ReduxTypes, UserTypes} from "../features/types";
import '../App.css'

const Inventory = () => {
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxUsers) => state.users.myUser)
    return (
        <div className='w-700'>
            <div className='d-flex justify-content-center mb-3 fs-3 '>Inventory</div>
            <div className='d-flex gap-3 flex-wrap justify-content-center'>
                {user.inventory !== undefined && user.inventory.map((item: GameTypes.GameItem, index: number) =>
                    <InventorySlot key={index} item={item}/>
                )}
            </div>
            <div className='d-flex justify-content-center my-3 fs-3'>
                Selected Items
            </div>
            <div className='d-flex justify-content-center gap-3'>
                {user.selectedItems !== undefined && user.selectedItems.map((item: GameTypes.GameItem, index: number) =>
                    <SelectedItem key={index} item={item}/>
                )}
            </div>
        </div>
    );
};

export default Inventory;