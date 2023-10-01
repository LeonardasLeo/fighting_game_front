// @ts-ignore
import React from 'react';
import SelectedItem from "./selectedItem";
import {BattleUser, GameItem} from "../features/types";

const Fighter = ({user} : {user: BattleUser}) => {
    return (
        <div className='flex-1 battleSide'>
            <div className='fs-4'><b>Generated gold:</b> {user.gold}</div>
            <img src={user.character} alt=""/>
            <div className='bar mt-3'>
                <div className='healthBar' style={{width: `${user.health}%`}}></div>
            </div>
            <div className='battleMessage'>{user.message}</div>
            <div className='d-flex justify-content-evenly mt-3'>
                {user.selectedItems.map((item: GameItem) =>
                    <SelectedItem key={item.type} item={item}/>
                )}
            </div>
        </div>
    );
};

export default Fighter;