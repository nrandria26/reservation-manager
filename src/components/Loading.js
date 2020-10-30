import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-md-auto mb-5">
                <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
            </div>
        </div>
    );
}

export default Loading;