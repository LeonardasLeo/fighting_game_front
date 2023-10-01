import * as React from 'react';
import {GameTypes} from "../features/types";

type props = {
    item: GameTypes.Character,
    character: string,
    setCharacter: React.Dispatch<React.SetStateAction<string>>
}

const CharacterSelect = ({item, character, setCharacter}: props) => {
    function checkIsCharacterTaken (item){
        if (item.isTaken) return 'characterTaken'
        if (character === item.image && !item.isTaken) return 'characterSelected'
        return 'character'
    }
    return (
        <div className={checkIsCharacterTaken(item)} onClick={() => !item.isTaken && setCharacter(item.image)}>
            <img src={item.image} alt=""/>
        </div>
    );
};

export default CharacterSelect;