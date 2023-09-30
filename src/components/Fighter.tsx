// @ts-ignore
import React from 'react';
import SelectedItem from "./selectedItem";
import {battleUser, gameItem} from "../features/types";

const Fighter = ({user} : {user: battleUser}) => {
    return (
        <div className='flex-1 battleSide'>
            <div className='fs-4'><b>Generated gold:</b> {user.gold}</div>
            <img src={user.character} alt=""/>
            <div className='bar mt-3'>
                <div className='healthBar' style={{width: `${user.health}%`}}></div>
            </div>
            <div>{user.message}</div>
            <div className='d-flex justify-content-between mt-3'>
                {user.selectedItems.map((item: gameItem) =>
                    <SelectedItem key={item.type} item={item}/>
                )}
            </div>
        </div>
    );
};

export default Fighter;