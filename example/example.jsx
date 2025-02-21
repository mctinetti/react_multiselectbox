//import React from 'react'

import React, { useState } from 'react';
// REACT & REDUX
import ReactDOM from 'react-dom/client'; 
//import MultiSelectBox   from '../react-multiselectbox.jsx';
import MultiSelectBox   from '../dist/react-multiselectbox.js';

import './react-multiselectbox.css'



export const MultiSelectTest = () => {
  
        const [inputValue, setValue] = useState('hola')

        const handleNumberOnBlur = (newValue) => {
            setValue(newValue);
        };

        const handleNumberOnChange = (newValue) => {
            setValue(newValue);
        };
		
		const optionList = [{label:"IsoCode", id:"IsoCode", disabled:false}, {label:"NumberOfDecimals", id:"NumberOfDecimals", disabled:false},{label:"Active", id:"Active",disabled:false},
                            {label:"Alt1", id:"Alt1", disabled:false},{label:"Alt2", id:"Alt2", disabled:false},{label:"Alt3", id:"Alt3", disabled:false},
                            {label:"Alt4", id:"Alt4", disabled:false}, {label:"Alt5", id:"Alt5", disabled:false},{label:"Alt6", id:"Alt6", disabled:false},
                            {label:"Alt7", id:"Alt7", disabled:false}, {label:"Alt8", id:"Alt8", disabled:false},{label:"Alt9", id:"Alt9", disabled:false}      ];
		const optionList2 = []
        /*[{label:"IsoCode", id:"IsoCode", disabled:true}, {label:"NumberOfDecimals", id:"NumberOfDecimals", disabled:false},{label:"Active", id:"Active", disabled:false}, //
                             {label:"Alt1", id:"Alt1", disabled:false}, {label:"Alt2", id:"Alt2", disabled:false},{label:"Alt3", id:"Alt3", disabled:false},
                             {label:"Alt4", id:"Alt4", disabled:false}, {label:"Alt5", id:"Alt5", disabled:false},{label:"Alt6", id:"Alt6", disabled:false},
                             {label:"Alt7", id:"Alt7", disabled:false}, {label:"Alt8", id:"Alt8", disabled:false},{label:"Alt9", id:"Alt9", disabled:false}      ];*/
		return (
            <>
            
                <MultiSelectBox
                    id="multiSelect" 
					options={ optionList }
					selectedItems={ optionList2 }
                    //value={inputValue}
                    //name="multiSelect" 
                    //className="text-field" 
                    //locale="en"
                    //clearable = {true}
                    autoComplete={"off"}
                    displayAsDropdown={false}
                    placeholder= {"Search..."}
                    //onChange={value => handleNumberOnChange(value)}
                    //onBlur={value => handleNumberOnBlur(value) }
                />

            <br/><br/>

            <MultiSelectBox
                    id="multiSelect" 
                    disabled={false}
					options={ optionList }
					selectedItems={ optionList2 }
                    autoComplete={"off"}
                    displayAsDropdown={true}
                    value={inputValue}
                    placeholder= {"Search..."}
                    //onChange={value => handleNumberOnChange(value)}
                    //onBlur={value => handleNumberOnBlur(value) }
                />
            </>
            
            )
	

}

console.log('Store initialized!');

const root = ReactDOM.createRoot(document.getElementById('multiSelectField'));
root.render(
  <React.StrictMode>
    <MultiSelectTest />
  </React.StrictMode>
);

