import * as React from 'react';
import {GameTypes} from "../features/types";

const DefaultGenerationDisplay = ({item}: {item: GameTypes.DefaultGeneration}) => {
    return (
        <div className='default-generation-display'>
            <img src={item.image} alt=""/>
        </div>
    );
};

export default DefaultGenerationDisplay;