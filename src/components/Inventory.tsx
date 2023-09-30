// @ts-ignore
import React from 'react';
import {useSelector} from "react-redux";
import '../App.css'
import SelectedItem from "./selectedItem";
import InventorySlot from "./inventorySlot";
import {gameItem, reduxUsers, userType} from "../features/types";
const Inventory = () => {
    const user: userType = useSelector((state: reduxUsers) => state.users.myUser)
    return (
        <div>
            <div className='d-flex justify-content-center mb-3 fs-3 '>Inventory</div>
            <div className='d-flex gap-3 flex-wrap justify-content-center'>
                {user.inventory !== undefined && user.inventory.map((item: gameItem, index: number) =>
                    <InventorySlot key={index} index={index} item={item}/>
                )}
            </div>
            <div className='d-flex justify-content-center my-3 fs-3'>
                Selected Items
            </div>
            <div className='d-flex justify-content-center gap-3'>
                {user.selectedItems !== undefined && user.selectedItems.map((item: gameItem, index: number) =>
                    <SelectedItem key={index} item={item}/>
                )}
            </div>
        </div>
    );
};

export default Inventory;