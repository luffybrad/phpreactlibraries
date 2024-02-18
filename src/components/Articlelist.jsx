//import react dependencies from react library
import React from 'react';
//import functionalities from react library
//useEfffect is a hook used for side effects in functional components
//useState is a hook for managing app state
import { useEffect, useState } from 'react';
//allow link functionality
import { Link } from 'react-router-dom'
//functional component definition
function Articlelist(){

    //state variable `articles` initialized
    // `setArticles` updates state 
    const [articles, setArticles] = useState([]);


    useEffect(() => {
        //define php backend api
        const api = 'http://localhost/projects/phpreactlibraries/api/server.php';
        //fetch api
        fetch(api)
        //reesponse on fetch in json format
        .then((response) => response.json())
        //updates `users` state with received data
        .then((data) => {
            setArticles(data);
        });
    },
    //dependency array running once when component mounts
    []
    );

    //delete function
    const handleDelete = (article_id) => {
        //prompt before action
        if(confirm('Are you sure?'))
        {
            fetch(`http://localhost/projects/phpreactlibraries/api/server.php?id=${article_id}`, 
            {
                method : 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                //updates users state by removing deleted user from array
                setArticles((prevArticle) => prevArticle.filter((article) => article.id !== article_id));
            });
        }
    };


    //represent component structure
    return(
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6">
                        <b>
                            Articles
                        </b>
                    </div>
                    <div className="col-md-6">
                        <Link to="/add" className="btn btn-primary float-end">Add</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* mapping through fetched article data */}
                        {articles.map((article, index) => (
                            <tr key={index}>
                                <td>{article.id}</td>
                                <td>{article.title}</td>
                                <td>{article.author}</td>
                                <td>{article.description}</td>
                                <td>
                                    <Link to={`/edit/${article.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                </td>
                                <td>
                                <button type="button" onClick={() => handleDelete(article.id)} className="btn btn-danger btn-sm">Delete</button>
                                </td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//to allow exporting of this component to another file in the application
export default Articlelist;