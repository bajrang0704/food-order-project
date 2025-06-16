// react icons -- website
import React from 'react';
import { FaSearchLocation } from "react-icons/fa";

export default function Search() {
  return (
  <form>
      <div>
        <div className="input-group">
            {/*input:text.form-control#search_field*/}
            <input type="text" placeholder="Search your favorite Restaurent..." id="search_field" className="form-control" />
            <div className="input-group-append">
                <button id="search_btn" className="btn">
                <FaSearchLocation className="fa faSearchLocation"/>
                </button>
                
            </div>
        </div>
      </div>
    </form>
  );
}
