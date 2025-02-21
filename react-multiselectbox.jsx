import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

const MultiSelectBox = ({
    id,
    name,
    value,
	options,
	selectedItems,
    placeholder,
    disabled,
    onChange,
    //onClick,
    onBlur,
    onFocus,
    autoFocus,
    autoComplete = false,
	displayAsDropdown = false,
}) => {
    let [searchValue, setSearchValue] = useState("")
	let [checkedAllValue, setcheckedAllValue] = useState(false) // SelectAll 
    let [optionsMyState, setOptionsMyState] = useState(options)

    let [optionsSortMyState, setOptionsSortMyState] = useState(options.map((item, index) => ({    // Items selected but I added orderSort 
        id:item.id, 
        sortOrder: index 
    })))
	let [selectedItemsMyState, setSelectedItemsMyState] = useState( selectedItems )
    const [isOpen, setIsOpen] = useState(false)

const filterProcess = (options, searchValue) => {
    return options.filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()))
}

const handleChangeOnSearch = (e) => { //Search ...
    setSearchValue(e.target.value);
    const searchValue = e.target.value.trim()

    let newOptions = options
    if(searchValue){
        newOptions = filterProcess(options,searchValue)
    }
    setOptionsMyState(newOptions)
    setcheckedAllValue(newOptions.filter(i=>!i.disabled).every(itemA => selectedItemsMyState.some(itemB => itemA.id === itemB.id)) && newOptions.length > 0)
};

useEffect(() => {
    setOptionsSortMyState(options.map((item, index) => ({    // Items selected but I added orderSort 
        id:item.id, 
        sortOrder: index 
    })))
    setOptionsMyState(options)
    setSelectedItemsMyState(selectedItemsMyState.filter(item => options.some(option => option.id === item.id))) // Removing items from the selectedItemsMyState if they are not in the options list
}, [options]);

const handleChangeCheckAll = (e) => { // SelectAll
	setcheckedAllValue(e.target.checked)

    let newSelectedItems
    if (e.target.checked == false) {
        //Remove the items listed on page
        newSelectedItems = selectedItemsMyState.filter(itemA => !optionsMyState.some(option => option.id === itemA.id && !option.disabled ) );
    } else {
        //Add the items listed on page
        newSelectedItems = [...selectedItemsMyState, ...optionsMyState.filter(ite=>ite.disabled!=true)].filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.id === value.id
            ))
          )
    }
    setSelectedItemsMyState(newSelectedItems)
    if (onChange) onChange(newSelectedItems,'selectedItems')

    if (displayAsDropdown) setOptionsMyState(options)
}

const handleChangeIndividualCheck = (e, labeltxt, disabled, data) => {
    let newSelectedItems
	const newItem = { id: e.target.id, label: labeltxt, disabled: disabled, data: data};
	
    newSelectedItems = e.target.checked == false ? (selectedItemsMyState.filter((item) => item.id !== e.target.id)) // removing
                                                 : ([...selectedItemsMyState,newItem]) // adding

    setSelectedItemsMyState(newSelectedItems)
    if (onChange) onChange(newSelectedItems,'selectedItems')
}

const handleBlur = (e) => {
    // lose focus
};

const handleClickToClearAll = () =>{
    let newSelectedItems = [ ...selectedItemsMyState.filter(item=>item.disabled)]
    setSelectedItemsMyState([ ...selectedItemsMyState.filter(item=>item.disabled)])
    if (onChange) onChange(options,'selectedItems') // sent to the main component all the list
}

const handleClickToRemoveItem = (id) =>{
    let newSelectedItems = selectedItemsMyState.filter(item=> item.id != id || item.disabled )
    setSelectedItemsMyState(newSelectedItems)
    if (onChange) onChange(newSelectedItems,'selectedItems')
}

useEffect(()=> {   // this effect it's basically to set the Select All checkbox 
    let selectedItemsLen
    if(searchValue && !displayAsDropdown){ 
        selectedItemsLen = filterProcess(selectedItemsMyState,searchValue).filter(option=>!option.disabled).length
    } else{
        
        selectedItemsLen = selectedItemsMyState.filter(option=>!option.disabled).length
    }
	setcheckedAllValue( optionsMyState.filter(option=>!option.disabled).length == selectedItemsLen ? optionsMyState.length==0 ? false : true 
                                                                                                   : false);
},[selectedItemsMyState])


const handleClickOnElement = useCallback((event) => {
    if (displayAsDropdown) {
        if(ref.current && ref.current.contains(event.target)){
            setIsOpen(true)
        }else{
            setIsOpen(false) // Close the item list
            setSearchValue('') // Clean the search value in case it has value
            setOptionsMyState(options) // Reset the options 
            selectedItemsMyState.length==options.length && options.length!=0 ? setcheckedAllValue(true) : setcheckedAllValue(false) // Check if Select All should be mark or not
        }
    }
}, [options, selectedItemsMyState]);

// Code to handle clicks in/outside the component
const ref = useRef(null);
useEffect(() => {
    //Mount
    document.addEventListener("click", handleClickOnElement);
    //Unmount
    return () => {
        document.removeEventListener("click", handleClickOnElement);
    };
}, [handleClickOnElement]);

const generatePreview = (selectedItems,optionsSort) => {
    const preview =  selectedItems.map(item => ({
        ...item,
        sortOrder: optionsSort.find(option => option.id == item.id).sortOrder
    })).sort((a,b) => a.sortOrder - b.sortOrder).map(item => item.label).join(', ')
    return preview.length > 30 ? `${preview.substring(0, 30)}...` : preview
}

const checkboxSelectAll = <label className={"itemlabel"}>
                            <input type="checkbox" className="notVisible" checked={checkedAllValue} onChange={(e) => handleChangeCheckAll(e)}/> 
                            <span className="checkbox-custom"></span> 
                            Select All
                          </label>

return(
	<div className={"containerMultiSelectBox"} ref={ref}>
        <div id="box1" className={ classNames(displayAsDropdown?"boxDropDown":"box")} >
            <div className='firstline'>
                <div className='leftDivs'>
                    <input
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        type='text'
                        id={id}
                        name={name}
                        value= { isOpen ? searchValue : displayAsDropdown ? generatePreview(selectedItemsMyState, optionsSortMyState) 
                                                                          : searchValue }
                        className={'searchField'}
                        disabled={disabled}
                        placeholder={placeholder?placeholder:'Search...'}
                        onChange={(e) => handleChangeOnSearch(e)}
                        //onClick={(e) => handleClickOnSearch(e)}
                        //onBlur={(e) => handleBlur(e)}
                        //onFocus={(e) => handleFocus(e)}  classNames("items", "selectAllLine", displayAsDropdown ? isOpen ? "":"notVisible" :'')
                    />
                </div>
            </div>

                    <div className={ classNames("items", "selectAllLine", displayAsDropdown ? "notVisible" :'') }> 
                        {checkboxSelectAll}
                    </div>
                
                    
                    <div className= { displayAsDropdown ? isOpen ? "itemsListScrollDropDown":"itemsListScrollDropDown notVisible" :'itemsListScroll' }>

                    <div className={ classNames("items", "selectAllLine", displayAsDropdown ? isOpen ? "":"notVisible" :'notVisible') }> 
                        {checkboxSelectAll}
                    </div>
                    
                    <div className={ displayAsDropdown ? optionsMyState.length == 0 ? "itemsListScroll noItemsToList":"itemsListScroll" : optionsMyState.length == 0 ? "noItemsToList inheritHeight":"" }>
                    { optionsMyState.length == 0? 'No Items...':'' }
                    {
                        optionsMyState.map(( (item, index) => (
                        <div key={'chd01-'+item.id} 
                            className={ classNames("items", selectedItemsMyState.some((itemSelected) => itemSelected.id === item.id)? "paintGray" : "paintWhite" )}>

                            <label key={'chd02-'+item.id} className={ classNames("itemlabel", item.disabled?"itemlabeldisabled":"")}>
                                
                                <input key={'chd03-'+item.id} 
                                    id={item.id}
									className="notVisible"
                                    type="checkbox" 
                                    checked={ selectedItemsMyState.some((itemSelected) => itemSelected.id === item.id)==true? true : "" } 
                                    onChange={(e) => handleChangeIndividualCheck(e, item.label, item.disabled, item.data) }
                                    disabled={item.disabled}
                                /> 
                                <span className="checkbox-custom"></span>

                            {item.label} </label>
                        </div>
                        ) ))
                    }
                    </div>
                    </div>   
    </div>

{ displayAsDropdown ? '' :
    <div id="box2" className="box" style={{backgroundColor:'white'}}>
        <div className='firstline'>
            <div className='rightDivs' >{selectedItemsMyState.length>0?selectedItemsMyState.length:'None'} Selected</div>
            <div className='rightDivs'>   <a href="#" onClick={handleClickToClearAll} className='link_clear'>Clear All</a>   </div>
        </div>
        <div className={ classNames("itemsListScrollRight", selectedItemsMyState.length==0?"noItemsToList":"")}>
            { selectedItemsMyState.length == 0? 'No Items...':'' }
            {
                selectedItemsMyState.map(item => ({
                    ...item,
                    sortOrder: optionsSortMyState.find(option => option.id == item.id).sortOrder
                  })).sort((a,b) => a.sortOrder - b.sortOrder).map(( (items) => (
                    <div key={'chd04-'+items.id} className={ classNames("items", "delete-div")} onClick={()=>handleClickToRemoveItem(items.id)} > 
                    <label key={'chd02-'+items.id} className={ classNames("itemlabel", items.disabled?"itemlabeldisabled":"")}>{items.label}</label>
                    {items.disabled?"":<button key={'chd05-'+items.id} type="button" className='buttonDelete'>x</button>}
                    </div>
                )))
            }
        </div>
    </div>
}
	</div>
    )
};

MultiSelectBox.propTypes = {
    id:            PropTypes.string,
	options:       PropTypes.array,
	selectedItems: PropTypes.array,
    name:          PropTypes.string,
    value:         PropTypes.any,
    placeholder:   PropTypes.string,
    disabled:      PropTypes.bool,
    onChange:      PropTypes.func,
    //onClick:       PropTypes.func,
    onBlur:        PropTypes.func,
    onFocus:       PropTypes.func,
    autoFocus:     PropTypes.any,
    autoComplete:  PropTypes.any,
    displayAsDropdown: PropTypes.bool,
}

export default MultiSelectBox;