import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const SelectControl = (props) => {

	const [state, setState] = React.useState((props.object)[props.property]);

	return (
		<FormControl>
			<InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				value={state}
				onChange={(e) => {
					setState(e.target.value);
					const objectChange = Object.assign({}, props.object);
					objectChange[props.property] = e.target.value;
					props.setObject(objectChange);
					props.setObjectParent(objectChange);
				}}
			>
				{props.items.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
			</Select>
		</FormControl>
	);
}

export default SelectControl;