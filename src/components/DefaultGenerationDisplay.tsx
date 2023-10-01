import * as React from 'react';
import {DefaultGeneration} from "../features/types";

const DefaultGenerationDisplay = ({item}: {item: DefaultGeneration}) => {
    return (
        <div className='defaultGenerationDisplay'>
            <img src={item.image} alt=""/>
        </div>
    );
};

export default DefaultGenerationDisplay;