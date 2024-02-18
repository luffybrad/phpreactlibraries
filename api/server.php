<?php
//cross-origin resource sharing headers (CORS)
//allow cross-origin requests from any origin(*)
//necessary for web apps hosted on one domain to make requests to a different domain
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: * ");
header("Access-Control-Allow-Methods: * ");

//set database connection
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_NAME","library");
define("DB_PWD","");
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);

//return http request method(get,post,put,delete) from server superglobal
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    if(isset($_GET["id"])) {
    $id = $_GET["id"];
    //fetch single user
    $sql = "select * from articles where id=$id";
    $res = mysqli_query($conn,$sql);
    $data = array();
    while($row = mysqli_fetch_assoc($res)) {
        $data["title"] = $row["title"];
        $data["author"] = $row["author"];
        $data["description"] = $row["description"];
        $data["id"] = $row["id"];
    }
    //return result in json format
    echo json_encode($data);

    }else{

    //fetch all users
    $sql = "select * from articles order by id desc";
    $res = mysqli_query($conn, $sql);
    $data = array();
    while( $row = mysqli_fetch_assoc($res) ) {
        $data[] = $row;
    }
    //returns data in json format
    echo json_encode($data);
}
}
if( $method === "POST") {
    //fetch json data from user input
    $form_data = json_decode(file_get_contents("php://input"));

    $title = $form_data->title;
    $author = $form_data->author;
    $description = $form_data->description;

       //to allow passing of apostrophes in input
       $title = addslashes($title);
       $author = addslashes($author);
       $description = addslashes($description);

    $sql = "insert into articles (title,author,description) values ('$title','$author','$description')";
    $res = mysqli_query($conn, $sql);
    if($res){
        echo json_encode(["success" => "done"]);
    }
}
if($method === "PUT"){
    $form_data = json_decode(file_get_contents("php://input"));

    $title = $form_data->title;
    $author = $form_data->author;
    $description = $form_data->description;
    $id = $form_data->id;

    //to allow passing of apostrophes in input
    $title = addslashes($title);
    $author = addslashes($author);
    $description = addslashes($description);
    
    
    $sql = "update articles set title='$title',author='$author',description='$description' where id=$id ";
    $res = mysqli_query($conn,$sql);
    if($res){
        echo json_encode(["success"=> "done"]);
    }
}
if($method === "DELETE"){
    $id = $_GET["id"];

    $sql = "delete from articles where id=$id";
    $res = mysqli_query($conn, $sql);
    if($res){
        echo json_encode(["success"=> "done"]);
    }
}


?>