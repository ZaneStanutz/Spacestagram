import React from "react";
import LoadingGif from './loadingcircle.gif';

const Spinner = () => {
	return(
		<div className="ui">
			<img src={LoadingGif} width={100} />
		</div>
	)
}

export default Spinner;