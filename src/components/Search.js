import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = ({ searchHandler }) => {

    const onChangeSearchClient = (e) => {
        searchHandler(e.target.value);
    };

    return (
        <React.Fragment>
            <div className="row justify-content-start">
                <div className="col-md-6 mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Recherche par nom"
                            onChange={onChangeSearchClient}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                disabled
                            >
                                <span><BsSearch /></span> Rechercher
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Search;