import * as React from 'react';
import {GameTypes} from "../features/types";

const DefaultGenerationDisplay = ({item}: {item: GameTypes.DefaultGeneration}) => {
    return (
        <div className='defaultGenerationDisplay'>
            <img src={item.image} alt=""/>
        </div>
    );
};

export default DefaultGenerationDisplay;