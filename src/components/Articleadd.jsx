//import react dependencies from react library
import React from "react";
//useState is a hook for managing app state
import { useState } from "react";
//useNavigate hook to navigate between different views
//Link used to create navigation links
import { Link, useNavigate } from "react-router-dom";

//functional component defined
function Articleadd(){

    //define constant for navigation
    const navigate = useNavigate();
    
    //state variable article initialized
    //state represents user data with properties
    const [article, setArticle] = useState({
        title : "",
        author : "",
        description : ""
    });

    //input change event handler
    //setArticle function used to update article state by spreadig existing state and updationg property corresponding to changed input
    const handleChange = (event) => {
        const {name, value} = event.target;

        setArticle({...article, [name] : value });
    };
    
    //form submit event handler
    const handleSubmit = (event) => {
        //prevent form action default behavior
        event.preventDefault();
        
        //post request to API endpoint
        fetch("http://localhost/projects/phpreactlibraries/api/server.php", 
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            //send data in json format
            body : JSON.stringify(article)
        })
        //check request response
        .then((response) => response.json())
        //navigate to root
        .then((data) => {
            navigate("/");
        })
    };

    return(
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6">
                        Add Article
                    </div>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-success btn-sm float-end">View All Articles</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                    <div className="col-md-4">
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Description</label>
                                <textarea name="description" id="" cols="30" rows="10" className="form-control" onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Articleadd;