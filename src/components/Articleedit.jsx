import React, { useState, useEffect } from 'react';
//useParams is used to extract parameters from the URL
import { Link, useNavigate, useParams} from  'react-router-dom';

//functional component definition
function Articleedit(){
    
    //useNavigate hook to get navigate function
    const navigate = useNavigate();

    const {article_id} = useParams();

    //useState hook to initialize user state, representing user info with properties
    const [article, setArticle] = useState({
        title : '',
        author : '',
        description : ''
    });

    //form change event handler
    //updates article state based on changed input field
    const handleChange = (event) => {
        const {name,value} = event.target;

        setArticle({
            ...article,
             [name] : value
        });
    };

        //fetch article data function
        const fetchArticleData = () => {
            //fetch api
            //retrieves data based on id parameter from url
            //check the (``)
            fetch(`http://localhost/projects/phpreactlibraries/api/server.php?id=${article_id}`)
            .then((response) => response.json())
            .then((data) => {
                setArticle(data);
            });
        };
  
        
    //useEffect hook used to execute the fetch article data function when component mounts ( emptu dependency array [] )
    //ensures data is fetched once when component is rendered
    useEffect(() => {
        fetchArticleData();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost/projects/phpreactlibraries/api/server.php?id=${article_id}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(article)
    })
    .then((response) => response.json())
    .then((data) => {
        navigate('/');
    });
    };
    return(
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-6">
                        Edit User
                    </div>
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-success btn-sm float-end">View All</Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        &nbsp;
                    </div>
                    <div className="col-md-4">
                        <form  method="POST" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Title
                                </label>
                                <input type="text" name="title" id="" className="form-control" value={article.title} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Author
                                </label>
                                <input type="text" name="author" id="" className="form-control" value={article.author} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea name="description" id="" cols="30" rows="10" className="form-control" value={article.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <input type="submit" value="Edit" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Articleedit;